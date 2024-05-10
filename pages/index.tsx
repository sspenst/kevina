import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Index() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const speed = 10;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
      case 'ArrowDown':
      case 's':
        setVelocityY(speed);
        break;
      case 'ArrowLeft':
      case 'a':
        setVelocityX(-speed);
        break;
      case 'ArrowRight':
      case 'd':
        setVelocityX(speed);
        break;
      case 'ArrowUp':
      case 'w':
        setVelocityY(-speed);
        break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
      case 'ArrowDown':
      case 's':
        setVelocityY(0);
        break;
      case 'ArrowLeft':
      case 'a':
        setVelocityX(0);
        break;
      case 'ArrowRight':
      case 'd':
        setVelocityX(0);
        break;
      case 'ArrowUp':
      case 'w':
        setVelocityY(0);
        break;
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const { clientX, clientY } = touch;
      const deltaX = clientX - x;
      const deltaY = clientY - y;

      setVelocityX(deltaX / Math.max(Math.abs(deltaX), Math.abs(deltaY)) * speed);
      setVelocityY(deltaY / Math.max(Math.abs(deltaX), Math.abs(deltaY)) * speed);
    };

    const handleTouchEnd = () => {
      setVelocityX(0);
      setVelocityY(0);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    const updatePosition = () => {
      setX((prevX) => prevX + velocityX);
      setY((prevY) => prevY + velocityY);
    };

    const intervalId = setInterval(updatePosition, 16); // Update roughly every 16ms (60fps)

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearInterval(intervalId);
    };
  }, [velocityX, velocityY, x, y]);

  // useEffect to check if you are outside the screen, if yes you loseZ
  useEffect(() => {
    if (x < -64 || x > window.innerWidth + 64 || y < -64 || y > window.innerHeight + 64) {
      alert('You drowned! Do you want to try again?');
      setX(0);
      setY(0);
      setVelocityX(0);
      setVelocityY(0);
    }
  }, [x, y]);

  return (<>
    <Head>
      <title>Duck Game</title>
      <meta name='description' content='Duck Game' />
    </Head>
    <div className='fixed inset-0 overflow-hidden bg-blue-400'>
      <div style={{
        left: `${x}px`,
        top: `${y}px`,
      }} className='absolute select-none'>
        <Image alt='Duck Game' height={64} src='/duck.png' width={64} style={{
          minHeight: '64px',
          minWidth: '64px',
        }} />
      </div>
    </div>
  </>);
}
