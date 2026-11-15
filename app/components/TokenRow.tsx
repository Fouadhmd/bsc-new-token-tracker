'use client';

import type { Token } from '@/lib/types';
import { SafetyBadge } from './SafetyBadge';

interface TokenRowProps {
  token: Token;
  index: number;
}

export function TokenRow({ token, index }: TokenRowProps) {
  const priceChangeClass = token.priceChange24h >= 0 ? 'text-green-400' : 'text-red-400';
  const priceChangePrefix = token.priceChange24h >= 0 ? '+' : '';

  return (
    <tr className="hover:bg-white/5">
      <td className="font-mono text-slate-400">{index + 1}</td>
      <td>
        <div className="flex flex-col gap-1">
          <a href={token.dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-blue-400">
            ${token.symbol}
          </a>
          <a href={token.bscScanUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-500 font-mono hover:text-slate-300">
            {token.address.slice(0, 6)}...{token.address.slice(-4)}
          </a>
        </div>
      </td>
      <td className="font-mono">${token.priceUsd.toFixed(token.priceUsd < 0.001 ? 8 : token.priceUsd < 0.01 ? 6 : 4)}</td>
      <td className={`font-mono ${priceChangeClass}`}>{priceChangePrefix}{token.priceChange24h.toFixed(2)}%</td>
      <td className="font-mono">${(token.volume24h / 1000).toFixed(1)}K</td>
      <td className="font-mono">${(token.liquidityUsd / 1000).toFixed(1)}K</td>
      <td className="font-mono text-slate-400">{token.ageHours.toFixed(1)}h</td>
      <td>
        <SafetyBadge
          verified={token.contractVerified}
          locked={token.liquidityLocked}
          holders={token.holderCount}
          top10Pct={token.top10HolderPct}
          isRisk={token.isHoneypotRisk}
        />
      </td>
    </tr>
  );
}