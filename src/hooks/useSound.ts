import { useCallback, useRef, useState } from 'react'
// All audio is synthesised with WebAudio, so no asset files are needed.
export function useSound() {
  const ctx = useRef<AudioContext | null>(null)
  const mutedRef = useRef(false)
  const [muted, setMuted] = useState(false)
  const get = () => (ctx.current ??= new (window.AudioContext || (window as any).webkitAudioContext)())
  const noise = (dur: number, freq: number, gain: number) => {
    const c = get(), n = Math.floor(c.sampleRate * dur), b = c.createBuffer(1, n, c.sampleRate), d = b.getChannelData(0)
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3)
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain()
    s.buffer = b; f.type = 'bandpass'; f.frequency.value = freq; g.gain.value = gain
    s.connect(f).connect(g).connect(c.destination); s.start()
  }
  const tone = (freq: number, dur: number, gain: number, type: OscillatorType = 'sine', end = freq) => {
    const c = get(), o = c.createOscillator(), g = c.createGain(), t = c.currentTime
    o.type = type; o.frequency.setValueAtTime(freq, t); o.frequency.exponentialRampToValueAtTime(end, t + dur)
    g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    o.connect(g).connect(c.destination); o.start(); o.stop(t + dur)
  }
  const play = (fn: () => void) => () => { if (!mutedRef.current) try { fn() } catch {} }
  const click = useCallback(play(() => { noise(0.05, 3200, 0.5); tone(220, 0.09, 0.25, 'square', 90) }), [])
  const chime = useCallback(play(() => { tone(880, 2, 0.08); tone(1320, 2.4, 0.05); tone(1760, 2.8, 0.03) }), [])
  const boom = useCallback(play(() => { noise(0.7, 140, 0.9); noise(0.3, 2500, 0.15) }), [])
  const toggle = () => { mutedRef.current = !mutedRef.current; setMuted(mutedRef.current) }
  return { muted, toggle, click, chime, boom }
}
