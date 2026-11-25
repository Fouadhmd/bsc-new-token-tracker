'use client';

import { motion } from 'framer-motion';

interface FilterBarProps {
  filters: any;
  setFilters: (f: any) => void;
  sort: any;
  setSort: (s: any) => void;
}

export function FilterBar({ filters, setFilters, sort, setSort }: FilterBarProps) {
  const minLiqOptions = [
    { label: 'All', value: 0 },
    { label: '$5k+', value: 5000 },
    { label: '$10k+', value: 10000 },
    { label: '$50k+', value: 50000 },
  ];

  const maxAgeOptions = [
    { label: '6h', value: 6 },
    { label: '12h', value: 12 },
    { label: '24h', value: 24 },
    { label: '48h', value: 48 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-8 mb-10 bg-slate-900/20 p-8 rounded-2xl border border-white/5 backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Minimum Liquidity</label>
          <div className="flex flex-wrap gap-2">
            {minLiqOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters({ ...filters, minLiq: opt.value })}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-200 border ${
                  filters.minLiq === opt.value 
                    ? 'bg-blue-500/10 border-blue-500 text-blue-400 shadow-lg shadow-blue-500/10' 
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 block">Max Asset Age</label>
          <div className="flex flex-wrap gap-2">
            {maxAgeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters({ ...filters, maxAge: opt.value })}
                className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all duration-200 border ${
                  filters.maxAge === opt.value 
                    ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-lg shadow-purple-500/10' 
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-500'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.safeOnly}
              onChange={(e) => setFilters({ ...filters, safeOnly: e.target.checked })}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
            />
            <span className={`text-sm font-medium transition-colors ${filters.safeOnly ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`}>
              Safe Only Mode
            </span>
          </label>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Sort By</span>
          <select
            value={sort.by}
            onChange={(e) => setSort({ ...sort, by: e.target.value })}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg px-3 py-2 outline-none focus:border-blue-500/50 transition-all"
          >
            <option value="volume">Volume</option>
            <option value="liquidity">Liquidity</option>
            <option value="age">Age</option>
            <option value="priceChange">24h Change</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}