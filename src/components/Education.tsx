import { CalendarRange, GraduationCap, Star } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { Reveal, SectionHeading } from "./ui";

export function Education() {
  const { content } = useContent();
  const { education } = content;

  return (
    <section id="education" className="relative border-t border-white/[0.05] bg-ink2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="06"
          eyebrow="Education"
          title={
            <>
              Systems-thinking, <span className="italic text-gold-grad">IIT-bred.</span>
            </>
          }
          blurb="An agricultural engineering degree at IIT taught me to reason about systems with messy inputs — weather, soil, human behavior, supply chains. Turns out products are the same kind of system."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {education.map((ed, i) => (
            <Reveal key={ed.id} delay={0.08 * i} className={i === 0 ? "lg:col-span-2" : ""}>
              <article className="group flex h-full flex-col rounded-3xl border border-white/10 bg-panel p-7 transition-all duration-500 hover:border-gold/25 sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-panel2 font-display text-lg italic text-gold">
                    {ed.monogram}
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.15em] text-mute">
                    <CalendarRange size={11} className="text-gold/80" />
                    {ed.period}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-light leading-tight text-cream sm:text-[1.7rem]">{ed.school}</h3>
                <p className="mt-1.5 text-[13.5px] font-medium text-gold/90">{ed.program}</p>
                <p className="text-[12.5px] text-mute">{ed.field}</p>

                <div className="mt-5 space-y-3">
                  {ed.notes.map((n, j) => (
                    <p key={j} className="flex items-start gap-3 text-[13px] leading-relaxed text-mute">
                      <GraduationCap size={13} className="mt-0.5 shrink-0 text-gold/60" />
                      {n}
                    </p>
                  ))}
                </div>

                {ed.highlights.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.05] p-5">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-gold">Highlights</p>
                    <ul className="mt-3 space-y-2.5">
                      {ed.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-cream/85">
                          <Star size={12} className="mt-1 shrink-0 text-gold" fill="currentColor" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
