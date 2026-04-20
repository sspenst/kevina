import { ChevronLeft } from 'lucide-react';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

const ROWS = 8;
const COLS = 6;

const THEME = 'Oceanfront Property';

const GRID: string[][] = [
  ['N', 'H', 'C', 'R', 'I', 'S'],
  ['O', 'I', 'A', 'T', 'F', 'H'],
  ['T', 'S', 'E', 'L', 'S', 'S'],
  ['S', 'T', 'E', 'P', 'L', 'E'],
  ['U', 'I', 'D', 'O', 'O', 'A'],
  ['B', 'M', 'N', 'O', 'U', 'R'],
  ['A', 'R', 'E', 'M', 'H', 'C'],
  ['C', 'A', 'N', 'E', 'N', 'I'],
];

const WORDS: string[] = [
  'ANEMONE',
  'CHITON',
  'CRAB',
  'MUSSEL',
  'SEAURCHIN',
  'STARFISH',
  'TIDEPOOL',
];

interface Cell {
  row: number;
  col: number;
}

interface Point {
  x: number;
  y: number;
}

const cellKey = (row: number, col: number) => `${row},${col}`;

const isAdjacent = (a: Cell, b: Cell) => {
  return (
    Math.abs(a.row - b.row) <= 1 &&
    Math.abs(a.col - b.col) <= 1 &&
    !(a.row === b.row && a.col === b.col)
  );
};

const SPANGRAM = 'TIDEPOOL';

const SELECTED_COLOR = 'rgb(239, 239, 230)';
const LINE_COLOR = 'rgb(217, 217, 194)';
const SPANGRAM_COLOR = 'rgb(249, 223, 109)';
const FOUND_COLOR = 'rgb(176, 196, 239)';

interface FoundWord {
  word: string;
  cells: Cell[];
}

