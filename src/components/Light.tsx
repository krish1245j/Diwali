import { motion } from 'framer-motion'
import { useMemo } from 'react'
const rand = (a: number, b: number) => a + Math.random() * (b - a)
export default function Light() {
  const bokeh = useMemo(() => Array.from({ length: 7 }, () => ({ x: rand(0, 100), y: rand(10, 100), s: rand(30, 120), d: rand(8, 16), h: [8, 20, 30, 45, 330][Math.floor(Math.random() * 5)] })), [])
  return (
    <>
      <motion.div className="pointer-events-none absolute inset-0 z-[60] bg-white" initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.95, 0.08, 0.75, 0] }} transition={{ duration: 0.8, times: [0, 0.07, 0.22, 0.38, 1] }} />
      <motion.div className="absolute inset-0" initial={{ opacity: 0, scale: 0.3 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.2, delay: 0.3, ease: 'easeOut' }}
        style={{ background: 'radial-gradient(ellipse closest-side at 50% 50%, rgba(255,176,0,.3), rgba(227,66,32,.14) 40%, rgba(36,11,54,.35) 75%, transparent 100%)' }} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/2">
        <motion.div className="h-full w-full" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: [0, 1, 0.5] }} transition={{ duration: 4, delay: 0.3, ease: 'easeOut' }}>
          <div className="h-full w-full animate-[spin_120s_linear_infinite]" style={{
            background: 'repeating-conic-gradient(from 0deg, rgba(255,215,0,.2) 0deg 2.5deg, transparent 2.5deg 11deg)',
            maskImage: 'radial-gradient(circle, #000 0%, transparent 55%)', WebkitMaskImage: 'radial-gradient(circle, #000 0%, transparent 55%)' }} />
        </motion.div>
      </div>
      <motion.div className="pointer-events-none absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 blur-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,200,100,.9), #fff, rgba(255,200,100,.9), transparent)' }}
        initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 1], opacity: [0, 1, 0] }} transition={{ duration: 2, delay: 0.15, ease: 'easeOut' }} />
      {[0, 1, 2].map(i => (
        <div key={'w' + i} className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2">
          <motion.div className="h-full w-full rounded-full border" style={{ borderColor: i % 2 ? 'rgba(194,24,91,.35)' : 'rgba(255,107,0,.35)' }}
            initial={{ scale: 0.2, opacity: 0 }} animate={{ scale: [0.2, 2.6], opacity: [0, 0.5, 0] }} transition={{ duration: 9, delay: 2 + i * 3, repeat: Infinity, ease: 'easeOut' }} />
        </div>
      ))}
      {bokeh.map((b, i) => (
        <motion.div key={i} className="bob pointer-events-none absolute rounded-full"
          style={{ animationDuration: b.d + 's', left: `${b.x}%`, top: `${b.y}%`, width: b.s, height: b.s, background: `radial-gradient(circle, hsla(${b.h},100%,60%,.35), hsla(${b.h},100%,50%,.05) 70%)` }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
          transition={{ delay: 1 + i * 0.12, duration: 2 }} />
      ))}
    </>
  )
}
