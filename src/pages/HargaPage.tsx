import SeoMeta from "@/components/SeoMeta";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import PricingCards from "@/components/PricingCards";

const HargaPage = () => (
  <>
    <Helmet>
      <title>Harga Sewa Apartemen Gunawangsa Gresik – Transit & Harian</title>
      <meta name="description" content="Cek harga sewa apartemen Gunawangsa Gresik terbaru. Tarif transparan untuk sewa transit per jam dan harian." />
    </Helmet>
    <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
      <AppHeader />
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-foreground mb-1">Harga Sewa Apartemen</h1>
        <p className="text-sm text-muted-foreground mb-6">Tarif transparan langsung dari owner, tanpa biaya tersembunyi</p>
      </div>
      <PricingCards />
      <div className="px-4 py-6 space-y-4">
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-2">Ketentuan Harga</h2>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>Harga sudah termasuk AC, WiFi, dan Smart TV</li>
            <li>Check-in & check-out dibantu oleh admin</li>
            <li>DP diperlukan untuk konfirmasi booking</li>
            <li>Pembayaran via Cash atau Transfer</li>
          </ul>
        </div>
      </div>
    </div>
    <FloatingCTA />
    <BottomNav />
  </>
);

export default HargaPage;
