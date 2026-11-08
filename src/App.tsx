import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Bulb from './components/Bulb'
import Light from './components/Light'
import FireCanvas, { FireHandle } from './components/FireCanvas'
import Rangoli from './components/Rangoli'
import Lanterns from './components/Lanterns'
import Diyas from './components/Diyas'
import Reveal from './components/Reveal'
import Chapters from './components/Chapters'
import ScrollProgress from './components/ScrollProgress'
import { useSound } from './hooks/useSound'

// Fixed backdrop colour per chapter; it cross-fades as the visitor scrolls.
const BG = ['#08040D', '#2a0710', '#240B36', '#2e0a2a', '#3d0509']

export default function App() {
  const [lit, setLit] = useState(false)
  const [run, setRun] = useState(0)
  const [showAgain, setShowAgain] = useState(false)
  const [ch, setCh] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const chRef = useRef(0)
  const fire = useRef<FireHandle>(null)
  const snd = useSound()

  const ignite = () => { if (lit) return; snd.click(); setLit(true); setTimeout(snd.chime, 900) }
  const spark = (x: number, y: number) => { fire.current?.burst(x, y, 28); snd.boom() }
  const celebrate = () => fire.current?.celebrate()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const replay = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    chRef.current = 0; setCh(0); setLit(false); setRun(r => r + 1)
  }

  useEffect(() => { document.documentElement.style.overflowY = lit ? 'auto' : 'hidden' }, [lit])
  useEffect(() => {
    if (!lit) { setShowAgain(false); return }
    const t = setTimeout(() => setShowAgain(true), 7000)
    const f = () => {
      let c = 0
      for (let i = 0; i < 5; i++) { const e = document.getElementById(i ? 'ch' + i : 'ch0'); if (e && e.getBoundingClientRect().top < innerHeight * 0.5) c = i }
      chRef.current = c; setCh(c); setShowTop(scrollY > innerHeight * 0.8)
    }
    addEventListener('scroll', f, { passive: true })
    return () => { clearTimeout(t); removeEventListener('scroll', f) }
  }, [lit])

  return (
    <main key={run} className="relative w-screen overflow-x-clip bg-black">
      <motion.div className="fixed inset-0 z-0" initial={false} animate={{ backgroundColor: lit ? BG[ch] : '#000000' }} transition={{ duration: 1.8, ease: 'easeInOut' }} />
      <FireCanvas ref={fire} lit={lit} onBoom={snd.boom} chapterRef={chRef} />

      <section id="ch0" className="relative h-[100dvh] overflow-hidden">
        {lit && <Light />}
        {lit && <Rangoli className="absolute left-1/2 top-1/2 z-[5] h-[min(150vw,130vh)] w-[min(150vw,130vh)] -translate-x-1/2 -translate-y-1/2" />}
        {lit && <Lanterns />}
        <Bulb lit={lit} onClick={ignite} />
        {lit && <Reveal />}
        {lit && <Diyas onSpark={spark} />}
        {lit && (
          <motion.button aria-label="Scroll down" onClick={() => document.getElementById('ch1')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute inset-x-0 bottom-24 z-30 mx-auto flex w-24 flex-col items-center gap-1 p-2 text-amber-200/70 sm:bottom-28"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6.5, duration: 2 }}>
            <span className="font-display text-[9px] tracking-[0.5em]">SCROLL</span>
            <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}><path d="m6 9 6 6 6-6" /></motion.svg>
          </motion.button>
        )}
      </section>

      {lit && <Chapters spark={spark} celebrate={celebrate} toTop={toTop} />}
      {lit && <ScrollProgress ch={ch} />}

      <button onClick={snd.toggle} aria-label={snd.muted ? 'Unmute' : 'Mute'} className="fixed right-3 top-3 z-50 rounded-full p-3 text-amber-300/40 transition hover:text-amber-300">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          {snd.muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
        </svg>
      </button>

      <AnimatePresence>
        {showAgain && (
          <motion.button onClick={replay} className="font-display fixed left-3 top-4 z-50 rounded-full border border-orange-400/40 bg-black/30 px-4 py-3 text-[9px] tracking-[0.3em] text-amber-200 backdrop-blur transition hover:border-orange-300 hover:shadow-[0_0_24px_rgba(255,107,0,.35)] sm:left-5 sm:px-6 sm:text-[10px]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>CELEBRATE AGAIN</motion.button>
        )}
        {showTop && (
          <motion.button aria-label="Back to top" onClick={toTop} className="fixed bottom-4 right-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-orange-400/40 bg-black/40 text-amber-200 backdrop-blur sm:right-5"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="m6 15 6-6 6 6" /></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}
