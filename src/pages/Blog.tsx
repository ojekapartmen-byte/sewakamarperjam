import AppHeader from "../components/ui/AppHeader"; // Sesuaikan jika path header Anda berbeda
import BlogList from "../components/BlogList";
import BottomNav from "../components/BottomNav";

const Blog = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <AppHeader />
      <main className="pt-20">
        <BlogList />
      </main>
      <BottomNav />
    </div>
  );
};

export default Blog;
