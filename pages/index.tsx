import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import KevinaCursive from '../components/KevinaCursive';
import { inter } from '../lib/fonts';

function createAnimationToken() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const links = [
  { href: '/strands', label: 'Strands', date: '2026-05-11' },
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
  const FADE_DIFF_MS = 40;
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
      setTimeout(() => {
        setAnimationsReady(true);
      }, 50);
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

      <div className={`${inter.className} bg-[#FDFFFE] text-black flex justify-center px-6 ${animationsReady ? 'kevina-animations-ready' : ''}`}>
        <div className='w-full max-w-md flex flex-col gap-12 py-20'>
          {!animationsReady ? null :
            <KevinaCursive
              key={animationToken}
              runToken={animationToken}
              drawDelayMs={DRAW_TOTAL_MS}
            />
          }

          <span
            className='text-sm w-full kevina-fade-in mt-2'
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

          <div className='text-sm w-full flex flex-col gap-8 items-end'>
            <span
              className='w-full kevina-fade-in'
              style={{
                animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * (links.length + 1)}ms`,
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
                    animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * (links.length + 2)}ms`,
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
                  animationDelay: `${DRAW_TOTAL_MS + FADE_DIFF_MS * (links.length + 3)}ms`,
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
