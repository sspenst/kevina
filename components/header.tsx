import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export default function Header() {
  const router = useRouter();

  if (router.pathname === '/game') {
    return null;
  }

  return (
    <header className={classNames('p-4 sticky top-0 z-20 flex justify-center', { 'bg-white': router.pathname === '/photos' })}>
      <div className='flex items-center justify-between px-4 py-3 rounded-full border border-white backdrop-blur-lg max-w-screen-lg w-full'>
        <Link aria-label='Home' href='/' className='flex items-center gap-6 font-medium hover:opacity-50 transition pl-2'>
          <div className='flex gap-2'>
            <Image alt='Kevina & Spencer Spenst' height={32} src='/ks.png' width={32} />
          </div>
          <span className='sm:block hidden text-xl'>
            Kevina & Spencer
          </span>
        </Link>
        <div className='flex gap-6 items-center pr-2'>
          <a className=' hover:text-neutral-500 text-black' href='https://docs.google.com/forms/d/e/1FAIpQLSfngKKVGGtjyomtK5lgZ-L7e8LF5WIhF258w7OGS_c3f-r6QQ/viewform' target='_blank' rel='noreferrer'>RSVP</a>
          <Link aria-label='Photos' href='/photos' className='hover:text-neutral-500 text-black'>Photos</Link>
        </div>
      </div>
    </header>
  );
}
