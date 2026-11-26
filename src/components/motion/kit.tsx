import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EASE = [0.22, 1, 0.36, 1] as const;
export const EASE_IO = [0.76, 0, 0.24, 1] as const;
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────────────────────── Smooth scroll ───────────────────────── */

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

export function useSmoothScroll() {
  useEffect(() => {
    if (reduced()) return;
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('load', refresh);
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

export const lockScroll = (on: boolean) => {
  if (on) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = on ? 'hidden' : '';
};

/* ───────────────────────── Ready (after preloader) ───────────────────────── */

const ReadyCtx = createContext(false);
export const useReady = () => useContext(ReadyCtx);
export const ReadyProvider = ReadyCtx.Provider;

/* ───────────────────────── Preloader ───────────────────────── */

export function Preloader({ name, onDone }: { name: string; onDone: () => void }) {
  const [n, setN] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: 100,
      duration: reduced() ? 0.2 : 1.8,
      ease: 'power3.inOut',
      onUpdate: () => setN(Math.round(o.v)),
      onComplete: () => {
        setLeaving(true);
        setTimeout(onDone, 850);
      },
    });
    return () => {
      tw.kill();
    };
  }, [onDone]);

  const [first, ...rest] = name.split(' ');
  return (
    <div className="fixed inset-0 z-[200] flex pointer-events-none" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className="h-full flex-1 bg-[#020617]"
          initial={{ y: 0 }}
          animate={leaving ? { y: '-100%' } : { y: 0 }}
          transition={{ duration: 0.8, ease: EASE_IO, delay: i * 0.06 }}
        />
      ))}
      <motion.div
        className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 text-white"
        animate={leaving ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-3 font-semibold">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
            {first}
            <span className="text-blue-400">{rest.join(' ')}</span>
          </span>
          <span className="text-slate-400">Flutter · AI · Mobile</span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <p className="max-w-[18ch] text-slate-400 text-sm md:text-base">Compiling apps, models and motion…</p>
          <span className="font-display font-black leading-none tracking-[-0.06em] text-[24vw] md:text-[15vw] tabular-nums">
            {n}
            <span className="text-blue-500">%</span>
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${n}%` }} />
      </motion.div>
    </div>
  );
}

/* ───────────────────────── Section wipe navigation ───────────────────────── */

type Go = (id: string, label?: string) => void;
const GoCtx = createContext<Go>(() => {});
export const useGo = () => useContext(GoCtx);

let externalGo: Go | null = null;
/** Callable from anywhere (old components) */
export const goToSection: Go = (id, label) => {
  if (externalGo) externalGo(id, label);
};

const LABELS: Record<string, string> = {
  home: 'Home',
  about: 'About',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Work',
  contact: 'Contact',
};

export function GoProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'idle' | 'cover' | 'reveal'>('idle');
  const [label, setLabel] = useState('');
  const busy = useRef(false);

  const go = useCallback<Go>((raw, l) => {
    const id = raw.replace('#', '');
    const el = document.getElementById(id);
    if (!el || busy.current) return;
    const jump = () => {
      const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - 24;
      if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    };
    if (reduced()) return jump();
    busy.current = true;
    setLabel(l ?? LABELS[id] ?? id);
    setPhase('cover');
    setTimeout(() => {
      jump();
      ScrollTrigger.update();
      setPhase('reveal');
      setTimeout(() => {
        setPhase('idle');
        busy.current = false;
      }, 750);
    }, 720);
  }, []);

  useEffect(() => {
    externalGo = go;
    return () => {
      externalGo = null;
    };
  }, [go]);

  const covering = phase === 'cover';
  return (
    <GoCtx.Provider value={go}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[150] flex" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 bg-blue-600"
            style={{ originY: covering ? 1 : 0 }}
            initial={false}
            animate={{ scaleY: covering ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE_IO, delay: (covering ? i : 4 - i) * 0.05 }}
          />
        ))}
        <AnimatePresence>
          {covering && (
            <motion.div
              key="l"
              className="absolute inset-0 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <motion.span
                className="font-display font-black tracking-[-0.05em] text-white text-[16vw] md:text-[10vw] leading-none"
                initial={{ y: '100%' }}
                animate={{ y: 0, transition: { delay: 0.3, duration: 0.5, ease: EASE } }}
              >
                {label}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GoCtx.Provider>
  );
}

/* ───────────────────────── Text + reveal primitives ───────────────────────── */

export function SplitReveal({
  text,
  as: Tag = 'h2',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.05,
  onLoad = false,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  wordClassName?: (w: string, i: number) => string | undefined;
  delay?: number;
  stagger?: number;
  onLoad?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const ready = useReady();
  const show = onLoad ? ready : ready && inView;
  const words = text.split(' ');
  const M = motion[Tag] as typeof motion.h2;
  return (
    <M ref={ref as never} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${wordClassName?.(w, i) ?? ''}`}
            initial={{ y: '110%', rotate: 5 }}
            animate={show ? { y: 0, rotate: 0 } : { y: '110%', rotate: 5 }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function FadeUp({ children, delay = 0, className, y = 40 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  const ready = useReady();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={ready && inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useLayoutEffect(() => {
    if (!ref.current || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sw',
        { opacity: 0.12 },
        { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 82%', end: 'bottom 50%', scrub: true } },
      );
    }, ref);
    return () => ctx.revert();
  }, [text]);
  return (
    <p ref={ref} className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="sw inline-block">
          {w}&nbsp;
        </span>
      ))}
    </p>
  );
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const [out, setOut] = useState(match ? `0${match[2]}` : value);
  useEffect(() => {
    if (!inView || !match) return;
    const target = parseFloat(match[1]);
    const dec = match[1].includes('.') ? 1 : 0;
    const o = { v: 0 };
    const tw = gsap.to(o, { v: target, duration: 1.6, ease: 'power3.out', onUpdate: () => setOut(`${o.v.toFixed(dec)}${match[2]}`) });
    return () => {
      tw.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  );
}

/* ───────────────────────── Interaction primitives ───────────────────────── */

export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ''}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function RollText({ children }: { children: string }) {
  return (
    <span className="group/roll relative inline-flex overflow-hidden">
      <span className="transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/roll:-translate-y-full">{children}</span>
      <span className="absolute left-0 top-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/roll:-translate-y-full">
        {children}
      </span>
    </span>
  );
}

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [mode, setMode] = useState<'dot' | 'link' | 'view' | 'hide'>('dot');
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setOn(true);
    document.documentElement.classList.add('has-cursor');
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement)?.closest?.('[data-cursor], a, button, input, textarea, select, label') as HTMLElement | null;
      setMode((t?.dataset.cursor as typeof mode) ?? (t ? 'link' : 'dot'));
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-cursor');
    };
  }, [x, y]);
  if (!on) return null;
  const size = mode === 'view' ? 104 : mode === 'link' ? 52 : mode === 'hide' ? 0 : 12;
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[190] flex items-center justify-center rounded-full ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-white mix-blend-difference'}`}
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{ width: size, height: size }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
    >
      <motion.span className="text-[13px] font-bold" animate={{ opacity: mode === 'view' ? 1 : 0, scale: mode === 'view' ? 1 : 0.4 }}>
        Open
      </motion.span>
    </motion.div>
  );
}

