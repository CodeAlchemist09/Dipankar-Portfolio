import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useContent } from "../../hooks/useFirestoreContent";
import { seedFirestoreContent } from "../../hooks/useFirestoreContent";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  FileText,
  GraduationCap,
  Home,
  LogOut,
  Medal,
  MessageSquare,
  Sparkles,
  Trophy,
  User,
  Wrench,
  Menu,
  X,
  BadgeCheck,
} from "lucide-react";
import { AdminProfile } from "./AdminProfile";
import { AdminHero } from "./AdminHero";
import { AdminAbout } from "./AdminAbout";
import { AdminExperiences } from "./AdminExperiences";
import { AdminCaseStudies } from "./AdminCaseStudies";
import { AdminArtifacts } from "./AdminArtifacts";
import { AdminSkills } from "./AdminSkills";
import { AdminEducation } from "./AdminEducation";
import { AdminCertifications } from "./AdminCertifications";
import { AdminAwards } from "./AdminAwards";
import { AdminContact } from "./AdminContact";
import { AdminAnalytics } from "./AdminAnalytics";

const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "hero", label: "Hero", icon: Home },
  { key: "about", label: "About", icon: Sparkles },
  { key: "experiences", label: "Experiences", icon: Briefcase },
  { key: "case-studies", label: "Case Studies", icon: BookOpen },
  { key: "artifacts", label: "Artifacts", icon: FileText },
  { key: "skills", label: "Skills", icon: Wrench },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "certifications", label: "Certifications", icon: BadgeCheck },
  { key: "awards", label: "Awards", icon: Trophy },
  { key: "contact", label: "Contact", icon: MessageSquare },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
];

function SectionRenderer({ section }: { section: string }) {
  switch (section) {
    case "profile": return <AdminProfile />;
    case "hero": return <AdminHero />;
    case "about": return <AdminAbout />;
    case "experiences": return <AdminExperiences />;
    case "case-studies": return <AdminCaseStudies />;
    case "artifacts": return <AdminArtifacts />;
    case "skills": return <AdminSkills />;
    case "education": return <AdminEducation />;
    case "certifications": return <AdminCertifications />;
    case "awards": return <AdminAwards />;
    case "contact": return <AdminContact />;
    case "analytics": return <AdminAnalytics />;
    default: return <AdminProfile />;
  }
}

export function AdminLayout() {
  const { logout, user } = useAuth();
  const [section, setSection] = useState("profile");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  // Auto-seed on first login
  useEffect(() => {
    (async () => {
      setSeeding(true);
      try {
        const didSeed = await seedFirestoreContent();
        if (didSeed) setSeedDone(true);
      } catch (err) {
        console.error("Seed failed:", err);
      }
      setSeeding(false);
    })();
  }, []);

  return (
    <div className="flex min-h-screen bg-ink text-cream">
      {/* ─── sidebar (desktop) ─── */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.06] bg-panel lg:flex">
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/40 bg-gold/10 font-display text-sm italic text-gold">
            DY
          </div>
          <div>
            <p className="text-[13px] font-medium text-cream">Admin Panel</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-mute">Portfolio CMS</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 font-mono text-[9px] uppercase tracking-[0.22em] text-mute/60">Content</p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = section === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`mb-0.5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-all ${
                  active
                    ? "bg-gold/10 text-gold"
                    : "text-mute hover:bg-white/[0.03] hover:text-cream"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/[0.06] p-4">
          <p className="mb-2 truncate font-mono text-[9px] tracking-[0.1em] text-mute/60">
            {user?.email}
          </p>
          <div className="flex gap-2">
            <a
              href="/"
              target="_blank"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-[12px] text-mute transition-colors hover:border-gold/30 hover:text-cream"
            >
              View Site
            </a>
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[12px] text-mute transition-colors hover:border-red-400/30 hover:text-red-300 cursor-pointer"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ─── mobile header ─── */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/[0.06] bg-ink/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-gold/40 bg-gold/10 font-display text-xs italic text-gold">
            DY
          </div>
          <span className="text-[13px] font-medium text-cream">Admin</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="cursor-pointer text-cream">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ─── mobile sidebar overlay ─── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-panel pt-16">
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = section === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => { setSection(item.key); setSidebarOpen(false); }}
                    className={`mb-0.5 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] transition-all ${
                      active ? "bg-gold/10 text-gold" : "text-mute hover:bg-white/[0.03] hover:text-cream"
                    }`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-white/[0.06] p-4">
              <button onClick={logout} className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-white/10 py-2 px-3 text-[12px] text-mute hover:text-red-300">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ─── main content ─── */}
      <main className="flex-1 overflow-y-auto pt-14 lg:pt-0">
        {seeding && (
          <div className="border-b border-gold/20 bg-gold/[0.06] px-6 py-3">
            <p className="text-[13px] text-gold">⏳ Initializing Firestore with your portfolio data…</p>
          </div>
        )}
        {seedDone && (
          <div className="border-b border-emerald-400/20 bg-emerald-400/[0.06] px-6 py-3">
            <p className="text-[13px] text-emerald-300">✓ Portfolio data seeded successfully! You can now edit everything from here.</p>
          </div>
        )}
        <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8 lg:py-12">
          <SectionRenderer section={section} />
        </div>
      </main>
    </div>
  );
}
