import { LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import BurgerMenu from "@/components/BurgerMenu";

const AppHeader = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { settings } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-primary px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <BurgerMenu />
        <div className="flex flex-col">
          <span className="text-primary-foreground font-bold text-base leading-tight">
            {settings.site_name || "Gunawangsa Gresik"}
          </span>
          <span className="text-primary-foreground/70 text-[10px] leading-tight">
            {settings.site_tagline || "Sewa Apartemen Transit & Harian"}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {loading ? null : user ? (
          <div className="flex items-center gap-2">
            <span className="text-primary-foreground text-xs truncate max-w-[100px] flex items-center gap-1">
              <User size={14} /> {user.email?.split("@")[0]}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 h-8 px-2"
              onClick={() => { signOut(); }}
            >
              <LogOut size={16} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 h-8 gap-1"
              onClick={() => navigate("/auth")}
            >
              <LogIn size={16} /> Masuk
            </Button>
            <Button
              size="sm"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-8 gap-1"
              onClick={() => navigate("/auth?mode=signup")}
            >
              <UserPlus size={16} /> Daftar
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
