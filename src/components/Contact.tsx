import { ArrowUp, ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { LinkedInIcon, Reveal, WordsReveal } from "./ui";
import { scrollToId } from "../lib/scroll";

export function Contact() {
  const { content } = useContent();
  const { contact, profile } = content;

  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* glow + watermark */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/[0.07] blur-[120px]" />
      <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[24vw] font-light italic leading-none text-white/[0.025]">
        {profile.last}
      </span>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-10 pt-28 sm:px-8 sm:pt-36 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="flex items-center justify-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.25em] text-gold">09</span>
              <span className="rule w-14" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute">What's next</span>
            </div>
          </Reveal>

          <h2 className="mt-6 font-display text-5xl font-light leading-[1.05] tracking-tight text-cream sm:text-6xl lg:text-7xl">
            <WordsReveal text={contact.heading[0]} />
            <br />
            <WordsReveal text={contact.heading[1]} wordClass={() => "italic text-gold-grad"} delay={0.15} />
          </h2>

          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-[14.5px] leading-relaxed text-mute">{contact.blurb}</p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={`mailto:${profile.email}`}
                data-cursor
                className="group flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:bg-gold2 hover:shadow-[0_0_44px_-8px_rgba(233,162,59,0.7)]"
              >
                <Mail size={15} />
                {profile.email}
              </a>
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-[13px] font-medium text-cream transition-all duration-300 hover:border-gold/60 hover:text-gold"
              >
                <MessageCircle size={15} />
                WhatsApp · {profile.phoneDisplay}
              </a>
            </div>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor
                className="group flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[12.5px] font-medium text-cream transition-all duration-300 hover:border-gold/60 hover:text-gold"
              >
                <LinkedInIcon size={14} />
                linkedin.com/in/dipankar-yadav
                <ArrowUpRight size={13} className="text-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </a>
              <a
                href={`tel:${profile.phoneTel}`}
                data-cursor
                className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-[12.5px] font-medium text-cream transition-all duration-300 hover:border-gold/60 hover:text-gold"
              >
                <Phone size={14} />
                Call directly
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-mute/60">
              {profile.location}
            </p>
          </Reveal>
        </div>

        {/* bottom bar */}
        <div className="mt-24 flex flex-wrap items-center justify-between gap-5 border-t border-white/[0.07] pt-7">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/40 bg-gold/10 font-display text-xs italic text-gold">
              {profile.initials}
            </span>
            <span className="text-[12px] text-mute">
              © {new Date().getFullYear()} {profile.name} — <span className="text-cream/70">built to keep growing</span>
            </span>
          </div>
          <button
            onClick={() => scrollToId("#home")}
            data-cursor
            aria-label="Back to top"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 text-mute transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
