import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { type CaseStudy, type CaseSection } from "../../data/content";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, textareaCls, StatusToast } from "./AdminUI";

export function AdminCaseStudies() {
  const { content } = useContent();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(
    content.caseStudies.map((c) => ({
      ...c,
      metrics: c.metrics.map((m) => ({ ...m })),
      sections: c.sections.map((s) => ({ ...s, paragraphs: s.paragraphs ? [...s.paragraphs] : undefined, bullets: s.bullets ? [...s.bullets] : undefined })),
      stack: [...c.stack],
    }))
  );
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateCS = (id: string, key: string, value: any) => {
    setCaseStudies((prev) => prev.map((c) => c.id === id ? { ...c, [key]: value } : c));
  };

  const addCaseStudy = () => {
    const n: CaseStudy = {
      id: `cs_${Date.now()}`, title: "", subtitle: "", kind: "", year: "", role: "",
      image: "", tagline: "", metrics: [], sections: [], stack: [], quote: "",
    };
    setCaseStudies((p) => [...p, n]);
    setExpanded(n.id);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("caseStudies", caseStudies);
      showToast("Case studies saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Case Studies" description="Manage your portfolio case studies with sections, metrics, and images." />

      <div className="space-y-3 mb-6">
        {caseStudies.map((cs) => (
          <AdminCard key={cs.id} className="!p-0">
            <button onClick={() => setExpanded(expanded === cs.id ? null : cs.id)} className="flex w-full cursor-pointer items-center justify-between p-5 text-left">
              <div>
                <p className="text-[14px] font-medium text-cream">{cs.title || "New Case Study"}</p>
                <p className="text-[12px] text-mute">{cs.kind} · {cs.year}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setCaseStudies((p) => p.filter((c) => c.id !== cs.id)); }} className="cursor-pointer rounded-lg border border-white/10 p-2 text-mute hover:text-red-300 transition-colors">
                  <Trash2 size={13} />
                </button>
                {expanded === cs.id ? <ChevronUp size={16} className="text-mute" /> : <ChevronDown size={16} className="text-mute" />}
              </div>
            </button>

            {expanded === cs.id && (
              <div className="border-t border-white/[0.06] p-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><FieldLabel>Title</FieldLabel><input value={cs.title} onChange={(e) => updateCS(cs.id, "title", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Subtitle</FieldLabel><input value={cs.subtitle} onChange={(e) => updateCS(cs.id, "subtitle", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Kind</FieldLabel><input value={cs.kind} onChange={(e) => updateCS(cs.id, "kind", e.target.value)} className={inputCls} placeholder="SaaS Product" /></div>
                  <div><FieldLabel>Year</FieldLabel><input value={cs.year} onChange={(e) => updateCS(cs.id, "year", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Role</FieldLabel><input value={cs.role} onChange={(e) => updateCS(cs.id, "role", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Image Path/URL</FieldLabel><input value={cs.image} onChange={(e) => updateCS(cs.id, "image", e.target.value)} className={inputCls} placeholder="images/case-xxx.jpg or URL" /></div>
                </div>
                <div><FieldLabel>Tagline</FieldLabel><textarea value={cs.tagline} onChange={(e) => updateCS(cs.id, "tagline", e.target.value)} rows={2} className={textareaCls} /></div>
                <div><FieldLabel>Quote</FieldLabel><input value={cs.quote} onChange={(e) => updateCS(cs.id, "quote", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Stack (comma separated)</FieldLabel><input value={cs.stack.join(", ")} onChange={(e) => updateCS(cs.id, "stack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} /></div>

                {/* Metrics */}
                <div>
                  <FieldLabel>Metrics</FieldLabel>
                  <div className="space-y-2">
                    {cs.metrics.map((m, j) => (
                      <div key={j} className="flex gap-2">
                        <input value={m.value} onChange={(e) => updateCS(cs.id, "metrics", cs.metrics.map((x, k) => k === j ? { ...x, value: e.target.value } : x))} className={inputCls} placeholder="Value" />
                        <input value={m.label} onChange={(e) => updateCS(cs.id, "metrics", cs.metrics.map((x, k) => k === j ? { ...x, label: e.target.value } : x))} className={inputCls} placeholder="Label" />
                        <button onClick={() => updateCS(cs.id, "metrics", cs.metrics.filter((_, k) => k !== j))} className="cursor-pointer text-mute hover:text-red-300"><Trash2 size={13} /></button>
                      </div>
                    ))}
                    <button onClick={() => updateCS(cs.id, "metrics", [...cs.metrics, { value: "", label: "" }])} className="flex cursor-pointer items-center gap-2 text-[12px] text-mute hover:text-gold"><Plus size={13} /> Add metric</button>
                  </div>
                </div>

                {/* Sections */}
                <div>
                  <FieldLabel>Narrative Sections</FieldLabel>
                  <div className="space-y-4">
                    {cs.sections.map((sec, j) => (
                      <div key={j} className="rounded-xl border border-white/[0.06] bg-ink/20 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <input value={sec.heading} onChange={(e) => updateCS(cs.id, "sections", cs.sections.map((s, k) => k === j ? { ...s, heading: e.target.value } : s))} className={inputCls} placeholder="Section heading" />
                          <button onClick={() => updateCS(cs.id, "sections", cs.sections.filter((_, k) => k !== j))} className="ml-2 cursor-pointer text-mute hover:text-red-300"><Trash2 size={13} /></button>
                        </div>
                        <div>
                          <span className="text-[10px] text-mute">Paragraphs (one per line):</span>
                          <textarea value={(sec.paragraphs || []).join("\n\n")} onChange={(e) => updateCS(cs.id, "sections", cs.sections.map((s, k) => k === j ? { ...s, paragraphs: e.target.value.split("\n\n").filter(Boolean) } : s))} rows={3} className={textareaCls} />
                        </div>
                        <div>
                          <span className="text-[10px] text-mute">Bullet points (one per line):</span>
                          <textarea value={(sec.bullets || []).join("\n")} onChange={(e) => updateCS(cs.id, "sections", cs.sections.map((s, k) => k === j ? { ...s, bullets: e.target.value.split("\n").filter(Boolean) } : s))} rows={3} className={textareaCls} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => updateCS(cs.id, "sections", [...cs.sections, { heading: "", paragraphs: [], bullets: [] }])} className="flex cursor-pointer items-center gap-2 text-[12px] text-mute hover:text-gold"><Plus size={13} /> Add section</button>
                  </div>
                </div>
              </div>
            )}
          </AdminCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addCaseStudy} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-5 py-3 text-[13px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={15} /> Add Case Study
        </button>
        <SaveButton saving={saving} onClick={save} />
      </div>
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
