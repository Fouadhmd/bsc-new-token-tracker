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

  const updateSort = (partial: Partial<typeof sort>) => {
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
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {/* Subtle Top Alert Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.02 }}
        className="border-b border-[var(--color-hairline)] bg-[var(--color-surface-soft)] px-4 py-3"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-xs">
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[var(--color-primary)] font-bold"
            >
              ▲
            </motion.span>
            <span className="font-medium text-[var(--color-body-strong)]">DISCLOSURE</span>
            <span className="text-[var(--color-muted)]">Heuristics-based automated tracking. High risk zone — DYOR.</span>
          </span>
          <span className="font-mono text-[var(--color-muted-soft)] hidden sm:inline">v1.0.0</span>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-10 lg:py-16">
        {/* Hero Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
          className="mb-10 lg:mb-14"
        >
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="display-lg text-[var(--color-ink)] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                BSC Token Radar
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.4 }}
                className="mt-3 text-sm text-[var(--color-muted)] font-mono max-w-xl"
              >
                Automated screening of liquidity deployments on Binance Smart Chain
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18, duration: 0.4 }}
              className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted-soft)]"
            >
              <span className="px-2 py-1 rounded-[var(--radius-sm)] bg-[var(--color-surface-card)] border border-[var(--color-hairline)]">
                Live
              </span>
              <span className="hidden sm:inline">Updated {new Date(meta.fetchedAt).toLocaleString()}</span>
            </motion.div>
          </div>
        </motion.header>

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
          setFilters={updateFilters}
          sort={sort}
          setSort={updateSort}
        />

        {/* Core Table */}
        <TokenTable tokens={filteredTokens} />

        {/* Minimal Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="mt-16 lg:mt-20 pt-8 lg:pt-12 border-t border-[var(--color-hairline)]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--color-muted)]">
            <div className="flex items-center gap-2">
              <span>Data via</span>
              <a href="https://dexscreener.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">DexScreener</a>
              <span>&</span>
              <a href="https://bscscan.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">BSCScan</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">GitHub Actions Sync</a>
              <span>•</span>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">Open Source</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.main>
  );
}