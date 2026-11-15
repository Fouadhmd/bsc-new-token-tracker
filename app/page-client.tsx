'use client';

import { MetaBanner } from './components/MetaBanner';
import { FilterBar } from './components/FilterBar';
import { TokenTable } from './components/TokenTable';
import type { Token, Meta } from '@/lib/types';

// These are imported at build time from generated JSON
import tokensData from '@/public/data/tokens.json';
import metaData from '@/public/data/meta.json';

const tokens: Token[] = tokensData as Token[];
const meta: Meta = metaData as Meta;

export default function HomePageClient() {
  return (
    <main className="max-w-7xl mx-auto">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span>🟡</span> BSC New Token Tracker
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            ⚠️ <strong>HEURISTICS ONLY — NOT FINANCIAL ADVICE — DYOR.</strong> Safety badges are automated checks (contract verified, liquidity locked, holder count, concentration). They miss many risks. Always verify manually before trading.
          </p>
        </div>
      </header>

      <MetaBanner
        fetchedAt={meta.fetchedAt}
        totalPairsScanned={meta.totalPairsScanned}
        tokensAfterFilter={meta.tokensAfterFilter}
        nextRefresh={meta.nextRefresh}
      />

      <FilterBar tokens={tokens} onFilteredChange={() => {}} />

      <TokenTable tokens={tokens} />

      <footer className="mt-12 pt-6 border-t border-slate-800 text-sm text-slate-500 text-center">
        <p>Data from <a href="https://dexscreener.com" target="_blank" rel="noopener">DexScreener</a> • Enriched via <a href="https://bscscan.com" target="_blank" rel="noopener">BSCScan</a> • Refreshes every 15 min via GitHub Actions</p>
        <p className="mt-2">Built for personal alpha hunting • <a href="https://github.com" target="_blank" rel="noopener">Open Source</a></p>
      </footer>
    </main>
  );
}