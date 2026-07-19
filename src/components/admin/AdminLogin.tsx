import { useState, type FormEvent } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

export function AdminLogin() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    try {
      await login(email, password);
    } catch {
      // error is set in the hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      {/* background glow */}
      <div className="pointer-events-none fixed left-1/2 top-1/3 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/40 bg-gold/10 font-display text-xl italic text-gold">
            DY
          </div>
          <h1 className="mt-5 font-display text-3xl font-light text-cream">Admin Access</h1>
          <p className="mt-2 text-center text-[13px] text-mute">
            Sign in to manage your portfolio content
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-panel p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
        >
          {error && (
            <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.06] px-4 py-3 text-[13px] text-red-300">
              {error.includes("invalid-credential") ? "Invalid email or password" : error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-ink/60 py-3.5 pl-11 pr-4 text-[14px] text-cream placeholder:text-mute/40 outline-none transition-colors focus:border-gold/50"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-mute/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-ink/60 py-3.5 pl-11 pr-12 text-[14px] text-cream placeholder:text-mute/40 outline-none transition-colors focus:border-gold/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-mute/60 transition-colors hover:text-cream"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-gold py-3.5 text-[14px] font-semibold text-ink transition-all hover:bg-gold2 hover:shadow-[0_0_36px_-8px_rgba(233,162,59,0.6)] disabled:opacity-60"
          >
            {submitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>

          <p className="mt-4 text-center text-[11px] text-mute/60">
            Admin accounts are managed via Firebase Console
          </p>
        </form>
      </div>
    </div>
  );
}
