'use client';

import { motion } from 'framer-motion';

interface FilterBarProps {
  filters: {
    minLiq: number;
    maxAge: number;
    safeOnly: boolean;
  };
  setFilters: (f: Partial<FilterBarProps['filters']>) => void;
  sort: { by: string; direction: 'asc' | 'desc' };
  setSort: (s: Partial<FilterBarProps['sort']>) => void;
}

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

export function FilterBar({ filters, setFilters, sort, setSort }: FilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="glass-panel rounded-2xl p-5 sm:p-6 mb-6 flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Min Liquidity */}
        <div>
          <label className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider block mb-2.5">
            Minimum Liquidity
          </label>
          <div className="flex flex-wrap gap-2">
            {minLiqOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters({ minLiq: opt.value })}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  filters.minLiq === opt.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500'
                    : 'bg-[#111827] text-[var(--text-muted)] hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Max Age */}
        <div>
          <label className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider block mb-2.5">
            Max Asset Age
          </label>
          <div className="flex flex-wrap gap-2">
            {maxAgeOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilters({ maxAge: opt.value })}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  filters.maxAge === opt.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 border border-blue-500'
                    : 'bg-[#111827] text-[var(--text-muted)] hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/5">
        <label className="flex items-center gap-3 cursor-pointer group select-none">
          <input
            type="checkbox"
            checked={filters.safeOnly}
            onChange={(e) => setFilters({ safeOnly: e.target.checked })}
            className="w-4 h-4 rounded bg-[#111827] border-white/10 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-xs font-mono text-[var(--text-muted)] group-hover:text-white transition-colors">
            Safe Mode (Exclude honeypot risk & unverified contracts)
          </span>
        </label>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[var(--text-dim)] uppercase tracking-wider">Sort:</span>
          <select
            value={sort.by}
            onChange={(e) => setSort({ by: e.target.value })}
            className="bg-[#111827] text-[var(--text-main)] text-xs font-mono rounded-lg px-3 py-2 border border-white/10 outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="volume">24h Volume</option>
            <option value="liquidity">Liquidity</option>
            <option value="age">Asset Age</option>
            <option value="priceChange">24h Change</option>
          </select>
          <button
            onClick={() => setSort({ direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
            className="p-2 rounded-lg bg-[#111827] border border-white/10 text-[var(--text-muted)] hover:text-white transition-colors"
            title="Toggle sort direction"
          >
            {sort.direction === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}