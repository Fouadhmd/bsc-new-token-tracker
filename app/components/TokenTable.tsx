'use client';

import { motion } from 'framer-motion';
import type { Token } from '@/lib/types';
import { TokenRow } from './TokenRow';

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  if (tokens.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="text-center py-16 border border-[var(--color-hairline)] rounded-[var(--radius-xl)] bg-[var(--color-surface-card)] my-6"
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-pill)] badge-pill mb-4"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span className="text-[var(--color-muted)] text-sm font-medium">No matching tokens</span>
        </motion.div>
        <p className="text-[var(--color-muted-soft)] text-sm">
          Adjust your filters to see more results
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
      className="table-wrapper"
    >
      <table className="data-table">
        <thead>
          <tr>
            <th className="w-12" scope="col">#</th>
            <th scope="col">Asset</th>
            <th className="text-right" scope="col">Price</th>
            <th className="text-right" scope="col">24h Vol</th>
            <th className="text-right" scope="col">Liquidity</th>
            <th className="text-right" scope="col">Age</th>
            <th className="text-center" scope="col">Safety</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <TokenRow key={token.address} token={token} index={i} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}