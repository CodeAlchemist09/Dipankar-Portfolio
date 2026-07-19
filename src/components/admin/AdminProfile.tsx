import { useState, useRef } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, StatusToast } from "./AdminUI";

export function AdminProfile() {
  const { content } = useContent();
  const [profile, setProfile] = useState({ ...content.profile });
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const bannerRef = useRef<HTMLInputElement>(null);

  // sync when content changes from Firestore
  useState(() => { setProfile({ ...content.profile }); });

  const handleUpload = async (file: File, type: "photo" | "banner") => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      showToast("Cloudinary config missing in .env");
      return;
    }

    setUploading(type);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      const url = data.secure_url;

      const key = type === "photo" ? "photoURL" : "bannerURL";
      const updated = { ...profile, [key]: url };
      setProfile(updated);
      await saveContentSection("profile", updated);
      showToast("Image uploaded!");
    } catch (err) {
      showToast("Upload failed");
    }
    setUploading(null);
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("profile", profile);
      showToast("Profile saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const update = (key: string, value: string) => {
    setProfile((p: any) => ({ ...p, [key]: value }));
  };

  return (
    <div>
      <AdminSectionHeader title="Profile" description="Edit your personal info, photo, and banner image." />

      {/* Photo & Banner uploads */}
      <AdminCard className="mb-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel>Profile Photo</FieldLabel>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-full border border-white/15 bg-panel2">
                {profile.photoURL ? (
                  <img src={profile.photoURL} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-display text-xl italic text-gold">{profile.initials}</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => photoRef.current?.click()} className="cursor-pointer rounded-lg border border-white/10 px-3 py-2 text-[12px] text-mute hover:border-gold/30 hover:text-gold transition-colors">
                  <Camera size={13} className="inline mr-1.5" />
                  {uploading === "photo" ? "Uploading…" : "Upload Photo"}
                </button>
                {profile.photoURL && (
                  <button onClick={() => update("photoURL", "")} className="cursor-pointer text-[11px] text-mute hover:text-red-300 transition-colors">
                    <Trash2 size={11} className="inline mr-1" /> Remove
                  </button>
                )}
              </div>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, "photo"); e.target.value = ""; }} />
            </div>
          </div>
          <div>
            <FieldLabel>Cover Banner</FieldLabel>
            <div className="flex items-center gap-4">
              <div className="h-20 w-32 overflow-hidden rounded-lg border border-white/15 bg-panel2">
                {profile.bannerURL ? (
                  <img src={profile.bannerURL} alt="Banner" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[10px] text-mute">No banner</div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => bannerRef.current?.click()} className="cursor-pointer rounded-lg border border-white/10 px-3 py-2 text-[12px] text-mute hover:border-gold/30 hover:text-gold transition-colors">
                  <Camera size={13} className="inline mr-1.5" />
                  {uploading === "banner" ? "Uploading…" : "Upload Banner"}
                </button>
                {profile.bannerURL && (
                  <button onClick={() => update("bannerURL", "")} className="cursor-pointer text-[11px] text-mute hover:text-red-300 transition-colors">
                    <Trash2 size={11} className="inline mr-1" /> Remove
                  </button>
                )}
              </div>
              <input ref={bannerRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f, "banner"); e.target.value = ""; }} />
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Text fields */}
      <AdminCard className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><FieldLabel>First Name</FieldLabel><input value={profile.first} onChange={(e) => update("first", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Last Name</FieldLabel><input value={profile.last} onChange={(e) => update("last", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Full Name</FieldLabel><input value={profile.name} onChange={(e) => update("name", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Initials</FieldLabel><input value={profile.initials} onChange={(e) => update("initials", e.target.value)} className={inputCls} /></div>
          <div className="sm:col-span-2"><FieldLabel>Role / Title</FieldLabel><input value={profile.role} onChange={(e) => update("role", e.target.value)} className={inputCls} /></div>
          <div className="sm:col-span-2"><FieldLabel>Headline</FieldLabel><input value={profile.headline} onChange={(e) => update("headline", e.target.value)} className={inputCls} /></div>
          <div className="sm:col-span-2"><FieldLabel>Sub-headline</FieldLabel><input value={profile.sub} onChange={(e) => update("sub", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Location</FieldLabel><input value={profile.location} onChange={(e) => update("location", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Availability Status</FieldLabel><input value={profile.availability} onChange={(e) => update("availability", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Email</FieldLabel><input value={profile.email} onChange={(e) => update("email", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Phone Display</FieldLabel><input value={profile.phoneDisplay} onChange={(e) => update("phoneDisplay", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>Phone (tel:)</FieldLabel><input value={profile.phoneTel} onChange={(e) => update("phoneTel", e.target.value)} className={inputCls} /></div>
          <div><FieldLabel>WhatsApp Link</FieldLabel><input value={profile.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} className={inputCls} /></div>
          <div className="sm:col-span-2"><FieldLabel>LinkedIn URL</FieldLabel><input value={profile.linkedin} onChange={(e) => update("linkedin", e.target.value)} className={inputCls} /></div>
        </div>
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
