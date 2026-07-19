import { useState } from "react";
import { Check, Copy, Mail, MapPin, MoveRight, Phone, Sparkles } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";
import { Chip, LinkedInIcon, Reveal, SectionHeading } from "./ui";

export function Profile() {
  const { content } = useContent();
  const { profile, about } = content;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          index="01"
          eyebrow="The story"
          title={
            <>
              Started in ML. Stayed for the <span className="italic text-gold-grad">why.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ------------ profile card ------------ */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
              {/* banner */}
              <div className="group relative h-36 overflow-hidden sm:h-44">
                <img
                  src={profile.bannerURL || "images/cover-banner.jpg"}
                  alt="Cover banner"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent" />
              </div>

              {/* avatar */}
              <div className="flex items-end justify-between px-6">
                <div className="relative -mt-12 h-24 w-24 sm:-mt-14 sm:h-28 sm:w-28">
                  <div className="h-full w-full overflow-hidden rounded-full border-[3px] border-panel bg-panel2 ring-1 ring-gold/30">
                    {profile.photoURL ? (
                      <img src={profile.photoURL} alt={profile.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_35%_30%,#24242f,#101016)] font-display text-3xl italic text-gold">
                        {profile.initials}
                      </div>
                    )}
                  </div>
                </div>
                <span className="mb-1 hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold sm:flex">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full rounded-full bg-gold animate-ping-soft" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
                  </span>
                  {profile.availability}
                </span>
              </div>

              {/* identity */}
              <div className="px-6 pb-6 pt-4">
                <h3 className="font-display text-2xl font-light text-cream">{profile.name}</h3>
                <p className="mt-1 text-[12.5px] leading-relaxed text-mute">
                  {profile.headline} · {profile.role}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-mute/80">
                  <MapPin size={12} className="text-gold/80" /> {profile.location}
                </p>

                <div className="my-5 h-px bg-white/[0.07]" />

                <p className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-mute">LinkedIn top skills</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {about.topSkills.map((s) => (
                    <Chip key={s} className="border-gold/25! bg-gold/[0.06]! text-gold/90!">
                      {s}
                    </Chip>
                  ))}
                </div>

                <div className="my-5 h-px bg-white/[0.07]" />

                {/* quick contact */}
                <div className="space-y-2.5">
                  <button onClick={copyEmail} data-cursor className="group flex w-full cursor-pointer items-center gap-3 text-left">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-gold">
                      {copied ? <Check size={13} /> : <Mail size={13} />}
                    </span>
                    <span className="flex-1 truncate text-[12.5px] text-cream/85">{profile.email}</span>
                    <Copy size={12} className="text-mute opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                  <a href={`tel:${profile.phoneTel}`} data-cursor className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-gold">
                      <Phone size={13} />
                    </span>
                    <span className="text-[12.5px] text-cream/85">{profile.phoneDisplay}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-mute">call / whatsapp</span>
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-gold">
                      <LinkedInIcon size={13} />
                    </span>
                    <span className="truncate text-[12.5px] text-cream/85">linkedin.com/in/dipankar-yadav</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ------------ narrative ------------ */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-relaxed text-cream/90 sm:text-xl">{about.lead}</p>
              <p className="mt-4 font-display text-2xl font-light italic text-gold-grad sm:text-3xl">{about.thread}</p>
            </Reveal>

            <div className="mt-10">
              {about.journey.map((item, i) => (
                <Reveal key={i} delay={0.05 * i} y={16}>
                  <div className="group flex items-start gap-4 border-b border-white/[0.06] py-4 transition-colors hover:border-gold/25">
                    <MoveRight size={16} className="mt-1 shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1" />
                    <p className="text-[14.5px] leading-relaxed text-cream/85">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-2xl text-[14px] leading-relaxed text-mute">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">What I'm doing now — </span>
                <br />
                {about.now}
              </p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="relative mt-10 overflow-hidden rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 sm:p-8">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-gold" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">The unusual lens</span>
                </div>
                <p className="mt-4 font-display text-xl font-light italic leading-snug text-cream sm:text-2xl">
                  "{about.lens.quote}"
                </p>
                <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-mute">{about.lens.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
