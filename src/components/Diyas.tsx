import { motion } from 'framer-motion'
import { useState } from 'react'
export function Diya({ i = 0, onSpark }: { i?: number; onSpark?: (x: number, y: number) => void }) {
  const [n, setN] = useState(0)
  return (
    <button aria-label="Light diya" className="pointer-events-auto relative p-2 outline-none"
      onClick={e => { setN(c => c + 1); onSpark?.(e.clientX, e.clientY - 30) }}>
      {n > 0 && <motion.span key={'r' + n} className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/3 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,200,80,.7), rgba(227,66,32,.3) 40%, transparent 70%)' }}
        initial={{ scale: 0.2, opacity: 1 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 1.2, ease: 'easeOut' }} />}
      <motion.div key={'f' + n} className="absolute left-1/2 top-[-18px] -translate-x-1/2" initial={{ scale: n ? 2 : 1 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 8 }}>
        <motion.div className="h-8 w-4 origin-bottom rounded-[50%_50%_50%_50%/70%_70%_30%_30%]"
          style={{ background: 'radial-gradient(ellipse at 50% 75%, #fff 0%, #FFD700 35%, #FF6B00 70%, transparent)', boxShadow: '0 0 30px 12px rgba(255,120,30,.55)' }}
          animate={{ scaleY: [1, 1.18, 0.92, 1.1, 1], scaleX: [1, 0.9, 1.06, 0.95, 1], rotate: [0, 3, -3, 2, 0] }}
          transition={{ duration: 1.6 + (i % 5) * 0.13, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.div>
      <svg viewBox="0 0 80 32" className="w-[12vw] max-w-[80px]">
        <path d="M2 8 Q40 2 78 8 Q70 30 40 31 Q10 30 2 8Z" fill="#c77a1e" />
        <path d="M6 14 Q40 20 74 14 Q68 30 40 31 Q12 30 6 14Z" fill="#5a2a08" fillOpacity=".55" />
        <path d="M2 8 Q40 2 78 8 Q40 14 2 8Z" fill="#2a1204" />
        <path d="M14 19 Q40 25 66 19" stroke="#FFD700" strokeOpacity=".6" fill="none" strokeWidth="1" strokeDasharray="1 3" strokeLinecap="round" />
      </svg>
    </button>
  )
}
export default function Diyas({ onSpark }: { onSpark: (x: number, y: number) => void }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center gap-[2vw] pb-1 sm:gap-8">
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <motion.div key={i} className={i > 4 || i < 2 ? 'hidden sm:block' : ''} style={{ marginBottom: Math.abs(3 - i) * 4 }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 + i * 0.18, duration: 1.2 }}>
          <Diya i={i} onSpark={onSpark} />
        </motion.div>
      ))}
    </div>
  )
}
