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
    <div className="flex flex-wrap items-center gap-6 mb-8 px-1">
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono text-slate-500 uppercase">Min Liq</span>
        <div className="flex bg-slate-900 border border-slate-800 rounded p-0.5">
          {[0, 5000, 10000, 50000].map(val => (
            <button
              key={val}
              onClick={() => handleFilterChange('minLiquidity', val)}
              className={`px-2 py-0.5 text-[11px] rounded transition-all ${filters.minLiquidity === val ? 'bg-slate-700 text-slate-100' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {val === 0 ? 'All' : `$${val/1000}k`}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono text-slate-500 uppercase">Max Age</span>
        <div className="flex bg-slate-900 border border-slate-800 rounded p-0.5">
          {[6, 12, 24, 48].map(val => (
            <button
              key={val}
              onClick={() => handleFilterChange('maxAgeHours', val)}
              className={`px-2 py-0.5 text-[11px] rounded transition-all ${filters.maxAgeHours === val ? 'bg-slate-700 text-slate-100' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {val}h
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-4 h-4 rounded border border-slate-700 flex items-center justify-center transition-all ${filters.safeOnly ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900'}`}>
            {filters.safeOnly && <span className="text-white text-[10px]">✓</span>}
          </div>
          <input type="checkbox" className="hidden" checked={filters.safeOnly} onChange={e => handleFilterChange('safeOnly', e.target.checked)} />
          <span className="text-[11px] font-mono text-slate-500 uppercase group-hover:text-slate-300">Safe Only</span>
        </label>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <span className="text-[11px] font-mono text-slate-500 uppercase">Sort By</span>
        <select 
          value={filters.sortField} 
          onChange={e => handleFilterChange('sortField', e.target.value)} 
          className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-[11px] text-slate-300 focus:outline-none focus:border-slate-600"
        >
          <option value="volume">Volume</option>
          <option value="priceChange">24h %</option>
          <option value="liquidity">Liquidity</option>
          <option value="age">Age</option>
        </select>
      </div>
    </div>
  );
}