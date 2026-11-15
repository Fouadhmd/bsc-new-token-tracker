import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Mock the JSON imports
vi.mock('@/public/data/tokens.json', () => ({
  default: [
    { address: '0x1', symbol: 'TEST', name: 'Test', pairAddress: '0x1', dex: 'pancakeswap', priceUsd: 0.001, priceChange24h: 100, volume24h: 10000, liquidityUsd: 10000, marketCap: 100000, pairCreatedAt: new Date().toISOString(), ageHours: 2, contractVerified: true, liquidityLocked: true, holderCount: 100, top10HolderPct: 30, isHoneypotRisk: false, dexScreenerUrl: '', pancakeSwapUrl: '', bscScanUrl: '', buyUrl: '' },
  ],
}));

vi.mock('@/public/data/meta.json', () => ({
  default: { fetchedAt: new Date().toISOString(), totalPairsScanned: 1000, tokensAfterFilter: 1, nextRefresh: new Date(Date.now() + 15 * 60 * 1000).toISOString() },
}));

describe('HomePage', () => {
  it('renders title', () => {
    render(<HomePage />);
    expect(screen.getByText('BSC New Token Tracker')).toBeInTheDocument();
  });

  it('renders disclaimer', () => {
    render(<HomePage />);
    expect(screen.getByText(/HEURISTICS ONLY/i)).toBeInTheDocument();
  });

  it('renders token in table', () => {
    render(<HomePage />);
    expect(screen.getByText('$TEST')).toBeInTheDocument();
  });

  it('shows stale warning when data > 1h old', () => {
    vi.mock('@/public/data/meta.json', () => ({
      default: { fetchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), totalPairsScanned: 1000, tokensAfterFilter: 1, nextRefresh: new Date().toISOString() },
    }));
    render(<HomePage />);
    expect(screen.getByText(/Data may be stale/i)).toBeInTheDocument();
  });
});