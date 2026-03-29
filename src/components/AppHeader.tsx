import { Building2 } from "lucide-react";

const AppHeader = () => (
  <header className="sticky top-0 z-50 bg-primary px-4 py-3 flex items-center justify-between shadow-md">
    <div className="flex items-center gap-2">
      <Building2 className="text-primary-foreground" size={28} />
      <span className="text-primary-foreground font-bold text-lg">Gunawangsa</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-online animate-pulse" />
      <span className="text-primary-foreground text-sm font-medium">Online 24 Jam</span>
    </div>
  </header>
);

export default AppHeader;
