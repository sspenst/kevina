import { ChevronLeft } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { geistSans } from '../lib/fonts';

interface Word {
  id: number;
  text: string;
  category: string;
  selected: boolean;
  color: string;
}

interface CompletedGroup {
  words: Word[];
  category: string;
  color: string;
}

const CATEGORIES = {
  'CLIMBING TERMS': {
    color: 'rgb(249, 223, 109)',
    words: ['FLASH', 'JUG', 'KNOT', 'SEND'],
  },
  'GREEN THINGS': {
    color: 'rgb(160, 195, 90)',
    words: ['FERN', 'MATCHA', 'MOSS', 'PASTURES'],
  },
  'CIRCULAR OBJECTS': {
    color: 'rgb(176, 196, 239)',
    words: ['BAND', 'DONUT', 'LOOP', 'RING'],
  },
  'SUMAS TRAIL SUFFIXES': {
    color: 'rgb(186, 129, 197)',
    words: ['CUP', 'DIVA', 'PEEL', 'SAUCE'],
  },
} as const;

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;

  return x - Math.floor(x);
};

const createWords = () => {
  let id = 1;
  const words: Word[] = [];

  Object.entries(CATEGORIES).forEach(([category, { color, words: categoryWords }]) => {
    categoryWords.forEach((text) => {
      words.push({
        id: id++,
        text,
        category,
        selected: false,
        color,
      });
    });
  });

  const seed = 17;

  return words.sort((a, b) => seededRandom(seed + a.id) - seededRandom(seed + b.id));
};

export default function ConnectionsPage() {
  const [words, setWords] = useState<Word[]>(createWords());
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [completedGroups, setCompletedGroups] = useState<CompletedGroup[]>([]);

  const isGameWon = completedGroups.length === 4;

  const handleWordClick = (word: Word) => {
    if (isGameWon) return;

    if (word.selected) {
      const newWords = words.map((w) => (w.id === word.id ? { ...w, selected: false } : w));

      setWords(newWords);
      setSelectedWords(selectedWords.filter((w) => w.id !== word.id));

      return;
    }

    if (selectedWords.length < 4) {
      const newWords = words.map((w) => (w.id === word.id ? { ...w, selected: true } : w));

      setWords(newWords);
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleShuffle = () => {
    const seed = Date.now();

    setWords([...words].sort((a, b) => seededRandom(seed + a.id) - seededRandom(seed + b.id)));
  };

  const handleDeselectAll = () => {
    const newWords = words.map((w) => ({ ...w, selected: false }));

    setWords(newWords);
    setSelectedWords([]);
  };

  const handleSubmit = () => {
    if (selectedWords.length !== 4) return;

    const category = selectedWords[0].category;
    const isCorrect = selectedWords.every((word) => word.category === category);

    if (isCorrect) {
      setCompletedGroups([
        ...completedGroups,
        {
          words: selectedWords,
          category,
          color: CATEGORIES[category as keyof typeof CATEGORIES].color,
        },
      ]);

      const remainingWords = words.filter(
        (word) => !selectedWords.some((selected) => selected.id === word.id)
      );

      setWords(remainingWords);
      setSelectedWords([]);

      return;
    }

    handleDeselectAll();
  };

  return (
    <>
      <Head>
        <title>Connections</title>
        <meta name='description' content='A special birthday Connections game just for you!' />
      </Head>

      <div className={`${geistSans.className} min-h-screen flex items-center justify-center bg-white text-black`}>
        <div className='max-w-[600px] w-full p-2'>
          <Link href='/' className='flex items-center gap-2 text-black/50 hover:text-black transition px-2 w-fit mb-1'>
            <ChevronLeft className='w-4 h-4' />
            Home
          </Link>
          <h1 className='text-4xl font-semibold text-center mb-1'>Connections</h1>
          <h2 className='text-2xl text-center mb-8'>May 11, 2025</h2>

          <p className='text-center mb-8'>Create four groups of four!</p>

          <div className='flex flex-col gap-2 mb-8'>
            {completedGroups.map((group, index) => (
              <div
                key={index}
                className='flex flex-col justify-center gap-1 items-center h-20 rounded-sm'
                style={{ backgroundColor: group.color }}
              >
                <span className='font-bold text-black'>{group.category}</span>
                <span className='text-sm text-black text-center'>
                  {group.words
                    .map((word) => word.text)
                    .sort()
                    .join(', ')}
                </span>
              </div>
            ))}

            {words.length > 0 && (
              <div className='grid grid-cols-4 gap-2'>
                {words.map((word) => (
                  <button
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    className={`h-20 text-center font-semibold rounded-sm transition-all text-sm enabled:cursor-pointer ${
                      word.selected
                        ? 'bg-[rgb(90,89,78)] text-white'
                        : 'bg-[rgb(239,239,230)] text-black hover:bg-[rgb(217,217,194)]'
                    }`}
                  >
                    {word.text}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isGameWon ? (
            <div className='text-center h-11'>
              <h3 className='text-2xl font-semibold mb-4'>Happy Birthday! ❤️</h3>
            </div>
          ) : (
            <div className='flex justify-center items-center flex-wrap gap-4 h-11'>
              <button
                onClick={handleShuffle}
                className='px-4 py-2 bg-white border text-black rounded-full hover:bg-gray-100 transition-all enabled:cursor-pointer'
              >
                Shuffle
              </button>
              <button
                onClick={handleDeselectAll}
                disabled={selectedWords.length === 0}
                className='px-4 py-2 bg-white border text-black rounded-full enabled:hover:bg-gray-100 transition-all disabled:opacity-50 enabled:cursor-pointer'
              >
                Deselect All
              </button>
              <button
                onClick={handleSubmit}
                disabled={selectedWords.length !== 4}
                className='px-4 py-2 bg-white border text-black rounded-full enabled:hover:bg-gray-100 transition-all disabled:opacity-50 enabled:cursor-pointer'
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
