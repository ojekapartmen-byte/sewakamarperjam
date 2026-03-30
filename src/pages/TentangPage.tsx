import { Helmet } from "react-helmet-async";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import FacilitiesGrid from "@/components/FacilitiesGrid";
import LocationSection from "@/components/LocationSection";

const TentangPage = () => (
  <>
    <Helmet>
      <title>Apartemen Gunawangsa Gresik – Fasilitas & Lokasi Strategis</title>
      <meta name="description" content="Info lengkap Apartemen Gunawangsa Gresik: fasilitas, aksesibilitas dekat tol & pusat industri, dan lingkungan sekitar." />
    </Helmet>
    <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
      <AppHeader />
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-foreground mb-1">Apartemen Gunawangsa</h1>
        <p className="text-sm text-muted-foreground mb-6">Detail gedung, fasilitas, dan aksesibilitas lokasi</p>
      </div>
      <div className="px-4 space-y-4 mb-6">
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-2">Tentang Gunawangsa Gresik</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Apartemen Gunawangsa berlokasi strategis di Gresik, dekat dengan akses tol dan pusat industri.
            Cocok untuk pekerja, keluarga, maupun pelancong yang membutuhkan hunian nyaman dengan harga terjangkau.
            Dikelola langsung oleh owner untuk menjamin kebersihan dan kenyamanan setiap unit.
          </p>
        </div>
        <div className="bg-card rounded-2xl p-4 border border-border">
          <h2 className="font-bold text-foreground mb-2">Aksesibilitas</h2>
          <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>5 menit dari Gerbang Tol Kebomas</li>
            <li>Dekat kawasan industri Maspion & JIIPE</li>
            <li>Akses mudah ke pusat kota Gresik</li>
            <li>Minimarket & tempat makan dalam radius 500m</li>
          </ul>
        </div>
      </div>
      <FacilitiesGrid />
      <LocationSection />
    </div>
    <FloatingCTA />
    <BottomNav />
  </>
);

export default TentangPage;
