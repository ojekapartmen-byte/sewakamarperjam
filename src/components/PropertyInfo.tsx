import { Star, MapPin } from "lucide-react";

const PropertyInfo = () => (
  <section className="px-4 py-4 bg-card">
    <h1 className="text-heading font-extrabold text-foreground">
      Sewa Apartemen Gresik – Unit Gunawangsa
    </h1>
    <div className="flex items-center gap-3 mt-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} className="fill-star text-star" />
        ))}
        <span className="text-sm font-semibold text-muted-foreground ml-1">5.0</span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <MapPin size={14} />
        <span>Kebomas, Gresik</span>
      </div>
    </div>
    <p className="mt-3 text-body text-muted-foreground">
      Sewa apartemen Gunawangsa Gresik langsung dari owner. Unit bersih, nyaman, dan aman untuk transit maupun menginap.
    </p>
  </section>
);

export default PropertyInfo;
