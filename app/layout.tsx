import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'NutriSense — Smart Nutritional Deficiency Detection & Awareness Portal',
  description:
    'An evidence-informed, rule-based nutritional awareness portal aligned with ICMR-NIN (2024) Dietary Guidelines for Indians. Assess dietary frequency, explore preliminary risk indications, and discover nutrient-dense foods.',
  keywords: [
    'nutrition deficiency detection',
    'nutritional awareness',
    'ICMR-NIN 2024 guidelines',
    'iron deficiency awareness',
    'vitamin B12 vegetarian diet',
    'vitamin D sunshine',
    'calcium food sources',
    'dietary habit assessment',
    'CSP academic prototype',
  ],
  authors: [{ name: 'NutriSense Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased text-slate-900 bg-slate-50 flex flex-col min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
