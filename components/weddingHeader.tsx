import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { libreBaskerville } from '../lib/fonts';

export default function WeddingHeader() {
  const router = useRouter();

  return (
    <header className={classNames(libreBaskerville.className, 'p-4 sticky top-0 z-20 flex justify-center', { 'bg-white': router.pathname === '/photos' })}>
      <div className='flex items-center justify-between gap-6 px-4 py-3 rounded-full border border-white backdrop-blur-lg max-w-5xl w-full'>
        <div className='flex items-center gap-6 pl-2 truncate'>
          <Link className='hover:opacity-50 transition' href='/'>
            <Image alt='Kevina & Spencer Spenst' height={426} src='/favicon.png' width={471} className='h-8 w-8 min-w-8' />
          </Link>
          <Link aria-label='Home' href='/wedding' className='flex items-center gap-6 font-medium hover:opacity-50 transition truncate max-w-full'>
            <div className='flex gap-2'>
              <Image alt='Kevina & Spencer Spenst' height={312} src='/ks.png' width={340} className='h-8 w-8 min-w-8' />
            </div>
            <span className='text-xl truncate'>
              Kevina & Spencer
            </span>
          </Link>
        </div>
        <div className='flex gap-6 items-center pr-2'>
          <Link aria-label='Photos' href='/photos' className='hover:text-neutral-500 text-black'>Photos</Link>
          <Link href='/duck-game' className='-scale-x-100 opacity-50 hover:opacity-100 transition'>
            <Image alt='Duck Game' height={24} src='/duck.png' width={24} style={{
              minHeight: 24,
              minWidth: 24,
            }} />
          </Link>
        </div>
      </div>
    </header>
  );
}
