import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { inter } from '../lib/fonts';

const links = [
  { href: '/wedding', label: 'Wedding' },
  { href: '/photos', label: 'Photos' },
  { href: '/connections', label: 'Connections' },
  { href: '/duck-game', label: 'Duck Game' },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Kevina</title>
        <meta name='description' content='Kevina homepage' />
      </Head>

      <div className={`${inter.className} min-h-screen bg-white text-black flex items-center justify-center px-6`}>
        <div className='w-full max-w-2xl flex flex-col items-center gap-10'>
          <Image
            src='/kevina-title.svg'
            alt='Kevina'
            width={240}
            height={240}
            className='w-60 max-w-[700px] h-auto'
          />

          <nav aria-label='Site links'>
            <ul className='flex flex-col items-center gap-3 text-lg'>
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='underline underline-offset-4 hover:opacity-60 transition'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
