import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthPage = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (mode === "login") {
      const { error } = await signIn(email, password);
      setSubmitting(false);
      if (error) {
        toast({ title: "Login gagal", description: "Email atau password salah.", variant: "destructive" });
      } else {
        toast({ title: "Berhasil masuk!" });
        navigate("/");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      setSubmitting(false);
      if (error) {
        toast({ title: "Registrasi gagal", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Akun dibuat!", description: "Silakan cek email untuk verifikasi." });
        navigate("/");
      }
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
              {mode === "login" ? <LogIn size={20} className="text-primary-foreground" /> : <UserPlus size={20} className="text-primary-foreground" />}
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{mode === "login" ? "Masuk" : "Daftar Akun"}</h1>
              <p className="text-xs text-muted-foreground">{mode === "login" ? "Login ke akun Anda" : "Buat akun baru"}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@contoh.com" required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-semibold text-foreground">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} className="mt-1" />
            </div>
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Memproses..." : mode === "login" ? "Masuk" : "Daftar"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {mode === "login" ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="text-accent font-semibold hover:underline">
              {mode === "login" ? "Daftar" : "Masuk"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
