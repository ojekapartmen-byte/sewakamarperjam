import { useEffect, useState } from "react";
import SeoMeta from "@/components/SeoMeta";
import { Link } from "react-router-dom";
import AppHeader from "@/components/AppHeader";
import BottomNav from "@/components/BottomNav";
import { ChevronRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  published_at: string | null;
}

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, image_url, published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Helmet>
        <title>Blog Sewa Apartemen Gresik | Tips & Info Gunawangsa</title>
        <meta name="description" content="Baca tips sewa apartemen Gresik, info fasilitas Gunawangsa, dan panduan wisata dekat apartemen." />
      </Helmet>

      <div className="max-w-lg mx-auto bg-background min-h-screen pb-24">
        <AppHeader />
        <div className="px-4 py-5">
          <h1 className="text-xl font-bold text-foreground">Blog & Info</h1>
          <p className="text-sm text-muted-foreground mt-1">Tips sewa apartemen Gresik dan info terkini</p>

          <div className="flex flex-col gap-3 mt-5">
            {loading
              ? [1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl border border-border h-24 animate-pulse" />
                ))
              : posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-3 group"
                  >
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(post.published_at)}
                      </p>
                      <h2 className="font-bold text-foreground text-base mt-1 group-hover:text-primary transition-colors">{post.title}</h2>
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
};

export default BlogList;
