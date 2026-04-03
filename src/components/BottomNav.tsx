import { Home, Sparkles, MapPin, FileText } from "lucide-react";

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: "Beranda", href: "/" },
    { icon: Sparkles, label: "Fasilitas", href: "/#fasilitas" },
    { icon: MapPin, label: "Lokasi", href: "/#lokasi" },
    { icon: FileText, label: "Blog", href: "/blog" }, // Ini tombol Blog yang baru
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.06)] pb-safe">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, href }) => (
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
