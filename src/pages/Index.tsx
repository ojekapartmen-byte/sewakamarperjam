import SeoMeta from "@/components/SeoMeta";
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

const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": settings.site_name || "Sewa Apartemen Gunawangsa Gresik",
    "description": settings.meta_description || "Sewa apartemen Gunawangsa Gresik langsung dari owner. Transit per jam & harian murah.",
    "url": "https://www.sewakamarperjamgresik.org",
    "image": "https://storage.googleapis.com/gpt-engineer-file-uploads/dg7f8ZXRm0deGNbI2zQiFlKoeEB3/social-images/social-1774826632651-WhatsApp_Image_2026-03-24_at_13.41.15_(1).webp",
    "telephone": settings.whatsapp_number || "+6281234567890",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Apartemen Gunawangsa MERR",
      "addressLocality": "Gresik",
      "addressRegion": "Jawa Timur",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.2756,
      "longitude": 112.7508
    },
    "priceRange": "Rp 75.000 - Rp 350.000",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  return (
    <>
      <SeoMeta
        title={settings.meta_title || "Sewa Apartemen Gresik – Unit Gunawangsa | Transit & Harian"}
        description={settings.meta_description || "Sewa apartemen Gunawangsa Gresik langsung dari owner."}
        path="/"
        jsonLd={localBusinessJsonLd}
      />

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
