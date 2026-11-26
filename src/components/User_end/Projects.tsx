import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Github, Globe, X, ArrowRight, ArrowDown, Smartphone, Monitor } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { Project } from '../../types';
import { EASE, EASE_IO, FadeUp, SplitReveal, lockScroll } from '../motion/kit';

/* ───────────────────────── helpers ───────────────────────── */

const ACCENTS: Record<string, string> = {
  'project-signbridge': '#8B5CF6',
  'project-agriguard': '#22C55E',
  'project-gitpulse': '#06B6D4',
  'project-advershield': '#3B82F6',
  'project-medivision': '#F43F5E',
  'project-vaxguard': '#F59E0B',
  'project-runquest': '#14B8A6',
  'project-naheed': '#EAB308',
};
const PALETTE = ['#3B82F6', '#8B5CF6', '#06B6D4', '#F43F5E', '#F59E0B', '#22C55E'];
const accentOf = (p: Project, i = 0) => ACCENTS[p.id] ?? PALETTE[i % PALETTE.length];
const shortName = (t: string) => t.split(':')[0].trim();
const subtitle = (t: string) => (t.includes(':') ? t.split(':').slice(1).join(':').trim() : '');
const slugOf = (p: Project) => p.id.replace(/^project-/, '');
const isScreenshot = (src?: string) => !!src && src.startsWith('/');
const year = (p: Project) => (p.endDate || p.startDate || '').slice(0, 4);
const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present');
const pad = (n: number) => String(n).padStart(2, '0');

type Rect = { top: number; left: number; width: number; height: number };
const fullRect = (): Rect => ({ top: 0, left: 0, width: window.innerWidth, height: window.innerHeight });
const insetOf = (r: Rect, radius: number) =>
  `inset(${Math.max(0, r.top)}px ${Math.max(0, window.innerWidth - r.left - r.width)}px ${Math.max(0, window.innerHeight - r.top - r.height)}px ${Math.max(0, r.left)}px round ${radius}px)`;

function useDesktop() {
  const q = '(min-width: 768px)';
  const [d, setD] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setD(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return d;
}

/* ───────────────────────── visuals ───────────────────────── */

function Phone({ p, eager, className = '', style }: { p: Project; eager?: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative aspect-[9/19] rounded-[38px] border border-white/15 bg-black p-[7px] shadow-[0_50px_90px_-25px_rgba(0,0,0,.7)] ${className}`} style={style}>
      <div className="absolute left-1/2 top-[10px] z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
      <img
        src={p.image}
        alt={`${shortName(p.title)} app screen`}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={616}
        height={1280}
        className="h-full w-full rounded-[31px] object-cover object-top"
      />
    </div>
  );
}

function Backdrop({ p, accent, big }: { p: Project; accent: string; big?: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(110% 80% at 30% 15%, ${accent}45, transparent 60%), radial-gradient(90% 70% at 90% 100%, ${accent}28, transparent 60%), #0B1020` }}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-[-0.14em] left-0 right-0 select-none whitespace-nowrap text-center font-display font-black leading-none tracking-[-0.06em] text-white/[0.05] ${big ? 'text-[26vw]' : 'text-[20vw] md:text-[10vw]'}`}
      >
        {shortName(p.title)}
      </span>
    </>
  );
}

function CardVisual({ p, accent, eager }: { p: Project; accent: string; eager?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <Backdrop p={p} accent={accent} />
      <div aria-hidden className="absolute aspect-square h-[78%] rounded-full border" style={{ borderColor: `${accent}55` }}>
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full" style={{ background: accent }} />
      </div>
      {isScreenshot(p.image) ? (
        <Phone p={p} eager={eager} className="h-[82%] max-h-[620px]" style={{ transform: 'rotate(-6deg)' }} />
      ) : p.image ? (
        <div className="relative h-[72%] w-[80%] overflow-hidden rounded-3xl shadow-2xl">
          <img src={p.image} alt={shortName(p.title)} loading={eager ? 'eager' : 'lazy'} decoding="async" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}55, transparent 60%)` }} />
        </div>
      ) : null}
    </div>
  );
}

const PlatformIcons = ({ p }: { p: Project }) => (
  <span className="flex items-center gap-1.5 text-slate-400">
    {(p.platforms ?? []).some((x) => /ios|android/i.test(x)) && <Smartphone size={14} aria-label="Mobile" />}
    {(p.platforms ?? []).some((x) => /web/i.test(x)) && <Monitor size={14} aria-label="Web" />}
  </span>
);

