import { Geist, Inter, Libre_Baskerville } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
});

export const geistSans = Geist({
  subsets: ['latin'],
});

export const libreBaskerville = Libre_Baskerville({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: ['400', '700'],
});
