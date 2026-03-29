import { MessageCircle } from "lucide-react";

const WA_URL = "https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20pesan%20kamar%20apartemen%20Gunawangsa%20Gresik";

const FloatingCTA = () => (
  <a
    href={WA_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 left-4 right-4 z-40 max-w-lg mx-auto bg-wa hover:bg-wa-hover text-primary-foreground font-bold text-base rounded-2xl py-4 flex items-center justify-center gap-2.5 shadow-lg transition-colors"
  >
    <MessageCircle size={22} />
    Pesan Kamar Sekarang
  </a>
);

export default FloatingCTA;