const StatusBadge = ({ p }: { p: Project }) =>
  p.status === 'in-progress' ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Building
    </span>
  ) : p.liveUrl ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> Live
    </span>
  ) : null;

type OpenFn = (p: Project, el: HTMLElement) => void;

/* ───────────────────────── stacking card (desktop) / list card (phone) ───────────────────────── */

function StackCard({ p, i, total, count, progress, onOpen, hidden }: { p: Project; i: number; total: number; count: number; progress: MotionValue<number>; onOpen: OpenFn; hidden: boolean }) {
  const accent = accentOf(p, i);
  const desktop = useDesktop();
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.045]);

  return (
    <div className={desktop ? 'sticky top-0 flex h-[100lvh] items-center' : 'py-3'}>
      <motion.div
        style={desktop ? { scale, top: `calc(6vh + ${i * 22}px)` } : undefined}
        initial={desktop ? false : { opacity: 0, y: 40 }}
        whileInView={desktop ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
        className="relative w-full origin-top will-change-transform [backface-visibility:hidden]"
      >
        <button
          onClick={(e) => onOpen(p, e.currentTarget)}
          data-cursor="view"
          aria-label={`Open ${shortName(p.title)} case study`}
          className={`group grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white text-left shadow-[0_30px_80px_-40px_rgba(15,23,42,.35)] transition-opacity duration-300 dark:border-white/10 dark:bg-slate-900 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] ${hidden ? 'opacity-0' : ''}`}
        >
          <div className="flex min-w-0 flex-col justify-between gap-8 p-7 md:p-12">
            <div className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex min-w-0 items-center gap-2">
                <span className="font-display tabular-nums text-slate-900 dark:text-white">{pad(i + 1)}</span>
                <span className="text-slate-300 dark:text-slate-600">/ {pad(count)}</span>
                <span className="ml-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: accent }} />
                <span className="truncate">{p.category}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <StatusBadge p={p} />
                <PlatformIcons p={p} />
                {year(p)}
              </span>
            </div>
            <div>
              <h3 className="font-display text-[13vw] font-black leading-[0.9] tracking-[-0.05em] text-slate-950 dark:text-white md:text-[5.2vw]">{shortName(p.title)}</h3>
              <p className="mt-3 font-display text-xl font-semibold text-slate-700 dark:text-slate-300 md:text-2xl">{subtitle(p.title)}</p>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-slate-600 dark:text-slate-400">{p.description}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {p.technologies.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-3 text-sm font-semibold text-slate-900 dark:text-white">
                Case study
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 transition-all duration-500 group-hover:-rotate-45 group-hover:border-transparent group-hover:bg-[var(--a)] group-hover:text-white dark:border-white/15"
                  style={{ ['--a' as string]: accent }}
                >
                  <ArrowRight size={18} />
                </span>
              </span>
            </div>
          </div>
          <div className="relative h-[42svh] min-w-0 overflow-hidden md:h-auto md:min-h-[64vh]">
            <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] md:group-hover:scale-[1.04]">
              <CardVisual p={p} accent={accent} eager={i < 2} />
            </div>
          </div>
        </button>
      </motion.div>
    </div>
  );
}

