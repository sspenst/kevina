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

type PrerenderingDocument = Document & {
  prerendering?: boolean;
};

export default function HomePage() {
  const DRAW_TOTAL_MS = 850;
  const LIST_ITEM_FADE_MS = 220;
  const FADE_DIFF_MS = 50;
  const LOGO_WIDTH = 1332;
  const LOGO_HEIGHT = 321;
  const [animationToken, setAnimationToken] = React.useState('initial');
  const [animationsReady, setAnimationsReady] = React.useState(false);
  const animationStartedRef = React.useRef(false);

  React.useEffect(() => {
    const doc = document as PrerenderingDocument;

    const canStartAnimations = () => {
      return document.visibilityState === 'visible' && !doc.prerendering;
    };

    const startAnimations = () => {
      if (animationStartedRef.current || !canStartAnimations()) {
        return;
      }

      animationStartedRef.current = true;
      setAnimationToken(createAnimationToken());
      setAnimationsReady(true);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        return;
      }

      animationStartedRef.current = false;
      setAnimationsReady(false);
      startAnimations();
    };

    startAnimations();

    document.addEventListener('visibilitychange', startAnimations);
    window.addEventListener('pageshow', handlePageShow);

    if ('onprerenderingchange' in document) {
      document.addEventListener('prerenderingchange', startAnimations as EventListener);
    }

    return () => {
      document.removeEventListener('visibilitychange', startAnimations);
      window.removeEventListener('pageshow', handlePageShow);

      if ('onprerenderingchange' in document) {
        document.removeEventListener('prerenderingchange', startAnimations as EventListener);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Kevina</title>
        <meta name='description' content='Kevina homepage' />
      </Head>

      <div className={`${inter.className} min-h-screen bg-[#FDFFFE] text-black flex justify-center px-6 ${animationsReady ? 'kevina-animations-ready' : ''}`}>
        <div className='w-full max-w-2xl flex flex-col items-center gap-12 py-12 md:py-20'>
          <div className='grid w-60 max-w-full'>
            <Image
              key={`draw-${animationToken}`}
              src={`/kevina-cursive-draw.svg?v=${animationToken}`}
              alt='Kevina'
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority
              className='col-start-1 row-start-1 w-full h-auto kevina-draw-layer'
              style={{ animationDelay: `${DRAW_TOTAL_MS}ms`, height: 'auto' }}
            />
            <Image
              key={`final-${animationToken}`}
              src={`/kevina-cursive.svg?v=${animationToken}`}
              alt='Kevina'
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className='col-start-1 row-start-1 w-full h-auto kevina-final-layer'
              style={{ animationDelay: `${DRAW_TOTAL_MS}ms`, height: 'auto' }}
            />
          </div>

          <div className='text-sm max-w-md w-full flex flex-col gap-5 items-end mt-4'>
            <span
              className='w-full kevina-fade-in'
              style={{
                animationDelay: `${DRAW_TOTAL_MS}ms`,
                animationDuration: `${LIST_ITEM_FADE_MS}ms`,
              }}
            >
              A collection of websites I&apos;ve made for you over the years.
            </span>
            <span
              className='w-full kevina-fade-in'
              style={{
                animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS}ms`,
                animationDuration: `${LIST_ITEM_FADE_MS}ms`,
              }}
            >
              Crafted with care by your husband,
            </span>
            {/* <span className='text-right'>Spencer</span> */}
            <div className='flex flex-col items-end gap-1'>
              <Image
                src='/spencer-sig.png'
                alt='Spencer Signature'
                width={100}
                height={100}
                className='w-28 kevina-fade-in'
                style={{
                  animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * 2}ms`,
                  animationDuration: `${LIST_ITEM_FADE_MS}ms`,
                }}
              />
              <Image
                src='/heart.png'
                alt='Heart'
                width={100}
                height={100}
                className='w-10 kevina-fade-in'
                style={{
                  animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * 3}ms`,
                  animationDuration: `${LIST_ITEM_FADE_MS}ms`,
                }}
              />
            </div>
          </div>

          <nav aria-label='Site links' className='w-full max-w-md'>
            <ul className='kevina-link-list w-full'>
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
                  className='kevina-link-item kevina-fade-in border-b border-black/5 first:border-t'
                  style={{
                    animationDelay: `${DRAW_TOTAL_MS + (index + 4) * FADE_DIFF_MS}ms`,
                    animationDuration: `${LIST_ITEM_FADE_MS}ms`,
                  }}
                >
                  <Link
                    href={link.href}
                    className='kevina-link-row flex justify-between flex-wrap w-full items-center gap-4 py-3 text-lg transition'
                  >
                    <span className='kevina-link-title text-sm font-medium'>{link.label}</span>
                    <span className='text-xs text-black/50 tabular-nums'>{link.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <span className='text-sm w-full max-w-md text-black/40 kevina-fade-in' style={{
            animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * 7}ms`,
            animationDuration: `${LIST_ITEM_FADE_MS}ms`,
          }}>
            Built by <a href='https://sspenst.com' className='text-black/40 hover:text-black transition'>Spencer Spenst</a>
          </span>
        </div>
      </div>
    </>
  );
}
