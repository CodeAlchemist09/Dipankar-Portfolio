import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { certCategories } from "../data/content";
import { Chip, Reveal, SectionHeading } from "./ui";

const CAT_TINT: Record<string, string> = {
  Product: "text-gold",
  "Data & AI": "text-[#9bb8ff]",
  Technical: "text-emerald-300",
};

export function Certifications() {
  const { content } = useContent();
  const { certifications } = content;
  const [filter, setFilter] = useState<(typeof certCategories)[number]>("All");

  const visible = filter === "All" ? certifications : certifications.filter((c) => c.category === filter);

  return (
    <section id="certifications" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="07"
          eyebrow="Credentials"
          title={
            <>
              Certified, then <span className="italic text-gold-grad">battle-tested.</span>
            </>
          }
          blurb="Formal credentials behind the practice."
        />

        {/* filters */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2">
            {certCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                data-cursor
                className={`cursor-pointer rounded-full border px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-all duration-300 ${
                  filter === c ? "border-gold bg-gold/15 text-gold" : "border-white/10 text-mute hover:border-white/25 hover:text-cream"
                }`}
              >
                {c}
                <span className="ml-1.5 text-mute/60">
                  {c === "All" ? certifications.length : certifications.filter((x) => x.category === c).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.article
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-panel p-5 transition-colors duration-400 hover:border-gold/25"
              >
                {/* credential visual / monogram */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-panel2">
                  <div className="flex h-full w-full items-center justify-center font-display text-lg italic text-gold/85">
                    {c.issuer.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[14px] font-medium leading-snug text-cream">{c.name}</h3>
                  <p className="mt-0.5 truncate text-[12px] text-mute">{c.issuer}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] ${CAT_TINT[c.category] ?? "text-mute"}`}>
                      <BadgeCheck size={11} />
                      {c.date}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute/50">{c.category}</span>
                    {c.credId && (
                      <span className="font-mono text-[9px] tracking-[0.08em] text-mute/50">ID {c.credId}</span>
                    )}
                  </div>
                  {c.skills && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {c.skills.map((s) => (
                        <Chip key={s} className="px-2! py-0.5! text-[9px]!">
                          {s}
                        </Chip>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
