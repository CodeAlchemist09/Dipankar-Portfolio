import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  ClipboardList,
  FileText,
  LayoutDashboard,
  ScanSearch,
  Shapes,
  Workflow,
} from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { type ArtifactType } from "../data/content";
import { Chip, Reveal, SectionHeading } from "./ui";

const TYPE_STYLE: Record<ArtifactType, { icon: typeof FileText; cls: string }> = {
  PRD: { icon: FileText, cls: "border-gold/30 bg-gold/10 text-gold" },
  Teardown: { icon: ScanSearch, cls: "border-[#7aa2ff]/30 bg-[#7aa2ff]/10 text-[#9bb8ff]" },
  Automation: { icon: Workflow, cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" },
  Dashboard: { icon: LayoutDashboard, cls: "border-violet-400/30 bg-violet-400/10 text-violet-300" },
  Research: { icon: ClipboardList, cls: "border-rose-400/30 bg-rose-400/10 text-rose-300" },
  Framework: { icon: Boxes, cls: "border-amber-300/30 bg-amber-300/10 text-amber-200" },
  Other: { icon: Shapes, cls: "border-white/20 bg-white/[0.06] text-mute" },
};

export function Artifacts() {
  const { content } = useContent();
  const { artifacts } = content;

  return (
    <section id="artifacts" className="relative border-t border-white/[0.05] bg-ink2 py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="04"
          eyebrow="PM artifacts & playbooks"
          title={
            <>
              The <span className="italic text-gold-grad">paper trail</span> of product thinking.
            </>
          }
          blurb="PRDs, teardowns, automations, dashboards, research instruments — the working documents behind the stories."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {artifacts.map((a, i) => {
              const T = TYPE_STYLE[a.type] ?? TYPE_STYLE.Other;
              const Icon = T.icon;
              return (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: 0.04 * (i % 3), ease: [0.22, 1, 0.36, 1] }}
                >
                  <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-panel p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/25">
                    <div className="flex items-center justify-between">
                      <span className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.16em] ${T.cls}`}>
                        <Icon size={11} />
                        {a.type}
                      </span>
                      {a.link && (
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Open artifact link"
                          data-cursor
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-mute transition-all hover:border-gold hover:text-gold"
                        >
                          <ArrowUpRight size={12} />
                        </a>
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-xl font-light leading-snug text-cream">{a.title}</h3>
                    <p className="mt-2.5 flex-1 text-[13px] leading-relaxed text-mute">{a.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </article>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
