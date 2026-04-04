import SeoMeta from "@/components/SeoMeta";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import FloatingCTA from "@/components/FloatingCTA";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { MessageCircle, CreditCard, ShieldCheck, CheckCircle } from "lucide-react";

const BookingPage = () => {
  const { settings } = useSiteSettings();
  const waNumber = settings.whatsapp_number || "6281234567890";
  const waMessage = settings.whatsapp_message || "Halo, saya ingin booking kamar";
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  const steps = [
    { num: "1", title: "Hubungi Admin via WhatsApp", desc: "Chat admin 24 jam untuk cek ketersediaan unit dan tanggal yang diinginkan." },
    { num: "2", title: "Konfirmasi & DP", desc: "Setelah unit dipilih, lakukan DP via Transfer/Cash untuk konfirmasi booking." },
    { num: "3", title: "Check-in Resmi", desc: "Admin akan menyambut dan mendampingi proses check-in langsung di unit." },
    { num: "4", title: "Check-out", desc: "Selesaikan pembayaran sisa (jika ada) dan serahkan kunci ke admin." },
  ];

  return (
    <>
      <Helmet>
        <title>Cara Booking Apartemen Gunawangsa Gresik – Prosedur & Pembayaran</title>
        <meta name="description" content="Panduan lengkap cara booking apartemen Gunawangsa Gresik. Prosedur DP, metode pembayaran, dan sistem check-in yang aman." />
      </Helmet>
      <div className="max-w-lg mx-auto bg-background min-h-screen pb-36">
        <AppHeader />
        <div className="px-4 py-6">
          <h1 className="text-xl font-bold text-foreground mb-1">Cara Booking & Transaksi</h1>
          <p className="text-sm text-muted-foreground mb-6">Prosedur mudah, aman, dan transparan</p>

          <div className="space-y-3 mb-6">
            {steps.map((s) => (
              <div key={s.num} className="bg-card rounded-2xl p-4 border border-border flex gap-3">
                <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                  {s.num}
                </div>
                <div>
                  <h2 className="font-bold text-foreground text-sm">{s.title}</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border mb-4">
            <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
              <CreditCard size={18} /> Metode Pembayaran
            </h2>
            <div className="space-y-2">
              {["Transfer Bank (BCA, BRI, Mandiri)", "Cash langsung di lokasi", "DP minimal 50% untuk konfirmasi"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-4 border border-border mb-4">
            <h2 className="font-bold text-foreground mb-2 flex items-center gap-2">
              <ShieldCheck size={18} /> Jaminan Keamanan
            </h2>
            <p className="text-sm text-muted-foreground">
              Seluruh transaksi dan check-in dikelola langsung oleh owner. Tidak melalui pihak ketiga, 
              sehingga Anda mendapat harga terbaik dan pelayanan terpercaya.
            </p>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[hsl(var(--wa-green))] hover:bg-[hsl(var(--wa-green-hover))] text-white font-bold py-3 px-6 rounded-2xl transition-colors w-full"
          >
            <MessageCircle size={20} />
            Booking Sekarang via WhatsApp
          </a>
        </div>
      </div>
      <FloatingCTA />
      <BottomNav />
    </>
  );
};

export default BookingPage;