function GridCard({ p, i, onOpen, hidden }: { p: Project; i: number; onOpen: OpenFn; hidden: boolean }) {
  const accent = accentOf(p, i);
  return (
    <FadeUp delay={(i % 2) * 0.1}>
      <button
        onClick={(e) => onOpen(p, e.currentTarget)}
        data-cursor="view"
        aria-label={`Open ${shortName(p.title)} case study`}
        className={`group block w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left transition-opacity duration-300 dark:border-white/10 dark:bg-slate-900 ${hidden ? 'opacity-0' : ''}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
            <CardVisual p={p} accent={accent} />
          </div>
          <span className="absolute left-4 top-4">
            <StatusBadge p={p} />
          </span>
        </div>
        <div className="flex items-start justify-between gap-4 p-6 md:p-8">
          <div className="min-w-0">
            <p className="text-sm font-semibold" style={{ color: accent }}>
              {p.category} · {year(p)}
            </p>
            <h3 className="mt-2 font-display text-3xl font-black tracking-tight text-slate-950 dark:text-white">{shortName(p.title)}</h3>
            <p className="mt-2 text-slate-600 dark:text-slate-400">{subtitle(p.title)}</p>
          </div>
          <span className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-blue-600 group-hover:text-white dark:border-white/15 dark:text-white">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </button>
    </FadeUp>
  );
}

/* ───────────────────────── full-screen case study (morphs out of the card) ───────────────────────── */

function Reveal({ children, root, delay = 0, className }: { children: React.ReactNode; root: React.RefObject<HTMLElement>; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, root, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function CaseStudy({ p, index, count, rect, onClose, onNext, next }: { p: Project; index: number; count: number; rect: Rect; onClose: () => void; onNext: () => void; next: Project }) {
  const accent = accentOf(p, index);
  const scroller = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scroller });
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const heroParallax = useTransform(scrollYProgress, [0, 0.25], ['0%', '18%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [p.id]);

  const words = shortName(p.title).split(/(?=[A-Z&])/); // CamelCase chunks for a staggered reveal

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${shortName(p.title)} case study`}
      className="fixed inset-0 z-[140] bg-white dark:bg-[#020617]"
      initial={{ clipPath: insetOf(rect, 32) }}
      animate={{ clipPath: 'inset(0px 0px 0px 0px round 0px)' }}
      exit={{ clipPath: insetOf(rect, 32), transition: { duration: 0.7, ease: EASE_IO } }}
      transition={{ duration: 0.85, ease: EASE_IO }}
    >
      {/* reading progress */}
      <motion.div className="fixed left-0 right-0 top-0 z-30 h-1 origin-left" style={{ scaleX: bar, background: accent }} />

      {/* floating controls */}
      <motion.div
        className="fixed right-4 top-4 z-30 flex items-center gap-2 md:right-8 md:top-6"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.6, type: 'spring', stiffness: 300, damping: 20 } }}
        exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
      >
        <span className="hidden rounded-full bg-black/40 px-3 py-2 font-display text-sm font-bold tabular-nums text-white backdrop-blur md:inline">
          {pad(index + 1)} / {pad(count)}
        </span>
        <button
          onClick={onClose}
          aria-label="Close case study"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-transform duration-500 hover:rotate-90"
        >
          <X size={20} />
        </button>
      </motion.div>

      <div ref={scroller} data-lenis-prevent className="h-full overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}>
            {/* ── HERO: dark accent stage matching the card visual, so the morph reads as one object ── */}
            <section className="relative flex min-h-[100svh] flex-col overflow-hidden text-white">
              <motion.div className="absolute inset-0" style={{ opacity: heroFade }}>
                <Backdrop p={p} accent={accent} big />
              </motion.div>

              <motion.div
                style={{ y: heroParallax }}
                className="relative mx-auto grid w-full max-w-[1300px] flex-1 grid-cols-1 items-center gap-10 px-5 pb-10 pt-24 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:px-10"
              >
                <div className="order-2 min-w-0 md:order-1">
                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
                    className="flex flex-wrap items-center gap-3 text-sm font-semibold text-white/70"
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                    {p.category}
                    <StatusBadge p={p} />
                  </motion.p>
                  <h2 className="mt-5 pb-[0.08em] font-display text-[17vw] font-black leading-[0.86] tracking-[-0.06em] md:text-[8.5vw]" aria-label={shortName(p.title)}>
                    {words.map((w, k) => (
                      <span key={k} aria-hidden className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                        <motion.span
                          className="inline-block"
                          initial={{ y: '110%', rotate: 6 }}
                          animate={{ y: 0, rotate: 0 }}
                          transition={{ delay: 0.5 + k * 0.08, duration: 0.9, ease: EASE }}
                        >
                          {w}
                        </motion.span>
                      </span>
                    ))}
                  </h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
                    className="mt-5 max-w-[24ch] font-display text-2xl font-semibold leading-tight text-white/85 md:text-4xl"
                  >
                    {subtitle(p.title) || p.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
                    className="mt-8 flex flex-wrap gap-3"
                  >
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5">
                        <Github size={18} /> Source code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5" style={{ background: accent }}>
                        <Globe size={18} /> Visit live site
                      </a>
                    )}
                  </motion.div>
                </div>

                <div className="order-1 flex min-w-0 justify-center md:order-2">
                  {isScreenshot(p.image) ? (
                    <motion.div initial={{ y: 120, rotate: 12, opacity: 0, scale: 0.85 }} animate={{ y: 0, rotate: -6, opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 1.1, ease: EASE }}>
                      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
                        <Phone p={p} eager className="h-[46svh] max-h-[560px] md:h-[64svh]" />
                      </motion.div>
                    </motion.div>
                  ) : p.image ? (
                    <motion.img
                      src={p.image}
                      alt={shortName(p.title)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35, duration: 1, ease: EASE }}
                      className="aspect-[4/3] w-full max-w-[520px] rounded-3xl object-cover shadow-2xl"
                    />
                  ) : null}
                </div>
              </motion.div>

              {/* meta strip */}
              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05 }}
                className="relative mx-auto grid w-full max-w-[1300px] grid-cols-2 gap-6 border-t border-white/10 px-5 py-6 text-sm md:grid-cols-4 md:px-10"
              >
                {[
                  ['Role', p.role ?? '—'],
                  ['Timeline', `${fmt(p.startDate)} — ${p.status === 'in-progress' ? 'Present' : fmt(p.endDate)}`],
                  ['Platforms', p.platforms?.join(', ') ?? '—'],
                  ['Stack', p.technologies.slice(0, 3).join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="min-w-0">
                    <dt className="text-white/50">{k}</dt>
                    <dd className="mt-1 font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </motion.dl>

              <motion.div aria-hidden className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 text-white/60 md:block" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                <ArrowDown size={20} />
              </motion.div>
            </section>

            {/* ── OVERVIEW ── */}
            <section className="mx-auto grid max-w-[1300px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16 md:px-10 md:py-28">
              <Reveal root={scroller}>
                <p className="font-display text-sm font-bold" style={{ color: accent }}>
                  01 — Overview
                </p>
              </Reveal>
              <div className="min-w-0 space-y-6">
                <Reveal root={scroller}>
                  <p className="font-display text-2xl font-semibold leading-snug tracking-tight text-slate-900 dark:text-white md:text-3xl">{p.description}</p>
                </Reveal>
                {(p.longDescription ?? '')
                  .split('\n')
                  .map((x) => x.trim())
                  .filter((x) => x && x !== p.description)
                  .map((para, k) => (
                    <Reveal key={k} root={scroller} delay={0.05 + k * 0.05}>
                      <p className="max-w-[68ch] text-lg leading-relaxed text-slate-600 dark:text-slate-300">{para}</p>
                    </Reveal>
                  ))}
              </div>
            </section>

            {/* ── FEATURES ── */}
            {p.features.length > 0 && (
              <section className="border-t border-slate-200 dark:border-white/10">
                <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16 md:px-10 md:py-28">
                  <Reveal root={scroller}>
                    <p className="font-display text-sm font-bold" style={{ color: accent }}>
                      02 — Key features
                    </p>
                  </Reveal>
                  <ul className="grid min-w-0 gap-3 sm:grid-cols-2">
                    {p.features.map((f, k) => (
                      <Reveal key={f} root={scroller} delay={(k % 2) * 0.06}>
                        <li className="flex h-full items-center gap-4 rounded-2xl border border-slate-200 p-5 dark:border-white/10">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white" style={{ background: accent }}>
                            {k + 1}
                          </span>
                          <span className="font-display text-lg font-semibold text-slate-900 dark:text-white">{f}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* ── PROBLEMS SOLVED ── */}
            {!!p.problemsSolved?.length && (
              <section className="border-t border-slate-200 dark:border-white/10">
                <div className="mx-auto max-w-[1300px] px-5 py-20 md:px-10 md:py-28">
                  <Reveal root={scroller}>
                    <p className="font-display text-sm font-bold" style={{ color: accent }}>
                      03 — Engineering problems solved
                    </p>
                  </Reveal>
                  <div className="mt-10 space-y-4">
                    {p.problemsSolved.map((ps, k) => (
                      <Reveal key={ps.title} root={scroller}>
                        <div className="group relative grid grid-cols-1 gap-4 overflow-hidden rounded-[28px] border border-slate-200 p-7 dark:border-white/10 md:grid-cols-[80px_minmax(0,0.9fr)_minmax(0,1.3fr)] md:gap-10 md:p-10">
                          <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" style={{ background: `${accent}10` }} />
                          <span className="relative font-display text-5xl font-black tracking-tight" style={{ color: accent }}>
                            {pad(k + 1)}
                          </span>
                          <h4 className="relative font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white md:text-3xl">{ps.title}</h4>
                          <p className="relative leading-relaxed text-slate-600 dark:text-slate-400">{ps.description}</p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ── STACK ── */}
            <section className="border-t border-slate-200 dark:border-white/10">
              <div className="mx-auto grid max-w-[1300px] grid-cols-1 gap-8 px-5 py-20 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16 md:px-10">
                <Reveal root={scroller}>
                  <p className="font-display text-sm font-bold" style={{ color: accent }}>
                    {p.problemsSolved?.length ? '04' : '03'} — Built with
                  </p>
                </Reveal>
                <Reveal root={scroller}>
                  <div className="flex flex-wrap gap-2">
                    {p.technologies.map((t) => (
                      <span key={t} className="rounded-full bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </div>
            </section>

            {/* ── NEXT ── */}
            <button onClick={onNext} data-cursor="view" className="group relative block w-full overflow-hidden text-left text-white" aria-label={`Next project: ${shortName(next.title)}`}>
              <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
                <Backdrop p={next} accent={accentOf(next)} />
              </div>
              <div className="relative mx-auto flex max-w-[1300px] flex-wrap items-end justify-between gap-6 px-5 py-24 md:px-10 md:py-32">
                <div className="min-w-0">
                  <p className="mb-3 text-white/60">Next project</p>
                  <p className="font-display text-[16vw] font-black leading-[0.85] tracking-[-0.06em] md:text-[9vw]">{shortName(next.title)}</p>
                  <p className="mt-3 text-lg text-white/70">{subtitle(next.title)}</p>
                </div>
                <span className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-950 transition-transform duration-500 group-hover:-rotate-45 md:h-24 md:w-24">
                  <ArrowRight size={28} />
                </span>
              </div>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ───────────────────────── section ───────────────────────── */

const Projects = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<{ p: Project; rect: Rect; srcId: string } | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const stacked = list.slice(0, 4);
  const rest = list.slice(4);

  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  const idx = (p: Project) => projects.findIndex((x) => x.id === p.id);
  const nextOf = (p: Project) => projects[(idx(p) + 1) % projects.length];

  // Open: remember the card's exact on-screen box so the page can grow out of it.
  // A history entry lets the phone's back button / swipe-back close it instead of leaving the site.
  const openProject = useCallback((p: Project, el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    setOpen({ p, rect: { top: r.top, left: r.left, width: r.width, height: r.height }, srcId: p.id });
    history.pushState({ cs: p.id }, '', `#${slugOf(p)}`);
  }, []);

  const close = useCallback(() => {
    if (history.state?.cs) history.back();
    else setOpen(null);
  }, []);

  useEffect(() => {
    const onPop = () => {
      const slug = location.hash.slice(1);
      const target = projects.find((p) => slugOf(p) === slug);
      setOpen((o) => (target ? { p: target, rect: o?.rect ?? fullRect(), srcId: o?.srcId ?? target.id } : null));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [projects]);

  // Deep link: portfolio-saad-mu.vercel.app/#agriguard opens that case study after the intro.
  useEffect(() => {
    const slug = location.hash.slice(1);
    const target = projects.find((p) => slugOf(p) === slug);
    if (!target) return;
    const t = setTimeout(() => {
      history.replaceState({ cs: target.id }, '', `#${slug}`);
      setOpen({ p: target, rect: { top: innerHeight / 2 - 60, left: innerWidth / 2 - 60, width: 120, height: 120 }, srcId: target.id });
    }, 2600);
    return () => clearTimeout(t);
  }, [projects]);

  const goNext = () =>
    setOpen((o) => {
      if (!o) return o;
      const n = nextOf(o.p);
      history.replaceState({ cs: n.id }, '', `#${slugOf(n)}`);
      return { ...o, p: n };
    });

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 pt-28 md:px-10 md:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div className="min-w-0">
          <FadeUp>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-px w-10 bg-current" />
              Selected work · {projects.length} projects
            </p>
          </FadeUp>
          <SplitReveal text="Things I’ve built." className="font-display text-[14vw] font-black leading-[0.9] tracking-[-0.055em] text-slate-950 dark:text-white md:text-[7.5vw]" />
        </div>
        <FadeUp delay={0.15} className="w-full min-w-0 md:w-auto">
          <div className="-mx-5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:px-0" data-lenis-prevent>
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="tablist" aria-label="Filter projects">
              {categories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={`relative min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors ${filter === c ? 'text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                >
                  {filter === c && <motion.span layoutId="pf" className="absolute inset-0 rounded-full bg-blue-600" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative whitespace-nowrap">{c}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>

      <div ref={stackRef} className="relative mt-6">
        {stacked.map((p, i) => (
          <StackCard key={p.id} p={p} i={i} total={stacked.length} count={projects.length} progress={scrollYProgress} onOpen={openProject} hidden={open?.srcId === p.id} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="pb-10 pt-16">
          <FadeUp>
            <h3 className="mb-10 font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">More projects</h3>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <GridCard key={p.id} p={p} i={i + 4} onOpen={openProject} hidden={open?.srcId === p.id} />
            ))}
          </div>
        </div>
      )}

      {createPortal(
        <AnimatePresence>
          {open && <CaseStudy key="cs" p={open.p} index={idx(open.p)} count={projects.length} rect={open.rect} next={nextOf(open.p)} onNext={goNext} onClose={close} />}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
};

export default Projects;
