'use client';

import type { Token } from '@/lib/types';
import { TokenRow } from './TokenRow';

interface TokenTableProps {
  tokens: Token[];
}

export function TokenTable({ tokens }: TokenTableProps) {
  if (tokens.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        No tokens match current filters. Try adjusting filters or wait for next refresh.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Token</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Vol (K)</th>
            <th>Liq (K)</th>
            <th>Age</th>
            <th>Safety</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token, i) => (
            <TokenRow key={token.address} token={token} index={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}