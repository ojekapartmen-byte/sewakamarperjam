import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);

    if (error) {
      toast({ title: "Login gagal", description: "Email atau password salah.", variant: "destructive" });
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground mb-6 hover:text-foreground transition-colors">
          <ArrowLeft size={16} /> Kembali ke Beranda
        </button>

        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-primary rounded-xl p-2.5">
              <Lock size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Login Admin</h1>
              <p className="text-xs text-muted-foreground">Kelola ketersediaan kamar</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
