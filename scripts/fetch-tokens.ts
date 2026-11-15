#!/usr/bin/env tsx

import { fetchAllBSCPairs, mapDexId } from '@/lib/api/dexscreener';
import { enrichTokens } from '@/scripts/enrich';
import { filterTokens } from '@/lib/filters';
import type { Token, Meta, DexScreenerPair } from '@/lib/types';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = `${__dirname}/../public/data`;

const DEFAULT_FILTERS = {
  minLiquidity: 5000,
  maxAgeHours: 24,
  minVolume: 1000,
};

function mapToToken(pair: DexScreenerPair): Token {
  const base = pair.baseToken;
  const ageHours = (Date.now() - pair.pairCreatedAt) / (1000 * 60 * 60);

  return {
    address: base.address,
    symbol: base.symbol,
    name: base.name,
    pairAddress: pair.pairAddress,
    dex: mapDexId(pair.dexId),
    priceUsd: parseFloat(pair.priceUsd) || 0,
    priceChange24h: pair.priceChange?.h24 || 0,
    volume24h: pair.volume?.h24 || 0,
    liquidityUsd: pair.liquidity?.usd || 0,
    marketCap: pair.fdv || 0,
    pairCreatedAt: new Date(pair.pairCreatedAt).toISOString(),
    ageHours,
    contractVerified: false,
    liquidityLocked: false,
    holderCount: 0,
    top10HolderPct: 100,
    isHoneypotRisk: true,
    dexScreenerUrl: pair.url,
    pancakeSwapUrl: '',
    bscScanUrl: '',
    buyUrl: '',
  };
}

async function main() {
  console.log('[fetch] Starting token fetch...');
  const startTime = Date.now();

  // Fetch all pairs
  let pairs: DexScreenerPair[];
  try {
    pairs = await fetchAllBSCPairs();
    console.log(`[fetch] Got ${pairs.length} pairs from DexScreener`);
  } catch (error) {
    console.error('[fetch] Failed to fetch pairs:', error);
    process.exit(1);
  }

  // Map to tokens
  const tokens = pairs.map(mapToToken);

  // Apply basic filters before enrichment (saves API calls)
  const preFiltered = filterTokens(tokens, DEFAULT_FILTERS);
  console.log(`[fetch] ${preFiltered.length} tokens pass basic filters`);

  // Enrich with safety data
  const enriched = await enrichTokens(preFiltered);
  console.log(`[fetch] Enriched ${enriched.length} tokens`);

  // Final filter
  const final = filterTokens(enriched, { ...DEFAULT_FILTERS, safeOnly: false });
  console.log(`[fetch] ${final.length} tokens after final filter`);

  // Sort by volume descending
  final.sort((a, b) => b.volume24h - a.volume24h);

  // Generate meta
  const meta: Meta = {
    fetchedAt: new Date().toISOString(),
    totalPairsScanned: pairs.length,
    tokensAfterFilter: final.length,
    nextRefresh: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
  };

  // Ensure data directory exists
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }

  // Write files
  writeFileSync(`${DATA_DIR}/tokens.json`, JSON.stringify(final, null, 2));
  writeFileSync(`${DATA_DIR}/meta.json`, JSON.stringify(meta, null, 2));

  console.log(`[fetch] Done in ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
  console.log(`[fetch] Written to ${DATA_DIR}/tokens.json and meta.json`);
}

main().catch(err => {
  console.error('[fetch] Fatal error:', err);
  process.exit(1);
});