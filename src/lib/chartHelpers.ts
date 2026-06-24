// lib/chartHelpers.ts
export const calculateStats = (data: any[]) => {
  const latest = data[data.length - 1];
  const total = Math.round(latest.active + latest.pending + latest.rejected);
  const active = Math.round(latest.active);
  const pending = Math.round(latest.pending);
  const rejected = Math.round(latest.rejected);
  const activePct = ((active / total) * 100).toFixed(1);
  const pendingPct = ((pending / total) * 100).toFixed(1);
  const rejectedPct = ((rejected / total) * 100).toFixed(1);
  
  return { total, active, pending, rejected, activePct, pendingPct, rejectedPct };
};