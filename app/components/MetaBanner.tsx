'use client';

import { motion } from 'framer-motion';

interface MetaBannerProps {
  fetchedAt: string;
  totalPairsScanned: number;
  tokensAfterFilter: number;
  nextRefresh: string;
}

export function MetaBanner({ fetchedAt, totalPairsScanned, tokensAfterFilter, nextRefresh }: MetaBannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8"
    >
      <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-4 rounded-xl shadow-lg hover:border-blue-500/50 transition-all group">
        <span className="text-xs text-slate-400 block font-medium">Pairs Scanned</span>
        <span className="text-xl font-bold text-white font-mono mt-1 block group-hover:text-blue-400 transition-colors">
          {totalPairsScanned.toLocaleString()}
        </span>
      </div>
      
      <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-4 rounded-xl shadow-lg hover:border-emerald-500/50 transition-all group">
        <span className="text-xs text-slate-400 block font-medium">Matching Tokens</span>
        <span className="text-xl font-bold text-emerald-400 font-mono mt-1 block flex items-center gap-2">
          {tokensAfterFilter}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </span>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-4 rounded-xl shadow-lg hover:border-purple-500/50 transition-all group">
        <span className="text-xs text-slate-400 block font-medium">Network Status</span>
        <span className="text-xl font-bold text-slate-200 font-mono mt-1 block group-hover:text-purple-400 transition-colors">
          BSC Mainnet
        </span>
      </div>

      <div className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-md p-4 rounded-xl shadow-lg hover:border-amber-500/50 transition-all group">
        <span className="text-xs text-slate-400 block font-medium">Auto Refresh</span>
        <span className="text-xl font-bold text-amber-400 font-mono mt-1 block">
          15m Sync
        </span>
      </div>
    </motion.div>
  );
}