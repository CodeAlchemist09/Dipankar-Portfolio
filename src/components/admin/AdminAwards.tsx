import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, StatusToast } from "./AdminUI";

export function AdminAwards() {
  const { content } = useContent();
  const [awards, setAwards] = useState(content.awards.map((a) => ({ ...a })));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateAward = (i: number, key: string, value: string) => {
    setAwards((prev) => prev.map((a, j) => j === i ? { ...a, [key]: value } : a));
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("awards", awards);
      showToast("Awards saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Honors & Awards" description="Manage your awards and recognitions." />

      <div className="space-y-3 mb-6">
        {awards.map((a, i) => (
          <AdminCard key={i}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                <div><FieldLabel>Title</FieldLabel><input value={a.title} onChange={(e) => updateAward(i, "title", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Organization</FieldLabel><input value={a.org} onChange={(e) => updateAward(i, "org", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Year</FieldLabel><input value={a.year} onChange={(e) => updateAward(i, "year", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Note</FieldLabel><input value={a.note} onChange={(e) => updateAward(i, "note", e.target.value)} className={inputCls} /></div>
                <div>
                  <FieldLabel>Icon</FieldLabel>
                  <select value={a.icon} onChange={(e) => updateAward(i, "icon", e.target.value)} className={inputCls}>
                    {["Trophy", "Medal", "Award", "FlaskConical", "Target"].map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => setAwards((p) => p.filter((_, j) => j !== i))} className="mt-6 cursor-pointer rounded-lg border border-white/10 p-2.5 text-mute hover:text-red-300 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={() => setAwards((p) => [...p, { title: "", org: "", year: "", note: "", icon: "Trophy" }])} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-5 py-3 text-[13px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={15} /> Add Award
        </button>
        <SaveButton saving={saving} onClick={save} />
      </div>
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
