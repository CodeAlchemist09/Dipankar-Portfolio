import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "./ui";

export function Preloader({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    const D = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / D);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(onFinish, 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      exit={{ y: "-100%", transition: { duration: 0.9, ease: [0.83, 0, 0.17, 1] } }}
    >
      <div className="overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="text-center font-mono text-[11px] uppercase tracking-[0.4em] text-gold"
        >
          Portfolio · 2026
        </motion.p>
      </div>
      <div className="mt-4 overflow-hidden">
        <motion.h1
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.22 }}
          className="text-center font-display text-5xl font-light tracking-tight text-cream sm:text-7xl"
        >
          Dipankar <span className="italic text-gold-grad">Yadav</span>
        </motion.h1>
      </div>
      <div className="mt-3 overflow-hidden">
        <motion.p
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.38 }}
          className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-mute"
        >
          Building AI products that actually ship
        </motion.p>
      </div>

      {/* progress */}
      <div className="absolute bottom-14 left-1/2 w-56 -translate-x-1/2">
        <div className="h-px w-full bg-white/10">
          <motion.div className="h-px bg-gold" style={{ width: `${count}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-[0.25em] text-mute">
          <span>LOADING EXPERIENCE</span>
          <span className="text-gold">{count}%</span>
        </div>
      </div>
    </motion.div>
  );
}
