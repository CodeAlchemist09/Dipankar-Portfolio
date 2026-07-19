import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { scrollToId } from "../lib/scroll";
import { cn } from "../utils/cn";

const LINKS = [
  { label: "Story", id: "#about" },
  { label: "Journey", id: "#experience" },
  { label: "Work", id: "#work" },
  { label: "Artifacts", id: "#artifacts" },
  { label: "Credentials", id: "#certifications" },
  { label: "Contact", id: "#contact" },
];

export function Nav() {
  const { content } = useContent();
  const { profile } = content;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 2.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
          scrolled ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex cursor-pointer items-center gap-3" data-cursor>
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-gold/40 bg-gold/10 font-display text-sm italic text-gold transition-colors group-hover:border-gold">
              {profile.photoURL ? (
                <img src={profile.photoURL} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <span className="group-hover:bg-gold group-hover:text-ink flex h-full w-full items-center justify-center transition-colors">
                  {profile.initials}
                </span>
              )}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[13px] font-medium leading-tight tracking-wide text-cream">{profile.name}</span>
              <span className="block font-mono text-[9px] uppercase leading-tight tracking-[0.22em] text-mute">{profile.role}</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                data-cursor
                className="group relative cursor-pointer font-mono text-[11px] uppercase tracking-[0.18em] text-mute transition-colors hover:text-cream"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 md:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-ping-soft" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">{profile.availability}</span>
            </span>
            <button
              onClick={() => go("#contact")}
              data-cursor
              className="hidden cursor-pointer items-center gap-1.5 rounded-full bg-gold px-4.5 py-2 text-[12.5px] font-semibold text-ink transition-all hover:bg-gold2 hover:shadow-[0_0_30px_-6px_rgba(233,162,59,0.6)] sm:flex"
            >
              Let's talk <ArrowUpRight size={14} />
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/10 text-cream lg:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[92] flex flex-col bg-ink/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-[68px] items-center justify-between px-5 sm:px-8">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-gold/40 bg-gold/10 font-display text-lg italic text-gold">
                {profile.photoURL ? (
                  <img src={profile.photoURL} alt={profile.name} className="h-full w-full object-cover" />
                ) : (
                  profile.initials
                )}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/10 text-cream"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 px-8">
              {LINKS.map((l, i) => (
                <div key={l.id} className="overflow-hidden">
                  <motion.button
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.55, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => go(l.id)}
                    className="flex cursor-pointer items-baseline gap-4 py-2 text-left"
                  >
                    <span className="font-mono text-[10px] text-gold">0{i + 1}</span>
                    <span className="font-display text-4xl font-light text-cream">{l.label}</span>
                  </motion.button>
                </div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.45 }}
              className="border-t border-white/[0.07] px-8 py-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mute">Reach me</p>
              <a href={`mailto:${profile.email}`} className="mt-2 block text-sm text-cream">
                {profile.email}
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="mt-1 block text-sm text-gold">
                linkedin.com/in/dipankar-yadav
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
