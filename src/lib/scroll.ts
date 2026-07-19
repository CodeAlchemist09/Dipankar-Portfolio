/** Smooth-scroll to a section id via Lenis (falls back to native). */
export function scrollToId(id: string) {
  const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -70, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
