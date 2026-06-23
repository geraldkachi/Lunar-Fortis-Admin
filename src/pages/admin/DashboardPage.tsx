// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CHART_DATA, MERCHANT_LOCATIONS } from "@/lib/mockData";

const STATS = [
  { label: "TOTAL MERCHANTS", value: "--" },
  { label: "ACTIVE MERCHANTS", value: "--" },
  { label: "PENDING MERCHANTS", value: "--" },
  { label: "DEACTIVATED MERCHANTS", value: "--" },
];

function DonutChart({ active, pending, rejected, total }: { active: number; pending: number; rejected: number; total: number }) {
  const size = 140;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const aFrac = active / total;
  const pFrac = pending / total;
  const rFrac = rejected / total;
  const aLen = circ * aFrac;
  const pLen = circ * pFrac;
  const rLen = circ * rFrac;
  const aOff = 0;
  const pOff = -(aLen);
  const rOff = -(aLen + pLen);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F3F4F6" strokeWidth={18} />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#10B981" strokeWidth={18}
            strokeDasharray={`${aLen} ${circ - aLen}`} strokeDashoffset={aOff} strokeLinecap="round" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F59E0B" strokeWidth={18}
            strokeDasharray={`${pLen} ${circ - pLen}`} strokeDashoffset={pOff} strokeLinecap="round" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#EF4444" strokeWidth={18}
            strokeDasharray={`${rLen} ${circ - rLen}`} strokeDashoffset={rOff} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ transform: "none" }}>
          <p className="text-2xl font-bold text-[#0D1B2A]">{total}</p>
          <p className="text-xs text-[#6B7280]">Merchants</p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const total = 354;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Merchants</h1>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {STATS.map(s => (
          <div key={s.label} className="stat-card">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">{s.label}</p>
            <p className="text-2xl font-bold text-[#0D1B2A]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {/* Merchant Overview donut */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">Merchant Overview</h3>
          <div className="flex flex-col items-center">
            <DonutChart active={344} pending={5} rejected={5} total={total} />
            <div className="mt-4 space-y-2 w-full">
              {[
                { label: "Active Merchants", pct: "97.3%", color: "#10B981" },
                { label: "Pending Merchants", pct: "2.7%", color: "#F59E0B" },
                { label: "Rejected Merchants", pct: "2.7%", color: "#EF4444" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-[#6B7280]">{label}</span>
                  </div>
                  <span className="font-semibold text-[#0D1B2A]">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KYB Overview donut */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">KYB Overview</h3>
          <div className="flex flex-col items-center">
            <DonutChart active={344} pending={5} rejected={5} total={total} />
            <div className="mt-4 space-y-2 w-full">
              {[
                { label: "Approved KYB", pct: "97.3%", color: "#10B981" },
                { label: "Pending KYB", pct: "2.7%", color: "#F59E0B" },
                { label: "Rejected KYB", pct: "2.7%", color: "#EF4444" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
                    <span className="text-[#6B7280]">{label}</span>
                  </div>
                  <span className="font-semibold text-[#0D1B2A]">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Merchant Locations */}
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
          <h3 className="text-sm font-bold text-[#0D1B2A] mb-4">Top Merchant Location</h3>
          <div className="space-y-3">
            {MERCHANT_LOCATIONS.map(loc => (
              <div key={loc.city}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#6B7280]">{loc.city}</span>
                  <span className="font-medium text-[#0D1B2A]">{loc.count}</span>
                </div>
                <div className="h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: `${(loc.count / loc.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Line chart */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-[#0D1B2A]">Merchant Overview</h3>
          <div className="flex items-center gap-4 text-xs">
            {[
              { label: "Active Merchants 97.3%", color: "#10B981" },
              { label: "Pending Merchants 2.7%", color: "#F59E0B" },
              { label: "Rejected Merchants 2.7%", color: "#EF4444" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded inline-block" style={{ background: color }} />
                <span className="text-[#6B7280]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* <ResponsiveContainer width="100%" height={220}>
          <LineChart data={CHART_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }} />
            <Line type="monotone" dataKey="active" stroke="#10B981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="pending" stroke="#F59E0B" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="rejected" stroke="#EF4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer> */}
      </div>
    </div>
  );
}
