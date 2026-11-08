import { motion } from 'framer-motion'
import { useMemo } from 'react'
const rand = (a: number, b: number) => a + Math.random() * (b - a)
export default function Lanterns() {
  const items = useMemo(() => Array.from({ length: 10 }, (_, i) => ({ x: 4 + i * 9.5 + rand(-3, 3), s: rand(22, 44), c: ['#FF9933','#E34220','#FF6B00','#C2185B'][i % 4], d: rand(26, 44), delay: rand(2, 16), sway: rand(10, 30) })), [])
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      {items.map((l, i) => (
        <motion.div key={i} className="absolute bottom-0" style={{ left: `${l.x}%` }}
          initial={{ y: '20vh', opacity: 0 }} animate={{ y: '-120vh', opacity: [0, 0.9, 0.9, 0], x: [0, l.sway, -l.sway, 0] }}
          transition={{ duration: l.d, delay: l.delay, repeat: Infinity, ease: 'linear' }}>
          <div style={{ width: l.s, height: l.s * 1.3, borderRadius: '45% 45% 40% 40%', background: 'radial-gradient(circle at 50% 70%, #fff0b0, ${l.c} 45%, #8B0000)', boxShadow: `0 0 ${l.s}px ${l.s / 3}px ${l.c}88` }} />
        </motion.div>
      ))}
    </div>
  )
}
