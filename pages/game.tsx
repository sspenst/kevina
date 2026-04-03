import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import useInterval from '../components/useInterval';

export default function Index() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [velocityX, setVelocityX] = useState(0);
  const [velocityY, setVelocityY] = useState(0);
  const [two, setTwo] = useState(false);

  const [size, setSize] = useState(0);
  const speed = size / 10;

  const maxHealth = 80;
  const [health, setHealth] = useState(maxHealth);

  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (x > 3 * window.innerWidth / 4 - 3 * size / 2 && x < 3 * window.innerWidth / 4 + size / 2 && y > size * 10.5 && y < size * 12.5) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTwo(true);
    }
  }, [x, y, size]);

  useEffect(() => {
    const el = document.getElementById('game');

    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentBoxSize
      const gridHeight = entries[0].contentBoxSize[0].blockSize;
      // const gridWidth = entries[0].contentBoxSize[0].inlineSize;

      setSize(gridHeight / 20);
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.unobserve(el);
    };
  }, []);

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

    const handleTouchPos = (xTouch: number, yTouch: number) => {
      const deltaX = xTouch - x;
      const deltaY = yTouch - y;

      setVelocityX(deltaX / Math.max(Math.abs(deltaX), Math.abs(deltaY)) * speed);
      setVelocityY(deltaY / Math.max(Math.abs(deltaX), Math.abs(deltaY)) * speed);
    };

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const { clientX, clientY } = touch;

      handleTouchPos(clientX, clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const { clientX, clientY } = touch;

      handleTouchPos(clientX, clientY);
    };

    const handleTouchEnd = () => {
      setVelocityX(0);
      setVelocityY(0);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [size, speed, two, velocityX, velocityY, x, y]);

  useInterval(() => {
    setX((prevX) => prevX + velocityX);
    setY((prevY) => prevY + velocityY);

    // check if you are in a safe zone
    const gridSize = window.innerHeight / 20;

    // grass
    if (y < gridSize || y > window.innerHeight - gridSize) {
      setHealth(maxHealth);

      return;
    }

    if (y > gridSize * 3 && y < gridSize * 6 && x > window.innerWidth / 2 - size) {
      setHealth(maxHealth);

      return;
    }

    if (y > gridSize * 9 && y < gridSize * 12 && x > window.innerWidth / 8 - size && x < 3 * window.innerWidth / 8) {
      setHealth(maxHealth);

      return;
    }

    if (y > gridSize * 10 && y < gridSize * 13 && x > 5 * window.innerWidth / 8 - size && x < 7 * window.innerWidth / 8) {
      setHealth(maxHealth);

      return;
    }

    setHealth((prevHealth) => prevHealth - (two ? 1 : 2));
  }, 16);

  // useEffect to check if you are outside the screen, if yes you loseZ
  useEffect(() => {
    if (x < -size || x > window.innerWidth || y < -size || health < 0) {
      // TODO: auto-restart
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setX(0);
      setY(0);
      setVelocityX(0);
      setVelocityY(0);
      setTwo(false);
      setHealth(maxHealth);

      // add flash class to death id
      const death = document.getElementById('death');

      if (death) {
        death.classList.add('flash');
        setTimeout(() => {
          death.classList.remove('flash');
        }, 1000);
      }
    } else if (y > window.innerHeight - 3 * size / 2) {
      router.push('/win');
    }
  }, [health, router, size, x, y]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.imageSmoothingEnabled = false;
    // context.fillStyle = 'rgb(96 165 250)';
    // context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // make a light blue to dark blue gradient that fills the entire context
    const gradient = context.createLinearGradient(0, 0, 0, window.innerHeight);

    gradient.addColorStop(0, 'rgb(96 165 250)');
    gradient.addColorStop(1, 'rgb(0 0 128)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const gridSize = window.innerHeight / 20;

    context.fillStyle = '#86cf3e';
    // add a safe area at the bottom
    context.fillRect(0, window.innerHeight - gridSize, window.innerWidth, gridSize);
    // same at the top
    context.fillRect(0, 0, window.innerWidth, gridSize);

    context.fillStyle = '#a3a3a3';
    context.fillRect(window.innerWidth / 2, gridSize * 4, window.innerWidth / 2, gridSize * 2);

    context.fillRect(window.innerWidth / 8, gridSize * 10, window.innerWidth / 4, gridSize * 2);

    context.fillRect(5 * window.innerWidth / 8, gridSize * 11, window.innerWidth / 4, gridSize * 2);
  }, []);

  useEffect(() => {
    document.querySelectorAll('img').forEach((img) => {
      img.addEventListener('contextmenu', e => e.preventDefault());
      img.addEventListener('touchstart', e => e.preventDefault());
    });

    return () => {
      document.querySelectorAll('img').forEach((img) => {
        img.removeEventListener('contextmenu', e => e.preventDefault());
        img.removeEventListener('touchstart', e => e.preventDefault());
      });
    };
  }, []);

  const left = typeof window === 'undefined' ? 0 : two ? x + size : 3 * window.innerWidth / 4 - size / 2;

  return (
    <>
      <Head>
        <title>Duck Game</title>
        <meta name='description' content='Duck Game' />
        <meta name='theme-color' content='#60a5fa' />
      </Head>
      <div className='pt-24 select-none touch-none overscroll-none'>
        <div className='fixed inset-0 overflow-hidden bg-white select-none' id='game'>
          <canvas ref={canvasRef} className='absolute h-full w-full select-none' />
          <div className='absolute w-full h-full bg-red-500 opacity-0' id='death' />
          <div style={{
            left: `${x}px`,
            opacity: health / maxHealth,
            top: `${y}px`,
          }} className={classNames('absolute select-none', { '-scale-x-100': velocityX >= 0 })}>
            <Image alt='Duck Game' height={size} src='/duck.png' width={size} style={{
              minHeight: size,
              minWidth: size,
            }} />
          </div>
          <div style={{
            left: `${left}px`,
            opacity: two ? health / maxHealth : undefined,
            top: `${two ? y : size * 11.5}px`,
          }} className={classNames('absolute select-none', { '-scale-x-100': velocityX >= 0 })}>
            <Image alt='Duck Game' height={size} src='/duck.png' width={size} style={{
              minHeight: size,
              minWidth: size,
            }} />
          </div>
        </div>
      </div>
    </>
  );
}
