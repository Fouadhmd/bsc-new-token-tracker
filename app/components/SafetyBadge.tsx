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
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-red-900/30 text-red-400 border border-red-500/30" title="⚠️ 2+ risk flags: unverified contract, low holders, high concentration, or unlocked liquidity">
        ⚠️ Risk
      </span>
    );
  }

  const checks = [
    { label: 'Verified', pass: verified },
    { label: 'Locked', pass: locked },
    { label: `${holders} holders`, pass: holders >= 50 },
    { label: `Top10 ${top10Pct}%`, pass: top10Pct <= 80 },
  ];

  return (
    <div className="flex flex-wrap gap-1" title="Safety checks">
      {checks.map((c, i) => (
        <span key={i} className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs ${c.pass ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
          {c.pass ? '✅' : '⚠️'} {c.label}
        </span>
      ))}
    </div>
  );
}