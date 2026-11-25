'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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

  const updateFilters = (partial: Partial<typeof filters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
  };

  const updateSort = (partial: Partial<{ by: string; direction: 'asc' | 'desc' }>) => {
    setSort((prev) => ({ ...prev, ...partial }));
  };

  const [sort, setSort] = useState({
    by: 'volume',
    direction: 'desc' as 'asc' | 'desc',
  });

  const filteredTokens = useMemo(() => {
    return allTokens
      .filter((token) => {
        if (token.liquidityUsd < filters.minLiq) return false;
        if (token.ageHours > filters.maxAge) return false;
        if (filters.safeOnly && token.isHoneypotRisk) return false;
        return true;
      })
      .sort((a, b) => {
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
    <main className="min-h-screen bg-[#07090e] text-[var(--text-main)] selection:bg-blue-500/30 selection:text-white"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      {/* Top Ticker Bar */}
      <div className="bg-[#0a0c14]/40 border-b border-white/5 px-4 py-2 flex items-center justify-between gap-4 text-[9px] font-mono text-[var(--text-dim)] sticky top-0 z-10 backdrop-blur-sm">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping shadow-[0_0_8px_#10b981]" />
            Live
          </span>
          <span>BSC Mainnet</span>
          <span className="text-white/20">|</span>
          <span>DexScreener API</span>
        </div>
        <div className="text-white/30 hidden sm:block">
          Updated {new Date(meta.fetchedAt).toLocaleString()}
        </div>
      </div>

      {/* Header Hero */}
      <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10"
        >
          <div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mr-2"
            >
              <span className="text-2xl">⚡</span>
            </motion.div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-2">
              BSC Token Radar
            </h1>
            <p className="text-[var(--text-muted)] text-xs font-mono">
              Automated screening of liquidity deployments on Binance Smart Chain
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[var(--text-dim)] text-[10px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>System Active</span>
            </div>
            <span className="text-white/20">|</span>
            <span>v1.0.0</span>
          </div>
        </motion.div>

        {/* Meta Ticker */}
        <MetaBanner
          fetchedAt={meta.fetchedAt}
          totalPairsScanned={meta.totalPairsScanned}
          tokensAfterFilter={filteredTokens.length}
          nextRefresh={meta.nextRefresh}
        />

        {/* Filters */}
        <FilterBar
          filters={filters}
          setFilters={updateFilters}
          sort={sort}
          setSort={updateSort}
        />

        {/* Token Table */}
        <TokenTable tokens={filteredTokens} />

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-mono text-[var(--text-dim)]"
        >
          <div className="flex items-center gap-2">
            <span>Data via</span>
            <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">DexScreener</a>
            <span className="text-white/10"> & </span>
            <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">BSCScan</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">GitHub Actions</a>
            <span className="text-white/10">•</span>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Open Source</a>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}