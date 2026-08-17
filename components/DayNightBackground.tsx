'use client';

/* eslint-disable react-hooks/purity */

import { motion } from 'motion/react';
import { useMemo, useState, type ReactNode } from 'react';
import { Sun, Moon, Plane } from 'lucide-react';

interface DayNightBackgroundProps {
  children: ReactNode;
  isNight: boolean;
  onToggleNight: () => void;
}

export default function DayNightBackground({ children, isNight }: DayNightBackgroundProps) {

  // Generate a realistic night sky with stars
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.random() * 2 + 1, // Sizes between 1px and 3px
      delay: Math.random() * 3, // Random start time
      maxOpacity: Math.random() * 0.7 + 0.3, // Varied brightness
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: `shoot-${i}`,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 40 + 40}%`,
      delay: Math.random() * 15,
      repeatDelay: Math.random() * 10 + 5,
    }));
  }, []);

  return (
    <div className={`relative flex h-[100dvh] w-full overflow-hidden transition-colors duration-[4000ms] ${isNight ? 'bg-gradient-to-b from-[#020111] via-[#0a0a2a] to-[#13132b]' : 'bg-sky-300'}`}>

      {/* Theme Toggle Button removed from here; now elegantly integrated in ChatArea header */}

      {/* Night Elements Container (Fades in and out over 4s) */}
      <div className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-[4000ms] ${isNight ? 'opacity-100' : 'opacity-0'}`}>

        {/* Real Night Sky Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white shadow-[0_0_5px_1px_rgba(255,255,255,0.4)]"
            style={{
              width: star.size,
              height: star.size,
              left: star.x,
              top: star.y,
            }}
            animate={{
              opacity: [0, star.maxOpacity, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 3, // 3 seconds exactly as requested
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
        </div>

        {/* Shooting Stars */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {shootingStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute h-[1px] w-[60px] bg-gradient-to-r from-transparent via-white to-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              rotate: '135deg',
            }}
            animate={{
              x: [0, -800],
              y: [0, 800],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: star.delay,
              repeatDelay: star.repeatDelay,
              ease: "easeIn",
            }}
          />
        ))}
        </div>

        {/* Moon and Clouds (Night only) */}
        <div className="absolute top-[35%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
          {/* Dimmer, Smaller Moon */}
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-[#fcf8ed] opacity-80 shadow-[0_0_15px_3px_rgba(252,248,237,0.15),0_0_30px_8px_rgba(252,248,237,0.05),inset_-2px_-2px_6px_rgba(0,0,0,0.1)] relative overflow-hidden">
            {/* Craters */}
            <div className="absolute top-[25%] left-[30%] w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black/20 blur-[1px]"></div>
            <div className="absolute top-[50%] left-[60%] w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/20 blur-[1.5px]"></div>
            <div className="absolute bottom-[25%] left-[25%] w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black/20 blur-[1px]"></div>
          </div>

          {/* Clouds covering the moon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-32 opacity-90">
            <motion.div
              animate={{ x: [-15, 15, -15] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[30%] left-[-10%] w-28 h-12 bg-[#020111] blur-[12px] rounded-full"
            />
            <motion.div
              animate={{ x: [10, -20, 10] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[50%] left-[20%] w-36 h-16 bg-[#0a0a2a] blur-[16px] rounded-full opacity-90"
            />
          </div>
        </div>
      </div>

      {/* High Altitude Airplanes (5 Different Paths, Sequential) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[
          // 1. Right side to left-top
          { x: ['110vw', '-15vw'], y: ['60vh', '-15vh'], rotate: -90 },
          // 2. Bottom footer to top-mid
          { x: ['30vw', '50vw'], y: ['110vh', '-15vh'], rotate: -30 },
          // 3. Left side to right-top
          { x: ['-15vw', '110vw'], y: ['40vh', '-15vh'], rotate: 20 },
          // 4. Bottom-right to top-left
          { x: ['90vw', '-15vw'], y: ['110vh', '-15vh'], rotate: -75 },
          // 5. Right-top to left-top (Fixed orientation: moving slightly up-left)
          { x: ['110vw', '-15vw'], y: ['15vh', '5vh'], rotate: -100 }
        ].map((path, index) => (
          <motion.div
            key={`plane-${index}`}
            animate={{
              x: path.x,
              y: path.y,
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{
              duration: 35, // Original slow speed
              repeat: Infinity,
              ease: "linear",
              delay: index * 39, // 35s flight + 4s gap
              repeatDelay: 160, // Total 195s cycle - 35s flight = 160s wait
            }}
            className="absolute top-0 left-0 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center" style={{ transform: `rotate(${path.rotate}deg)` }}>
              <Plane className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-[4000ms] ${isNight ? 'text-white/60' : 'text-slate-500/60'}`} />
              {/* Blinking Red Light on the plane's tail */}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[10%] left-[10%] w-[3px] h-[3px] sm:w-[4px] sm:h-[4px] bg-red-500 rounded-full"
              />
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
