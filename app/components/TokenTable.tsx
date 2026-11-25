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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel rounded-2xl p-10 text-center my-6"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="text-[var(--text-dim)] text-xs font-mono uppercase tracking-wider mb-2">
            No matching tokens found
          </div>
          <div className="text-[var(--text-muted)] text-xs font-mono">
            Try adjusting your liquidity or age filters
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.16 }}
      className="glass-panel rounded-2xl overflow-hidden mb-8 border-t-4 border-blue-500/30"
    >
      <table className="w-full text-left text-xs font-mono divide-y divide-white/5">
        <thead>
          <tr className="bg-[#0a0c14]/50 text-[10px] uppercase tracking-wider text-[var(--text-dim)] border-b border-white/10">
            <th className="py-4 px-5 w-8 text-center">#</th>
            <th className="py-4 px-5">Asset</th>
            <th className="py-4 px-5 text-right">Price</th>
            <th className="py-4 px-5 text-right">24h Vol</th>
            <th className="py-4 px-5 text-right">Liquidity</th>
            <th className="py-4 px-5 text-right">Age</th>
            <th className="py-4 px-5 text-center w-32">Safety</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {tokens.map((token, i) => (
            <TokenRow key={token.address} token={token} index={i} />
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}