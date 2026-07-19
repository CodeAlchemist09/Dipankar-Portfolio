import { type ReactNode } from "react";
import { Save, Loader2 } from "lucide-react";

/* ─── Section header ─── */
export function AdminSectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-light text-cream">{title}</h1>
      <p className="mt-2 text-[14px] text-mute">{description}</p>
    </div>
  );
}

/* ─── Save button ─── */
export function SaveButton({ saving, onClick, label = "Save Changes" }: { saving: boolean; onClick: () => void; label?: string }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="flex cursor-pointer items-center gap-2 rounded-full bg-gold px-6 py-3 text-[13px] font-semibold text-ink transition-all hover:bg-gold2 hover:shadow-[0_0_36px_-8px_rgba(233,162,59,0.6)] disabled:opacity-60"
    >
      {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
      {saving ? "Saving…" : label}
    </button>
  );
}

/* ─── Card wrapper ─── */
export function AdminCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-panel p-6 ${className ?? ""}`}>
      {children}
    </div>
  );
}

/* ─── Field label ─── */
export function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
      {children}
    </label>
  );
}

/* ─── Input ─── */
export const inputCls =
  "w-full rounded-xl border border-white/10 bg-ink/60 px-4 py-3 text-[13.5px] text-cream placeholder:text-mute/40 outline-none transition-colors focus:border-gold/50";

export const textareaCls = `${inputCls} resize-none`;

/* ─── Status toast ─── */
export function StatusToast({ message, type = "success" }: { message: string; type?: "success" | "error" }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-xl border px-5 py-3 text-[13px] shadow-lg backdrop-blur-md ${
        type === "success"
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          : "border-red-400/30 bg-red-400/10 text-red-300"
      }`}
    >
      {type === "success" ? "✓" : "✕"} {message}
    </div>
  );
}
