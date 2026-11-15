import type { Token } from '@/lib/types';

export interface FilterOptions {
  minLiquidity?: number;
  maxAgeHours?: number;
  minVolume?: number;
  safeOnly?: boolean;
  minMarketCap?: number;
}

export interface SortOptions {
  field: 'volume' | 'priceChange' | 'liquidity' | 'age' | 'marketCap';
  direction: 'asc' | 'desc';
}

export function filterTokens(tokens: Token[], options: FilterOptions = {}): Token[] {
  return tokens.filter(t => {
    if (options.minLiquidity && t.liquidityUsd < options.minLiquidity) return false;
    if (options.maxAgeHours && t.ageHours > options.maxAgeHours) return false;
    if (options.minVolume && t.volume24h < options.minVolume) return false;
    if (options.minMarketCap && t.marketCap < options.minMarketCap) return false;
    if (options.safeOnly && t.isHoneypotRisk) return false;
    return true;
  });
}

export function sortTokens(tokens: Token[], field: SortOptions['field'], direction: SortOptions['direction'] = 'desc'): Token[] {
  const multiplier = direction === 'desc' ? -1 : 1;
  return [...tokens].sort((a, b) => {
    let valA: number, valB: number;
    switch (field) {
      case 'volume': valA = a.volume24h; valB = b.volume24h; break;
      case 'priceChange': valA = a.priceChange24h; valB = b.priceChange24h; break;
      case 'liquidity': valA = a.liquidityUsd; valB = b.liquidityUsd; break;
      case 'age': valA = a.ageHours; valB = b.ageHours; break;
      case 'marketCap': valA = a.marketCap; valB = b.marketCap; break;
      default: return 0;
    }
    return (valA - valB) * multiplier;
  });
}