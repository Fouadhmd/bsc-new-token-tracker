'use client';

import { motion } from 'framer-motion';

interface MetaBannerProps {
  fetchedAt: string;
  totalPairsScanned: number;
  tokensAfterFilter: number;
  nextRefresh: string;
}

export function MetaBanner({ fetchedAt, totalPairsScanned, tokensAfterFilter, nextRefresh }: MetaBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-10"
    >
      <MetricCard
        label="Pairs Scanned"
        value={totalPairsScanned.toLocaleString()}
        accentColor="var(--color-muted)"
        delay={0.12}
      >
        <span className="text-[var(--color-muted-soft)] text-xs font-medium">Last sync: {new Date(fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </MetricCard>

      <MetricCard
        label="Matching Tokens"
        value={tokensAfterFilter}
        accentColor="var(--color-success)"
        delay={0.16}
        pulse
      >
        <span className="text-[var(--color-success)] text-xs font-medium">Filtered from {totalPairsScanned.toLocaleString()}</span>
      </MetricCard>

      <MetricCard
        label="Network"
        value="BSC Mainnet"
        accentColor="var(--color-accent-teal)"
        delay={0.2}
        isText
      >
        <span className="text-[var(--color-muted-soft)] text-xs font-medium">DexScreener API</span>
      </MetricCard>

      <MetricCard
        label="Auto Refresh"
        value="15 min"
        accentColor="var(--color-accent-amber)"
        delay={0.24}
        isText
      >
        <span className="text-[var(--color-muted-soft)] text-xs font-medium">Next: {nextRefresh}</span>
      </MetricCard>
    </motion.div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
  accentColor: string;
  delay: number;
  children: React.ReactNode;
  pulse?: boolean;
  isText?: boolean;
}

function MetricCard({ label, value, accentColor, delay, children, pulse, isText }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={{ y: -2, boxShadow: '0 12px 40px rgba(20, 20, 19, 0.1)' }}
      className="relative bg-[var(--color-surface-card)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-5 transition-all duration-300"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, var(--accent), transparent)` } as React.CSSProperties} />
      {pulse && (
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <motion.span
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      )}
      <div className="space-y-2">
        <span className="text-[var(--color-muted)] text-xs font-medium tracking-wide uppercase">{label}</span>
        <span className="text-2xl font-bold font-mono" style={{ color: isText ? 'var(--color-ink)' : accentColor }}>
          {value}
        </span>
        <div className="pt-1 border-t border-[var(--color-hairline-soft)]">
          {children}
        </div>
      </div>
    </motion.div>
  );
}