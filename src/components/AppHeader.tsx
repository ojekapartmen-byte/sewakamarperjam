import { Building2, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AppHeader = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-primary px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2">
        <Building2 className="text-primary-foreground" size={28} />
        <span className="text-primary-foreground font-bold text-lg">Gunawangsa</span>
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
          <Button
            size="sm"
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/10 h-8 gap-1"
            onClick={() => navigate("/auth")}
          >
            <LogIn size={16} /> Masuk
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
