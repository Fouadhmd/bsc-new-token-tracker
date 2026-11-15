import { fetchContractSource, fetchTokenHolders, isContractVerified, analyzeHolders } from '@/lib/api/bscscan';
import { evaluateSafety, generateLinks } from '@/lib/safety';
import type { Token } from '@/lib/types';

export async function enrichToken(token: Token): Promise<Token> {
  const [source, holders] = await Promise.all([
    fetchContractSource(token.address),
    fetchTokenHolders(token.address),
  ]);

  const contractVerified = isContractVerified(source);
  const { count: holderCount, top10Pct, liquidityLocked } = analyzeHolders(holders);
  const safety = evaluateSafety({ contractVerified, liquidityLocked, holderCount, top10HolderPct: top10Pct });
  const links = generateLinks(token);

  return {
    ...token,
    contractVerified: safety.contractVerified,
    liquidityLocked: safety.liquidityLocked,
    holderCount: safety.holderCount,
    top10HolderPct: safety.top10HolderPct,
    isHoneypotRisk: safety.isHoneypotRisk,
    ...links,
  };
}

export async function enrichTokens(tokens: Token[]): Promise<Token[]> {
  const enriched: Token[] = [];
  for (const token of tokens) {
    try {
      const enrichedToken = await enrichToken(token);
      enriched.push(enrichedToken);
      // Rate limit: 5 calls/sec for BSCScan free tier
      await new Promise(r => setTimeout(r, 200));
    } catch (error) {
      console.error(`Failed to enrich ${token.symbol}:`, error);
      enriched.push({ ...token, contractVerified: false, liquidityLocked: false, holderCount: 0, top10HolderPct: 100, isHoneypotRisk: true });
    }
  }
  return enriched;
}