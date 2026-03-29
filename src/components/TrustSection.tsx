import { ShieldCheck } from "lucide-react";

const TrustSection = () => (
  <section className="px-4 py-4">
    <div className="bg-primary rounded-2xl p-5 flex items-start gap-4">
      <div className="bg-primary-foreground/20 rounded-xl p-3 shrink-0">
        <ShieldCheck size={28} className="text-primary-foreground" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-primary-foreground">Privasi Terjamin & Keamanan 24 Jam</h2>
        <p className="text-sm text-primary-foreground/80 mt-1.5 leading-relaxed">
          Proses check-in resmi melalui Admin di Lobby. Keamanan gedung aktif 24 jam dengan CCTV di area publik.
        </p>
      </div>
    </div>
  </section>
);

export default TrustSection;
