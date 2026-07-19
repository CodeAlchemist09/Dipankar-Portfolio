import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { type CaseStudy } from "../data/content";
import { Chip, Reveal, SectionHeading } from "./ui";
import { Modal } from "./Modal";
import { cn } from "../utils/cn";

function MetricsRow({ cs, compact }: { cs: CaseStudy; compact?: boolean }) {
  const items = compact ? cs.metrics.slice(0, 3) : cs.metrics;
  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4")}>
      {items.map((m) => (
        <div key={m.label} className="rounded-xl border border-white/[0.07] bg-ink/40 p-3">
          <p className="font-display text-lg font-light leading-none text-gold">{m.value}</p>
          <p className="mt-1.5 font-mono text-[8.5px] uppercase leading-snug tracking-[0.14em] text-mute">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function Card({ cs, wide, onOpen, delay }: { cs: CaseStudy; wide?: boolean; onOpen: () => void; delay: number }) {
  return (
    <Reveal delay={delay} className={cn(wide && "lg:col-span-2")}>
      <motion.article
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onOpen}
        data-cursor
        className={cn(
          "group cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-panel transition-colors duration-500 hover:border-gold/30",
          wide && "lg:grid lg:grid-cols-2"
        )}
      >
        {/* image */}
        <div className={cn("relative overflow-hidden", wide ? "h-64 lg:h-auto lg:min-h-[420px]" : "aspect-[16/9.5]")}>
          <img
            src={cs.image}
            alt={cs.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-panel/10" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="rounded-full border border-white/15 bg-ink/70 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold backdrop-blur-md">
              {cs.kind}
            </span>
            <span className="rounded-full border border-white/15 bg-ink/70 px-3 py-1 font-mono text-[9.5px] tracking-[0.18em] text-mute backdrop-blur-md">
              {cs.year}
            </span>
          </div>
        </div>

        {/* body */}
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div>
            <h3 className="font-display text-2xl font-light leading-tight text-cream sm:text-[1.75rem]">{cs.title}</h3>
            <p className="mt-1 text-[13px] font-medium text-gold/90">{cs.subtitle}</p>
            <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-mute">{cs.tagline}</p>
          </div>
          <MetricsRow cs={cs} compact={!wide} />
          <div className="mt-auto flex items-end justify-between gap-4">
            <div className="flex flex-wrap gap-1.5">
              {cs.stack.slice(0, wide ? 4 : 3).map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
            <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute transition-colors group-hover:text-gold">
              Read
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-cream transition-all duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <ArrowUpRight size={15} />
              </span>
            </span>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function CaseStudies() {
  const { content } = useContent();
  const { caseStudies } = content;
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  return (
    <section id="work" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title={
            <>
              Case studies, <span className="italic text-gold-grad">not just projects.</span>
            </>
          }
          blurb="Each one written the way I'd write them in a PM interview — the problem, the calls I made, what broke, and what it taught me."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {caseStudies.length > 0 && (
            <Card cs={caseStudies[0]} wide onOpen={() => setSelected(caseStudies[0])} delay={0.05} />
          )}
          {caseStudies.slice(1).map((cs, i) => (
            <Card key={cs.id} cs={cs} onOpen={() => setSelected(cs)} delay={0.08 * (i + 1)} />
          ))}
        </div>
      </div>

      {/* ------------------------------ case study modal ------------------------------ */}
      <Modal open={!!selected} onClose={() => setSelected(null)} wide>
        {selected && (
          <div>
            <div className="relative h-52 overflow-hidden sm:h-72">
              <img src={selected.image} alt={selected.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-ink/70 px-3 py-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-gold backdrop-blur-md">
                    {selected.kind}
                  </span>
                  <span className="rounded-full border border-white/15 bg-ink/70 px-3 py-1 font-mono text-[9.5px] tracking-[0.18em] text-mute backdrop-blur-md">
                    {selected.year}
                  </span>
                </div>
                <h3 className="font-display text-3xl font-light text-cream sm:text-5xl">{selected.title}</h3>
                <p className="mt-1 text-[13px] text-gold/90 sm:text-sm">{selected.subtitle}</p>
              </div>
            </div>

            <div className="space-y-10 p-6 sm:p-10">
              {/* meta + metrics */}
              <div className="grid gap-6 lg:grid-cols-5">
                <div className="rounded-2xl border border-white/[0.07] bg-ink/40 p-5 lg:col-span-2">
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-mute">My role</p>
                  <p className="mt-2 font-display text-lg font-light leading-snug text-cream">{selected.role}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{selected.tagline.split(".")[0]}.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:col-span-3">
                  {selected.metrics.map((m) => (
                    <div key={m.label} className="rounded-2xl border border-white/[0.07] bg-ink/40 p-5">
                      <p className="font-display text-2xl font-light text-gold sm:text-3xl">{m.value}</p>
                      <p className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-[0.15em] text-mute">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* narrative sections */}
              {selected.sections.map((sec, i) => (
                <div key={i} className="max-w-3xl">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-gold">0{i + 1}</span>
                    <h4 className="font-display text-xl font-light text-cream sm:text-2xl">{sec.heading}</h4>
                  </div>
                  {sec.paragraphs?.map((p, j) => (
                    <p key={j} className="mt-3 text-[14px] leading-relaxed text-mute">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="mt-3 space-y-2.5">
                      {sec.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-cream/80">
                          <span className="mt-[9px] h-px w-4 shrink-0 bg-gold/70" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* stack */}
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-mute">Tools & stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selected.stack.map((s) => (
                    <Chip key={s} className="text-[11px]! text-cream/80!">
                      {s}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* quote */}
              <div className="flex items-start gap-4 rounded-2xl border border-gold/20 bg-gold/[0.05] p-6">
                <Quote size={18} className="mt-1 shrink-0 text-gold" fill="currentColor" />
                <p className="font-display text-lg font-light italic leading-snug text-cream sm:text-xl">{selected.quote}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
