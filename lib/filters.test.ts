import { describe, it, expect } from 'vitest';
import { filterTokens, sortTokens } from './filters';
import type { Token } from './types';

const mockTokens: Token[] = [
  { address: '0x1', symbol: 'A', name: 'A', pairAddress: '0x1', dex: 'pancakeswap', priceUsd: 1, priceChange24h: 10, volume24h: 10000, liquidityUsd: 10000, marketCap: 100000, pairCreatedAt: new Date().toISOString(), ageHours: 2, contractVerified: true, liquidityLocked: true, holderCount: 100, top10HolderPct: 30, isHoneypotRisk: false, dexScreenerUrl: '', pancakeSwapUrl: '', bscScanUrl: '', buyUrl: '' },
  { address: '0x2', symbol: 'B', name: 'B', pairAddress: '0x2', dex: 'pancakeswap', priceUsd: 2, priceChange24h: -5, volume24h: 500, liquidityUsd: 1000, marketCap: 50000, pairCreatedAt: new Date().toISOString(), ageHours: 1, contractVerified: true, liquidityLocked: true, holderCount: 100, top10HolderPct: 30, isHoneypotRisk: false, dexScreenerUrl: '', pancakeSwapUrl: '', bscScanUrl: '', buyUrl: '' },
  { address: '0x3', symbol: 'C', name: 'C', pairAddress: '0x3', dex: 'pancakeswap', priceUsd: 3, priceChange24h: 100, volume24h: 50000, liquidityUsd: 50000, marketCap: 500000, pairCreatedAt: new Date(Date.now() - 25 * 3600 * 1000).toISOString(), ageHours: 25, contractVerified: true, liquidityLocked: true, holderCount: 100, top10HolderPct: 30, isHoneypotRisk: false, dexScreenerUrl: '', pancakeSwapUrl: '', bscScanUrl: '', buyUrl: '' },
];

describe('filterTokens', () => {
  it('filters by min liquidity', () => {
    const result = filterTokens(mockTokens, { minLiquidity: 5000 });
    expect(result.length).toBe(2);
    expect(result.every(t => t.liquidityUsd >= 5000)).toBe(true);
  });

  it('filters by max age', () => {
    const result = filterTokens(mockTokens, { maxAgeHours: 24 });
    expect(result.length).toBe(2);
    expect(result.every(t => t.ageHours <= 24)).toBe(true);
  });

  it('filters by min volume', () => {
    const result = filterTokens(mockTokens, { minVolume: 5000 });
    expect(result.length).toBe(2);
    expect(result.every(t => t.volume24h >= 5000)).toBe(true);
  });

  it('filters by safety', () => {
    const risky = { ...mockTokens[0], isHoneypotRisk: true };
    const result = filterTokens([risky, mockTokens[0]], { safeOnly: true });
    expect(result.length).toBe(1);
    expect(result[0].isHoneypotRisk).toBe(false);
  });
});

describe('sortTokens', () => {
  it('sorts by volume descending', () => {
    const result = sortTokens([...mockTokens], 'volume');
    expect(result[0].symbol).toBe('C');
    expect(result[1].symbol).toBe('A');
  });

  it('sorts by price change descending', () => {
    const result = sortTokens([...mockTokens].filter(t => t.ageHours <= 24), 'priceChange');
    expect(result[0].symbol).toBe('A');
  });

  it('sorts by liquidity descending', () => {
    const result = sortTokens([...mockTokens], 'liquidity');
    expect(result[0].symbol).toBe('C');
  });
});