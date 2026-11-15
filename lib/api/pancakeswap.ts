import axios from 'axios';
import type { DexScreenerPair } from '@/lib/types';

const PANCAKE_GRAPHQL = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v2';

export async function fetchNewPairsGraphQL(limit = 100): Promise<DexScreenerPair[]> {
  const query = `
    query NewPairs($first: Int!) {
      pairs(first: $first, orderBy: createdAtTimestamp, orderDirection: desc) {
        id
        token0 { id symbol name }
        token1 { id symbol name }
        reserve0
        reserve1
        totalSupply
        volumeUSD
        createdAtTimestamp
      }
    }
  `;

  try {
    const response = await axios.post<{ data: { pairs: any[] } }>(
      PANCAKE_GRAPHQL,
      { query, variables: { first: limit } },
      { timeout: 20000 }
    );

    return response.data.data.pairs.map(mapPancakePair);
  } catch {
    return [];
  }
}

function mapPancakePair(p: any): DexScreenerPair {
  const token0 = p.token0;
  const token1 = p.token1;
  const isWrappedBNB = token0.symbol === 'WBNB' || token1.symbol === 'WBNB';
  const base = isWrappedBNB ? (token0.symbol === 'WBNB' ? token1 : token0) : token0;

  return {
    chainId: 'bsc',
    dexId: 'pancakeswap',
    url: `https://pancakeswap.finance/swap?outputCurrency=${base.id}`,
    pairAddress: p.id,
    baseToken: { address: base.id, name: base.name, symbol: base.symbol },
    quoteToken: { address: isWrappedBNB ? (token0.symbol === 'WBNB' ? token0.id : token1.id) : token1.id, name: 'Wrapped BNB', symbol: 'WBNB' },
    priceUsd: '0',
    priceNative: '0',
    priceChange: { h24: 0 },
    volume: { h24: parseFloat(p.volumeUSD) || 0 },
    liquidity: { usd: 0 },
    fdv: 0,
    pairCreatedAt: parseInt(p.createdAtTimestamp) * 1000,
  };
}