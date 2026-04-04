import SeoMeta from "@/components/SeoMeta";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Clock, CheckCircle } from "lucide-react";

const SewaPerJamPage = () => {
  const { settings } = useSiteSettings();
  const price = settings.price_transit || "75000";
  const fmt = (n: string) => new Intl.NumberFormat("id-ID").format(parseInt(n) || 0);

  return (
    <>
      <SeoMeta
        title="Sewa Apartemen Per Jam Gresik – Transit Gunawangsa"
        description="Sewa apartemen transit per jam di Gunawangsa Gresik. Cocok untuk istirahat singkat, meeting, atau perjalanan bisnis."
        path="/sewa-per-jam"
      />
      <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold text-foreground mb-1">Sewa Per Jam (Transit)</h1>
          <p className="text-sm text-muted-foreground mb-6">Solusi istirahat cepat dengan fasilitas lengkap</p>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl"><Clock size={24} className="text-primary" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">Rp {fmt(price)}</p>
                <p className="text-xs text-muted-foreground">per sesi transit (3 jam)</p>
              </div>
            </div>
            <div className="space-y-2">
              {["AC, WiFi, Smart TV Netflix", "Kamar mandi bersih & handuk", "Check-in langsung oleh admin", "Cocok untuk istirahat & meeting", "Bisa perpanjang jam"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FloatingCTA />
      <BottomNav />
    </>
  );
};

export default SewaPerJamPage;
