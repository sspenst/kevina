import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import WeddingHeader from '../components/weddingHeader';

export default function Index() {
  return (
    <>
      <Head>
        <title>Kevina & Spencer Spenst</title>
        <meta name='description' content='Kevina & Spencer Spenst' />
      </Head>
      <WeddingHeader />
      <Image alt='invitation' src='/invitation.jpeg' width={3912} height={3437} className='fixed w-full h-full top-0 opacity-50 object-cover z-0' />
      <div className='relative flex flex-col items-center gap-12 m-16 z-10'>
        <div className='flex flex-col items-center gap-12 text-center text-3xl italic text-balance'>
          <div className='flex flex-col gap-8 text-center text-4xl'>
            <span>Kevina Grace Takenaka</span>
            <span>&</span>
            <span>Spencer Christian Spenst</span>
          </div>
          <br />
          <div className='flex flex-col items-center gap-8 text-center text-4xl'>
            <span>Friday, November 15th, 2024</span>
          </div>
          <br />
          <div className='flex flex-col items-center gap-8 text-center text-4xl'>
            <span>Fort Langley Community Hall</span>
            <a className='hover:text-green-600 underline w-fit text-xl flex gap-2 items-center text-balance text-left' href='https://maps.app.goo.gl/gSqQzDLs1HB7dX6C6' target='_blank' rel='noreferrer'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6 min-w-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
                <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z' />
              </svg>
              <span className='hidden sm:block'>9167 Glover Rd, Langley Twp, BC V1M 2R9</span>
              <div className='flex flex-col sm:hidden'>
                <span>9167 Glover Rd</span>
                <span>Langley Twp, BC</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
