import { MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const FloatingCTA = () => {
  const { settings } = useSiteSettings();
  const waNumber = settings.whatsapp_number || "6281234567890";
  const waMessage = settings.whatsapp_message || "Halo, saya ingin pesan kamar apartemen Gunawangsa Gresik";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 left-4 right-4 z-40 max-w-lg mx-auto bg-wa hover:bg-wa-hover text-primary-foreground font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2.5 shadow-lg transition-colors"
    >
      <MessageCircle size={22} />
      Pesan Kamar Sekarang
    </a>
  );
};

export default FloatingCTA;
