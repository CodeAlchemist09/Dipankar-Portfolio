import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { useContent, saveContentSection } from "../../hooks/useFirestoreContent";
import { AdminSectionHeader, AdminCard, SaveButton, FieldLabel, inputCls, StatusToast } from "./AdminUI";

export function AdminHero() {
  const { content } = useContent();
  const [heroStats, setHeroStats] = useState([...content.heroStats]);
  const [marqueeItems, setMarqueeItems] = useState([...content.marqueeItems]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const updateStat = (i: number, key: string, value: string | number) => {
    setHeroStats((prev) => prev.map((s, j) => j === i ? { ...s, [key]: value } : s));
  };

  const save = async () => {
    setSaving(true);
    try {
      await saveContentSection("heroStats", heroStats);
      await saveContentSection("marqueeItems", marqueeItems);
      showToast("Hero section saved!");
    } catch { showToast("Save failed"); }
    setSaving(false);
  };

  return (
    <div>
      <AdminSectionHeader title="Hero Section" description="Edit the hero stats and marquee ticker items." />

      {/* Hero Stats */}
      <AdminCard className="mb-6">
        <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Hero Stats</h3>
        <div className="space-y-4">
          {heroStats.map((stat, i) => (
            <div key={i} className="grid gap-3 rounded-xl border border-white/[0.06] bg-ink/30 p-4 sm:grid-cols-4">
              <div><FieldLabel>Value</FieldLabel><input type="number" step="any" value={stat.value} onChange={(e) => updateStat(i, "value", parseFloat(e.target.value) || 0)} className={inputCls} /></div>
              <div><FieldLabel>Suffix</FieldLabel><input value={stat.suffix} onChange={(e) => updateStat(i, "suffix", e.target.value)} className={inputCls} placeholder="%, +, etc." /></div>
              <div><FieldLabel>Label</FieldLabel><input value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} className={inputCls} /></div>
              <div className="flex items-end gap-2">
                <div className="flex-1"><FieldLabel>Note</FieldLabel><input value={stat.note} onChange={(e) => updateStat(i, "note", e.target.value)} className={inputCls} /></div>
                <button onClick={() => setHeroStats((p) => p.filter((_, j) => j !== i))} className="mb-0.5 cursor-pointer rounded-lg border border-white/10 p-3 text-mute hover:border-red-400/30 hover:text-red-300 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setHeroStats((p) => [...p, { value: 0, suffix: "", decimals: 0, label: "", note: "" }])}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-[12px] text-mute hover:border-gold/40 hover:text-gold transition-colors"
          >
            <Plus size={14} /> Add Stat
          </button>
        </div>
      </AdminCard>

      {/* Marquee Items */}
      <AdminCard className="mb-6">
        <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Marquee Ticker Items</h3>
        <div className="space-y-2">
          {marqueeItems.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical size={14} className="shrink-0 text-mute/40" />
              <input
                value={item}
                onChange={(e) => setMarqueeItems((p) => p.map((v, j) => j === i ? e.target.value : v))}
                className={inputCls}
              />
              <button onClick={() => setMarqueeItems((p) => p.filter((_, j) => j !== i))} className="cursor-pointer rounded-lg border border-white/10 p-2.5 text-mute hover:border-red-400/30 hover:text-red-300 transition-colors">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button
            onClick={() => setMarqueeItems((p) => [...p, ""])}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-white/15 px-4 py-2.5 text-[12px] text-mute hover:border-gold/40 hover:text-gold transition-colors"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>
      </AdminCard>

      <SaveButton saving={saving} onClick={save} />
      {toast && <StatusToast message={toast} />}
    </div>
  );
}
