import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { fetchAnalyticsSummary, type AnalyticsSummary } from "../../hooks/useAnalytics";
import { AdminSectionHeader, AdminCard } from "./AdminUI";

const COLORS = {
  primary: "#e9a23b",
  bg: "#07070a",
  panel: "#0e0e14",
  text: "#f2eee4",
  mute: "#9b98a3"
};

export function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsSummary()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-center text-[13px] text-mute">Loading analytics…</div>;
  if (!data) return <div className="p-10 text-center text-[13px] text-red-300">Failed to load analytics.</div>;

  // Process sections for chart
  const sectionData = Object.entries(data.sectionViews)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  return (
    <div>
      <AdminSectionHeader title="Visitor Analytics" description="Track how people interact with your portfolio." />

      {/* Top metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Views", value: data.totalPageViews },
          { label: "This Month", value: data.monthPageViews },
          { label: "This Week", value: data.weekPageViews },
          { label: "Today", value: data.todayPageViews },
        ].map((m) => (
          <AdminCard key={m.label} className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">{m.label}</p>
            <p className="mt-2 font-display text-4xl font-light text-cream">{m.value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <AdminCard className="lg:col-span-2">
          <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Most Viewed Sections</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectionData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: COLORS.mute, fontSize: 11 }} />
                <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ backgroundColor: COLORS.panel, borderColor: "rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12, color: COLORS.text }} />
                <Bar dataKey="views" radius={[0, 4, 4, 0]}>
                  {sectionData.map((_, i) => <Cell key={i} fill={COLORS.primary} fillOpacity={0.8 - i * 0.05} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>

        {/* Devices & Referrers */}
        <div className="space-y-6">
          <AdminCard>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Devices</h3>
            <div className="space-y-3">
              {Object.entries(data.devices).filter(([_, v]) => v > 0).map(([dev, count]) => (
                <div key={dev} className="flex items-center justify-between">
                  <span className="text-[13px] capitalize text-cream">{dev}</span>
                  <span className="font-mono text-[11px] text-mute">{count}</span>
                </div>
              ))}
            </div>
            <h3 className="mb-4 mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Browsers</h3>
            <div className="space-y-3">
              {Object.entries(data.browsers).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([b, count]) => (
                <div key={b} className="flex items-center justify-between">
                  <span className="text-[13px] text-cream">{b}</span>
                  <span className="font-mono text-[11px] text-mute">{count}</span>
                </div>
              ))}
            </div>
          </AdminCard>

          <AdminCard>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Top Referrers</h3>
            <div className="space-y-3">
              {Object.entries(data.referrers).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([ref, count]) => (
                <div key={ref} className="flex items-center justify-between overflow-hidden">
                  <span className="truncate pr-4 text-[13px] text-cream">{ref}</span>
                  <span className="shrink-0 font-mono text-[11px] text-mute">{count}</span>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
