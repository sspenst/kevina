import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { inter } from '../lib/fonts';

function createAnimationToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const links = [
  { href: '/connections', label: 'Connections', date: '2025-05-11' },
  { href: '/wedding', label: 'Wedding', date: '2024-11-15' },
  { href: '/duck-game', label: 'Duck Game', date: '2024-05-11' },
];

export default function HomePage() {
  const DRAW_TOTAL_MS = 750;
  const LIST_ITEM_FADE_MS = 220;
  const [animationToken, setAnimationToken] = React.useState('initial');

  React.useEffect(() => {
    const resetAnimation = () => {
      setAnimationToken(createAnimationToken());
    };

    resetAnimation();
    window.addEventListener('pageshow', resetAnimation);

    return () => {
      window.removeEventListener('pageshow', resetAnimation);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Kevina</title>
        <meta name='description' content='Kevina homepage' />
      </Head>

      <div className={`${inter.className} bg-[#FDFFFE] text-black flex items-center justify-center px-6`}>
        <div className='w-full max-w-2xl flex flex-col items-center gap-20 py-12 md:py-20'>
          <div className='relative w-60 max-w-[700px] h-auto'>
            <Image
              key={`draw-${animationToken}`}
              src={`/kevina-cursive-draw.svg?v=${animationToken}`}
              alt='Kevina'
              width={240}
              height={240}
              className='w-60 max-w-[700px] h-auto kevina-draw-layer'
              style={{ animationDelay: `${DRAW_TOTAL_MS}ms`, height: 'auto' }}
            />
            <Image
              key={`final-${animationToken}`}
              src={`/kevina-cursive.svg?v=${animationToken}`}
              alt='Kevina'
              width={240}
              height={240}
              className='w-60 max-w-[700px] h-auto absolute inset-0 kevina-final-layer'
              style={{ animationDelay: `${DRAW_TOTAL_MS}ms`, height: 'auto' }}
            />
          </div>

          <nav aria-label='Site links' className='w-full max-w-sm'>

            <ul className='w-full'>
              {/* <li className='border-b border-black/5 last:border-b-0'>
                <div
                  className='grid w-full grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 text-lg transition hover:bg-black/5 cursor-default'
                >
                  <span className='text-sm text-orange-600 font-medium'>Under Construction</span>
                  <span className='text-xs text-black/70 tabular-nums'>2026-05-11</span>
                </div>
              </li> */}
              {links.map((link, index) => (
                <li
                  key={link.href}
                  className='kevina-link-item'
                  style={{
                    animationDelay: `${DRAW_TOTAL_MS + (index + 1) * LIST_ITEM_FADE_MS}ms`,
                    animationDuration: `${LIST_ITEM_FADE_MS}ms`,
                  }}
                >
                  <Link
                    href={link.href}
                    className='kevina-link-row grid w-full grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 text-lg transition'
                  >
                    <span className='text-sm font-medium'>{link.label}</span>
                    <span className='text-xs text-black/50 tabular-nums'>{link.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
