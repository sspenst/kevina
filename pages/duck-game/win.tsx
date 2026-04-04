import { ChevronLeft } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { libreBaskerville } from '../../lib/fonts';

export default function Index() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const size = height / 5;

  useEffect(() => {
    const el = document.getElementById('game');

    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      const gridHeight = entries[0].contentBoxSize[0].blockSize;
      const gridWidth = entries[0].contentBoxSize[0].inlineSize;

      setHeight(gridHeight);
      setWidth(gridWidth);
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.unobserve(el);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Duck Game</title>
        <meta name='description' content='Duck Game' />
      </Head>
      <div className={`${libreBaskerville.className} fixed inset-0 overflow-hidden bg-white select-none flex flex-col items-center justify-center gap-8`} id='game'>
        <div className='flex flex-col gap-8'>
          <Link href='/' className='flex items-center gap-2 text-black/50 hover:text-black transition px-2 w-fit'>
            <ChevronLeft className='w-4 h-4' />
            Home
          </Link>
          {/* you win! text above the images */}
          <div style={{
            top: `${height / 2 - size / 2 - 80}px`,
          }} className='select-none w-full text-center font-bold text-6xl'>
            <p>You win!</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div style={{
            left: `${width / 2 - size}px`,
            top: `${height / 2 - size / 2}px`,
          }} className='select-none -scale-x-100'>
            <Image alt='Duck Game' height={size} src='/duck.png' width={size} style={{
              minHeight: size,
              minWidth: size,
            }} />
          </div>
          <div style={{
            left: `${width / 2 }px`,
            top: `${height / 2 - size / 2}px`,
          }} className='select-none -scale-x-100'>
            <Image alt='Duck Game' height={size * 1.1} src='/cake.gif' width={size * 1.3} style={{
              minHeight: size * 1.1,
              minWidth: size * 1.3,
            }} />
          </div>
        </div>
      </div>
    </>
  );
}
