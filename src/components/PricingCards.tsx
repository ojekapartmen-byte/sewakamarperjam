import { Clock, Sun } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const formatRupiah = (val: string | undefined, fallback: string) => {
  const num = parseInt(val || fallback);
  return `Rp ${num.toLocaleString("id-ID")}`;
};

const PricingCards = () => {
  const { settings } = useSiteSettings();

  return (
    <section className="px-4 py-4" id="pricing">
      <h2 className="text-heading-sm text-foreground mb-3">Pilihan Durasi Sewa</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
          <div className="bg-secondary rounded-xl p-2.5 w-fit mb-3">
            <Clock size={24} className="text-accent" />
          </div>
          <h3 className="font-bold text-foreground text-base">Sewa Transit</h3>
          <p className="text-sm text-muted-foreground mt-1">Per Jam</p>
          <p className="text-heading-sm text-accent mt-2">{formatRupiah(settings.price_transit, "75000")}</p>
          <p className="text-xs text-muted-foreground">/ jam · Tanpa biaya tambahan</p>
        </div>
        <div className="bg-primary rounded-2xl p-4 shadow-sm">
          <div className="bg-primary-foreground/20 rounded-xl p-2.5 w-fit mb-3">
            <Sun size={24} className="text-primary-foreground" />
          </div>
          <h3 className="font-bold text-primary-foreground text-base">Sewa Harian</h3>
          <p className="text-sm text-primary-foreground/70 mt-1">Full Day</p>
          <p className="text-heading-sm text-primary-foreground mt-2">{formatRupiah(settings.price_daily, "300000")}</p>
          <p className="text-xs text-primary-foreground/70">/ malam · All-in</p>
        </div>
      </div>
    </section>
  );
};

export default PricingCards;
