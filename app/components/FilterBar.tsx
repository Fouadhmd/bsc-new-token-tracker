'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Token } from '@/lib/types';
import { filterTokens, sortTokens } from '@/lib/filters';

interface FilterBarProps {
  tokens: Token[];
  onFilteredChange: (tokens: Token[]) => void;
}

export function FilterBar({ tokens, onFilteredChange }: FilterBarProps) {
  const [filters, setFilters] = useState({
    minLiquidity: 5000,
    maxAgeHours: 24,
    minVolume: 1000,
    safeOnly: false,
    sortField: 'volume' as const,
    sortDirection: 'desc' as const,
  });

  const filtered = useMemo(() => {
    let result = filterTokens(tokens, filters);
    result = sortTokens(result, filters.sortField, filters.sortDirection);
    return result;
  }, [tokens, filters]);

  const handleFilterChange = useCallback((key: keyof typeof filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">Liq:</label>
        <select value={filters.minLiquidity} onChange={e => handleFilterChange('minLiquidity', Number(e.target.value))} className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value={0}>All</option>
          <option value={1000}>$1k+</option>
          <option value={5000}>$5k+</option>
          <option value={10000}>$10k+</option>
          <option value={50000}>$50k+</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">Age:</label>
        <select value={filters.maxAgeHours} onChange={e => handleFilterChange('maxAgeHours', Number(e.target.value))} className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value={1}>1h</option>
          <option value={6}>6h</option>
          <option value={12}>12h</option>
          <option value={24}>24h</option>
          <option value={48}>48h</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-slate-400">Vol:</label>
        <select value={filters.minVolume} onChange={e => handleFilterChange('minVolume', Number(e.target.value))} className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value={0}>All</option>
          <option value={1000}>$1k+</option>
          <option value={10000}>$10k+</option>
          <option value={100000}>$100k+</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="flex items-center gap-1 text-sm text-slate-400 cursor-pointer">
          <input type="checkbox" checked={filters.safeOnly} onChange={e => handleFilterChange('safeOnly', e.target.checked)} className="accent-blue-500" />
          Safe only
        </label>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <label className="text-sm text-slate-400">Sort:</label>
        <select value={filters.sortField} onChange={e => handleFilterChange('sortField', e.target.value)} className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm">
          <option value="volume">Volume</option>
          <option value="priceChange">24h %</option>
          <option value="liquidity">Liquidity</option>
          <option value="age">Age</option>
          <option value="marketCap">Market Cap</option>
        </select>
        <button onClick={() => handleFilterChange('sortDirection', filters.sortDirection === 'desc' ? 'asc' : 'desc')} className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-sm">
          {filters.sortDirection === 'desc' ? '↓' : '↑'}
        </button>
      </div>
      <div className="w-full text-right text-sm text-slate-500">
        Showing {filtered.length} of {tokens.length} tokens
      </div>
    </div>
  );
}