import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { Tables } from "@/integrations/supabase/types";

type Room = Tables<"rooms">;

const KatalogPage = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { settings } = useSiteSettings();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("rooms").select("*").order("name");
      setRooms(data || []);
    };
    fetch();
    const channel = supabase.channel("rooms_katalog").on("postgres_changes", { event: "*", schema: "public", table: "rooms" }, () => fetch()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fmt = (n: number) => new Intl.NumberFormat("id-ID").format(n);

  return (
    <>
      <Helmet>
        <title>Sewa Apartemen Gresik – Katalog Unit Gunawangsa</title>
        <meta name="description" content="Lihat semua unit apartemen Gunawangsa Gresik yang tersedia untuk disewa. Cek ketersediaan dan harga terbaru." />
      </Helmet>
      <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold text-foreground mb-1">Sewa Apartemen Gresik</h1>
          <p className="text-sm text-muted-foreground mb-6">Katalog unit Gunawangsa yang tersedia saat ini</p>

          {rooms.length === 0 ? (
            <div className="bg-card rounded-2xl p-8 text-center border border-border">
              <p className="text-muted-foreground">Belum ada unit tersedia.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rooms.map((room) => (
                <div key={room.id} className="bg-card rounded-2xl p-4 border border-border shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-foreground">{room.name}</h2>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${room.is_available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {room.is_available ? "Tersedia" : "Terisi"}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>Transit: <strong className="text-foreground">Rp {fmt(room.price_transit)}</strong></span>
                    <span>Harian: <strong className="text-foreground">Rp {fmt(room.price_daily)}</strong></span>
                  </div>
                  {room.notes && <p className="text-xs text-muted-foreground mt-2">{room.notes}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <FloatingCTA />
      <BottomNav />
    </>
  );
};

export default KatalogPage;
