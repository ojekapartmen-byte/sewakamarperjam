import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bedroomImg from "@/assets/apartment-bedroom.jpg";
import bathroomImg from "@/assets/apartment-bathroom.jpg";
import kitchenImg from "@/assets/apartment-kitchen.jpg";
import exteriorImg from "@/assets/apartment-exterior.jpg";

const slides = [
  { src: bedroomImg, alt: "Kamar tidur apartemen bersih dengan kasur queen size" },
  { src: bathroomImg, alt: "Kamar mandi bersih apartemen Gunawangsa" },
  { src: kitchenImg, alt: "Dapur mini dan ruang tamu apartemen" },
  { src: exteriorImg, alt: "Tampak luar gedung apartemen Gunawangsa Gresik" },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  return (
    <section className="relative w-full aspect-[4/3] max-h-[420px] overflow-hidden bg-muted">
      {slides.map((slide, i) => (
        <img
          key={i}
          src={slide.src}
          alt={slide.alt}
          width={512}
          height={384}
          loading={i === 0 ? "eager" : "lazy"}
          {...(i === 0 ? { fetchPriority: "high" as const } : {})}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === current ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      
      {/* Owner badge */}
      <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-semibold">
        Dikelola Langsung oleh Owner
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg" aria-label="Sebelumnya">
        <ChevronLeft size={20} className="text-foreground" />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-2 shadow-lg" aria-label="Selanjutnya">
        <ChevronRight size={20} className="text-foreground" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${i === current ? "w-6 bg-primary-foreground" : "w-2 bg-primary-foreground/50"}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
