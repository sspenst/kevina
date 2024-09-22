import classNames from 'classnames';
import { Dancing_Script } from 'next/font/google';
import Head from 'next/head';
import React from 'react';

const dancingScript = Dancing_Script({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  subsets: ['latin'],
});

export default function Index() {
  return (
    <>
      <Head>
        <title>Kevina & Spencer Spenst</title>
        <meta name='description' content='Kevina & Spencer Spenst' />
      </Head>
      <div className='m-16'>
        <div className={classNames('flex flex-col gap-8 text-center text-5xl', dancingScript.className)}>
          <span>Kevina Grace Takenaka</span>
          <span>&</span>
          <span>Spencer Christian Spenst</span>
          <br />
          <span>November 15th, 2024</span>
          <span>4:00 pm in the afternoon</span>
          <span>Fort Langley Community Hall</span>
        </div>
      </div>
    </>
  );
}
