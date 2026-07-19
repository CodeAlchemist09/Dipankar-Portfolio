import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { type Education } from "../../data/content";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, textareaCls, StatusToast } from "./AdminUI";

export function AdminEducation() {
  const { content } = useContent();
  const [education, setEducation] = useState<Education[]>(content.education.map((e) => ({ ...e, notes: [...e.notes], highlights: [...e.highlights] })));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateEd = (id: string, key: string, value: any) => {
    setEducation((prev) => prev.map((e) => e.id === id ? { ...e, [key]: value } : e));
  };

  const addEducation = () => {
    const n: Education = { id: `edu_${Date.now()}`, school: "", program: "", field: "", period: "", monogram: "", notes: [], highlights: [] };
    setEducation((p) => [...p, n]);
    setExpanded(n.id);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("education", education);
      showToast("Education saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Education" description="Manage your academic background, notes, and highlights." />

      <div className="space-y-3 mb-6">
        {education.map((ed) => (
          <AdminCard key={ed.id} className="!p-0">
            <button onClick={() => setExpanded(expanded === ed.id ? null : ed.id)} className="flex w-full cursor-pointer items-center justify-between p-5 text-left">
              <div>
                <p className="text-[14px] font-medium text-cream">{ed.school || "New Education Entry"}</p>
                <p className="text-[12px] text-mute">{ed.program} · {ed.period}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); setEducation((p) => p.filter((x) => x.id !== ed.id)); }} className="cursor-pointer rounded-lg border border-white/10 p-2 text-mute hover:text-red-300 transition-colors">
                  <Trash2 size={13} />
                </button>
                {expanded === ed.id ? <ChevronUp size={16} className="text-mute" /> : <ChevronDown size={16} className="text-mute" />}
              </div>
            </button>

            {expanded === ed.id && (
              <div className="border-t border-white/[0.06] p-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><FieldLabel>School</FieldLabel><input value={ed.school} onChange={(e) => updateEd(ed.id, "school", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Program / Degree</FieldLabel><input value={ed.program} onChange={(e) => updateEd(ed.id, "program", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Field</FieldLabel><input value={ed.field} onChange={(e) => updateEd(ed.id, "field", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Period</FieldLabel><input value={ed.period} onChange={(e) => updateEd(ed.id, "period", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Monogram (e.g. KGP)</FieldLabel><input value={ed.monogram} onChange={(e) => updateEd(ed.id, "monogram", e.target.value)} className={inputCls} /></div>
                </div>

                <div>
                  <FieldLabel>Notes (one per line)</FieldLabel>
                  <textarea value={(ed.notes || []).join("\n")} onChange={(e) => updateEd(ed.id, "notes", e.target.value.split("\n").filter(Boolean))} rows={3} className={textareaCls} />
                </div>
                <div>
                  <FieldLabel>Highlights (one per line)</FieldLabel>
                  <textarea value={(ed.highlights || []).join("\n")} onChange={(e) => updateEd(ed.id, "highlights", e.target.value.split("\n").filter(Boolean))} rows={3} className={textareaCls} />
                </div>
              </div>
            )}
          </AdminCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addEducation} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-5 py-3 text-[13px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={15} /> Add Education Entry
        </button>
        <SaveButton saving={saving} onClick={save} />
      </div>
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
