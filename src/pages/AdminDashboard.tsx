import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus, Trash2, ArrowLeft, DoorOpen, MessageSquare, Settings, Save, Star } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import RoomPhotos from "@/components/RoomPhotos";

type Room = Tables<"rooms">;

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  is_visible: boolean;
  sort_order: number;
}

type SiteSettings = Record<string, string>;

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({});
  const [fetching, setFetching] = useState(true);

  // New room form
  const [newName, setNewName] = useState("");
  const [newTransit, setNewTransit] = useState("75000");
  const [newDaily, setNewDaily] = useState("300000");

  // New testimonial form
  const [newTestName, setNewTestName] = useState("");
  const [newTestText, setNewTestText] = useState("");
  const [newTestRating, setNewTestRating] = useState("5");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const fetchAll = async () => {
    const [roomsRes, testRes, settingsRes] = await Promise.all([
      supabase.from("rooms").select("*").order("created_at"),
      supabase.from("testimonials").select("*").order("sort_order"),
      supabase.from("site_settings").select("*"),
    ]);
    setRooms(roomsRes.data || []);
    setTestimonials((testRes.data as Testimonial[]) || []);
    const map: SiteSettings = {};
    settingsRes.data?.forEach((row: { key: string; value: string }) => {
      map[row.key] = row.value;
    });
    setSettings(map);
    setFetching(false);
  };

  useEffect(() => {
    if (isAdmin) fetchAll();
  }, [isAdmin]);

  // Room handlers
  const addRoom = async () => {
    if (!newName.trim()) return;
    const { error } = await supabase.from("rooms").insert({
      name: newName.trim(),
      price_transit: parseInt(newTransit) || 75000,
      price_daily: parseInt(newDaily) || 300000,
    });
    if (error) {
      toast({ title: "Gagal", description: error.message, variant: "destructive" });
    } else {
      setNewName(""); setNewTransit("75000"); setNewDaily("300000");
      fetchAll();
      toast({ title: "Kamar ditambahkan" });
    }
  };

  const toggleAvailability = async (room: Room) => {
    await supabase.from("rooms").update({ is_available: !room.is_available }).eq("id", room.id);
    fetchAll();
  };

  const deleteRoom = async (id: string) => {
    await supabase.from("rooms").delete().eq("id", id);
    fetchAll();
  };

  const updatePrice = async (id: string, field: "price_transit" | "price_daily", value: string) => {
    const numVal = parseInt(value);
    if (isNaN(numVal)) return;
    await supabase.from("rooms").update({ [field]: numVal }).eq("id", id);
    fetchAll();
  };

  // Testimonial handlers
  const addTestimonial = async () => {
    if (!newTestName.trim() || !newTestText.trim()) return;
    const { error } = await supabase.from("testimonials").insert({
      name: newTestName.trim(),
      text: newTestText.trim(),
      rating: parseInt(newTestRating) || 5,
      sort_order: testimonials.length,
    });
    if (error) {
      toast({ title: "Gagal", description: error.message, variant: "destructive" });
    } else {
      setNewTestName(""); setNewTestText(""); setNewTestRating("5");
      fetchAll();
      toast({ title: "Testimoni ditambahkan" });
    }
  };

  const toggleTestimonialVisibility = async (t: Testimonial) => {
    await supabase.from("testimonials").update({ is_visible: !t.is_visible }).eq("id", t.id);
    fetchAll();
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    fetchAll();
  };

  // Settings handlers
  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = async () => {
    const promises = Object.entries(settings).map(([key, value]) =>
      supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() })
    );
    await Promise.all(promises);
    toast({ title: "Pengaturan tersimpan" });
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">CMS Admin</h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => { signOut(); navigate("/"); }}>
            <LogOut size={16} className="mr-1" /> Keluar
          </Button>
        </div>

        <Tabs defaultValue="rooms">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="rooms" className="gap-1 text-xs"><DoorOpen size={14} /> Kamar</TabsTrigger>
            <TabsTrigger value="testimonials" className="gap-1 text-xs"><MessageSquare size={14} /> Testimoni</TabsTrigger>
            <TabsTrigger value="settings" className="gap-1 text-xs"><Settings size={14} /> Pengaturan</TabsTrigger>
          </TabsList>

          {/* ROOMS TAB */}
          <TabsContent value="rooms" className="space-y-4">
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Plus size={18} /> Tambah Kamar
              </h2>
              <div className="space-y-3">
                <Input placeholder="Nama kamar (cth: Unit A-301)" value={newName} onChange={(e) => setNewName(e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground">Harga Transit (Rp)</label>
                    <Input type="number" value={newTransit} onChange={(e) => setNewTransit(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Harga Harian (Rp)</label>
                    <Input type="number" value={newDaily} onChange={(e) => setNewDaily(e.target.value)} />
                  </div>
                </div>
                <Button onClick={addRoom} className="w-full">Tambah Kamar</Button>
              </div>
            </div>

            <h2 className="font-bold text-foreground flex items-center gap-2">
              <DoorOpen size={18} /> Daftar Kamar ({rooms.length})
            </h2>

            {rooms.length === 0 ? (
              <div className="bg-card rounded-2xl p-6 text-center border border-border">
                <p className="text-muted-foreground">Belum ada kamar.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-foreground">{room.name}</h3>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold ${room.is_available ? "text-green-600" : "text-destructive"}`}>
                            {room.is_available ? "Tersedia" : "Terisi"}
                          </span>
                          <Switch checked={room.is_available} onCheckedChange={() => toggleAvailability(room)} />
                        </div>
                        <button onClick={() => deleteRoom(room.id)} className="text-destructive/60 hover:text-destructive">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-muted-foreground">Transit (Rp)</label>
                        <Input type="number" defaultValue={room.price_transit} onBlur={(e) => updatePrice(room.id, "price_transit", e.target.value)} className="h-8 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Harian (Rp)</label>
                        <Input type="number" defaultValue={room.price_daily} onBlur={(e) => updatePrice(room.id, "price_daily", e.target.value)} className="h-8 text-sm" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TESTIMONIALS TAB */}
          <TabsContent value="testimonials" className="space-y-4">
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
              <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
                <Plus size={18} /> Tambah Testimoni
              </h2>
              <div className="space-y-3">
                <Input placeholder="Nama tamu" value={newTestName} onChange={(e) => setNewTestName(e.target.value)} />
                <Textarea placeholder="Isi testimoni..." value={newTestText} onChange={(e) => setNewTestText(e.target.value)} rows={3} />
                <div>
                  <label className="text-xs text-muted-foreground">Rating (1-5)</label>
                  <Input type="number" min={1} max={5} value={newTestRating} onChange={(e) => setNewTestRating(e.target.value)} />
                </div>
                <Button onClick={addTestimonial} className="w-full">Tambah Testimoni</Button>
              </div>
            </div>

            <h2 className="font-bold text-foreground flex items-center gap-2">
              <MessageSquare size={18} /> Daftar Testimoni ({testimonials.length})
            </h2>

            {testimonials.length === 0 ? (
              <div className="bg-card rounded-2xl p-6 text-center border border-border">
                <p className="text-muted-foreground">Belum ada testimoni.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-card rounded-2xl p-4 shadow-sm border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-foreground text-sm">{t.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={12} className="fill-star text-star" />
                          ))}
                        </div>
                        <Switch checked={t.is_visible} onCheckedChange={() => toggleTestimonialVisibility(t)} />
                        <button onClick={() => deleteTestimonial(t.id)} className="text-destructive/60 hover:text-destructive">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{t.text}</p>
                    <span className="text-xs text-muted-foreground">{t.is_visible ? "Tampil" : "Tersembunyi"}</span>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="space-y-4">
            {/* Header & Branding */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-4">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Settings size={18} /> Header & Branding
              </h2>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Nama Website</label>
                <Input value={settings.site_name || ""} onChange={(e) => updateSetting("site_name", e.target.value)} placeholder="Gunawangsa Gresik" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Tagline</label>
                <Input value={settings.site_tagline || ""} onChange={(e) => updateSetting("site_tagline", e.target.value)} placeholder="Sewa Apartemen Transit & Harian" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Judul Properti</label>
                <Input value={settings.property_title || ""} onChange={(e) => updateSetting("property_title", e.target.value)} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Deskripsi Properti</label>
                <Textarea value={settings.property_description || ""} onChange={(e) => updateSetting("property_description", e.target.value)} rows={3} className="mt-1" />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-4">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Settings size={18} /> SEO On-Page
              </h2>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Meta Title</label>
                <Input value={settings.meta_title || ""} onChange={(e) => updateSetting("meta_title", e.target.value)} className="mt-1" />
                <p className="text-[10px] text-muted-foreground mt-0.5">{(settings.meta_title || "").length}/60 karakter</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Meta Description</label>
                <Textarea value={settings.meta_description || ""} onChange={(e) => updateSetting("meta_description", e.target.value)} rows={3} className="mt-1" />
                <p className="text-[10px] text-muted-foreground mt-0.5">{(settings.meta_description || "").length}/160 karakter</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Meta Keywords</label>
                <Input value={settings.meta_keywords || ""} onChange={(e) => updateSetting("meta_keywords", e.target.value)} className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Canonical URL</label>
                <Input value={settings.canonical_url || ""} onChange={(e) => updateSetting("canonical_url", e.target.value)} className="mt-1" />
              </div>
            </div>

            {/* WhatsApp & Pricing */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border space-y-4">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Settings size={18} /> WhatsApp & Harga
              </h2>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Nomor WhatsApp</label>
                <Input value={settings.whatsapp_number || ""} onChange={(e) => updateSetting("whatsapp_number", e.target.value)} placeholder="6281234567890" className="mt-1" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Pesan WA Default</label>
                <Textarea value={settings.whatsapp_message || ""} onChange={(e) => updateSetting("whatsapp_message", e.target.value)} rows={2} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Harga Transit (Rp)</label>
                  <Input type="number" value={settings.price_transit || ""} onChange={(e) => updateSetting("price_transit", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Harga Harian (Rp)</label>
                  <Input type="number" value={settings.price_daily || ""} onChange={(e) => updateSetting("price_daily", e.target.value)} className="mt-1" />
                </div>
              </div>
            </div>

            <Button onClick={saveSettings} className="w-full gap-2">
              <Save size={16} /> Simpan Semua Pengaturan
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
