import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp, ArrowUp, ArrowDown } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { type Experience } from "../../data/content";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, textareaCls, StatusToast } from "./AdminUI";

export function AdminExperiences() {
  const { content } = useContent();
  const [experiences, setExperiences] = useState<Experience[]>(content.experiences.map((e) => ({ ...e, bullets: [...e.bullets], skills: [...e.skills] })));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateExp = (id: string, key: string, value: any) => {
    setExperiences((prev) => prev.map((e) => e.id === id ? { ...e, [key]: value } : e));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`, role: "", org: "", period: "", location: "", kind: "",
      summary: "", bullets: [], lesson: "", skills: [],
    };
    setExperiences((p) => [...p, newExp]);
    setExpanded(newExp.id);
  };

  const removeExperience = (id: string) => {
    setExperiences((p) => p.filter((e) => e.id !== id));
  };

  const moveExperience = (index: number, dir: "up" | "down") => {
    setExperiences((prev) => {
      const arr = [...prev];
      if (dir === "up" && index > 0) [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      else if (dir === "down" && index < arr.length - 1) [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("experiences", experiences);
      showToast("Experiences saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Experiences" description="Add, edit, or remove your work experiences." />

      <div className="space-y-3 mb-6">
        {experiences.map((exp, index) => (
          <AdminCard key={exp.id} className="!p-0">
            {/* Collapsed header */}
            <button
              onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}
              className="flex w-full cursor-pointer items-center justify-between p-5 text-left"
            >
              <div>
                <p className="text-[14px] font-medium text-cream">{exp.role || "New Experience"}</p>
                <p className="text-[12px] text-mute">{exp.org} · {exp.period}</p>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="flex items-center mr-1 border-r border-white/10 pr-2">
                  <button onClick={(e) => { e.stopPropagation(); moveExperience(index, "up"); }} disabled={index === 0} className="cursor-pointer p-1.5 text-mute hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed"><ArrowUp size={14} /></button>
                  <button onClick={(e) => { e.stopPropagation(); moveExperience(index, "down"); }} disabled={index === experiences.length - 1} className="cursor-pointer p-1.5 text-mute hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed"><ArrowDown size={14} /></button>
                </div>
                <button onClick={(e) => { e.stopPropagation(); removeExperience(exp.id); }} className="cursor-pointer rounded-lg border border-white/10 p-2 text-mute hover:text-red-300 transition-colors">
                  <Trash2 size={13} />
                </button>
                {expanded === exp.id ? <ChevronUp size={16} className="text-mute" /> : <ChevronDown size={16} className="text-mute" />}
              </div>
            </button>

            {/* Expanded form */}
            {expanded === exp.id && (
              <div className="border-t border-white/[0.06] p-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><FieldLabel>Role / Title</FieldLabel><input value={exp.role} onChange={(e) => updateExp(exp.id, "role", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Organization</FieldLabel><input value={exp.org} onChange={(e) => updateExp(exp.id, "org", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Period</FieldLabel><input value={exp.period} onChange={(e) => updateExp(exp.id, "period", e.target.value)} className={inputCls} placeholder="e.g. Mar 2026 — Present" /></div>
                  <div><FieldLabel>Location</FieldLabel><input value={exp.location} onChange={(e) => updateExp(exp.id, "location", e.target.value)} className={inputCls} /></div>
                  <div><FieldLabel>Kind</FieldLabel><input value={exp.kind} onChange={(e) => updateExp(exp.id, "kind", e.target.value)} className={inputCls} placeholder="e.g. Independent business" /></div>
                </div>
                <div><FieldLabel>Summary</FieldLabel><textarea value={exp.summary} onChange={(e) => updateExp(exp.id, "summary", e.target.value)} rows={3} className={textareaCls} /></div>

                {/* Bullets */}
                <div>
                  <FieldLabel>Key Points</FieldLabel>
                  <div className="space-y-2">
                    {exp.bullets.map((b, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <textarea value={b} onChange={(e) => updateExp(exp.id, "bullets", exp.bullets.map((v, k) => k === j ? e.target.value : v))} rows={2} className={`${textareaCls} flex-1`} />
                        <button onClick={() => updateExp(exp.id, "bullets", exp.bullets.filter((_, k) => k !== j))} className="mt-3 cursor-pointer text-mute hover:text-red-300"><Trash2 size={13} /></button>
                      </div>
                    ))}
                    <button onClick={() => updateExp(exp.id, "bullets", [...exp.bullets, ""])} className="flex cursor-pointer items-center gap-2 text-[12px] text-mute hover:text-gold transition-colors">
                      <Plus size={13} /> Add point
                    </button>
                  </div>
                </div>

                <div><FieldLabel>PM Lesson</FieldLabel><textarea value={exp.lesson} onChange={(e) => updateExp(exp.id, "lesson", e.target.value)} rows={3} className={textareaCls} /></div>

                {/* Skills */}
                <div>
                  <FieldLabel>Skills (comma separated)</FieldLabel>
                  <input
                    value={exp.skills.join(", ")}
                    onChange={(e) => updateExp(exp.id, "skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                    className={inputCls}
                    placeholder="React, Firebase, Product strategy"
                  />
                </div>
              </div>
            )}
          </AdminCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addExperience} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-5 py-3 text-[13px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={15} /> Add Experience
        </button>
        <SaveButton saving={saving} onClick={save} />
      </div>
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
