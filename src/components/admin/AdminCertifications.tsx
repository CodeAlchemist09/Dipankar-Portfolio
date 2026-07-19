import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { certCategories, type Certification } from "../../data/content";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, StatusToast } from "./AdminUI";

export function AdminCertifications() {
  const { content } = useContent();
  const [certifications, setCertifications] = useState<Certification[]>(content.certifications.map((c) => ({ ...c, skills: c.skills ? [...c.skills] : undefined })));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateCert = (id: string, key: string, value: any) => {
    setCertifications((prev) => prev.map((c) => c.id === id ? { ...c, [key]: value } : c));
  };

  const addCert = () => {
    const n: Certification = { id: `cert_${Date.now()}`, name: "", issuer: "", date: "", category: "Product", credId: "", skills: [] };
    setCertifications((p) => [...p, n]);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("certifications", certifications);
      showToast("Certifications saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Certifications" description="Manage your credentials and certifications." />

      <div className="space-y-3 mb-6">
        {certifications.map((c) => (
          <AdminCard key={c.id}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1 grid gap-3 sm:grid-cols-2">
                <div><FieldLabel>Name</FieldLabel><input value={c.name} onChange={(e) => updateCert(c.id, "name", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Issuer</FieldLabel><input value={c.issuer} onChange={(e) => updateCert(c.id, "issuer", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Date</FieldLabel><input value={c.date} onChange={(e) => updateCert(c.id, "date", e.target.value)} className={inputCls} /></div>
                <div>
                  <FieldLabel>Category</FieldLabel>
                  <select value={c.category} onChange={(e) => updateCert(c.id, "category", e.target.value)} className={inputCls}>
                    {certCategories.filter((cat) => cat !== "All").map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div><FieldLabel>Credential ID</FieldLabel><input value={c.credId} onChange={(e) => updateCert(c.id, "credId", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Skills (comma separated)</FieldLabel><input value={(c.skills || []).join(", ")} onChange={(e) => updateCert(c.id, "skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} /></div>
              </div>
              <button onClick={() => setCertifications((p) => p.filter((x) => x.id !== c.id))} className="mt-6 cursor-pointer rounded-lg border border-white/10 p-2.5 text-mute hover:text-red-300 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          </AdminCard>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={addCert} className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-5 py-3 text-[13px] text-mute hover:border-gold/40 hover:text-gold transition-colors">
          <Plus size={15} /> Add Certification
        </button>
        <SaveButton saving={saving} onClick={save} />
      </div>
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
