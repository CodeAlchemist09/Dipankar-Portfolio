import { Brain, Compass, Hammer, Megaphone, type LucideIcon } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { Chip, Reveal, SectionHeading } from "./ui";

const ICONS: Record<string, LucideIcon> = { Compass, Brain, Hammer, Megaphone };

export function Skills() {
  const { content } = useContent();
  const { skillGroups, mlBuilds } = content;

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="05"
          eyebrow="Toolkit"
          title={
            <>
              One brain, <span className="italic text-gold-grad">four toolboxes.</span>
            </>
          }
          blurb="The unusual PM combination: I can sit with users, argue with data, build the thing myself, and sell it to a stranger — then do it again next week."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => {
            const Icon = ICONS[g.icon] ?? Compass;
            return (
              <Reveal key={g.title} delay={0.07 * i}>
                <div className="group h-full rounded-2xl border border-white/10 bg-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.08] text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={18} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-light text-cream">{g.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {g.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ML builds */}
        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="rule w-10" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">Also built along the way</span>
              </div>
              <h3 className="mt-3 font-display text-2xl font-light text-cream sm:text-3xl">
                ML systems, before product pulled me in.
              </h3>
            </div>
            <p className="max-w-sm text-[12.5px] leading-relaxed text-mute">
              Proof I speak engineer fluently — which changes the quality of every technical tradeoff conversation I sit in.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mlBuilds.map((m, i) => (
            <Reveal key={m.title} delay={0.06 * i}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-panel2 to-panel p-6 transition-all duration-500 hover:border-gold/25">
                <p className="font-display text-3xl font-light text-gold-grad">{m.metric}</p>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-mute">{m.metricLabel}</p>
                <h4 className="mt-4 text-[14px] font-medium text-cream">{m.title}</h4>
                <p className="mt-1.5 text-[12px] leading-relaxed text-mute">{m.desc}</p>
                <p className="mt-4 font-mono text-[9.5px] tracking-[0.12em] text-mute/60">{m.stack}</p>
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/[0.06] blur-xl transition-all duration-500 group-hover:bg-gold/[0.12]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
