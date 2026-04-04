import SeoMeta from "@/components/SeoMeta";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";

import HeroSlider from "@/components/HeroSlider";

const GaleriPage = () => (
  <>
      <SeoMeta
        title="Tur 3D & Galeri Foto Apartemen Gunawangsa Gresik"
        description="Lihat tur virtual 3D dan galeri foto apartemen Gunawangsa Gresik. Bukti langsung unit bersih, nyaman, dan siap huni."
        path="/galeri"
      />
    <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
      <AppHeader />
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-foreground mb-1">Tur 3D & Galeri Foto</h1>
        <p className="text-sm text-muted-foreground mb-4">Lihat langsung kondisi unit sebelum booking</p>
      </div>
      <HeroSlider />
      
    </div>
    <FloatingCTA />
    <BottomNav />
  </>
);

export default GaleriPage;
