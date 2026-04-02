import { Calendar, ChevronRight } from "lucide-react";

// Data artikel contoh (bisa diganti dengan data asli nanti)
const blogPosts = [
  {
    id: 1,
    title: "5 Tips Memilih Apartemen untuk Staycation yang Nyaman",
    excerpt: "Ketahui hal-hal penting sebelum menyewa apartemen agar liburan dan waktu istirahatmu semakin maksimal.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&h=300&fit=crop",
    date: "3 Apr 2026",
  },
  {
    id: 2,
    title: "Keuntungan Sewa Kamar Per Jam di Gunawangsa",
    excerpt: "Fleksibilitas waktu dan harga yang lebih terjangkau menjadi alasan utama kenapa opsi ini sangat diminati.",
    image: "https://images.unsplash.com/photo-1502672260266-1c1e52f15950?w=500&h=300&fit=crop",
    date: "1 Apr 2026",
  }
];

const BlogList = () => {
  return (
    <section className="px-4 py-6 mb-24"> {/* mb-24 agar tidak tertutup menu navigasi bawah */}
      <h2 className="text-2xl font-bold text-foreground mb-4">Artikel & Tips</h2>
      <div className="flex flex-col gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center text-muted-foreground text-xs mb-2">
                  <Calendar size={14} className="mr-1" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">{post.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </div>
              <button className="text-primary text-sm font-semibold flex items-center mt-4 w-fit">
                Baca selengkapnya <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
