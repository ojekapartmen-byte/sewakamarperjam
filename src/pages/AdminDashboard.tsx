import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, ArrowLeft, DoorOpen } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Room = Tables<"rooms">;

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [fetching, setFetching] = useState(true);

  // New room form
  const [newName, setNewName] = useState("");
  const [newTransit, setNewTransit] = useState("75000");
  const [newDaily, setNewDaily] = useState("300000");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchRooms = async () => {
    const { data } = await supabase.from("rooms").select("*").order("created_at");
    setRooms(data || []);
    setFetching(false);
  };

  useEffect(() => {
    if (isAdmin) fetchRooms();
  }, [isAdmin]);

  const addRoom = async () => {
    if (!newName.trim()) return;
    const { error } = await supabase.from("rooms").insert({
      name: newName.trim(),
      price_transit: parseInt(newTransit) || 75000,
      price_daily: parseInt(newDaily) || 300000,
    });
    if (error) {
      toast({ title: "Gagal menambah kamar", description: error.message, variant: "destructive" });
    } else {
      setNewName("");
      setNewTransit("75000");
      setNewDaily("300000");
      fetchRooms();
      toast({ title: "Kamar ditambahkan" });
    }
  };

  const toggleAvailability = async (room: Room) => {
    const { error } = await supabase
      .from("rooms")
      .update({ is_available: !room.is_available })
      .eq("id", room.id);
    if (!error) fetchRooms();
  };

  const deleteRoom = async (id: string) => {
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    if (!error) fetchRooms();
  };

  const updatePrice = async (id: string, field: "price_transit" | "price_daily", value: string) => {
    const numVal = parseInt(value);
    if (isNaN(numVal)) return;
    await supabase.from("rooms").update({ [field]: numVal }).eq("id", id);
    fetchRooms();
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Dashboard Admin</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => { signOut(); navigate("/"); }}>
            <LogOut size={16} className="mr-1" /> Keluar
          </Button>
        </div>

        {/* Add Room */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border mb-4">
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Plus size={18} /> Tambah Kamar Baru
          </h2>
          <div className="space-y-3">
            <Input placeholder="Nama kamar (cth: Unit A-301)" value={newName} onChange={e => setNewName(e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Harga Transit (Rp)</label>
                <Input type="number" value={newTransit} onChange={e => setNewTransit(e.target.value)} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Harga Harian (Rp)</label>
                <Input type="number" value={newDaily} onChange={e => setNewDaily(e.target.value)} />
              </div>
            </div>
            <Button onClick={addRoom} className="w-full">Tambah Kamar</Button>
          </div>
        </div>

        {/* Room List */}
        <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <DoorOpen size={18} /> Daftar Kamar ({rooms.length})
        </h2>

        {rooms.length === 0 ? (
          <div className="bg-card rounded-2xl p-6 text-center border border-border">
            <p className="text-muted-foreground">Belum ada kamar. Tambahkan kamar pertama Anda.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {rooms.map(room => (
              <div key={room.id} className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-foreground">{room.name}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold ${room.is_available ? "text-green-600" : "text-red-500"}`}>
                        {room.is_available ? "Tersedia" : "Terisi"}
                      </span>
                      <Switch checked={room.is_available} onCheckedChange={() => toggleAvailability(room)} />
                    </div>
                    <button onClick={() => deleteRoom(room.id)} className="text-red-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Transit (Rp)</label>
                    <Input
                      type="number"
                      defaultValue={room.price_transit}
                      onBlur={e => updatePrice(room.id, "price_transit", e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Harian (Rp)</label>
                    <Input
                      type="number"
                      defaultValue={room.price_daily}
                      onBlur={e => updatePrice(room.id, "price_daily", e.target.value)}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
