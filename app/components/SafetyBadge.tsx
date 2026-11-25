'use client';

import { motion } from 'framer-motion';

interface SafetyBadgeProps {
  verified: boolean;
  locked: boolean;
  holders: number;
  top10Pct: number;
  isRisk: boolean;
}

const checks = [
  { key: 'verified', label: 'Verified', pass: (p: SafetyBadgeProps) => p.verified },
  { key: 'locked', label: 'Locked', pass: (p: SafetyBadgeProps) => p.locked },
  { key: 'holders', label: 'Holders ≥50', pass: (p: SafetyBadgeProps) => p.holders >= 50 },
  { key: 'top10', label: 'Top10 ≤80%', pass: (p: SafetyBadgeProps) => p.top10Pct <= 80 },
] as const;

export function SafetyBadge({ verified, locked, holders, top10Pct, isRisk }: SafetyBadgeProps) {
  const props = { verified, locked, holders, top10Pct, isRisk };

  if (isRisk) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.9, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-pill)] text-xs font-medium"
        style={{
          backgroundColor: 'rgba(198, 69, 69, 0.12)',
          color: 'var(--color-error)',
          border: '1px solid rgba(198, 69, 69, 0.25)',
        }}
        title="⚠️ Risk flags: unverified contract, low holders, high concentration, or unlocked liquidity"
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, delay: 1 }}
          className="flex-shrink-0"
        >
          ⚠
        </motion.span>
        Risk
      </motion.span>
    );
  }

  const passedChecks = checks.filter((c) => c.pass(props));
  const failedChecks = checks.filter((c) => !c.pass(props));
  const allPassed = failedChecks.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="inline-flex flex-wrap items-center gap-1.5"
      role="group"
      aria-label="Safety checks"
    >
      {checks.map((check, idx) => {
        const pass = check.pass(props);
        return (
          <motion.span
            key={check.key}
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.05 * idx, duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-pill)] text-xs font-medium transition-all duration-200"
            style={{
              backgroundColor: pass
                ? 'rgba(93, 184, 114, 0.12)'
                : 'rgba(212, 160, 23, 0.12)',
              color: pass ? 'var(--color-success)' : 'var(--color-warning)',
              border: pass
                ? '1px solid rgba(93, 184, 114, 0.25)'
                : '1px solid rgba(212, 160, 23, 0.25)',
            }}
            title={pass ? `${check.label} ✓` : `${check.label} — needs review`}
          >
            <motion.span
              animate={{ scale: pass ? [1, 1.15, 1] : [1, 0.9, 1], rotate: pass ? [0, 5, -5, 0] : 0 }}
              transition={{ duration: pass ? 0.6 : 0.4, repeat: Infinity, delay: pass ? 1.5 : 0.8 }}
              className="flex-shrink-0"
            >
              {pass ? '✓' : '⚠'}
            </motion.span>
            <span className="font-medium" style={{ fontFamily: 'var(--font-body)' }}>
              {check.label}
            </span>
          </motion.span>
        );
      })}

      {allPassed && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: checks.length * 0.05 + 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="ml-1 inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-pill)] badge-coral text-[10px]"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: 'var(--color-on-primary)' }}
          />
          Safe
        </motion.span>
      )}
    </motion.div>
  );
}