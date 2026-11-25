'use client';

import { useState, useMemo } from 'react';
import { MetaBanner } from './components/MetaBanner';
import { FilterBar } from './components/FilterBar';
import { TokenTable } from './components/TokenTable';
import type { Token, Meta } from '@/lib/types';

import tokensData from '@/public/data/tokens.json';
import metaData from '@/public/data/meta.json';

const allTokens: Token[] = tokensData as Token[];
const meta: Meta = metaData as Meta;

export default function HomePageClient() {
  const [filters, setFilters] = useState({
    minLiq: 0,
    maxAge: 48,
    safeOnly: false,
  });

  const [sort, setSort] = useState({
    by: 'volume',
    direction: 'desc',
  });

  const filteredTokens = useMemo(() => {
    return allTokens.filter(token => {
      if (token.liquidityUsd < filters.minLiq) return false;
      if (token.ageHours > filters.maxAge) return false;
      if (filters.safeOnly && token.isHoneypotRisk) return false;
      return true;
    }).sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (sort.by === 'volume') {
        valA = a.volume24h;
        valB = b.volume24h;
      } else if (sort.by === 'liquidity') {
        valA = a.liquidityUsd;
        valB = b.liquidityUsd;
      } else if (sort.by === 'age') {
        valA = a.ageHours;
        valB = b.ageHours;
      } else if (sort.by === 'priceChange') {
        valA = a.priceChange24h;
        valB = b.priceChange24h;
      }
      return sort.direction === 'desc' ? valB - valA : valA - valB;
    });
  }, [filters, sort]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Subtle Top Alert Bar */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-md p-3 mb-8 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span className="text-amber-500 font-bold">▲ DISCLOSURE</span> 
          <span>Heuristics-based automated tracking. High risk zone — DYOR.</span>
        </span>
        <span className="font-mono text-slate-500 hidden sm:inline">v1.0.0</span>
      </div>

      {/* Hero Header */}
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
            BSC TOKEN RADAR
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            Automated screening of liquidity deployments on Binance Smart Chain
          </p>
        </div>
      </header>

      {/* Metrics Banner */}
      <MetaBanner
        fetchedAt={meta.fetchedAt}
        totalPairsScanned={meta.totalPairsScanned}
        tokensAfterFilter={filteredTokens.length}
        nextRefresh={meta.nextRefresh}
      />

      {/* Filter Controls */}
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        sort={sort} 
        setSort={setSort} 
      />

      {/* Core Table */}
      <TokenTable tokens={filteredTokens} />

      {/* Minimal Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-800/60 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div>
          Data via DexScreener & BSCScan
        </div>
        <div>
          GitHub Actions Sync • Open Source
        </div>
      </footer>
    </main>
  );
}