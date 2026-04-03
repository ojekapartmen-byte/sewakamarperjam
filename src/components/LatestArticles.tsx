import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Newspaper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  published_at: string | null;
}

const LatestArticles = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-6">
        <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
          <Newspaper size={20} className="text-primary" /> Artikel Terbaru
        </h2>
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="bg-card rounded-2xl border border-border h-28 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Newspaper size={20} className="text-primary" /> Artikel Terbaru
        </h2>
        <Link to="/blog" className="text-sm text-primary font-medium flex items-center gap-0.5">
          Semua <ChevronRight size={16} />
        </Link>
      </div>
      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex group"
          >
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-28 h-28 object-cover shrink-0"
                loading="lazy"
              />
            )}
            <div className="p-3 flex flex-col justify-center flex-1 min-w-0">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={12} /> {formatDate(post.published_at)}
              </p>
              <h3 className="font-semibold text-sm text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
