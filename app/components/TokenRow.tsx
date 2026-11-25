'use client';

import { motion } from 'framer-motion';
import type { Token } from '@/lib/types';
import { SafetyBadge } from './SafetyBadge';

interface TokenRowProps {
  token: Token;
  index: number;
}

export function TokenRow({ token, index }: TokenRowProps) {
  const priceChangeClass = token.priceChange24h >= 0 ? 'text-emerald-400' : 'text-rose-400';
  const priceChangePrefix = token.priceChange24h >= 0 ? '+' : '';

  return (
    <motion.tr 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group transition-all duration-200 hover:bg-slate-800/60"
    >
      <td className="font-mono text-slate-600 text-[10px] py-5 px-6">{index + 1}</td>
      <td className="py-5 px-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-100 tracking-tight text-base hover:text-blue-400 transition-colors cursor-pointer">${token.symbol}</span>
            <motion.span 
              whileHover={{ scale: 1.1 }}
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${priceChangeClass} bg-slate-900/80 border border-white/5`}
            >
              {priceChangePrefix}{token.priceChange24h.toFixed(1)}%
            </motion.span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <a 
              href={token.bscScanUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] text-slate-500 font-mono hover:text-slate-300 transition-colors"
            >
              {token.address.slice(0, 8)}...{token.address.slice(-6)}
            </a>
          </div>
        </div>
      </td>
      <td className="text-right py-5 px-6">
        <div className="font-mono text-slate-200 text-sm font-medium">
          ${token.priceUsd.toFixed(token.priceUsd < 0.00001 ? 8 : 6)}
        </div>
      </td>
      <td className="text-right py-5 px-6 font-mono text-slate-300 text-sm">
        ${(token.volume24h / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-5 px-6 font-mono text-slate-300 text-sm">
        ${(token.liquidityUsd / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-5 px-6 font-mono text-slate-500 text-xs">
        {token.ageHours.toFixed(1)}h
      </td>
      <td className="py-5 px-6">
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