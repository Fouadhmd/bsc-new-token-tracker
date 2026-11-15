import axios from 'axios';
import type { DexScreenerPair, Token } from '@/lib/types';

const DEXSCREENER_BASE = 'https://api.dexscreener.com';

export async function fetchAllBSCPairs(): Promise<DexScreenerPair[]> {
  const url = `${DEXSCREENER_BASE}/token-pairs/v1/bsc`;
  const response = await axios.get<DexScreenerPair[]>(url, {
    timeout: 30000,
    headers: { 'Accept': 'application/json' },
  });
  return response.data;
}

export async function fetchPairByAddress(pairAddress: string): Promise<DexScreenerPair | null> {
  const url = `${DEXSCREENER_BASE}/latest/dex/pairs/bsc/${pairAddress}`;
  try {
    const response = await axios.get<{ pairs: DexScreenerPair[] }>(url, { timeout: 10000 });
    return response.data.pairs[0] ?? null;
  } catch {
    return null;
  }
}

export function mapDexId(dexId: string): Token['dex'] {
  const id = dexId.toLowerCase();
  if (id.includes('pancake')) return id.includes('v3') ? 'pancakeswap-v3' : 'pancakeswap';
  if (id.includes('biscuit') || id.includes('biswap')) return 'biswap';
  if (id.includes('ape')) return 'apeswap';
  return 'other';
}