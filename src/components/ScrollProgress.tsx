import { motion, useScroll } from 'framer-motion'
export default function ScrollProgress({ ch }: { ch: number }) {
  const { scrollYProgress } = useScroll()
  return (
    <div className="fixed right-1 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-2 sm:right-4">
      <div className="absolute inset-y-3 left-1/2 w-px bg-white/10"><motion.div className="h-full w-px origin-top bg-gradient-to-b from-[#FFD700] to-[#E34220]" style={{ scaleY: scrollYProgress }} /></div>
      {[0, 1, 2, 3, 4].map(i => (
        <button key={i} aria-label={`Go to section ${i + 1}`} onClick={() => document.getElementById('ch' + i)?.scrollIntoView({ behavior: 'smooth' })} className="relative flex h-7 w-7 items-center justify-center">
          <span className={`block rounded-full transition-all duration-500 ${i === ch ? 'h-2.5 w-2.5 bg-amber-300 shadow-[0_0_12px_#FF9933]' : 'h-1.5 w-1.5 bg-white/30'}`} />
        </button>
      ))}
    </div>
  )
}
