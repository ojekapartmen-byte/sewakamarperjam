import { Home, Sparkles, MapPin, MessageCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const BottomNav = () => {
  const { settings } = useSiteSettings();
  const waNumber = settings.whatsapp_number || "6281234567890";
  const waMessage = settings.whatsapp_message || "Halo, saya ingin pesan kamar apartemen Gunawangsa Gresik";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  const navItems = [
    { icon: Home, label: "Beranda", href: "#" },
    { icon: Sparkles, label: "Fasilitas", href: "#fasilitas" },
    { icon: MapPin, label: "Lokasi", href: "#lokasi" },
    { icon: MessageCircle, label: "Chat WA", href: waUrl, external: true },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-muted-foreground hover:text-accent transition-colors min-w-[60px]"
          >
            <Icon size={22} />
            <span className="text-xs font-medium">{label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
