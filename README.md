# 🟡 BSC New Token Tracker

Personal dashboard for tracking newly launched BSC tokens with basic safety heuristics.

![Dashboard](https://img.shields.io/badge/Status-MVP-yellow)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)
![Schedule](https://img.shields.io/badge/Refresh-15min-blue)
![Cost](https://img.shields.io/badge/Cost-$0/month-green)

## Features

- 🔍 Scans all BSC pairs via DexScreener API every 15 minutes
- 📊 Filters: liquidity, age, volume, safety
- 🛡️ Safety heuristics: contract verified, liquidity locked, holder count, concentration
- 🔗 One-click links to DexScreener, PancakeSwap, BSCScan
- ⚡ Static site - zero runtime cost, hosted on Vercel free tier
- 🔄 Auto-updates via GitHub Actions cron

## Safety Checks (Heuristics Only ⚠️)

| Check | Method | Threshold |
|-------|--------|-----------|
| Contract Verified | BSCScan API `getsourcecode` | Source code present |
| Liquidity Locked | LP holder analysis | Top holder is `0x000...dead` or known locker |
| Holder Count | BSCScan `tokenholderlist` | > 50 unique holders |
| Concentration | Top 10 holders % | < 80% |
| Honeypot Risk | Combined flags | 2+ red flags = ⚠️ |

**⚠️ DISCLAIMER:** These are automated heuristics only. They miss many risks (hidden mint functions, proxy upgrades, social engineering, etc.). **NOT FINANCIAL ADVICE. ALWAYS DYOR.**

## Quick Start

### 1. Fork & Clone

```bash
git clone https://github.com/YOUR_USERNAME/bsc-new-token-tracker.git
cd bsc-new-token-tracker
```

### 2. Install & Run Locally

```bash
npm install
npm run fetch    # Generates public/data/tokens.json
npm run dev      # http://localhost:3000
```

### 3. Deploy to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add `BSCSCAN_API_KEY` in Vercel Environment Variables (optional but recommended)
4. Deploy - Vercel detects Next.js static export automatically

### 4. Enable Auto-Refresh

1. Go to GitHub repo Settings → Secrets → Actions
2. Add `BSCSCAN_API_KEY` (get free key at [bscscan.com/apis](https://bscscan.com/apis))
3. GitHub Actions will run `npm run fetch` every 15 minutes and commit updated data

## Project Structure

```
├── .github/workflows/fetch.yml   # Cron job
├── scripts/
│   ├── fetch-tokens.ts           # Main fetch + filter + enrich
│   └── enrich.ts                 # Safety enrichment
├── lib/
│   ├── api/                      # API clients
│   ├── safety.ts                 # Heuristics
│   └── filters.ts                # Filter/sort logic
├── app/
│   ├── page.tsx                  # Dashboard
│   └── components/               # React components
└── public/data/                  # Generated JSON (gitignored)
```

## Customization

Edit `scripts/fetch-tokens.ts` `DEFAULT_FILTERS`:
```ts
const DEFAULT_FILTERS = {
  minLiquidity: 5000,    // Minimum liquidity USD
  maxAgeHours: 24,       // Maximum pair age
  minVolume: 1000,       // Minimum 24h volume USD
};
```

## API Limits

- **DexScreener:** No official limit, be respectful
- **BSCScan Free:** 5 calls/sec, 100k calls/day
- **GitHub Actions:** 2000 min/month free (this uses ~50 min/day)

## License

MIT - Use at your own risk.