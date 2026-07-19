import { useState } from "react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, textareaCls, StatusToast } from "./AdminUI";

export function AdminContact() {
  const { content } = useContent();
  const [contact, setContact] = useState({ ...content.contact, heading: [...content.contact.heading] });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("contact", contact);
      showToast("Contact section saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Contact Section" description="Edit the final call-to-action block at the bottom of the page." />

      <AdminCard className="mb-6">
        <div className="space-y-4">
          <div><FieldLabel>Heading Line 1</FieldLabel><input value={contact.heading[0]} onChange={(e) => setContact((p) => ({ ...p, heading: [e.target.value, p.heading[1]] }))} className={inputCls} /></div>
          <div><FieldLabel>Heading Line 2 (italic gold)</FieldLabel><input value={contact.heading[1]} onChange={(e) => setContact((p) => ({ ...p, heading: [p.heading[0], e.target.value] }))} className={inputCls} /></div>
          <div><FieldLabel>Blurb</FieldLabel><textarea value={contact.blurb} onChange={(e) => setContact((p) => ({ ...p, blurb: e.target.value }))} rows={3} className={textareaCls} /></div>
        </div>
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
