import { Award, FlaskConical, Medal, Target, Trophy, type LucideIcon } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { Reveal, SectionHeading } from "./ui";

const ICONS: Record<string, LucideIcon> = { Trophy, Medal, Award, FlaskConical, Target };

export function Awards() {
  const { content } = useContent();
  const { awards } = content;

  return (
    <section id="awards" className="relative border-t border-white/[0.05] bg-ink2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="08"
          eyebrow="Honors & awards"
          title={
            <>
              Recognition along <span className="italic text-gold-grad">the way.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((a, i) => {
            const Icon = ICONS[a.icon] ?? Trophy;
            return (
              <Reveal key={a.title} delay={0.05 * i}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-white/10 bg-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-gold/[0.08] text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink">
                    <Icon size={17} />
                  </span>
                  <div className="min-w-0">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-gold/80">{a.year}</span>
                    <h3 className="mt-1 text-[14.5px] font-medium leading-snug text-cream">{a.title}</h3>
                    <p className="mt-0.5 text-[12px] text-mute">{a.org}</p>
                    <p className="mt-1 text-[11px] text-mute/60">{a.note}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
