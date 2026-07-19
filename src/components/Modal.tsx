import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../utils/cn";

export function Modal({
  open,
  onClose,
  children,
  wide = false,
  label = "Close",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
  label?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    (window as unknown as { __lenis?: { stop: () => void } }).__lenis?.stop();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      (window as unknown as { __lenis?: { start: () => void } }).__lenis?.start();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            aria-label={label}
            className="absolute inset-0 cursor-pointer bg-black/75 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className={cn(
              "relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:rounded-3xl",
              wide ? "sm:max-w-4xl" : "sm:max-w-lg"
            )}
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="sticky left-full top-4 z-20 mr-4 flex h-10 w-10 -translate-x-full cursor-pointer items-center justify-center rounded-full border border-white/10 bg-ink/70 text-mute backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>
            <div className="-mt-14">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
