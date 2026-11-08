import { motion } from 'framer-motion'
export default function Bulb({ lit, onClick }: { lit: boolean; onClick: () => void }) {
  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 z-30 flex origin-top flex-col items-center"
        style={{ height: 'calc(50dvh + 64px)' }}
        animate={lit ? { y: '-32dvh', opacity: 0, rotate: 0 } : { rotate: [-1.6, 1.6, -1.6] }}
        transition={lit ? { delay: 2.2, duration: 1.8, ease: 'easeInOut' } : { duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-px flex-1 bg-gradient-to-b from-zinc-900 to-zinc-600" />
        <button aria-label="Light the bulb" onClick={onClick} disabled={lit}
          className="pointer-events-auto relative h-32 w-24 cursor-pointer outline-none">
          <motion.div className="absolute left-1/2 top-[62%] -z-10 h-[90vmax] w-[90vmax]  rounded-full"
            style={{ x: '-50%', y: '-50%', background: 'radial-gradient(circle, rgba(255,200,60,.65) 0%, rgba(255,140,20,.25) 12%, transparent 45%)' }}
            initial={{ opacity: 0, scale: 0.1 }} animate={lit ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.5, duration: 2.4, ease: 'easeOut' }} />
          <svg viewBox="0 0 100 128" className="h-full w-full overflow-visible">
            <defs>
              <linearGradient id="metal" x1="0" x2="1"><stop offset="0" stopColor="#1a1a1c" /><stop offset=".35" stopColor="#6b6b70" /><stop offset=".6" stopColor="#2a2a2d" /><stop offset="1" stopColor="#111" /></linearGradient>
              <radialGradient id="glass" cx=".4" cy=".35"><stop offset="0" stopColor="#fffbe0" /><stop offset=".5" stopColor="#ffd34d" /><stop offset="1" stopColor="#ff9a1f" /></radialGradient>
            </defs>
            <rect x="34" y="0" width="32" height="34" rx="4" fill="url(#metal)" />
            {[8, 15, 22, 29].map(y => <line key={y} x1="34" x2="66" y1={y} y2={y} stroke="#000" strokeOpacity=".55" strokeWidth="1.5" />)}
            <motion.path d="M34 34 C8 48 6 74 16 92 C24 108 36 112 36 124 L64 124 C64 112 76 108 84 92 C94 74 92 48 66 34 Z"
              strokeWidth="1.2" animate={lit ? { fill: 'url(#glass)', stroke: '#fff3b0' } : { fill: '#08080a', stroke: '#26262b' }}
              transition={{ duration: 0.25 }} />
            <path d="M30 56 C24 66 24 76 28 84" stroke="#fff" strokeOpacity={lit ? 0.5 : 0.08} strokeWidth="3" fill="none" strokeLinecap="round" />
            <motion.path d="M44 34 L44 70 Q50 58 56 70 L56 34 M44 70 Q50 84 56 70" fill="none" strokeWidth="1.6"
              animate={lit ? { stroke: '#fff' } : { stroke: '#3a3a40' }} />
            <rect x="36" y="112" width="28" height="14" rx="3" fill="url(#metal)" />
          </svg>
        </button>
      </motion.div>
      <motion.div className="pointer-events-none absolute inset-x-0 z-30 text-center" style={{ top: 'calc(50dvh + 110px)' }}
        animate={{ opacity: lit ? 0 : 1 }} transition={{ duration: lit ? 0.4 : 3, delay: lit ? 0 : 1.2 }}>
        <p className="text-lg italic tracking-wide text-zinc-400 sm:text-xl">A little light can change everything.</p>
        <motion.p className="font-display mt-5 text-[10px] tracking-[0.55em] text-amber-500/70"
          animate={{ opacity: [0.25, 0.9, 0.25] }} transition={{ duration: 3, repeat: Infinity }}>CLICK TO LIGHT UP</motion.p>
      </motion.div>
    </>
  )
}
