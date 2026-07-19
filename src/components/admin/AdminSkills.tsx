import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, StatusToast } from "./AdminUI";

export function AdminSkills() {
  const { content } = useContent();
  const [skillGroups, setSkillGroups] = useState(content.skillGroups.map((g) => ({ ...g, items: [...g.items] })));
  const [mlBuilds, setMlBuilds] = useState(content.mlBuilds.map((m) => ({ ...m })));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateGroup = (i: number, key: string, value: any) => {
    setSkillGroups((prev) => prev.map((g, j) => j === i ? { ...g, [key]: value } : g));
  };

  const updateBuild = (i: number, key: string, value: string) => {
    setMlBuilds((prev) => prev.map((m, j) => j === i ? { ...m, [key]: value } : m));
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("skillGroups", skillGroups);
      await saveContentSection("mlBuilds", mlBuilds);
      showToast("Skills saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Skills & ML Builds" description="Edit your skill groups and ML project showcases." />

      {/* Skill groups */}
      <div className="space-y-4 mb-6">
        {skillGroups.map((g, i) => (
          <AdminCard key={i}>
            <div className="flex items-center justify-between mb-3">
              <div className="grid gap-3 flex-1 sm:grid-cols-2">
                <div><FieldLabel>Group Title</FieldLabel><input value={g.title} onChange={(e) => updateGroup(i, "title", e.target.value)} className={inputCls} /></div>
                <div>
                  <FieldLabel>Icon</FieldLabel>
                  <select value={g.icon} onChange={(e) => updateGroup(i, "icon", e.target.value)} className={inputCls}>
                    {["Compass", "Brain", "Hammer", "Megaphone"].map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
              <button onClick={() => setSkillGroups((p) => p.filter((_, j) => j !== i))} className="ml-3 mt-5 cursor-pointer text-mute hover:text-red-300 transition-colors"><Trash2 size={14} /></button>
            </div>
            <FieldLabel>Skills (comma separated)</FieldLabel>
            <input value={g.items.join(", ")} onChange={(e) => updateGroup(i, "items", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} />
          </AdminCard>
        ))}
        <button onClick={() => setSkillGroups((p) => [...p, { title: "", icon: "Compass", items: [] }])} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-[12px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={14} /> Add Skill Group
        </button>
      </div>

      {/* ML Builds */}
      <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">ML Builds</h3>
      <div className="space-y-3 mb-6">
        {mlBuilds.map((m, i) => (
          <AdminCard key={i}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div><FieldLabel>Title</FieldLabel><input value={m.title} onChange={(e) => updateBuild(i, "title", e.target.value)} className={inputCls} /></div>
              <div><FieldLabel>Metric</FieldLabel><input value={m.metric} onChange={(e) => updateBuild(i, "metric", e.target.value)} className={inputCls} /></div>
              <div><FieldLabel>Metric Label</FieldLabel><input value={m.metricLabel} onChange={(e) => updateBuild(i, "metricLabel", e.target.value)} className={inputCls} /></div>
              <div><FieldLabel>Stack</FieldLabel><input value={m.stack} onChange={(e) => updateBuild(i, "stack", e.target.value)} className={inputCls} /></div>
              <div className="sm:col-span-2 flex items-end gap-2">
                <div className="flex-1"><FieldLabel>Description</FieldLabel><input value={m.desc} onChange={(e) => updateBuild(i, "desc", e.target.value)} className={inputCls} /></div>
                <button onClick={() => setMlBuilds((p) => p.filter((_, j) => j !== i))} className="mb-0.5 cursor-pointer text-mute hover:text-red-300"><Trash2 size={14} /></button>
              </div>
            </div>
          </AdminCard>
        ))}
        <button onClick={() => setMlBuilds((p) => [...p, { title: "", metric: "", metricLabel: "", desc: "", stack: "" }])} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-[12px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={14} /> Add ML Build
        </button>
      </div>

      <SaveButton saving={saving} onClick={save} />
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
