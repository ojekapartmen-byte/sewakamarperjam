import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { ChevronRight } from "lucide-react";

const posts = [
  {
    slug: "tips-sewa-apartemen-gresik",
    title: "5 Tips Sewa Apartemen di Gresik untuk Pemula",
    excerpt: "Panduan lengkap memilih apartemen sewa di Gresik, mulai dari lokasi strategis hingga fasilitas yang wajib ada.",
    date: "25 Mar 2026",
  },
  {
    slug: "keunggulan-apartemen-gunawangsa",
    title: "Keunggulan Sewa Apartemen Gunawangsa Gresik",
    excerpt: "Mengapa Gunawangsa menjadi pilihan utama untuk sewa apartemen transit dan harian di Gresik.",
    date: "20 Mar 2026",
  },
  {
    slug: "tempat-wisata-dekat-apartemen-gresik",
    title: "Tempat Wisata Dekat Apartemen Gunawangsa Gresik",
    excerpt: "Rekomendasi destinasi wisata yang bisa Anda kunjungi saat menginap di apartemen Gunawangsa.",
    date: "15 Mar 2026",
  },
];

const BlogList = () => (
  <>
    <Helmet>
      <title>Blog Sewa Apartemen Gresik | Tips & Info Gunawangsa</title>
      <meta name="description" content="Baca tips sewa apartemen Gresik, info fasilitas Gunawangsa, dan panduan wisata dekat apartemen." />
    </Helmet>

    <div className="max-w-lg mx-auto bg-background min-h-screen pb-24">
      <AppHeader />
      <div className="px-4 py-5">
        <h1 className="text-heading text-foreground">Blog & Info</h1>
        <p className="text-sm text-muted-foreground mt-1">Tips sewa apartemen Gresik dan info terkini</p>

        <div className="flex flex-col gap-3 mt-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-3 group"
            >
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{post.date}</p>
                <h2 className="font-bold text-foreground text-base mt-1 group-hover:text-accent transition-colors">{post.title}</h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
    <BottomNav />
  </>
);

export default BlogList;
