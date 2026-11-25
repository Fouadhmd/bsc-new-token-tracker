'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface FilterBarProps {
  filters: {
    minLiq: number;
    maxAge: number;
    safeOnly: boolean;
  };
  setFilters: (f: Partial<{ minLiq: number; maxAge: number; safeOnly: boolean }>) => void;
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

const sortOptions = [
  { label: 'Volume', value: 'volume' },
  { label: 'Liquidity', value: 'liquidity' },
  { label: 'Age', value: 'age' },
  { label: '24h Change', value: 'priceChange' },
];

export function FilterBar({ filters, setFilters, sort, setSort }: FilterBarProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
      className="bg-[var(--color-surface-card)] border border-[var(--color-hairline)] rounded-[var(--radius-xl)] p-6 lg:p-8 mb-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-8 mb-6"
      >
        <FilterGroup
          label="Minimum Liquidity"
          options={minLiqOptions}
          value={filters.minLiq}
          onChange={(v) => setFilters({ minLiq: v })}
          accentColor="var(--color-primary)"
        />
        <FilterGroup
          label="Max Asset Age"
          options={maxAgeOptions}
          value={filters.maxAge}
          onChange={(v) => setFilters({ maxAge: v })}
          accentColor="var(--color-accent-teal)"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.3 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-6 border-t border-[var(--color-hairline-soft)]"
      >
        <motion.label
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <motion.input
            type="checkbox"
            checked={filters.safeOnly}
            onChange={(e) => setFilters({ safeOnly: e.target.checked })}
            className="w-4 h-4 rounded-[var(--radius-sm)] border-[var(--color-hairline)] bg-[var(--color-canvas)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-canvas)] transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          />
          <span className="text-sm font-medium text-[var(--color-body)] group-hover:text-[var(--color-ink)] transition-colors">
            Safe Mode — exclude honeypot risk
          </span>
          <AnimatePresence mode="wait">
            {filters.safeOnly && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[var(--radius-pill)] badge-coral text-xs"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1 h-1 rounded-full"
                  style={{ backgroundColor: 'var(--color-on-primary)' }}
                />
                Active
              </motion.span>
            )}
          </AnimatePresence>
        </motion.label>

        <motion.div
          whileHover={{ x: -2 }}
          className="flex items-center gap-3"
        >
          <span className="text-[var(--color-muted)] text-xs font-medium tracking-wide uppercase hidden sm:inline">
            Sort By
          </span>
          <select
            value={sort.by}
            onChange={(e) => setSort({ by: e.target.value as any })}
            className="appearance-none bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-sm font-medium rounded-[var(--radius-md)] px-4 py-2.5 pr-10 outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20 transition-all cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236c6a64' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
            }}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <motion.button
            onClick={() => setSort({ direction: sort.direction === 'asc' ? 'desc' : 'asc' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] border border-[var(--color-hairline)] text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:border-[var(--color-hairline-soft)] transition-all"
            aria-label={sort.direction === 'asc' ? 'Sort descending' : 'Sort ascending'}
          >
            {sort.direction === 'asc' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

interface FilterGroupProps {
  label: string;
  options: { label: string; value: number }[];
  value: number;
  onChange: (v: number) => void;
  accentColor: string;
}

function FilterGroup({ label, options, value, onChange, accentColor }: FilterGroupProps) {
  return (
    <div style={{ '--accent': accentColor } as React.CSSProperties}>
      <label className="text-[var(--color-muted)] text-xs font-medium tracking-wide uppercase mb-4 block" style={{ fontFamily: 'var(--font-body)' }}>
        {label}
      </label>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {options.map((opt, idx) => (
          <motion.button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.04 * idx, duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
            className="relative px-4 py-2.5 text-sm font-mono font-medium rounded-[var(--radius-md)] transition-all duration-200"
            style={{
              backgroundColor: value === opt.value ? accentColor : 'var(--color-canvas)',
              color: value === opt.value ? 'var(--color-on-primary)' : 'var(--color-body)',
              borderColor: value === opt.value ? accentColor : 'var(--color-hairline)',
              boxShadow: value === opt.value ? '0 4px 20px rgba(204, 120, 92, 0.25)' : 'none',
            } as React.CSSProperties}
            role="radio"
            aria-checked={value === opt.value}
            aria-label={opt.label}
          >
            {opt.label}
            {value === opt.value && (
              <motion.span
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accentColor } as React.CSSProperties}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}