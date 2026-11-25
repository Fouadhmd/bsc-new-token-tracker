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
  const changeColor = isPositive ? 'var(--color-success)' : 'var(--color-error)';
  const changeBg = isPositive ? 'rgba(93, 184, 114, 0.12)' : 'rgba(198, 69, 69, 0.12)';
  const changePrefix = isPositive ? '+' : '';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ backgroundColor: 'var(--color-surface-soft)' }}
      className="transition-colors duration-200"
    >
      <td className="font-mono text-[var(--color-muted-soft)] text-[11px] py-4 px-5 font-medium tabular-nums">
        {index + 1}
      </td>
      <td className="py-4 px-5">
        <div className="flex flex-col gap-1.5">
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center gap-2.5"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-bold text-[var(--color-ink)] text-base tracking-tight cursor-pointer transition-colors hover:text-[var(--color-primary)]"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              ${token.symbol}
            </motion.span>
            <span
              className="inline-flex items-center px-2 py-0.5 rounded-[var(--radius-pill)] text-[10px] font-mono font-bold"
              style={{
                color: changeColor,
                backgroundColor: changeBg,
              }}
            >
              {changePrefix}{token.priceChange24h.toFixed(1)}%
            </span>
          </motion.div>
          <a
            href={token.bscScanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="font-mono">{token.address.slice(0, 6)}…{token.address.slice(-4)}</span>
            <motion.svg
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </motion.svg>
          </a>
        </div>
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--color-ink)] text-sm font-medium tabular-nums">
        ${token.priceUsd < 0.00001 ? token.priceUsd.toFixed(8) : token.priceUsd.toFixed(6)}
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--color-body)] text-sm tabular-nums">
        ${(token.volume24h / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--color-body)] text-sm tabular-nums">
        ${(token.liquidityUsd / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-4 px-5 font-mono text-[var(--color-muted)] text-sm tabular-nums">
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