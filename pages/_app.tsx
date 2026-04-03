import '../styles/global.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' enableSystem>
      <main>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
