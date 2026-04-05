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
      <div className='relative flex flex-col items-center gap-12 md:m-16 m-12 z-10'>
        <div className='flex flex-wrap justify-center items-center gap-12 text-center text-3xl italic text-balance max-w-full'>
          <Image alt='Kevina & Spencer 78' src='/photos/Kevina & Spencer-78.jpg' width={2000} height={2000} className='max-w-full' />
          <Image alt='Kevina & Spencer 9' src='/photos/Kevina & Spencer-9.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 15' src='/photos/Kevina & Spencer-15.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 16' src='/photos/Kevina & Spencer-16.jpg' width={2000} height={2000} className='max-w-full' />
          <Image alt='Kevina & Spencer 20' src='/photos/Kevina & Spencer-20.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 21' src='/photos/Kevina & Spencer-21.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 40' src='/photos/Kevina & Spencer-40.jpg' width={2000} height={2000} className='max-w-full' />
          <Image alt='Kevina & Spencer 22' src='/photos/Kevina & Spencer-22.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 36' src='/photos/Kevina & Spencer-36.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 46' src='/photos/Kevina & Spencer-46.jpg' width={2000} height={2000} className='max-w-full' />
          <Image alt='Kevina & Spencer 61' src='/photos/Kevina & Spencer-61.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 89' src='/photos/Kevina & Spencer-89.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 84' src='/photos/Kevina & Spencer-84.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
          <Image alt='Kevina & Spencer 70' src='/photos/Kevina & Spencer-70.jpg' width={2000} height={2000} className='max-w-full w-[512px]' />
        </div>
      </div>
    </>
  );
}
