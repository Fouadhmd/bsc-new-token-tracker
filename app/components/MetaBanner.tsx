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

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-md">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Last Updated</span>
        <span className="text-sm font-semibold text-slate-200 font-mono mt-0.5 block">{age || 'Just now'}</span>
      </div>
      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-md">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Scanned Pairs</span>
        <span className="text-sm font-semibold text-slate-200 font-mono mt-0.5 block">{totalPairsScanned.toLocaleString()}</span>
      </div>
      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-md">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Passing Tokens</span>
        <span className="text-sm font-semibold text-emerald-400 font-mono mt-0.5 block">{tokensAfterFilter}</span>
      </div>
      <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-md">
        <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Next Sync</span>
        <span className="text-sm font-semibold text-slate-200 font-mono mt-0.5 block">
          {new Date(nextRefresh).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}