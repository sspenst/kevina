import Head from 'next/head';
import Image from 'next/image';
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
      <div className={`${libreBaskerville.className} fixed inset-0 overflow-hidden bg-white select-none`} id='game'>
        {/* you win! text above the images */}
        <div style={{
          top: `${height / 2 - size / 2 - 80}px`,
        }} className='absolute select-none w-full text-center font-bold text-6xl'>
          <p>You win!</p>
        </div>
        <div style={{
          left: `${width / 2 - size}px`,
          top: `${height / 2 - size / 2}px`,
        }} className='absolute select-none -scale-x-100'>
          <Image alt='Duck Game' height={size} src='/duck.png' width={size} style={{
            minHeight: size,
            minWidth: size,
          }} />
        </div>
        <div style={{
          left: `${width / 2 }px`,
          top: `${height / 2 - size / 2}px`,
        }} className='absolute select-none -scale-x-100'>
          <Image alt='Duck Game' height={size * 1.1} src='/cake.gif' width={size * 1.3} style={{
            minHeight: size * 1.1,
            minWidth: size * 1.3,
          }} />
        </div>
      </div>
    </>
  );
}
