import { describe, it, expect, vi } from 'vitest';
import { fetchAllBSCPairs, mapDexId } from '@/lib/api/dexscreener';

describe('fetch-tokens integration', () => {
  it('maps dex IDs correctly', () => {
    expect(mapDexId('pancakeswap')).toBe('pancakeswap');
    expect(mapDexId('pancakeswap-v3')).toBe('pancakeswap-v3');
    expect(mapDexId('biswap')).toBe('biswap');
    expect(mapDexId('apeswap')).toBe('apeswap');
    expect(mapDexId('unknown')).toBe('other');
  });
});