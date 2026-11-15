import type { Token } from '@/lib/types';

export interface SafetyResult {
  contractVerified: boolean;
  liquidityLocked: boolean;
  holderCount: number;
  top10HolderPct: number;
  isHoneypotRisk: boolean;
}

export function isHoneypotRisk(token: Pick<Token, 'contractVerified' | 'holderCount' | 'top10HolderPct' | 'liquidityLocked'>): boolean {
  let redFlags = 0;
  if (!token.contractVerified) redFlags++;
  if (token.holderCount < 50) redFlags++;
  if (token.top10HolderPct > 80) redFlags++;
  if (!token.liquidityLocked) redFlags++;
  return redFlags >= 2;
}

export function evaluateSafety(
  token: Pick<Token, 'contractVerified' | 'liquidityLocked' | 'holderCount' | 'top10HolderPct'>
): SafetyResult {
  const honeypotRisk = isHoneypotRisk(token);
  return {
    contractVerified: token.contractVerified,
    liquidityLocked: token.liquidityLocked,
    holderCount: token.holderCount,
    top10HolderPct: token.top10HolderPct,
    isHoneypotRisk: honeypotRisk,
  };
}

export function generateLinks(token: Pick<Token, 'address' | 'pairAddress' | 'symbol'>): Pick<Token, 'dexScreenerUrl' | 'pancakeSwapUrl' | 'bscScanUrl' | 'buyUrl'> {
  return {
    dexScreenerUrl: `https://dexscreener.com/bsc/${token.pairAddress}`,
    pancakeSwapUrl: `https://pancakeswap.finance/swap?outputCurrency=${token.address}`,
    bscScanUrl: `https://bscscan.com/token/${token.address}`,
    buyUrl: `https://pancakeswap.finance/swap?outputCurrency=${token.address}`,
  };
}