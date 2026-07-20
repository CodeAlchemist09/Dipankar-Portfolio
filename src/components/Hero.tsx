import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Mail, FileText } from "lucide-react";
import HeroScene from "./three/HeroScene";
import { CountUp, EASE } from "./ui";
import { useContent } from "../hooks/useFirestoreContent";
import { scrollToId } from "../lib/scroll";

const line1 = "Building AI products";
const line2 = "that actually ship.";

function Line({ text, ready, delay, italic }: { text: string; ready: boolean; delay: number; italic?: boolean }) {
  return (
    <span className="block">
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.09em] -mb-[0.09em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${italic ? "italic text-gold-grad" : ""}`}
            initial={{ y: "112%", rotate: 2.5 }}
            animate={ready ? { y: "0%", rotate: 0 } : {}}
            transition={{ duration: 1, delay: delay + i * 0.055, ease: EASE }}
          >
            {w}
            {"\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const { content } = useContent();
  const { profile, heroStats } = content;

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* 3D backdrop */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.2 }}
      >
        <HeroScene />
      </motion.div>
      {/* readability gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_10%,transparent_40%,rgba(7,7,10,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 pt-32 sm:px-8 lg:px-12 lg:pt-36">
        {/* status */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mb-7 flex flex-wrap items-center gap-3"
        >
          <span className="flex items-center gap-2.5 rounded-full border border-white/10 bg-ink/50 py-1.5 pl-3.5 pr-4 backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-gold animate-ping-soft" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{profile.availability}</span>
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-mute/70 sm:block">
            {profile.name} — Product Builder
          </span>
        </motion.div>

        {/* headline */}
        <h1 className="max-w-5xl font-display text-[clamp(2.8rem,7.4vw,6.6rem)] font-light leading-[1.02] tracking-[-0.02em] text-cream">
          <Line text={line1} ready={ready} delay={0.7} />
          <Line text={line2} ready={ready} delay={0.95} italic />
        </h1>

        {/* sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.45, ease: EASE }}
          className="mt-7 max-w-xl text-[15px] leading-relaxed text-mute sm:text-base"
        >
          {profile.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.65, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => scrollToId("#work")}
            data-cursor
            className="group flex cursor-pointer items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[13.5px] font-semibold text-ink transition-all duration-300 hover:bg-gold2 hover:shadow-[0_0_44px_-8px_rgba(233,162,59,0.7)]"
          >
            See the work
            <ArrowDown size={15} className="transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
          <a
            href={`mailto:${profile.email}`}
            data-cursor
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-ink/40 px-7 py-3.5 text-[13.5px] font-medium text-cream backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:text-gold"
          >
            <Mail size={15} />
            {profile.email}
            <ArrowUpRight size={14} className="text-mute transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
          </a>
          
          {(profile as any).resumeUrl && (
            <a
              href={(profile as any).resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-ink/40 px-7 py-3.5 text-[13.5px] font-medium text-cream backdrop-blur-md transition-all duration-300 hover:border-emerald-400/60 hover:text-emerald-300"
            >
              <FileText size={15} />
              Resume
            </a>
          )}
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.9, ease: EASE }}
          className="mt-16 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-ink/45 backdrop-blur-md lg:mt-20 lg:grid-cols-4"
        >
          {heroStats.map((s, i) => (
            <div
              key={s.label}
              className={`border-white/[0.07] p-5 sm:p-6 ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t lg:border-t-0" : ""} ${
                i > 0 ? "lg:border-l" : ""
              }`}
            >
              <div className="font-display text-3xl font-light text-cream sm:text-4xl">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                <span className="text-gold">.</span>
              </div>
              <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-mute">{s.label}</p>
              <p className="mt-0.5 text-[10.5px] text-mute/60">{s.note}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.6, duration: 1 }}
        className="pointer-events-none absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-mute">Scroll</span>
        <div className="h-9 w-px overflow-hidden bg-white/10">
          <motion.div
            className="h-3.5 w-px bg-gold"
            animate={{ y: [-14, 36] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* side annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.4, duration: 1 }}
        className="pointer-events-none absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 xl:block"
      >
        <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.5em] text-mute/50">
          {profile.location} — 2026
        </span>
      </motion.div>
    </section>
  );
}
