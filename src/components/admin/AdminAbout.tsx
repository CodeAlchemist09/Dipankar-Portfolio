import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, textareaCls, StatusToast } from "./AdminUI";

export function AdminAbout() {
  const { content } = useContent();
  const [about, setAbout] = useState({ ...content.about, journey: [...content.about.journey], lens: { ...content.about.lens }, topSkills: [...content.about.topSkills] });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("about", about);
      showToast("About section saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="About / Story" description="Edit the narrative, journey milestones, and lens section." />

      <AdminCard className="mb-6">
        <div className="space-y-4">
          <div><FieldLabel>Lead Paragraph</FieldLabel><textarea value={about.lead} onChange={(e) => setAbout((p) => ({ ...p, lead: e.target.value }))} rows={3} className={textareaCls} /></div>
          <div><FieldLabel>Thread (italic gold line)</FieldLabel><input value={about.thread} onChange={(e) => setAbout((p) => ({ ...p, thread: e.target.value }))} className={inputCls} /></div>
          <div><FieldLabel>What I'm doing now</FieldLabel><textarea value={about.now} onChange={(e) => setAbout((p) => ({ ...p, now: e.target.value }))} rows={3} className={textareaCls} /></div>
        </div>
      </AdminCard>

      {/* Journey items */}
      <AdminCard className="mb-6">
        <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Journey Milestones</h3>
        <div className="space-y-2">
          {about.journey.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <textarea value={item} onChange={(e) => setAbout((p) => ({ ...p, journey: p.journey.map((v, j) => j === i ? e.target.value : v) }))} rows={2} className={`${textareaCls} flex-1`} />
              <button onClick={() => setAbout((p) => ({ ...p, journey: p.journey.filter((_, j) => j !== i) }))} className="mt-3 cursor-pointer rounded-lg border border-white/10 p-2.5 text-mute hover:text-red-300 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button onClick={() => setAbout((p) => ({ ...p, journey: [...p.journey, ""] }))} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-[12px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
            <Plus size={14} /> Add Milestone
          </button>
        </div>
      </AdminCard>

      {/* Lens */}
      <AdminCard className="mb-6">
        <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">The Unusual Lens</h3>
        <div className="space-y-4">
          <div><FieldLabel>Quote</FieldLabel><textarea value={about.lens.quote} onChange={(e) => setAbout((p) => ({ ...p, lens: { ...p.lens, quote: e.target.value } }))} rows={2} className={textareaCls} /></div>
          <div><FieldLabel>Note</FieldLabel><textarea value={about.lens.note} onChange={(e) => setAbout((p) => ({ ...p, lens: { ...p.lens, note: e.target.value } }))} rows={2} className={textareaCls} /></div>
        </div>
      </AdminCard>

      {/* Top Skills */}
      <AdminCard className="mb-6">
        <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Top Skills (profile card)</h3>
        <div className="space-y-2">
          {about.topSkills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <input value={skill} onChange={(e) => setAbout((p) => ({ ...p, topSkills: p.topSkills.map((v, j) => j === i ? e.target.value : v) }))} className={inputCls} />
              <button onClick={() => setAbout((p) => ({ ...p, topSkills: p.topSkills.filter((_, j) => j !== i) }))} className="cursor-pointer rounded-lg border border-white/10 p-2.5 text-mute hover:text-red-300 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button onClick={() => setAbout((p) => ({ ...p, topSkills: [...p.topSkills, ""] }))} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-[12px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
            <Plus size={14} /> Add Skill
          </button>
        </div>
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
