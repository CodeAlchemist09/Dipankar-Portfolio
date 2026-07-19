import { useEffect, useRef, useCallback } from "react";
import { collection, addDoc, query, where, getDocs, orderBy, limit, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

/* ------------------------------------------------------------------ types */
export interface AnalyticsEvent {
  type: "pageview" | "section_view" | "click";
  section?: string;
  label?: string;
  timestamp: Timestamp;
  referrer: string;
  userAgent: string;
  screenWidth: number;
  screenHeight: number;
  language: string;
  path: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  todayPageViews: number;
  weekPageViews: number;
  monthPageViews: number;
  sectionViews: Record<string, number>;
  devices: { mobile: number; tablet: number; desktop: number };
  browsers: Record<string, number>;
  referrers: Record<string, number>;
  recentEvents: AnalyticsEvent[];
}

const COLLECTION = "analytics";

/* ------------------------------------------------ track a single event */
async function trackEvent(event: Omit<AnalyticsEvent, "timestamp" | "referrer" | "userAgent" | "screenWidth" | "screenHeight" | "language" | "path">) {
  try {
    await addDoc(collection(db, COLLECTION), {
      ...event,
      timestamp: Timestamp.now(),
      referrer: document.referrer || "direct",
      userAgent: navigator.userAgent,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      path: window.location.pathname,
    });
  } catch {
    // silently fail — analytics should never break the site
  }
}

/* ----------------------------------------------- classify device type */
function getDeviceType(ua: string): "mobile" | "tablet" | "desktop" {
  if (/tablet|ipad/i.test(ua)) return "tablet";
  if (/mobile|iphone|android.*mobile/i.test(ua)) return "mobile";
  return "desktop";
}

/* ----------------------------------------------- classify browser */
function getBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome/i.test(ua) && !/edg/i.test(ua)) return "Chrome";
  if (/firefox/i.test(ua)) return "Firefox";
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return "Safari";
  if (/opera|opr/i.test(ua)) return "Opera";
  return "Other";
}

/* ------------------------------------------------- page view tracker hook */
export function usePageViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackEvent({ type: "pageview" });
  }, []);
}

/* ------------------------------------------------- section view tracker */
export function useSectionViewTracker(sectionId: string) {
  const tracked = useRef(false);

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (!el || tracked.current) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !tracked.current) {
            tracked.current = true;
            trackEvent({ type: "section_view", section: sectionId });
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
    },
    [sectionId]
  );

  return ref;
}

/* ----------------------------------------------- fetch analytics summary */
export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  const col = collection(db, COLLECTION);
  const snap = await getDocs(query(col, orderBy("timestamp", "desc"), limit(5000)));

  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(startOfDay);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const summary: AnalyticsSummary = {
    totalPageViews: 0,
    todayPageViews: 0,
    weekPageViews: 0,
    monthPageViews: 0,
    sectionViews: {},
    devices: { mobile: 0, tablet: 0, desktop: 0 },
    browsers: {},
    referrers: {},
    recentEvents: [],
  };

  snap.forEach((doc) => {
    const data = doc.data() as AnalyticsEvent;
    const ts = data.timestamp?.toDate?.() ?? new Date();

    if (data.type === "pageview") {
      summary.totalPageViews++;
      if (ts >= startOfDay) summary.todayPageViews++;
      if (ts >= startOfWeek) summary.weekPageViews++;
      if (ts >= startOfMonth) summary.monthPageViews++;

      // device & browser
      const device = getDeviceType(data.userAgent || "");
      summary.devices[device]++;
      const browser = getBrowser(data.userAgent || "");
      summary.browsers[browser] = (summary.browsers[browser] || 0) + 1;

      // referrer
      const ref = data.referrer || "direct";
      const refDomain = ref === "direct" ? "Direct" : (() => {
        try { return new URL(ref).hostname; } catch { return ref; }
      })();
      summary.referrers[refDomain] = (summary.referrers[refDomain] || 0) + 1;
    }

    if (data.type === "section_view" && data.section) {
      summary.sectionViews[data.section] = (summary.sectionViews[data.section] || 0) + 1;
    }

    if (summary.recentEvents.length < 50) {
      summary.recentEvents.push(data);
    }
  });

  return summary;
}
