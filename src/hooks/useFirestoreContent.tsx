import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import {
  profile as seedProfile,
  heroStats as seedHeroStats,
  marqueeItems as seedMarqueeItems,
  about as seedAbout,
  experiences as seedExperiences,
  caseStudies as seedCaseStudies,
  artifacts as seedArtifacts,
  skillGroups as seedSkillGroups,
  mlBuilds as seedMlBuilds,
  education as seedEducation,
  certifications as seedCertifications,
  awards as seedAwards,
  contact as seedContact,
  type Experience,
  type CaseStudy,
  type Artifact,
  type Certification,
} from "../data/content";

/* ------------------------------------------------------------------ types */
export interface PortfolioContent {
  profile: typeof seedProfile & { photoURL?: string; bannerURL?: string };
  heroStats: typeof seedHeroStats;
  marqueeItems: string[];
  about: typeof seedAbout;
  experiences: Experience[];
  caseStudies: CaseStudy[];
  artifacts: Artifact[];
  skillGroups: typeof seedSkillGroups;
  mlBuilds: typeof seedMlBuilds;
  education: typeof seedEducation;
  certifications: Certification[];
  awards: typeof seedAwards;
  contact: typeof seedContact;
}

const CONTENT_DOC = "content/main";

/* ---------------------------------------------------- default (seed) data */
function buildSeedData(): PortfolioContent {
  return {
    profile: { ...seedProfile },
    heroStats: [...seedHeroStats],
    marqueeItems: [...seedMarqueeItems],
    about: { ...seedAbout, journey: [...seedAbout.journey], lens: { ...seedAbout.lens }, topSkills: [...seedAbout.topSkills] },
    experiences: seedExperiences.map((e) => ({ ...e, bullets: [...e.bullets], skills: [...e.skills] })),
    caseStudies: seedCaseStudies.map((c) => ({
      ...c,
      metrics: c.metrics.map((m) => ({ ...m })),
      sections: c.sections.map((s) => ({
        ...s,
        paragraphs: s.paragraphs ? [...s.paragraphs] : undefined,
        bullets: s.bullets ? [...s.bullets] : undefined,
      })),
      stack: [...c.stack],
    })),
    artifacts: seedArtifacts.map((a) => ({ ...a, tags: [...a.tags] })),
    skillGroups: seedSkillGroups.map((g) => ({ ...g, items: [...g.items] })),
    mlBuilds: seedMlBuilds.map((m) => ({ ...m })),
    education: seedEducation.map((e) => ({ ...e, notes: [...e.notes], highlights: [...e.highlights] })),
    certifications: seedCertifications.map((c) => ({ ...c, skills: c.skills ? [...c.skills] : undefined })),
    awards: seedAwards.map((a) => ({ ...a })),
    contact: { ...seedContact, heading: [...seedContact.heading] },
  };
}

/* ----------------------------------------------- seed data into Firestore */
export async function seedFirestoreContent(): Promise<boolean> {
  const ref = doc(db, CONTENT_DOC);
  const snap = await getDoc(ref);
  if (snap.exists()) return false; // already seeded
  const data = buildSeedData();
  await setDoc(ref, JSON.parse(JSON.stringify(data)));
  return true; // just seeded
}

/* --------------------------------------------- save content to Firestore */
export async function saveContent(content: PortfolioContent): Promise<void> {
  const ref = doc(db, CONTENT_DOC);
  await setDoc(ref, JSON.parse(JSON.stringify(content)));
}

/* ------------------------------------------------ save a single section */
export async function saveContentSection<K extends keyof PortfolioContent>(
  key: K,
  value: PortfolioContent[K]
): Promise<void> {
  const ref = doc(db, CONTENT_DOC);
  const snap = await getDoc(ref);
  
  if (!snap.exists()) {
    // If document doesn't exist (e.g. initial seed failed), seed it now
    const data = buildSeedData();
    data[key] = value;
    await setDoc(ref, JSON.parse(JSON.stringify(data)));
    return;
  }
  
  const current = snap.data() as PortfolioContent;
  const toSave = { ...current, [key]: value };
  await setDoc(ref, JSON.parse(JSON.stringify(toSave)));
}

/* --------------------------------------------------------- React context */
interface ContentContextValue {
  content: PortfolioContent;
  loading: boolean;
  error: string | null;
}

const ContentContext = createContext<ContentContextValue>({
  content: buildSeedData(),
  loading: true,
  error: null,
});

export function useContent(): ContentContextValue {
  return useContext(ContentContext);
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(buildSeedData());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ref = doc(db, CONTENT_DOC);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          setContent(snap.data() as PortfolioContent);
        }
        // If document doesn't exist yet, keep using seed data
        setLoading(false);
      },
      (err) => {
        console.error("Firestore content error:", err);
        setError(err.message);
        setLoading(false);
        // Keep seed data on error so site still works
      }
    );
    return unsub;
  }, []);

  return (
    <ContentContext.Provider value={{ content, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
}
