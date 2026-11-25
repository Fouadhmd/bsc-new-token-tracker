'use client';

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
    <tr className="group transition-colors duration-150 hover:bg-slate-800/40">
      <td className="font-mono text-slate-600 text-[10px] py-4 px-4">{index + 1}</td>
      <td className="py-4 px-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-100 tracking-tight text-sm">${token.symbol}</span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${priceChangeClass} bg-slate-900/80 border border-current/10`}>
              {priceChangePrefix}{token.priceChange24h.toFixed(1)}%
            </span>
          </div>
          <a 
            href={token.bscScanUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] text-slate-600 font-mono hover:text-blue-400 mt-1.5 transition-colors"
          >
            {token.address.slice(0, 8)}...{token.address.slice(-6)}
          </a>
        </div>
      </td>
      <td className="text-right py-4 px-4">
        <div className="font-mono text-slate-200 text-sm">
          ${token.priceUsd.toFixed(token.priceUsd < 0.0001 ? 8 : 6)}
        </div>
      </td>
      <td className="text-right py-4 px-4 font-mono text-slate-300 text-sm">
        ${(token.volume24h / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-4 px-4 font-mono text-slate-300 text-sm">
        ${(token.liquidityUsd / 1000).toFixed(1)}k
      </td>
      <td className="text-right py-4 px-4 font-mono text-slate-500 text-xs">
        {token.ageHours.toFixed(1)}h
      </td>
      <td className="py-4 px-4">
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
    </tr>
  );
}