'use client';

import { motion } from 'framer-motion';

interface MetaBannerProps {
  fetchedAt: string;
  totalPairsScanned: number;
  tokensAfterFilter: number;
  nextRefresh: string;
}

export function MetaBanner({ fetchedAt, totalPairsScanned, tokensAfterFilter, nextRefresh }: MetaBannerProps) {
  const syncTime = new Date(fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-xl p-3 sm:p-4 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono"
    >
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px]">Scanned</span>
          <span className="font-bold text-[var(--text-main)] text-sm">{totalPairsScanned.toLocaleString()}</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px]">Filtered Passes</span>
          <span className="font-bold text-[var(--success)] text-sm flex items-center gap-1.5">
            {tokensAfterFilter}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </span>
        </div>
        <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-dim)] uppercase tracking-wider text-[10px]">Network</span>
          <span className="font-bold text-blue-400 text-sm">BSC Mainnet</span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[var(--text-muted)]">
        <span>Sync: {syncTime}</span>
        <span className="text-white/20">|</span>
        <span>Auto-refresh: 15m</span>
      </div>
    </motion.div>
  );
}