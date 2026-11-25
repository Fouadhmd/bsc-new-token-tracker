import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BSC Token Radar — Automated Liquidity Screening',
  description: 'Track newly launched BSC tokens with safety heuristics. Automated screening of liquidity deployments on Binance Smart Chain.',
  openGraph: {
    title: 'BSC Token Radar',
    description: 'Automated screening of liquidity deployments on Binance Smart Chain',
    type: 'website',
  },
  robots: 'index, follow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-type="software" data-site-kind="software">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="page-type" content="software" />
        <meta name="site-kind" content="software" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🟡</text></svg>" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}