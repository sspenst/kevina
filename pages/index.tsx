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
        <title>Kevina and Spencer</title>
        <meta name='description' content='Kevina and Spencer' />
      </Head>
      <div className='m-16'>
        <div className={classNames('flex flex-col gap-8 text-center text-6xl', dancingScript.className)}>
          <span>Kevina Grace Takenaka</span>
          <span>&</span>
          <span>Spencer Christian Spenst</span>
        </div>
      </div>
    </>
  );
}
