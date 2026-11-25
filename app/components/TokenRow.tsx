'use client';

import { motion } from 'framer-motion';
import type { Token } from '@/lib/types';
import { SafetyBadge } from './SafetyBadge';

interface TokenRowProps {
  token: Token;
  index: number;
}

export function TokenRow({ token, index }: TokenRowProps) {
  const isPositive = token.priceChange24h >= 0;
  const changeColor = isPositive ? 'text-emerald-400' : 'text-rose-400';
  const prefix = isPositive ? '+' : '';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.02, 0.2) }}
      className="group transition-all duration-150 bg-[#0b0f1e]/30 hover:bg-white/5 border-b border-white/5"
    >
      <td className="py-4 px-5 font-mono text-[11px] text-[var(--text-dim)] font-medium w-8">
        {index + 1}
      </td>
      <td className="py-4 px-5">
        <div className="flex flex-col gap-1.5">
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center gap-2"
          >
            <span className="font-bold text-[var(--text-main)] text-sm tracking-tight hover:text-blue-400 transition-colors cursor-pointer">
              ${token.symbol}
            </span>
            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${changeColor} bg-white/5 border border-white/10`}>
              {prefix}{token.priceChange24h.toFixed(1)}%
            </span>
          </motion.div>
          <a
            href={token.bscScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--text-dim)] hover:text-blue-400 transition-colors"
          >
            <span className="truncate max-w-[120px]">{token.address.slice(0, 6)}…{token.address.slice(-4)}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40 ml-0.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--text-main)] text-xs font-medium tabular-nums">
        ${token.priceUsd < 0.00001 ? token.priceUsd.toFixed(8) : token.priceUsd.toFixed(6)}
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--text-muted)] text-xs tabular-nums">
        ${(token.volume24h / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--text-muted)] text-xs tabular-nums">
        ${(token.liquidityUsd / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--text-dim)] text-xs tabular-nums">
        {token.ageHours.toFixed(1)}h
      </td>
      <td className="py-4 px-5">
        <div className="flex justify-center">
          <SafetyBadge
            verified={token.contractVerified}
            locked={token.liquidityLocked}
            holders={token.holderCount}
            top10Pct={token.top10HolderPct}
            isRisk={token.isHoneypotRisk}
          />
        </div>
      </td>
    </motion.tr>
  );
}