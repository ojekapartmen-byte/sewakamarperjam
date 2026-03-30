import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlus, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RoomPhoto {
  id: string;
  storage_path: string;
  sort_order: number;
}

const BUCKET = "room-photos";

const getPublicUrl = (path: string) => {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
};

const RoomPhotos = ({ roomId }: { roomId: string }) => {
  const [photos, setPhotos] = useState<RoomPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchPhotos = async () => {
    const { data } = await supabase
      .from("room_photos")
      .select("*")
      .eq("room_id", roomId)
      .order("sort_order");
    setPhotos((data as RoomPhoto[]) || []);
  };

  useEffect(() => {
    fetchPhotos();
    const channel = supabase
      .channel(`room_photos_${roomId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "room_photos", filter: `room_id=eq.${roomId}` }, () => fetchPhotos())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: "Gagal", description: `${file.name} terlalu besar (maks 5MB)`, variant: "destructive" });
        continue;
      }

      const ext = file.name.split(".").pop() || "jpg";
      const path = `${roomId}/${Date.now()}_${i}.${ext}`;

      const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file);
      if (uploadError) {
        toast({ title: "Gagal upload", description: uploadError.message, variant: "destructive" });
        continue;
      }

      await supabase.from("room_photos").insert({
        room_id: roomId,
        storage_path: path,
        sort_order: photos.length + i,
      });
    }

    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
    fetchPhotos();
    toast({ title: "Foto berhasil diupload" });
  };

  const handleDelete = async (photo: RoomPhoto) => {
    await supabase.storage.from(BUCKET).remove([photo.storage_path]);
    await supabase.from("room_photos").delete().eq("id", photo.id);
    fetchPhotos();
    toast({ title: "Foto dihapus" });
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-muted-foreground">Foto Unit</span>
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 disabled:opacity-50"
        >
          {uploading ? <Loader2 size={12} className="animate-spin" /> : <ImagePlus size={12} />}
          {uploading ? "Mengupload..." : "Tambah Foto"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {photos.length > 0 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {photos.map((photo) => (
            <div key={photo.id} className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-border group">
              <img
                src={getPublicUrl(photo.storage_path)}
                alt="Foto kamar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <button
                onClick={() => handleDelete(photo)}
                className="absolute top-0.5 right-0.5 bg-destructive/80 text-destructive-foreground rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={10} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { getPublicUrl, BUCKET };
export default RoomPhotos;
