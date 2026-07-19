import { Sparkles } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { Chip, Reveal, SectionHeading } from "./ui";

export function Experience() {
  const { content } = useContent();
  const { experiences } = content;

  return (
    <section id="experience" className="relative border-t border-white/[0.05] bg-ink2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* sticky heading */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                index="02"
                eyebrow="The journey"
                title={
                  <>
                    A path that kept pulling toward <span className="italic text-gold-grad">product.</span>
                  </>
                }
                blurb="Five chapters — an independent business, an analytics simulation, a solo SaaS, deep fieldwork, and a national hackathon. Each one made the direction clearer."
              />
              <Reveal delay={0.2}>
                <div className="mt-8 hidden items-center gap-3 lg:flex">
                  <span className="font-display text-5xl font-light text-gold-grad">{String(experiences.length).padStart(2, "0")}</span>
                  <span className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-mute">
                    roles that taught me
                    <br />
                    what building means
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* timeline */}
          <div className="lg:col-span-8">
            <div className="relative border-l border-white/[0.08] pl-7 sm:pl-10">
              {experiences.map((exp, i) => (
                <Reveal key={exp.id} delay={0.05} y={36} className={i === experiences.length - 1 ? "" : "pb-12 sm:pb-16"}>
                  <article className="group relative">
                    {/* node */}
                    <span className="absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center sm:-left-[43px]">
                      <span className="absolute h-full w-full rounded-full border border-gold/50 bg-ink transition-all duration-500 group-hover:bg-gold/20" />
                      <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
                    </span>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{exp.kind}</span>
                      <span className="h-px w-6 bg-white/15" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">{exp.period}</span>
                      <span className="font-mono text-[10px] tracking-[0.1em] text-mute/60">{exp.location}</span>
                    </div>

                    <h3 className="mt-3 font-display text-2xl font-light leading-tight text-cream transition-colors sm:text-[1.9rem]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 text-[13.5px] font-medium text-gold/90">{exp.org}</p>

                    <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-mute">{exp.summary}</p>

                    <ul className="mt-4 space-y-2.5">
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3 text-[13.5px] leading-relaxed text-cream/80">
                          <span className="mt-[9px] h-px w-4 shrink-0 bg-gold/70" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {/* PM lesson */}
                    <div className="mt-5 max-w-2xl rounded-xl border border-gold/20 bg-gold/[0.05] p-4 sm:p-5">
                      <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-gold" />
                        <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-gold">
                          What it taught me about product
                        </span>
                      </div>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-cream/85">{exp.lesson}</p>
                    </div>

                    <div className="mt-4 flex max-w-2xl flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
