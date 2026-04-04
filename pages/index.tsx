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
        <div className='w-full max-w-md flex flex-col items-center gap-12 py-12 md:py-20'>
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

          <span
            className='text-sm w-full kevina-fade-in mt-4'
            style={{
              animationDelay: `${DRAW_TOTAL_MS}ms`,
              animationDuration: `${LIST_ITEM_FADE_MS}ms`,
            }}
          >
            A collection of pages I&apos;ve made you over the years.
          </span>

          <nav aria-label='Site links' className='w-full'>
            <ul className='kevina-link-list w-full'>
              {links.map((link, index) => (
                <li
                  key={link.href}
                  className='kevina-link-item kevina-fade-in border-b border-black/5 first:border-t'
                  style={{
                    animationDelay: `${DRAW_TOTAL_MS + (index + 1) * FADE_DIFF_MS}ms`,
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

          <div className='text-sm w-full flex flex-col gap-5 items-end'>
            <span
              className='w-full kevina-fade-in'
              style={{
                animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * 4}ms`,
                animationDuration: `${LIST_ITEM_FADE_MS}ms`,
              }}
            >
              Crafted with care by your husband,
            </span>
            <div className='flex flex-col items-end gap-1'>
              <a href='https://sspenst.com'>
                <Image
                  src='/spencer-sig.png'
                  alt='Spencer Signature'
                  width={100}
                  height={100}
                  className='w-28 kevina-fade-in'
                  style={{
                    animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * 5}ms`,
                    animationDuration: `${LIST_ITEM_FADE_MS}ms`,
                  }}
                />
              </a>
              <Image
                src='/heart.png'
                alt='Heart'
                width={100}
                height={100}
                className='w-10 kevina-fade-in'
                style={{
                  animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * 6}ms`,
                  animationDuration: `${LIST_ITEM_FADE_MS}ms`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
