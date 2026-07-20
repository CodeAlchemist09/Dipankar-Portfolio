import { useState } from "react";
import { Plus, Trash2, Upload, ExternalLink } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { certCategories, type Certification } from "../../data/content";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, StatusToast } from "./AdminUI";

export function AdminCertifications() {
  const { content } = useContent();
  const [certifications, setCertifications] = useState<Certification[]>(content.certifications.map((c) => ({ ...c, skills: c.skills ? [...c.skills] : undefined })));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateCert = (id: string, key: string, value: any) => {
    setCertifications((prev) => prev.map((c) => c.id === id ? { ...c, [key]: value } : c));
  };

  const addCert = () => {
    const n: Certification = { id: `cert_${Date.now()}`, name: "", issuer: "", date: "", category: "Product", credId: "", link: "", fileUrl: "", skills: [] };
    setCertifications((p) => [...p, n]);
  };

  const handleUpload = async (id: string, file: File) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    if (!cloudName || !uploadPreset) { showToast("Cloudinary config missing in .env"); return; }
    
    setUploadingId(id);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      updateCert(id, "fileUrl", data.secure_url);
      showToast("File uploaded!");
    } catch (err: any) {
      console.error(err);
      showToast("Error: " + (err.message || "Upload failed"));
    }
    setUploadingId(null);
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
                <div><FieldLabel>Credential ID</FieldLabel><input value={c.credId || ""} onChange={(e) => updateCert(c.id, "credId", e.target.value)} className={inputCls} /></div>
                <div><FieldLabel>Credential URL</FieldLabel><input value={c.link || ""} onChange={(e) => updateCert(c.id, "link", e.target.value)} className={inputCls} placeholder="https://..." /></div>
                <div className="sm:col-span-2"><FieldLabel>Skills (comma separated)</FieldLabel><input value={(c.skills || []).join(", ")} onChange={(e) => updateCert(c.id, "skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className={inputCls} /></div>
                
                <div className="sm:col-span-2">
                  <FieldLabel>Soft Copy / Certificate File</FieldLabel>
                  <div className="flex items-center gap-3 mt-1">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-[12px] text-mute hover:border-gold/30 hover:text-gold transition-colors">
                      <Upload size={13} />
                      {uploadingId === c.id ? "Uploading..." : "Upload File"}
                      <input type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(c.id, f); e.target.value = ""; }} />
                    </label>
                    {c.fileUrl && (
                      <>
                        <a href={c.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[12px] text-emerald-300 hover:text-emerald-200 transition-colors">
                          <ExternalLink size={12} /> View File
                        </a>
                        <button onClick={() => updateCert(c.id, "fileUrl", "")} className="cursor-pointer text-[12px] text-mute hover:text-red-300 transition-colors">
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>
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
