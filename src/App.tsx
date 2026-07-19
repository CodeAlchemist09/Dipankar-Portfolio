import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

import { ContentProvider } from "./hooks/useFirestoreContent";
import { Preloader } from "./components/Preloader";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Profile } from "./components/Profile";
import { Experience } from "./components/Experience";
import { CaseStudies } from "./components/CaseStudies";
import { Artifacts } from "./components/Artifacts";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Certifications } from "./components/Certifications";
import { Awards } from "./components/Awards";
import { Contact } from "./components/Contact";
import { AdminApp } from "./components/admin/AdminApp";
import { usePageViewTracker } from "./hooks/useAnalytics";

function Portfolio() {
  const [loading, setLoading] = useState(true);

  usePageViewTracker();

  /* Lenis smooth scrolling */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  /* lock scroll while preloading */
  useEffect(() => {
    document.documentElement.style.overflow = loading ? "hidden" : "";
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (loading) lenis?.stop();
    else lenis?.start();
  }, [loading]);

  const finish = useCallback(() => setLoading(false), []);

  return (
    <div className="grain min-h-screen bg-ink text-cream">
      <Cursor />
      <AnimatePresence>{loading && <Preloader onFinish={finish} />}</AnimatePresence>

      <Nav />
      <main>
        <Hero ready={!loading} />
        <Marquee />
        <Profile />
        <Experience />
        <CaseStudies />
        <Artifacts />
        <Skills />
        <Education />
        <Certifications />
        <Awards />
        <Contact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="*" element={<Portfolio />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}
