import { describe, it, expect } from 'vitest';
import { evaluateSafety, isHoneypotRisk } from './safety';
import type { Token } from './types';

describe('evaluateSafety', () => {
  const baseToken: Partial<Token> = {
    address: '0x123',
    symbol: 'TEST',
    name: 'Test Token',
  };

  it('flags unverified contract as risk when combined with another flag', () => {
    // 2 red flags: unverified + low holders
    const result = evaluateSafety({ ...baseToken, contractVerified: false, holderCount: 10, top10HolderPct: 50, liquidityLocked: true } as Pick<Token, 'contractVerified' | 'holderCount' | 'top10HolderPct' | 'liquidityLocked'>);
    expect(result.contractVerified).toBe(false);
    expect(result.isHoneypotRisk).toBe(true);
  });

  it('passes verified contract with good metrics', () => {
    const result = evaluateSafety({ ...baseToken, contractVerified: true, holderCount: 200, top10HolderPct: 40, liquidityLocked: true } as Pick<Token, 'contractVerified' | 'holderCount' | 'top10HolderPct' | 'liquidityLocked'>);
    expect(result.contractVerified).toBe(true);
    expect(result.isHoneypotRisk).toBe(false);
  });

  it('flags low holder count when combined with another flag', () => {
    // 2 red flags: low holders + high concentration
    const result = evaluateSafety({ ...baseToken, contractVerified: true, holderCount: 10, top10HolderPct: 90, liquidityLocked: true } as Pick<Token, 'contractVerified' | 'holderCount' | 'top10HolderPct' | 'liquidityLocked'>);
    expect(result.holderCount).toBe(10);
    expect(result.isHoneypotRisk).toBe(true);
  });

  it('flags high concentration when combined with another flag', () => {
    // 2 red flags: high concentration + unlocked liquidity
    const result = evaluateSafety({ ...baseToken, contractVerified: true, holderCount: 100, top10HolderPct: 85, liquidityLocked: false } as Pick<Token, 'contractVerified' | 'holderCount' | 'top10HolderPct' | 'liquidityLocked'>);
    expect(result.top10HolderPct).toBe(85);
    expect(result.isHoneypotRisk).toBe(true);
  });

  it('flags unlocked liquidity when combined with another flag', () => {
    // 2 red flags: unlocked liquidity + unverified contract
    const result = evaluateSafety({ ...baseToken, contractVerified: false, holderCount: 200, top10HolderPct: 40, liquidityLocked: false } as Pick<Token, 'contractVerified' | 'holderCount' | 'top10HolderPct' | 'liquidityLocked'>);
    expect(result.liquidityLocked).toBe(false);
    expect(result.isHoneypotRisk).toBe(true);
  });
});

describe('isHoneypotRisk', () => {
  it('returns true when 2+ red flags', () => {
    expect(isHoneypotRisk({ contractVerified: false, holderCount: 100, top10HolderPct: 90, liquidityLocked: true })).toBe(true);
    expect(isHoneypotRisk({ contractVerified: true, holderCount: 10, top10HolderPct: 90, liquidityLocked: true })).toBe(true);
    expect(isHoneypotRisk({ contractVerified: true, holderCount: 100, top10HolderPct: 85, liquidityLocked: false })).toBe(true);
  });

  it('returns false when < 2 red flags', () => {
    expect(isHoneypotRisk({ contractVerified: true, holderCount: 200, top10HolderPct: 40, liquidityLocked: true })).toBe(false);
    expect(isHoneypotRisk({ contractVerified: false, holderCount: 200, top10HolderPct: 40, liquidityLocked: true })).toBe(false);
  });
});