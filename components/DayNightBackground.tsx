'use client';

import { motion } from 'motion/react';
import { useMemo, useState, type ReactNode } from 'react';
import { Moon, Plane, Sun } from 'lucide-react';

interface DayNightBackgroundProps {
  children: ReactNode;
}

function seededValue(seed: number) {
  const value = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export default function DayNightBackground({ children }: DayNightBackgroundProps) {
  const [isNight, setIsNight] = useState(false);

  const stars = useMemo(() => (
    Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: `${seededValue(i * 11 + 1) * 100}%`,
      y: `${seededValue(i * 11 + 2) * 100}%`,
      size: seededValue(i * 11 + 3) * 2 + 1,
      delay: seededValue(i * 11 + 4) * 3,
      maxOpacity: seededValue(i * 11 + 5) * 0.7 + 0.3,
    }))
  ), []);

  const shootingStars = useMemo(() => (
    Array.from({ length: 6 }).map((_, i) => ({
      id: `shoot-${i}`,
      top: `${seededValue(i * 17 + 1) * 40}%`,
      left: `${seededValue(i * 17 + 2) * 40 + 40}%`,
      delay: seededValue(i * 17 + 3) * 15,
      repeatDelay: seededValue(i * 17 + 4) * 10 + 5,
    }))
  ), []);

  return (
    <div className={`relative isolate flex h-full w-full overflow-hidden transition-colors duration-[4000ms] ${isNight ? 'bg-gradient-to-b from-[#020111] via-[#0a0a2a] to-[#13132b]' : 'bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100'}`}>
      <button
        type="button"
        onClick={() => setIsNight((night) => !night)}
        aria-label={isNight ? 'Switch to day background' : 'Switch to night background'}
        className={`absolute right-20 top-4 z-50 rounded-full border p-3 shadow-lg backdrop-blur-md transition-all duration-[4000ms] sm:right-24 sm:top-6 ${isNight ? 'border-white/10 bg-black/20 text-white hover:bg-black/40' : 'border-black/10 bg-white/20 text-slate-800 hover:bg-white/40'}`}
      >
        {isNight ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-[4000ms] ${isNight ? 'opacity-100' : 'opacity-0'}`}>
        <div className="pointer-events-none absolute inset-0 z-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white shadow-[0_0_5px_1px_rgba(255,255,255,0.4)]"
              style={{ width: star.size, height: star.size, left: star.x, top: star.y }}
              animate={{ opacity: [0, star.maxOpacity, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: star.delay, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {shootingStars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute h-px w-[60px] rounded-full bg-gradient-to-r from-transparent via-white to-white"
              style={{ top: star.top, left: star.left, rotate: '135deg' }}
              animate={{ x: [0, -800], y: [0, 800], opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: star.delay, repeatDelay: star.repeatDelay, ease: 'easeIn' }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute left-[60%] top-[35%] z-0 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-[#fcf8ed] opacity-80 shadow-[0_0_15px_3px_rgba(252,248,237,0.15),0_0_30px_8px_rgba(252,248,237,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.1)] sm:h-14 sm:w-14">
            <div className="absolute left-[30%] top-[25%] h-2 w-2 rounded-full bg-black/20 blur-[1px] sm:h-3 sm:w-3" />
            <div className="absolute left-[60%] top-[50%] h-3 w-3 rounded-full bg-black/20 blur-[1.5px] sm:h-4 sm:w-4" />
            <div className="absolute bottom-[25%] left-[25%] h-1.5 w-1.5 rounded-full bg-black/20 blur-[1px] sm:h-2 sm:w-2" />
          </div>

          <div className="absolute left-1/2 top-1/2 h-32 w-48 -translate-x-1/2 -translate-y-1/2 transform opacity-90">
            <motion.div animate={{ x: [-15, 15, -15] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[-10%] top-[30%] h-12 w-28 rounded-full bg-[#020111] blur-[12px]" />
            <motion.div animate={{ x: [10, -20, 10] }} transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[20%] top-[50%] h-16 w-36 rounded-full bg-[#0a0a2a] opacity-90 blur-[16px]" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          { x: ['110vw', '-15vw'], y: ['60vh', '-15vh'], rotate: -90 },
          { x: ['30vw', '50vw'], y: ['110vh', '-15vh'], rotate: -30 },
          { x: ['-15vw', '110vw'], y: ['40vh', '-15vh'], rotate: 20 },
          { x: ['90vw', '-15vw'], y: ['110vh', '-15vh'], rotate: -75 },
          { x: ['110vw', '-15vw'], y: ['15vh', '5vh'], rotate: -100 },
        ].map((path, index) => (
          <motion.div
            key={`plane-${index}`}
            animate={{ x: path.x, y: path.y, opacity: [0, 0.6, 0.6, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear', delay: index * 39, repeatDelay: 160 }}
            className="absolute left-0 top-0 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center" style={{ transform: `rotate(${path.rotate}deg)` }}>
              <Plane className={`h-3 w-3 transition-colors duration-[4000ms] sm:h-4 sm:w-4 ${isNight ? 'text-white/60' : 'text-slate-500/60'}`} />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="absolute bottom-[10%] left-[10%] h-[3px] w-[3px] rounded-full bg-red-500 sm:h-1 sm:w-1" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 flex h-full w-full">
        {children}
      </div>
    </div>
  );
}
