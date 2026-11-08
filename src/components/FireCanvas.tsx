import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef } from 'react'
export type FireHandle = { burst: (x: number, y: number, n?: number) => void; celebrate: () => void }
type P = { x: number; y: number; vx: number; vy: number; life: number; decay: number; c: string; r: number; g: number; fl: boolean }
type A = { x: number; y: number; z: number; v: number; p: number; k: 0 | 1 | 2 | 3; c: string }
type R = { x: number; y: number; vy: number; ty: number; c: string }
// Palettes per chapter (hero, I, II, III, IV): red/orange/gold dominate, purple and magenta appear later.
const PAL = [
  ['#FF6B00', '#FFD700', '#E34220', '#FF9933'], ['#E34220', '#d7263d', '#FF6B00', '#FF9933'], ['#FFD700', '#FF9933', '#FFB000', '#fff3c4'],
  ['#C2185B', '#9b3fd1', '#E34220', '#FF6B00', '#FFD700'], ['#FFD700', '#E34220', '#C2185B', '#9b3fd1', '#FF6B00', '#d7263d', '#fff3c4']]
const GAP = [[2200, 4200], [2200, 4000], [2600, 4400], [1400, 2800], [900, 1900]]
const PETAL = ['#FF9933', '#E34220', '#C2185B', '#FFD700']
const rand = (a: number, b: number) => a + Math.random() * (b - a)
const pick = <T,>(a: T[]) => a[(Math.random() * a.length) | 0]

