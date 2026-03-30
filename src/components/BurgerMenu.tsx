import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Building2, BadgeDollarSign, Landmark, Clock, CalendarDays, Camera, CreditCard, MessageCircle, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const menuItems = [
  { label: "Beranda", href: "/", icon: Home },
  { label: "Sewa Apartemen Gresik", href: "/katalog", icon: Building2 },
  { label: "Harga Sewa Apartemen", href: "/harga", icon: BadgeDollarSign },
  { label: "Apartemen Gunawangsa", href: "/tentang", icon: Landmark },
  { label: "Sewa Per Jam", href: "/sewa-per-jam", icon: Clock },
  { label: "Sewa Harian / Bulanan", href: "/sewa-harian", icon: CalendarDays },
  { label: "Tur 3D & Galeri Foto", href: "/galeri", icon: Camera },
  { label: "Cara Booking & Transaksi", href: "/booking", icon: CreditCard },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { settings } = useSiteSettings();
  const waNumber = settings.whatsapp_number || "6281234567890";
  const waMessage = settings.whatsapp_message || "Halo, saya ingin pesan kamar";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  const handleNav = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="text-primary-foreground p-1.5 rounded-lg hover:bg-primary-foreground/10 transition-colors" aria-label="Menu">
          <Menu size={24} />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="p-4 border-b border-border">
          <SheetTitle className="text-left text-base font-bold text-foreground">
            {settings.site_name || "Gunawangsa Gresik"}
          </SheetTitle>
          <p className="text-xs text-muted-foreground text-left">
            {settings.site_tagline || "Sewa Apartemen Transit & Harian"}
          </p>
        </SheetHeader>

        <nav className="py-2">
          {menuItems.map(({ label, href, icon: Icon }) => {
            const active = location.pathname === href;
            return (
              <button
                key={href}
                onClick={() => handleNav(href)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${
                  active
                    ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={18} className={active ? "text-primary" : "text-muted-foreground"} />
                {label}
              </button>
            );
          })}

          {/* WhatsApp CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <MessageCircle size={18} className="text-[hsl(var(--wa-green))]" />
            Hubungi Admin (24 Jam)
          </a>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;
