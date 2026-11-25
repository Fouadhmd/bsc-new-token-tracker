'use client';

import { motion } from 'framer-motion';

interface MetaBannerProps {
  fetchedAt: string;
  totalPairsScanned: number;
  tokensAfterFilter: number;
  nextRefresh: string;
}

export function MetaBanner({ fetchedAt, totalPairsScanned, tokensAfterFilter, nextRefresh }: MetaBannerProps) {
  const formattedSyncTime = new Date(fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-6"
    >
      {/* Card 1: Pairs Scanned */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-muted)] opacity-50" />
        <div className="text-[11px] text-[var(--color-muted)] font-medium uppercase tracking-wider mb-1">Pairs Scanned</div>
        <div className="text-xl font-bold font-mono text-[var(--color-ink)] mb-1">{totalPairsScanned.toLocaleString()}</div>
        <div className="text-[11px] text-[var(--color-muted-soft)] font-mono">Sync: {formattedSyncTime}</div>
      </div>

      {/* Card 2: Matching Tokens */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-success)]" />
        <div className="absolute top-3 right-3 flex items-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-success)]"></span>
          </span>
        </div>
        <div className="text-[11px] text-[var(--color-muted)] font-medium uppercase tracking-wider mb-1">Matches</div>
        <div className="text-xl font-bold font-mono text-[var(--color-success)] mb-1">{tokensAfterFilter}</div>
        <div className="text-[11px] text-[var(--color-muted-soft)] font-mono">Active filter</div>
      </div>

      {/* Card 3: Network */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-accent-teal)]" />
        <div className="text-[11px] text-[var(--color-muted)] font-medium uppercase tracking-wider mb-1">Network</div>
        <div className="text-lg font-bold font-mono text-[var(--color-ink)] mb-1 truncate">BSC Mainnet</div>
        <div className="text-[11px] text-[var(--color-muted-soft)] font-mono">DexScreener API</div>
      </div>

      {/* Card 4: Auto Refresh */}
      <div className="bg-[var(--color-surface-card)] border border-[var(--color-hairline)] rounded-[var(--radius-lg)] p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-[var(--color-accent-amber)]" />
        <div className="text-[11px] text-[var(--color-muted)] font-medium uppercase tracking-wider mb-1">Refresh Rate</div>
        <div className="text-lg font-bold font-mono text-[var(--color-ink)] mb-1">15 min</div>
        <div className="text-[11px] text-[var(--color-muted-soft)] font-mono truncate">Auto-sync active</div>
      </div>
    </motion.div>
  );
}