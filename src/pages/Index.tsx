import { Helmet } from "react-helmet-async";
import AppHeader from "@/components/AppHeader";
import HeroSlider from "@/components/HeroSlider";
import PropertyInfo from "@/components/PropertyInfo";
import PricingCards from "@/components/PricingCards";
import LatestArticles from "@/components/LatestArticles";

import FacilitiesGrid from "@/components/FacilitiesGrid";
import TrustSection from "@/components/TrustSection";
import Testimonials from "@/components/Testimonials";
import LocationSection from "@/components/LocationSection";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Index = () => {
  const { settings } = useSiteSettings();

  return (
    <>
      <Helmet>
        <title>{settings.meta_title || "Sewa Apartemen Gresik – Unit Gunawangsa | Transit & Harian"}</title>
        <meta name="description" content={settings.meta_description || "Sewa apartemen Gunawangsa Gresik langsung dari owner."} />
        <meta name="keywords" content={settings.meta_keywords || "sewa apartemen gresik"} />
        <link rel="canonical" href={settings.canonical_url || "https://sewakamarperjam.lovable.app"} />
      </Helmet>

      <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
        <AppHeader />
        <HeroSlider />
        <PropertyInfo />
        <PricingCards />
        
        <FacilitiesGrid />
        <TrustSection />
        <Testimonials />
        <LatestArticles />
        <LocationSection />

        <footer className="px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 {settings.site_name || "Sewa Apartemen Gunawangsa Gresik"}. Dikelola langsung oleh owner.
          </p>
        </footer>
      </div>

      <FloatingCTA />
      <BottomNav />
    </>
  );
};

export default Index;
