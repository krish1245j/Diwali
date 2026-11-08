import { motion } from 'framer-motion'
const ease = [0.22, 1, 0.36, 1] as const
export default function Reveal() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 pb-16 text-center">
      <motion.span className="mb-4 text-xl" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6, 1] }} transition={{ delay: 2.2, duration: 3, repeat: Infinity, repeatDelay: 1 }}>✨</motion.span>
      <h1 className="font-display flex flex-col items-center font-black leading-[0.95] sm:flex-row sm:gap-[0.3em]" style={{ fontSize: 'clamp(3.2rem, 13vw, 10.5rem)' }}>
        {['HAPPY', 'DIWALI'].map((w, i) => (
          <motion.span key={w} initial={{ opacity: 0, y: 40, scale: 0.85, filter: 'blur(24px)', letterSpacing: '0.35em' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', letterSpacing: '0.04em' }}
            transition={{ delay: 2.6 + i * 0.35, duration: 2, ease }}>
            <span className="shimmer" style={{ filter: 'drop-shadow(0 0 18px rgba(255,107,0,.55)) drop-shadow(0 0 46px rgba(194,24,91,.35))' }}>{w}</span>
          </motion.span>
        ))}
      </h1>
      <motion.div className="my-6 h-px w-40 bg-gradient-to-r from-transparent via-amber-400 to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 3.6, duration: 1.6, ease }} />
      <motion.p className="max-w-2xl text-xl leading-relaxed text-amber-50/90 sm:text-3xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4, duration: 1.8, ease }}>
        May this festival of lights illuminate your life with endless happiness, prosperity, love and new beginnings.
      </motion.p>
      <motion.p className="font-display mt-6 text-[11px] tracking-[0.4em] text-orange-300/80 sm:text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5.4, duration: 2 }}>
        LET YOUR LIGHT SHINE BRIGHTER THAN EVER
      </motion.p>
    </div>
  )
}
