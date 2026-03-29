import { MapPin, ExternalLink } from "lucide-react";

const MAPS_URL = "https://maps.google.com/?q=Apartemen+Gunawangsa+Gresik+Jl+Veteran";

const LocationSection = () => (
  <section className="px-4 py-4" id="lokasi">
    <h2 className="text-heading-sm text-foreground mb-3">Lokasi & Alamat</h2>
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
      <iframe
        title="Lokasi Apartemen Gunawangsa Gresik"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1!2d112.65!3d-7.16!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDknMzYuMCJTIDExMsKwMzknMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890"
        width="100%"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="p-4">
        <div className="flex items-start gap-3">
          <MapPin size={20} className="text-accent shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-foreground text-sm">Apartemen Gunawangsa</p>
            <p className="text-sm text-muted-foreground mt-0.5">Jl. Veteran, Kebomas, Gresik, Jawa Timur</p>
          </div>
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-secondary text-secondary-foreground font-semibold text-sm rounded-xl py-2.5 mt-3 w-full"
        >
          Buka di Google Maps <ExternalLink size={14} />
        </a>
      </div>
    </div>
  </section>
);

export default LocationSection;
