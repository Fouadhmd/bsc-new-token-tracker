export interface Token {
  address: string;
  symbol: string;
  name: string;
  pairAddress: string;
  dex: 'pancakeswap' | 'pancakeswap-v3' | 'biswap' | 'apeswap' | 'other';
  priceUsd: number;
  priceChange24h: number;
  volume24h: number;
  liquidityUsd: number;
  marketCap: number;
  pairCreatedAt: string;
  ageHours: number;
  contractVerified: boolean;
  liquidityLocked: boolean;
  holderCount: number;
  top10HolderPct: number;
  isHoneypotRisk: boolean;
  dexScreenerUrl: string;
  pancakeSwapUrl: string;
  bscScanUrl: string;
  buyUrl: string;
}

export interface Meta {
  fetchedAt: string;
  totalPairsScanned: number;
  tokensAfterFilter: number;
  nextRefresh: string;
}

export interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: { address: string; name: string; symbol: string };
  quoteToken: { address: string; name: string; symbol: string };
  priceUsd: string;
  priceNative: string;
  priceChange: { h24: number };
  volume: { h24: number };
  liquidity: { usd: number };
  fdv: number;
  pairCreatedAt: number;
}

export interface BSCScanContractResponse {
  status: string;
  message: string;
  result: Array<{
    SourceCode: string;
    ABI: string;
    ContractName: string;
    CompilerVersion: string;
    OptimizationUsed: string;
    Runs: string;
    ConstructorArguments: string;
    EVMVersion: string;
    Library: string;
    LicenseType: string;
    Proxy: string;
    Implementation: string;
    SwarmSource: string;
  }>;
}

export interface BSCScanHolderResponse {
  status: string;
  message: string;
  result: Array<{
    TokenHolderAddress: string;
    TokenHolderQuantity: string;
  }>;
}