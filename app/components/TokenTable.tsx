'use client';

import type { Token } from '@/lib/types';
import { TokenRow } from './TokenRow';

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  if (tokens.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-slate-800 rounded-lg my-6">
        <p className="text-slate-400 font-medium">No matching tokens found</p>
        <p className="text-xs text-slate-600 mt-1">Adjust your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border-t border-slate-800">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-800">
            <th className="w-12 text-slate-500 font-mono text-xs">#</th>
            <th className="text-slate-400 font-mono text-xs">Asset</th>
            <th className="text-slate-400 font-mono text-xs text-right">Price</th>
            <th className="text-slate-400 font-mono text-xs text-right">24h Vol</th>
            <th className="text-slate-400 font-mono text-xs text-right">Liquidity</th>
            <th className="text-slate-400 font-mono text-xs text-right">Age</th>
            <th className="text-slate-400 font-mono text-xs text-center">Safety Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {tokens.map((token, i) => (
            <TokenRow key={token.address} token={token} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}