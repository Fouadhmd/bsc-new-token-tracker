import type { Metadata } from 'next';
import HomePageClient from './page-client';

export const metadata: Metadata = {
  title: 'BSC New Token Tracker',
  description: 'Track newly launched BSC tokens with safety heuristics',
};

export default function HomePage() {
  return <HomePageClient />;
}