import { Sparkle } from "lucide-react";
import { useContent } from "../hooks/useFirestoreContent";

export function Marquee() {
  const { content } = useContent();
  const row = [...content.marqueeItems, ...content.marqueeItems];
  return (
    <section className="relative overflow-hidden border-y border-white/[0.06] bg-ink2 py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-10 pr-10">
          {row.map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="whitespace-nowrap font-display text-2xl font-light italic text-cream/75 sm:text-3xl">
                {item}
              </span>
              <Sparkle size={13} className="shrink-0 text-gold/70" fill="currentColor" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
