import SeoMeta from "@/components/SeoMeta";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { CalendarDays, CheckCircle } from "lucide-react";

const SewaHarianPage = () => {
  const { settings } = useSiteSettings();
  const price = settings.price_daily || "300000";
  const fmt = (n: string) => new Intl.NumberFormat("id-ID").format(parseInt(n) || 0);

  return (
    <>
      <Helmet>
        <title>Sewa Apartemen Harian & Bulanan Gresik – Gunawangsa</title>
        <meta name="description" content="Sewa apartemen harian dan bulanan di Gunawangsa Gresik. Hunian nyaman untuk jangka panjang dengan harga terjangkau." />
      </Helmet>
      <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold text-foreground mb-1">Sewa Harian / Bulanan</h1>
          <p className="text-sm text-muted-foreground mb-6">Hunian nyaman untuk menginap atau tinggal jangka panjang</p>

          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-3 rounded-xl"><CalendarDays size={24} className="text-primary" /></div>
              <div>
                <p className="text-2xl font-bold text-foreground">Rp {fmt(price)}</p>
                <p className="text-xs text-muted-foreground">per malam (full day)</p>
              </div>
            </div>
            <div className="space-y-2">
              {["Full 24 jam menginap", "AC, WiFi, Smart TV Netflix", "Dapur kecil & peralatan masak", "Kamar mandi bersih & handuk", "Diskon untuk sewa bulanan", "Cocok untuk keluarga & pekerja"].map((item) => (
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

export default SewaHarianPage;
