import { Star, Quote } from "lucide-react";
import { useRef } from "react";

const testimonials = [
  {
    name: "Bapak Aris",
    text: "Unit sangat bersih dan rapi. Sprei wangi, kamar mandi kinclong. Owner fast response, sangat recommended!",
    rating: 5,
  },
  {
    name: "Ibu Siska",
    text: "Sudah 3 kali sewa di sini. Selalu puas dengan kebersihan dan pelayanan. Lokasi strategis dekat pusat kota.",
    rating: 5,
  },
  {
    name: "Mas Doni",
    text: "Transit 3 jam sangat worth it. Kamar nyaman, AC dingin, WiFi kencang. Pasti balik lagi!",
    rating: 5,
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-4">
      <h2 className="text-heading-sm text-foreground mb-3 px-4">Ulasan Tamu</h2>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory">
        {testimonials.map((t) => (
          <div key={t.name} className="bg-card rounded-2xl p-4 shadow-sm border border-border min-w-[280px] snap-start shrink-0">
            <Quote size={20} className="text-accent/30 mb-2" />
            <p className="text-sm text-foreground leading-relaxed">{t.text}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <span className="font-semibold text-sm text-foreground">{t.name}</span>
              <div className="flex gap-0.5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={12} className="fill-star text-star" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
