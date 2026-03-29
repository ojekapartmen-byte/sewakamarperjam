import { Rotate3d } from "lucide-react";

const VirtualTour = () => (
  <section className="px-4 py-4">
    <h2 className="text-heading-sm text-foreground mb-3">Lihat Unit Secara Nyata</h2>
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="aspect-video bg-muted flex flex-col items-center justify-center gap-3 p-6">
        <div className="bg-secondary rounded-full p-4">
          <Rotate3d size={40} className="text-accent" />
        </div>
        <p className="text-foreground font-semibold text-center">Virtual Tour 360°</p>
        <p className="text-sm text-muted-foreground text-center">Klik untuk melihat unit secara interaktif</p>
        <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-sm mt-1">
          Mulai Virtual Tour
        </button>
      </div>
    </div>
  </section>
);

export default VirtualTour;
