import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export default function Index() {
  return (
    <>
      <Head>
        <title>Kevina & Spencer Spenst</title>
        <meta name='description' content='Kevina & Spencer Spenst' />
      </Head>
      <Image alt='invitation' src='/invitation.jpeg' width={3912} height={3437} className='fixed w-full h-full top-0 opacity-50 object-cover z-0' />
      <div className='relative flex flex-col items-center gap-12 m-16 z-10'>
        <div className='flex flex-col items-center gap-12 text-center text-3xl italic text-balance'>
          <div className='flex flex-col gap-8 text-center text-4xl'>
            <span>Kevina Grace Takenaka</span>
            <span>&</span>
            <span>Spencer Christian Spenst</span>
          </div>
          <br />
          <a className='border-[2px] not-italic border-orange-200 px-8 py-2 hover:bg-orange-200 bg-orange-100 transition w-fit rounded-lg' href='https://docs.google.com/forms/d/e/1FAIpQLSfngKKVGGtjyomtK5lgZ-L7e8LF5WIhF258w7OGS_c3f-r6QQ/viewform' target='_blank' rel='noreferrer'>RSVP</a>
          <br />
          <div className='flex flex-col items-center gap-8 text-center text-4xl'>
            <span>Friday, November 15th, 2024</span>
            <a className='hover:text-green-600 underline w-fit text-xl flex gap-3 items-center' href='Kevina%20%26%20Spencer%27s%20Wedding.ics'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='size-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z' />
              </svg>
              <span className='hidden sm:block'>4:00 pm in the afternoon</span>
              <span className='sm:hidden'>4:00 pm</span>
            </a>
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
          <br />
          <a className='border-[2px] not-italic border-green-200 px-8 py-2 hover:bg-green-200 bg-green-100 transition w-fit rounded-lg' href='https://www.myregistry.com/giftlist/kevina-spencer' target='_blank' rel='noreferrer'>Registry</a>
          {/* <br />
          <span>If you would like to give a gift, feel free to check out our <a className='hover:text-green-600 underline w-fit' href='https://www.myregistry.com/giftlist/kevina-spencer' target='_blank' rel='noreferrer'>registry</a> for ideas.</span> */}
          <br />
          <span>We hope to see you there!</span>
        </div>
      </div>
    </>
  );
}
