import classNames from 'classnames';
import { Libre_Baskerville } from 'next/font/google';
import Head from 'next/head';
import React from 'react';

const libre = Libre_Baskerville({
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  preload: true,
  style: ['normal', 'italic'],
  subsets: ['latin'],
  weight: '400',
});

export default function Index() {
  return (
    <>
      <Head>
        <title>Kevina & Spencer Spenst</title>
        <meta name='description' content='Kevina & Spencer Spenst' />
      </Head>
      <div className='flex flex-col items-center gap-12 m-16'>
        <div className={classNames('flex flex-col items-center gap-4 text-center text-3xl italic', libre.className)}>
          <div className='flex flex-col gap-8 text-center text-4xl'>
            <span>Kevina Grace Takenaka</span>
            <span>&</span>
            <span>Spencer Christian Spenst</span>
          </div>
          <br />
          <span>November 15th, 2024</span>
          <span>4:00 pm in the afternoon</span>
          <br />
          <span>Fort Langley Community Hall</span>
          <a className='hover:text-green-600 underline w-fit text-xl' href='https://maps.app.goo.gl/gSqQzDLs1HB7dX6C6' target='_blank' rel='noreferrer'>9167 Glover Rd, Langley Twp, BC V1M 2R9</a>
          <br />
          <a className='hover:text-green-600 underline w-fit' href='https://docs.google.com/forms/d/e/1FAIpQLSfngKKVGGtjyomtK5lgZ-L7e8LF5WIhF258w7OGS_c3f-r6QQ/viewform' target='_blank' rel='noreferrer'>RSVP</a>
        </div>
      </div>
    </>
  );
}
