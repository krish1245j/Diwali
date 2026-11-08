import { motion, MotionValue, useInView, useScroll, useTransform } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'
import Rangoli from './Rangoli'
import Lanterns from './Lanterns'
import Toran from './Toran'
import { Diya } from './Diyas'

const ease = [0.22, 1, 0.36, 1] as const
type Par = { y1: MotionValue<number>; y2: MotionValue<number> }
const glow = { filter: 'drop-shadow(0 0 18px rgba(255,107,0,.5)) drop-shadow(0 0 40px rgba(194,24,91,.3))' }

function Chapter(p: { id: string; eyebrow: string; title: string; text: string; decor?: (a: Par) => ReactNode; after?: ReactNode; big?: boolean; onEnter?: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [90, -90]), y2 = useTransform(scrollYProgress, [0, 1], [-50, 130])
  const inView = useInView(ref, { amount: 0.5 })
  useEffect(() => { if (inView) p.onEnter?.() }, [inView])
  return (
    <section id={p.id} ref={ref} className="relative z-20 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      {p.decor?.({ y1, y2 })}
      <motion.div className="relative z-10 flex max-w-3xl flex-col items-center" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.3 }} transition={{ duration: 1.4, ease }}>
        <p className="font-display mb-5 text-[10px] tracking-[0.5em] text-orange-300/80 sm:text-xs">{p.eyebrow}</p>
        <h2 className="font-display font-black leading-tight" style={{ fontSize: p.big ? 'clamp(2.3rem,8.5vw,6rem)' : 'clamp(2rem,7vw,4.8rem)' }}><span className="shimmer" style={glow}>{p.title}</span></h2>
        <div className="my-6 h-px w-32 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />
        <p className="text-xl italic leading-relaxed text-amber-50/90 sm:text-3xl">{p.text}</p>
        {p.after}
      </motion.div>
    </section>
  )
}
const wash = (bg: string) => <div className="pointer-events-none absolute inset-0" style={{ background: bg }} />
const orb = (y: MotionValue<number>, cls: string, c: string) => <motion.div style={{ y, background: c }} className={`pointer-events-none absolute rounded-full blur-3xl ${cls}`} />

export default function Chapters({ spark, celebrate, toTop }: { spark: (x: number, y: number) => void; celebrate: () => void; toTop: () => void }) {
  return (
    <>
      <Chapter id="ch1" eyebrow="THE FESTIVAL OF LIGHTS" title="A Night Full of Light"
        text="May every diya you light bring a new reason to smile, every sparkle bring hope, and every moment bring happiness."
        decor={({ y1, y2 }) => <>
          {wash('radial-gradient(ellipse at 50% 100%, rgba(227,66,32,.35), transparent 60%), radial-gradient(ellipse at 15% 15%, rgba(139,0,0,.5), transparent 55%)')}
          {orb(y1, '-left-24 top-1/4 h-72 w-72', 'rgba(255,107,0,.22)')}{orb(y2, '-right-24 bottom-1/4 h-80 w-80', 'rgba(139,0,0,.45)')}</>}
        after={<div className="mt-10 flex gap-3 sm:gap-8">{[0, 1, 2, 3, 4].map(i => <Diya key={i} i={i} onSpark={spark} />)}</div>} />

      <Chapter id="ch2" eyebrow="WISHES OF PROSPERITY" title="May Your Dreams Shine Bright"
        text="May Goddess Lakshmi bless your home with prosperity, abundance, success and endless opportunities."
        decor={({ y1, y2 }) => <>
          {wash('radial-gradient(circle at 85% 15%, rgba(255,153,51,.3), transparent 50%), radial-gradient(circle at 10% 85%, rgba(139,0,0,.55), transparent 55%)')}
          <motion.div style={{ y: y2 }} className="absolute inset-0 flex items-center justify-center opacity-60">
            <Rangoli variant="gold" delay={0} className="h-[min(150vw,115vh)] w-[min(150vw,115vh)]" /></motion.div>
          {orb(y1, 'right-[-4rem] top-1/3 h-64 w-64', 'rgba(255,153,51,.2)')}<Toran /></>} />

      <Chapter id="ch3" eyebrow="HAPPINESS & TOGETHERNESS" title="Celebrate the Moments That Matter"
        text="May your home be filled with laughter, your heart with peace, and your life with beautiful memories shared with the people you love."
        decor={({ y1 }) => <>
          {wash('radial-gradient(ellipse at 50% 0%, rgba(194,24,91,.35), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(255,107,0,.3), transparent 55%)')}
          {orb(y1, '-right-20 top-10 h-72 w-72', 'rgba(36,11,54,.9)')}<Lanterns /></>}
        after={<div className="mt-10 flex gap-6 sm:gap-10">{[0, 1, 2].map(i => <Diya key={i} i={i + 2} onSpark={spark} />)}</div>} />

      <Chapter id="ch4" big eyebrow="WITH LOVE" title="Wishing You and Your Family a Very Happy Diwali!"
        text="Spread light. Share happiness. Create memories." onEnter={celebrate}
        decor={() => <>
          {wash('radial-gradient(ellipse at 50% 40%, rgba(139,0,0,.55), transparent 65%), radial-gradient(ellipse at 50% 100%, rgba(194,24,91,.25), transparent 60%)')}
          <Rangoli className="absolute left-1/2 top-1/2 h-[min(140vw,110vh)] w-[min(140vw,110vh)] -translate-x-1/2 -translate-y-1/2 opacity-40" delay={0} /><Toran /></>}
        after={<>
          <button onClick={celebrate} className="font-display mt-10 rounded-full border border-orange-400/60 bg-black/30 px-7 py-4 text-[11px] tracking-[0.4em] text-amber-100 backdrop-blur transition hover:bg-orange-500/10 hover:shadow-[0_0_36px_rgba(255,107,0,.45)]">CELEBRATE WITH FIREWORKS</button>
          <button onClick={toTop} className="mt-6 p-3 text-xs tracking-[0.3em] text-amber-200/50 hover:text-amber-200">BACK TO TOP ↑</button>
          <p className="mt-6 text-xs italic tracking-wider text-amber-200/50">Made with ❤️ and light</p></>} />
    </>
  )
}
