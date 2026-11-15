import axios from 'axios';
import type { BSCScanContractResponse, BSCScanHolderResponse } from '@/lib/types';

const BSCSCAN_BASE = 'https://api.bscscan.com/api';

function getApiKey(): string {
  return process.env.BSCSCAN_API_KEY ?? '';
}

export async function fetchContractSource(address: string): Promise<BSCScanContractResponse['result'][0] | null> {
  const key = getApiKey();
  if (!key) return null;

  const url = `${BSCSCAN_BASE}?module=contract&action=getsourcecode&address=${address}&apikey=${key}`;
  try {
    const response = await axios.get<BSCScanContractResponse>(url, { timeout: 10000 });
    return response.data.result[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchTokenHolders(address: string): Promise<BSCScanHolderResponse['result'] | null> {
  const key = getApiKey();
  if (!key) return null;

  const url = `${BSCSCAN_BASE}?module=token&action=tokenholderlist&address=${address}&apikey=${key}`;
  try {
    const response = await axios.get<BSCScanHolderResponse>(url, { timeout: 15000 });
    return response.data.result ?? null;
  } catch {
    return null;
  }
}

export function isContractVerified(source: BSCScanContractResponse['result'][0] | null): boolean {
  return !!source?.SourceCode && source.SourceCode.length > 0;
}

export function analyzeHolders(holders: BSCScanHolderResponse['result'] | null): { count: number; top10Pct: number; liquidityLocked: boolean } {
  if (!holders || holders.length === 0) return { count: 0, top10Pct: 100, liquidityLocked: false };

  const sorted = [...holders].sort((a, b) =>
    Number(BigInt(b.TokenHolderQuantity) - BigInt(a.TokenHolderQuantity))
  );

  const total = sorted.reduce((sum, h) => sum + BigInt(h.TokenHolderQuantity), 0n);
  const top10 = sorted.slice(0, 10).reduce((sum, h) => sum + BigInt(h.TokenHolderQuantity), 0n);
  const top10Pct = total > 0n ? Number((top10 * 10000n) / total) / 100 : 100;

  // Check if top holder is dead address or known locker
  const topHolder = sorted[0]?.TokenHolderAddress.toLowerCase() ?? '';
  const liquidityLocked =
    topHolder === '0x000000000000000000000000000000000000dead' ||
    topHolder === '0x0000000000000000000000000000000000000000' ||
    topHolder.includes('lock') ||
    topHolder.includes('timelock');

  return { count: sorted.length, top10Pct, liquidityLocked };
}