export default function StrandsPage() {
  const [selected, setSelected] = useState<Cell[]>([]);
  const [foundWords, setFoundWords] = useState<FoundWord[]>([]);
  const [positions, setPositions] = useState<(Point | null)[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });

  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLButtonElement | null)[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );

  const selectedRef = useRef(selected);
  const foundWordsRef = useRef(foundWords);
  const pointerDownRef = useRef(false);
  const dragMovedRef = useRef(false);
  const submitOnUpRef = useRef(false);
  const lastCellRef = useRef<Cell | null>(null);

  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    foundWordsRef.current = foundWords;
  }, [foundWords]);

  const measurePositions = useCallback(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const gridRect = grid.getBoundingClientRect();
    const next: (Point | null)[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const btn = cellRefs.current[r]?.[c];

        if (!btn) continue;

        const rect = btn.getBoundingClientRect();

        next[r][c] = {
          x: rect.left - gridRect.left + rect.width / 2,
          y: rect.top - gridRect.top + rect.height / 2,
        };
      }
    }

    setPositions(next);
    setGridSize({ width: gridRect.width, height: gridRect.height });
  }, []);

  useLayoutEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const ro = new ResizeObserver(() => measurePositions());

    ro.observe(grid);

    return () => ro.disconnect();
  }, [measurePositions]);

  const applySelection = useCallback((row: number, col: number, duringDrag: boolean) => {
    setSelected((current) => {
      const idx = current.findIndex((c) => c.row === row && c.col === col);

      if (idx !== -1) {
        if (idx < current.length - 1) {
          return current.slice(0, idx + 1);
        }

        return current;
      }

      if (current.length === 0) {
        return [{ row, col }];
      }

      const last = current[current.length - 1];

      if (isAdjacent(last, { row, col })) {
        return [...current, { row, col }];
      }

      if (!duringDrag) {
        return [{ row, col }];
      }

      return current;
    });
  }, []);

  const submitCurrentWord = useCallback(() => {
    const path = selectedRef.current;
    const word = path.map((c) => GRID[c.row][c.col]).join('');
    const alreadyFound = foundWordsRef.current.some((f) => f.word === word);

    if (word.length > 1 && WORDS.includes(word) && !alreadyFound) {
      setFoundWords([...foundWordsRef.current, { word, cells: path }]);
    }

    setSelected([]);
  }, []);

  const handlePointerDown = (row: number, col: number, e: React.PointerEvent) => {
    e.preventDefault();

    pointerDownRef.current = true;
    dragMovedRef.current = false;
    lastCellRef.current = { row, col };

    const current = selectedRef.current;
    const idx = current.findIndex((c) => c.row === row && c.col === col);

    if (idx !== -1 && idx === current.length - 1) {
      submitOnUpRef.current = true;

      return;
    }

    submitOnUpRef.current = false;
    applySelection(row, col, false);
  };

  const handleGridPointerMove = (e: React.PointerEvent) => {
    if (!pointerDownRef.current) return;

    const grid = gridRef.current;

    if (!grid) return;

    const rect = grid.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellSize = rect.width / COLS;
    const hitRadius = cellSize * 0.35;
    const hitRadiusSq = hitRadius * hitRadius;

    let bestR = -1;
    let bestC = -1;
    let bestDistSq = Infinity;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const p = positions[r]?.[c];

        if (!p) continue;

        const dx = x - p.x;
        const dy = y - p.y;
        const dSq = dx * dx + dy * dy;

        if (dSq > hitRadiusSq) continue;

        if (dSq < bestDistSq) {
          bestDistSq = dSq;
          bestR = r;
          bestC = c;
        }
      }
    }

    if (bestR === -1) return;

    const last = lastCellRef.current;

    if (last?.row === bestR && last?.col === bestC) return;

    lastCellRef.current = { row: bestR, col: bestC };
    dragMovedRef.current = true;
    submitOnUpRef.current = false;
    applySelection(bestR, bestC, true);
  };

  useEffect(() => {
    const handleUp = () => {
      if (!pointerDownRef.current) return;

      if (dragMovedRef.current) {
        submitCurrentWord();
      } else if (submitOnUpRef.current) {
        submitCurrentWord();
      }

      pointerDownRef.current = false;
      dragMovedRef.current = false;
      submitOnUpRef.current = false;
      lastCellRef.current = null;
    };

    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);

    return () => {
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, [submitCurrentWord]);

  const selectedKeys = useMemo(
    () => new Set(selected.map((c) => cellKey(c.row, c.col))),
    [selected]
  );

  const foundCellColors = useMemo(() => {
    const map = new Map<string, string>();

    for (const fw of foundWords) {
      const color = fw.word === SPANGRAM ? SPANGRAM_COLOR : FOUND_COLOR;

      for (const c of fw.cells) {
        map.set(cellKey(c.row, c.col), color);
      }
    }

    return map;
  }, [foundWords]);

  const currentWord = selected.map((c) => GRID[c.row][c.col]).join('');

  const foundLines: { from: Point; to: Point; color: string }[] = [];

  for (const fw of foundWords) {
    const color = fw.word === SPANGRAM ? SPANGRAM_COLOR : FOUND_COLOR;

    for (let i = 0; i < fw.cells.length - 1; i++) {
      const a = positions[fw.cells[i].row]?.[fw.cells[i].col];
      const b = positions[fw.cells[i + 1].row]?.[fw.cells[i + 1].col];

      if (a && b) foundLines.push({ from: a, to: b, color });
    }
  }

  const linePoints: { from: Point; to: Point }[] = [];

  for (let i = 0; i < selected.length - 1; i++) {
    const a = positions[selected[i].row]?.[selected[i].col];
    const b = positions[selected[i + 1].row]?.[selected[i + 1].col];

    if (a && b) linePoints.push({ from: a, to: b });
  }

  return (
    <>
      <Head>
        <title>Strands</title>
        <meta name='description' content='A special Strands game just for you!' />
      </Head>

      <div className='min-h-screen flex items-start justify-center bg-white text-black'>
        <div className='max-w-[480px] w-full p-4 flex flex-col'>
          <Link
            href='/'
            className='flex items-center gap-2 text-black/50 hover:text-black transition p-2 w-fit mb-2'
          >
            <ChevronLeft className='w-4 h-4' />
            Home
          </Link>

          <div className='text-center mb-6'>
            <p className='uppercase tracking-widest text-xs text-black/50 mb-1'>Today&apos;s theme</p>
            <p className='text-lg font-medium'>{THEME}</p>
          </div>

          <div className='min-h-[56px] flex items-center justify-center mb-6'>
            {selected.length !== 0 && (
              <span className='text-2xl font-semibold tracking-[0.3em] uppercase'>{currentWord}</span>
            )}
          </div>

          <div className='relative mb-8 max-w-[360px] w-full mx-auto'>
            {gridSize.width > 0 && (
              <svg
                className='absolute inset-0 pointer-events-none z-0'
                width={gridSize.width}
                height={gridSize.height}
                viewBox={`0 0 ${gridSize.width} ${gridSize.height}`}
              >
                {foundLines.map((lp, i) => (
                  <line
                    key={`f${i}`}
                    x1={lp.from.x}
                    y1={lp.from.y}
                    x2={lp.to.x}
                    y2={lp.to.y}
                    stroke={lp.color}
                    strokeWidth={10}
                    strokeLinecap='round'
                  />
                ))}
                {linePoints.map((lp, i) => (
                  <line
                    key={`s${i}`}
                    x1={lp.from.x}
                    y1={lp.from.y}
                    x2={lp.to.x}
                    y2={lp.to.y}
                    stroke={LINE_COLOR}
                    strokeWidth={10}
                    strokeLinecap='round'
                  />
                ))}
              </svg>
            )}
            <div
              ref={gridRef}
              className='grid gap-0 select-none relative z-10'
              style={{
                gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                touchAction: 'none',
              }}
              onPointerMove={handleGridPointerMove}
            >
              {Array.from({ length: ROWS }).map((_, row) =>
                Array.from({ length: COLS }).map((__, col) => {
                  const letter = GRID[row]?.[col] ?? '';
                  const key = cellKey(row, col);
                  const foundColor = foundCellColors.get(key);
                  const isSel = selectedKeys.has(key);
                  const bg = foundColor ?? (isSel ? SELECTED_COLOR : 'transparent');

                  return (
                    <button
                      key={key}
                      ref={(node) => {
                        cellRefs.current[row][col] = node;
                      }}
                      data-cell={`${row},${col}`}
                      onPointerDown={(e) => handlePointerDown(row, col, e)}
                      className='aspect-square flex items-center justify-center text-2xl font-semibold cursor-pointer bg-transparent'
                    >
                      <span
                        className='flex items-center justify-center rounded-full'
                        style={{
                          width: '1.6em',
                          height: '1.6em',
                          backgroundColor: bg,
                        }}
                      >
                        {letter}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          <div className='text-center text-sm text-black/60'>
            <span className='font-semibold text-black'>{foundWords.length}</span>
            {' of '}
            <span className='font-semibold text-black'>{WORDS.length}</span>
            {' theme words found'}
          </div>
        </div>
      </div>
    </>
  );
}
