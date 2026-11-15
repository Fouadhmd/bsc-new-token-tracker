'use client';

import { useState, useEffect } from 'react';

interface MetaBannerProps {
  fetchedAt: string;
  totalPairsScanned: number;
  tokensAfterFilter: number;
  nextRefresh: string;
}

export function MetaBanner({ fetchedAt, totalPairsScanned, tokensAfterFilter, nextRefresh }: MetaBannerProps) {
  const [age, setAge] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - new Date(fetchedAt).getTime();
      const mins = Math.floor(diff / 60000);
      const hours = Math.floor(mins / 60);
      setAge(hours > 0 ? `${hours}h ${mins % 60}m ago` : `${mins}m ago`);
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, [fetchedAt]);

  const isStale = Date.now() - new Date(fetchedAt).getTime() > 60 * 60 * 1000;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
      <div className="flex items-center gap-4 text-sm">
        <span className="text-slate-400">Last updated:</span>
        <span className="font-mono font-medium">{age}</span>
        {isStale && (
          <span className="px-2 py-0.5 rounded text-xs bg-yellow-900/50 text-yellow-300 border border-yellow-500/30 animate-pulse">
            {'⚠️ Data may be stale (>1h)'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-6 text-sm text-slate-400">
        <span>Scanned: <span className="text-white font-mono">{totalPairsScanned.toLocaleString()}</span> pairs</span>
        <span>Showing: <span className="text-white font-mono">{tokensAfterFilter}</span> tokens</span>
        <span>Next refresh: <span className="text-white font-mono">{new Date(nextRefresh).toLocaleTimeString()}</span></span>
      </div>
    </div>
  );
}