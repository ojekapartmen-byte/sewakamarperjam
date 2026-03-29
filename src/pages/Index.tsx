import { Helmet } from "react-helmet-async";
import AppHeader from "@/components/AppHeader";
import HeroSlider from "@/components/HeroSlider";
import PropertyInfo from "@/components/PropertyInfo";
import PricingCards from "@/components/PricingCards";
import VirtualTour from "@/components/VirtualTour";
import FacilitiesGrid from "@/components/FacilitiesGrid";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import LocationSection from "@/components/LocationSection";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => (
  <>
    <Helmet>
      <title>Sewa Apartemen Gresik – Unit Gunawangsa | Transit & Harian</title>
      <meta name="description" content="Sewa apartemen Gunawangsa Gresik langsung dari owner. Unit bersih, AC, WiFi, Smart TV Netflix. Tersedia sewa transit per jam & harian. Check-in resmi via admin." />
      <meta name="keywords" content="sewa apartemen gresik, sewa apartemen gunawangsa gresik, apartemen transit gresik, sewa harian gresik" />
      <link rel="canonical" href="https://gunawangsagresik.com" />
    </Helmet>

    <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
      <AppHeader />
      <HeroSlider />
      <PropertyInfo />
      <PricingCards />
      <VirtualTour />
      <FacilitiesGrid />
      <TrustSection />
      <Testimonials />
      <LocationSection />
      
      {/* SEO footer */}
      <footer className="px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 Sewa Apartemen Gunawangsa Gresik. Dikelola langsung oleh owner.
        </p>
      </footer>
    </div>

    <FloatingCTA />
    <BottomNav />
  </>
);

export default Index;
