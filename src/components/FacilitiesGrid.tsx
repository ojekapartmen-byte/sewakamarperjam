import { Bed, Tv, Wind, Droplets, UtensilsCrossed, Wifi } from "lucide-react";

const facilities = [
  { icon: Bed, label: "Kasur Queen" },
  { icon: Tv, label: "Smart TV Netflix" },
  { icon: Wind, label: "AC Sejuk" },
  { icon: Droplets, label: "Water Heater" },
  { icon: UtensilsCrossed, label: "Dapur Mini" },
  { icon: Wifi, label: "WiFi Cepat" },
];

const FacilitiesGrid = () => (
  <section className="px-4 py-4" id="fasilitas">
    <h2 className="text-heading-sm text-foreground mb-3">Fasilitas Lengkap</h2>
    <div className="grid grid-cols-3 gap-3">
      {facilities.map(({ icon: Icon, label }) => (
        <div key={label} className="bg-card rounded-2xl p-4 flex flex-col items-center gap-2 shadow-sm border border-border">
          <div className="bg-secondary rounded-xl p-3">
            <Icon size={24} className="text-accent" />
          </div>
          <span className="text-sm font-semibold text-foreground text-center">{label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default FacilitiesGrid;