type Props = { lit: boolean; onBoom: () => void; chapterRef: MutableRefObject<number> }
const FireCanvas = forwardRef<FireHandle, Props>(({ lit, onBoom, chapterRef }, fwd) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const litRef = useRef(lit), boomRef = useRef(onBoom)
  const api = useRef<{ explode: (x: number, y: number, n?: number, k?: string) => void; launch: (x?: number) => void; celebrate: () => void } | null>(null)
  litRef.current = lit; boomRef.current = onBoom
  useImperativeHandle(fwd, () => ({ burst: (x, y, n = 30) => api.current?.explode(x, y, n, 'sphere'), celebrate: () => api.current?.celebrate() }), [])

  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext('2d')!
    let w = 0, h = 0, raf = 0, fade = 0
    const mobile = innerWidth < 640
    const parts: P[] = [], rockets: R[] = []
    const mk = (k: 0 | 1 | 2 | 3, n: number): A[] => Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), z: rand(0.4, 1.3), v: rand(0.02, 0.08), p: rand(0, 6.28), k, c: k === 3 ? pick(PETAL) : pick(['#FF6B00', '#E34220', '#FF9933', '#d7263d']) }))
    const amb = [...mk(0, mobile ? 35 : 80), ...mk(1, mobile ? 12 : 30), ...mk(2, mobile ? 22 : 50), ...mk(3, mobile ? 9 : 20)]
    const resize = () => { const d = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0) }
    resize(); addEventListener('resize', resize)
    const explode = (x: number, y: number, n = 90, kind?: string) => {
      const pal = Math.random() < 0.2 ? PAL[4] : PAL[chapterRef.current] || PAL[0]
      const k = kind ?? pick(['sphere', 'sphere', 'ring', 'willow', 'double']), c1 = pick(pal), c2 = pick(pal)
      n = mobile ? Math.round(n * 0.65) : n
      for (let i = 0; i < n; i++) {
        const a = (i / n) * 6.283 + rand(-0.05, 0.05); let s = rand(0.8, 4.6), c = i % 3 ? c1 : c2, decay = rand(0.008, 0.016), g = 0.035
        if (k === 'ring') s = 3.6
        else if (k === 'willow') { s = rand(1, 3.4); c = '#FFD700'; decay = rand(0.005, 0.009); g = 0.05 }
        else if (k === 'double') { s = i % 2 ? rand(0.8, 2) : rand(3, 4.6); c = i % 2 ? c2 : c1 }
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, decay, c, r: rand(1, 2.2), g, fl: Math.random() < 0.2 })
      }
    }
    const launch = (x = rand(w * 0.12, w * 0.88)) => rockets.push({ x, y: h, vy: -rand(9, 12.5), ty: rand(h * 0.12, h * 0.45), c: pick(PAL[chapterRef.current] || PAL[0]) })
    const celebrate = () => { for (let i = 0; i < 14; i++) setTimeout(() => { launch(); if (i % 4 === 0) explode(rand(w * 0.2, w * 0.8), rand(h * 0.15, h * 0.4), 110, 'double') }, i * 260) }
    api.current = { explode, launch, celebrate }

    const frame = (t: number) => {
      ctx.globalCompositeOperation = 'destination-out'; ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      fade += ((litRef.current ? 1 : 0) - fade) * 0.02
      const sy = scrollY
      for (const d of amb) {
        d.y += (d.k === 3 ? d.v : d.k === 2 ? -d.v * 2.2 : d.k === 1 ? 0 : -d.v) / 60
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random() } else if (d.y > 1.02) { d.y = -0.02; d.x = Math.random() }
        const tw = 0.5 + 0.5 * Math.sin(t / 700 + d.p), al = fade * (d.k === 1 ? tw : 0.3 + 0.6 * tw) * Math.min(1, d.z)
        if (al < 0.02) continue
        const px = d.x * w + Math.sin(t / 1800 + d.p) * (d.k === 3 ? 30 : 12) * d.z, py = (((d.y * h - sy * d.z * 0.25) % h) + h) % h
        ctx.globalAlpha = al
        if (d.k === 3) { ctx.save(); ctx.translate(px, py); ctx.rotate(t / 900 + d.p); ctx.fillStyle = d.c; ctx.beginPath(); ctx.ellipse(0, 0, 3 + 3 * d.z, 1.5 + 1.5 * d.z, 0, 0, 6.283); ctx.fill(); ctx.restore(); continue }
        ctx.fillStyle = d.k === 1 ? '#fff5cc' : d.k === 2 ? d.c : '#FFB000'
        ctx.shadowColor = d.k === 2 ? d.c : '#FFB000'; ctx.shadowBlur = d.k === 2 ? 10 : 6
        ctx.beginPath(); ctx.arc(px, py, (d.k === 1 ? 0.8 : d.k === 2 ? 1.3 : 1) * d.z * 1.4, 0, 6.283); ctx.fill()
      }
      ctx.shadowBlur = 0
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i]; r.y += r.vy; r.vy *= 0.985
        ctx.globalAlpha = 1; ctx.fillStyle = '#fff1c4'; ctx.beginPath(); ctx.arc(r.x, r.y, 1.8, 0, 6.283); ctx.fill()
        parts.push({ x: r.x, y: r.y, vx: rand(-0.2, 0.2), vy: rand(0.2, 0.8), life: 0.55, decay: 0.03, c: r.c, r: 1.2, g: 0.03, fl: false })
        if (r.y <= r.ty || r.vy > -1.5) { explode(r.x, r.y); boomRef.current(); rockets.splice(i, 1) }
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.x += p.vx; p.y += p.vy; p.vx *= 0.985; p.vy = p.vy * 0.985 + p.g; p.life -= p.decay
        if (p.life <= 0) { parts.splice(i, 1); continue }
        ctx.globalAlpha = p.fl ? p.life * Math.random() : p.life; ctx.fillStyle = p.c
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.5 + p.life), 0, 6.283); ctx.fill()
      }
      ctx.globalAlpha = 1; raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize) }
  }, [])

  useEffect(() => {
    if (!lit) return
    const ids: number[] = []
    ;[2600, 3000, 3500].forEach(d => ids.push(window.setTimeout(() => api.current?.launch(), d)))
    let loop = 0
    const next = () => {
      const [a, b] = GAP[chapterRef.current] || GAP[0]
      loop = window.setTimeout(() => { api.current?.launch(); if (Math.random() < 0.3) setTimeout(() => api.current?.launch(), 400); next() }, rand(a, b))
    }
    ids.push(window.setTimeout(next, 4500))
    const click = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button') || Math.random() > 0.7) return
      api.current?.explode(e.clientX, e.clientY, 36, 'sphere')
    }
    addEventListener('pointerdown', click)
    return () => { ids.forEach(clearTimeout); clearTimeout(loop); removeEventListener('pointerdown', click) }
  }, [lit])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-10 h-full w-full" />
})
export default FireCanvas
