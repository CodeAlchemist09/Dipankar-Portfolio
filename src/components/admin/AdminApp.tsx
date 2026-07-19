import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { AdminLogin } from "./AdminLogin";
import { AdminLayout } from "./AdminLayout";

export function AdminApp() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute">Loading…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />} />
    </Routes>
  );
}
