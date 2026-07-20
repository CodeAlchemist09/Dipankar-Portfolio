import { useState } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { artifactTypes, type Artifact, type ArtifactType } from "../../data/content";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, textareaCls, StatusToast } from "./AdminUI";

export function AdminArtifacts() {
  const { content } = useContent();
  const [artifacts, setArtifacts] = useState<Artifact[]>(content.artifacts.map((a) => ({ ...a, tags: [...a.tags] })));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateArt = (id: string, key: string, value: any) => {
    setArtifacts((prev) => prev.map((a) => a.id === id ? { ...a, [key]: value } : a));
  };

  const addArtifact = () => {
    const n: Artifact = { id: `art_${Date.now()}`, type: "PRD", title: "", desc: "", tags: [] };
    setArtifacts((p) => [...p, n]);
  };

  const moveArtifact = (index: number, dir: "up" | "down") => {
    setArtifacts((prev) => {
      const arr = [...prev];
      if (dir === "up" && index > 0) [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      else if (dir === "down" && index < arr.length - 1) [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("artifacts", artifacts);
      showToast("Artifacts saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="PM Artifacts" description="Manage your PRDs, teardowns, automations, and other PM work." />

      <div className="space-y-3 mb-6">
        {artifacts.map((a, index) => (
          <AdminCard key={a.id}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                <div><FieldLabel>Title</FieldLabel><input value={a.title} onChange={(e) => updateArt(a.id, "title", e.target.value)} className={inputCls} /></div>
                <div>
                  <FieldLabel>Type</FieldLabel>
                  <select value={a.type} onChange={(e) => updateArt(a.id, "type", e.target.value)} className={inputCls}>
                    {artifactTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex items-center rounded-lg border border-white/10 bg-white/[0.02]">
                  <button onClick={() => moveArtifact(index, "up")} disabled={index === 0} className="cursor-pointer p-2 text-mute hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed border-r border-white/10"><ArrowUp size={13} /></button>
                  <button onClick={() => moveArtifact(index, "down")} disabled={index === artifacts.length - 1} className="cursor-pointer p-2 text-mute hover:text-cream disabled:opacity-30 disabled:cursor-not-allowed"><ArrowDown size={13} /></button>
                </div>
                <button onClick={() => setArtifacts((p) => p.filter((x) => x.id !== a.id))} className="flex-1 cursor-pointer rounded-lg border flex justify-center border-white/10 p-2 text-mute hover:text-red-300 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <div><FieldLabel>Description</FieldLabel><textarea value={a.desc} onChange={(e) => updateArt(a.id, "desc", e.target.value)} rows={2} className={textareaCls} /></div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div><FieldLabel>Tags (comma separated)</FieldLabel><input value={a.tags.join(", ")} onChange={(e) => updateArt(a.id, "tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} /></div>
                <div><FieldLabel>Link (optional)</FieldLabel><input value={a.link || ""} onChange={(e) => updateArt(a.id, "link", e.target.value || undefined)} className={inputCls} placeholder="https://…" /></div>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addArtifact} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-5 py-3 text-[13px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={15} /> Add Artifact
        </button>
        <SaveButton saving={saving} onClick={save} />
      </div>
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
