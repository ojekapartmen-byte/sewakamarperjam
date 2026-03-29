import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { ArrowLeft } from "lucide-react";

const articles: Record<string, { title: string; date: string; content: string }> = {
  "tips-sewa-apartemen-gresik": {
    title: "5 Tips Sewa Apartemen di Gresik untuk Pemula",
    date: "25 Mar 2026",
    content: `
      <h2>1. Pilih Lokasi Strategis</h2>
      <p>Pastikan apartemen yang Anda sewa berada di lokasi yang mudah dijangkau, dekat dengan pusat kota, dan akses transportasi umum. Apartemen Gunawangsa di Jl. Veteran, Kebomas adalah salah satu pilihan terbaik.</p>
      
      <h2>2. Cek Kebersihan Unit</h2>
      <p>Kebersihan adalah prioritas utama. Pastikan sprei, handuk, dan kamar mandi dalam kondisi bersih. Di Gunawangsa, setiap unit dibersihkan secara menyeluruh sebelum tamu check-in.</p>
      
      <h2>3. Pastikan Fasilitas Lengkap</h2>
      <p>Periksa ketersediaan AC, WiFi, TV, water heater, dan dapur mini. Fasilitas lengkap membuat pengalaman menginap lebih nyaman.</p>
      
      <h2>4. Hubungi Langsung Owner</h2>
      <p>Sewa langsung dari owner memberikan harga lebih transparan tanpa biaya tambahan dari pihak ketiga.</p>
      
      <h2>5. Baca Ulasan Tamu Sebelumnya</h2>
      <p>Ulasan dari tamu sebelumnya memberikan gambaran nyata tentang kualitas unit dan pelayanan pemilik apartemen.</p>
    `,
  },
  "keunggulan-apartemen-gunawangsa": {
    title: "Keunggulan Sewa Apartemen Gunawangsa Gresik",
    date: "20 Mar 2026",
    content: `
      <h2>Dikelola Langsung oleh Owner</h2>
      <p>Apartemen Gunawangsa Gresik dikelola langsung oleh owner dengan admin yang standby di lokasi. Ini menjamin respon cepat dan pelayanan terbaik untuk setiap tamu.</p>
      
      <h2>Kebersihan Terjamin</h2>
      <p>Setiap unit disiapkan dengan standar hotel: sprei putih bersih, kamar mandi steril, dan perlengkapan mandi lengkap.</p>
      
      <h2>Harga Transparan</h2>
      <p>Tidak ada biaya tersembunyi. Harga yang tertera sudah termasuk semua fasilitas: WiFi, AC, Smart TV dengan Netflix, dan water heater.</p>
      
      <h2>Keamanan 24 Jam</h2>
      <p>Gedung dilengkapi CCTV dan security 24 jam. Check-in melalui resepsionis resmi di lobby untuk keamanan dan privasi tamu.</p>
    `,
  },
  "tempat-wisata-dekat-apartemen-gresik": {
    title: "Tempat Wisata Dekat Apartemen Gunawangsa Gresik",
    date: "15 Mar 2026",
    content: `
      <h2>Makam Sunan Giri</h2>
      <p>Salah satu situs bersejarah paling terkenal di Gresik, berjarak sekitar 15 menit dari Apartemen Gunawangsa. Tempat ziarah yang ramai dikunjungi wisatawan.</p>
      
      <h2>Pantai Dalegan</h2>
      <p>Pantai pasir putih yang indah di Panceng, Gresik. Cocok untuk piknik keluarga di akhir pekan.</p>
      
      <h2>Alun-Alun Gresik</h2>
      <p>Pusat kota Gresik dengan berbagai kuliner khas dan suasana malam yang ramai. Berjarak hanya 10 menit dari apartemen.</p>
      
      <h2>Wisata Religi Sunan Maulana Malik Ibrahim</h2>
      <p>Makam Sunan Maulana Malik Ibrahim yang menjadi salah satu destinasi wisata religi utama di Jawa Timur.</p>
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : undefined;

  if (!article) {
    return (
      <div className="max-w-lg mx-auto bg-background min-h-screen pb-24">
        <AppHeader />
        <div className="px-4 py-10 text-center">
          <p className="text-muted-foreground">Artikel tidak ditemukan.</p>
          <Link to="/blog" className="text-accent font-semibold mt-3 inline-block">Kembali ke Blog</Link>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Sewa Apartemen Gunawangsa Gresik</title>
        <meta name="description" content={article.title} />
      </Helmet>

      <div className="max-w-lg mx-auto bg-background min-h-screen pb-24">
        <AppHeader />
        <div className="px-4 py-4">
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-accent font-semibold mb-4">
            <ArrowLeft size={16} /> Kembali ke Blog
          </Link>
          <p className="text-xs text-muted-foreground">{article.date}</p>
          <h1 className="text-heading text-foreground mt-1">{article.title}</h1>
          <article
            className="mt-4 prose prose-sm max-w-none [&_h2]:text-heading-sm [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-2 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-3"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default BlogPost;
