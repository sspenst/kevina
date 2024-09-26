import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Libre_Baskerville } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import Header from '../components/header';

// const inter = Inter({
//   display: 'swap',
//   fallback: ['system-ui', 'arial'],
//   preload: true,
//   subsets: ['latin'],
// });

const libre = Libre_Baskerville({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={libre.className}>
      <ThemeProvider attribute='class' enableSystem>
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </div>
  );
}