/* ───────────────────────── Velocity marquee ───────────────────────── */

function Row({ children, base: baseV }: { children: React.ReactNode; base: number }) {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const smooth = useSpring(vel, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skew = useTransform(smooth, [-2500, 2500], [8, -8]);
  const x = useTransform(base, (v) => `${wrap(-25, -50, v)}%`);
  const dir = useRef(1);
  useAnimationFrame((_, d) => {
    let m = dir.current * baseV * (d / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    m += dir.current * m * f;
    base.set(base.get() + m);
  });
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex whitespace-nowrap" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((k) => (
          <span key={k} className="flex shrink-0 items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function VelocityMarquee({ items, outline }: { items: string[]; outline?: string[] }) {
  return (
    <section aria-label="Skills" className="relative z-10 border-y border-slate-200 dark:border-white/10 py-8 md:py-12 overflow-hidden">
      <Row base={-3}>
        {items.map((s) => (
          <span key={s} className="flex items-center font-display text-[12vw] md:text-[6.5vw] font-black leading-none tracking-[-0.05em] text-slate-900 dark:text-white">
            <span className="px-6">{s}</span>
            <span className="text-blue-600">✦</span>
          </span>
        ))}
      </Row>
      {outline && (
        <div className="mt-3">
          <Row base={3}>
            {outline.map((s) => (
              <span
                key={s}
                className="flex items-center font-display text-[12vw] md:text-[6.5vw] font-black leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_#94a3b8] dark:[-webkit-text-stroke:1px_#334155]"
              >
                <span className="px-6">{s}</span>
                <span>✦</span>
              </span>
            ))}
          </Row>
        </div>
      )}
    </section>
  );
}
