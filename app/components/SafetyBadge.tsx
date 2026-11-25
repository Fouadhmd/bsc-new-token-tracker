'use client';

interface SafetyBadgeProps {
  verified: boolean;
  locked: boolean;
  holders: number;
  top10Pct: number;
  isRisk: boolean;
}

export function SafetyBadge({ verified, locked, holders, top10Pct, isRisk }: SafetyBadgeProps) {
  if (isRisk) {
    return (
      <span
        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20"
        title="Risk flags detected"
      >
        ⚠ RISK
      </span>
    );
  }

  const checks = [
    { label: 'VERIF', pass: verified },
    { label: 'LOCK', pass: locked },
    { label: 'HOLD', pass: holders >= 50 },
    { label: 'DIST', pass: top10Pct <= 80 },
  ];

  return (
    <div className="flex items-center justify-center gap-1">
      {checks.map((c, i) => (
        <span
          key={i}
          className={`inline-flex items-center justify-center w-5 h-5 rounded text-[9px] font-mono font-bold ${
            c.pass
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}
          title={`${c.label}: ${c.pass ? 'Pass' : 'Fail'}`}
        >
          {c.pass ? '✓' : '!'}
        </span>
      ))}
    </div>
  );
}