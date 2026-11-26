import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Github, Globe, X, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import type { Project } from '../../types';
import { EASE, EASE_IO, FadeUp, SplitReveal, lockScroll } from '../motion/kit';

/* ───────── helpers ───────── */

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
const isScreenshot = (src?: string) => !!src && src.startsWith('/');
const year = (p: Project) => (p.endDate || p.startDate || '').slice(0, 4);
const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present');

/* ───────── visual: phone frame or cover ───────── */

function Visual({ p, accent, large = false }: { p: Project; accent: string; large?: boolean }) {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ background: `radial-gradient(110% 80% at 30% 15%, ${accent}40, transparent 60%), radial-gradient(90% 70% at 90% 100%, ${accent}25, transparent 60%), #0B1020` }}
    >
      <motion.div
        aria-hidden
        className="absolute aspect-square h-[78%] rounded-full border"
        style={{ borderColor: `${accent}55` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full" style={{ background: accent }} />
      </motion.div>
      <span
        aria-hidden
        className={`pointer-events-none absolute bottom-[-0.14em] left-0 right-0 select-none whitespace-nowrap text-center font-display font-black leading-none tracking-[-0.06em] text-white/[0.05] ${large ? 'text-[22vw]' : 'text-[20vw] md:text-[10vw]'}`}
      >
        {shortName(p.title)}
      </span>

      {isScreenshot(p.image) ? (
        <motion.div
          className="relative aspect-[9/19] h-[82%] max-h-[620px] rounded-[38px] border border-white/15 bg-black p-[7px] shadow-[0_50px_90px_-25px_rgba(0,0,0,.7)]"
          style={{ rotate: -6 }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute left-1/2 top-[10px] z-10 h-[18px] w-[64px] -translate-x-1/2 rounded-full bg-black" />
          <img src={p.image} alt={`${shortName(p.title)} app screen`} loading="lazy" className="h-full w-full rounded-[31px] object-cover object-top" />
        </motion.div>
      ) : p.image ? (
        <div className="relative h-[72%] w-[80%] overflow-hidden rounded-3xl shadow-2xl">
          <img src={p.image} alt={shortName(p.title)} loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${accent}55, transparent 60%)` }} />
        </div>
      ) : null}
    </div>
  );
}

/* ───────── stacking card ───────── */

function StackCard({ p, i, total, progress, onOpen }: { p: Project; i: number; total: number; progress: MotionValue<number>; onOpen: (p: Project, e: React.MouseEvent) => void }) {
  const accent = accentOf(p, i);
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.045]);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const artScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <div ref={ref} className="sticky top-0 flex h-[100svh] items-center">
      <motion.div style={{ scale, top: `calc(6vh + ${i * 22}px)` }} className="relative w-full origin-top">
        <button
          onClick={(e) => onOpen(p, e)}
          data-cursor="view"
          className="group grid w-full overflow-hidden rounded-[32px] border border-slate-200 bg-white text-left shadow-[0_30px_80px_-40px_rgba(15,23,42,.35)] dark:border-white/10 dark:bg-slate-900 md:grid-cols-[1fr_1.05fr]"
        >
          <div className="flex flex-col justify-between gap-8 p-7 md:p-12">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                {p.category}
              </span>
              <span>{year(p)}</span>
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
          <div className="relative h-[42svh] overflow-hidden md:h-auto md:min-h-[64vh]">
            <motion.div style={{ scale: artScale }} className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.04]">
              <Visual p={p} accent={accent} />
            </motion.div>
          </div>
        </button>
      </motion.div>
    </div>
  );
}

/* ───────── compact grid card ───────── */

function GridCard({ p, i, onOpen }: { p: Project; i: number; onOpen: (p: Project, e: React.MouseEvent) => void }) {
  const accent = accentOf(p, i);
  return (
    <FadeUp delay={(i % 2) * 0.1}>
      <button
        onClick={(e) => onOpen(p, e)}
        data-cursor="view"
        className="group block w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white text-left dark:border-white/10 dark:bg-slate-900"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105">
            <Visual p={p} accent={accent} />
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 p-6 md:p-8">
          <div>
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

/* ───────── full-screen case study ───────── */

function CaseStudy({ p, origin, onClose, onNext, next }: { p: Project; origin: { x: number; y: number }; onClose: () => void; onNext: () => void; next: Project }) {
  const accent = accentOf(p);
  const scroller = useRef<HTMLDivElement>(null);

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

  const at = `${origin.x}px ${origin.y}px`;
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${shortName(p.title)} case study`}
      className="fixed inset-0 z-[140] bg-white dark:bg-[#020617]"
      initial={{ clipPath: `circle(0% at ${at})` }}
      animate={{ clipPath: `circle(150% at ${at})` }}
      exit={{ clipPath: `circle(0% at ${at})` }}
      transition={{ duration: 0.9, ease: EASE_IO }}
    >
      <div ref={scroller} data-lenis-prevent className="h-full overflow-y-auto overscroll-contain">
        {/* close */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-5 py-4 backdrop-blur dark:bg-[#020617]/80 md:px-10">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
            Case study
          </span>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-800 transition-all duration-500 hover:rotate-90 hover:bg-slate-950 hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-slate-950"
          >
            <X size={20} />
          </button>
        </div>

        <motion.div key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <header className="mx-auto max-w-[1300px] px-5 pb-14 pt-8 md:px-10 md:pt-14">
            <p className="text-sm font-semibold" style={{ color: accent }}>
              {p.category}
            </p>
            <h2 className="mt-4 overflow-hidden pb-[0.12em] font-display text-[18vw] font-black leading-[0.85] tracking-[-0.06em] text-slate-950 dark:text-white md:text-[11vw]">
              <motion.span className="inline-block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.45, duration: 0.9, ease: EASE }}>
                {shortName(p.title)}
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
              className="mt-6 max-w-[28ch] font-display text-3xl font-semibold leading-tight tracking-tight text-slate-800 dark:text-slate-200 md:text-5xl"
            >
              {subtitle(p.title) || p.description}
            </motion.p>
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-8 text-sm dark:border-white/10 md:grid-cols-4"
            >
              <div>
                <dt className="text-slate-500">Role</dt>
                <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{p.role ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Timeline</dt>
                <dd className="mt-1 font-semibold text-slate-900 dark:text-white">
                  {fmt(p.startDate)} — {p.status === 'in-progress' ? 'Present' : fmt(p.endDate)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Platforms</dt>
                <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{p.platforms?.join(', ') ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="mt-1 font-semibold capitalize text-slate-900 dark:text-white">{p.status.replace('-', ' ')}</dd>
              </div>
            </motion.dl>
            <div className="mt-8 flex flex-wrap gap-3">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-950">
                  <Github size={18} /> Source code
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-2 rounded-full px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5" style={{ background: accent }}>
                  <Globe size={18} /> Visit live site
                </a>
              )}
            </div>
          </header>

          <div className="h-[70svh] md:h-[85svh]">
            <Visual p={p} accent={accent} large />
          </div>

          <section className="mx-auto grid max-w-[1300px] gap-10 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-28">
            <p className="text-sm font-semibold" style={{ color: accent }}>
              Overview
            </p>
            <div className="space-y-5 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              {(p.longDescription || p.description).split('\n').filter(Boolean).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {p.features.length > 0 && (
            <section className="mx-auto max-w-[1300px] px-5 pb-20 md:px-10">
              <h3 className="mb-8 font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">Key features</h3>
              <div className="flex flex-wrap gap-3">
                {p.features.map((f) => (
                  <span key={f} className="rounded-full border px-5 py-3 font-display text-lg font-semibold text-slate-800 dark:text-slate-200" style={{ borderColor: `${accent}66` }}>
                    {f}
                  </span>
                ))}
              </div>
            </section>
          )}

          {!!p.problemsSolved?.length && (
            <section className="border-t border-slate-200 dark:border-white/10">
              <div className="mx-auto max-w-[1300px] px-5 py-20 md:px-10 md:py-28">
                <h3 className="mb-12 font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">Engineering problems solved</h3>
                <div className="grid gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 md:grid-cols-2">
                  {p.problemsSolved.map((ps, i) => (
                    <div key={ps.title} className="group relative bg-white p-8 dark:bg-[#020617] md:p-10">
                      <span className="absolute inset-0 origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" style={{ background: `${accent}12` }} />
                      <span className="relative font-display text-sm font-bold" style={{ color: accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h4 className="relative mt-3 font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{ps.title}</h4>
                      <p className="relative mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{ps.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="mx-auto max-w-[1300px] px-5 pb-20 md:px-10">
            <p className="mb-5 text-sm font-semibold text-slate-500">Built with</p>
            <div className="flex flex-wrap gap-2">
              {p.technologies.map((t) => (
                <span key={t} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-white/5 dark:text-slate-300">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <button onClick={onNext} data-cursor="view" className="group block w-full border-t border-slate-200 text-left dark:border-white/10">
            <div className="mx-auto flex max-w-[1300px] flex-wrap items-end justify-between gap-6 px-5 py-20 md:px-10 md:py-28">
              <div>
                <p className="mb-3 text-slate-500">Next project</p>
                <p className="font-display text-[16vw] font-black leading-[0.85] tracking-[-0.06em] text-slate-950 transition-colors duration-500 dark:text-white md:text-[9vw]" style={{ ['--n' as string]: accentOf(next) }}>
                  <span className="group-hover:text-[var(--n)]">{shortName(next.title)}</span>
                </p>
              </div>
              <span className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-blue-600 group-hover:text-white dark:border-white/15 dark:text-white md:h-24 md:w-24">
                <ArrowRight size={28} />
              </span>
            </div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ───────── section ───────── */

const Projects = () => {
  const { projects } = useData();
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<{ p: Project; x: number; y: number } | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const stacked = list.slice(0, 4);
  const rest = list.slice(4);

  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] });

  const openProject = (p: Project, e: React.MouseEvent) => setOpen({ p, x: e.clientX, y: e.clientY });
  const nextOf = (p: Project) => projects[(projects.findIndex((x) => x.id === p.id) + 1) % projects.length];

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 pt-28 md:px-10 md:pt-40">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <FadeUp>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-px w-10 bg-current" />
              Selected work · {projects.length} projects
            </p>
          </FadeUp>
          <SplitReveal text="Things I’ve built." className="font-display text-[14vw] font-black leading-[0.9] tracking-[-0.055em] text-slate-950 dark:text-white md:text-[7.5vw]" />
        </div>
        <FadeUp delay={0.15}>
          <div className="flex max-w-full flex-wrap gap-2" role="tablist" aria-label="Filter projects">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`relative min-h-[44px] rounded-full px-4 text-sm font-semibold transition-colors ${filter === c ? 'text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
              >
                {filter === c && <motion.span layoutId="pf" className="absolute inset-0 rounded-full bg-blue-600" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </FadeUp>
      </div>

      <div ref={stackRef} key={filter} className="relative mt-6">
        {stacked.map((p, i) => (
          <StackCard key={p.id} p={p} i={i} total={stacked.length} progress={scrollYProgress} onOpen={openProject} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="pb-10 pt-16">
          <FadeUp>
            <h3 className="mb-10 font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-6xl">More projects</h3>
          </FadeUp>
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((p, i) => (
              <GridCard key={p.id} p={p} i={i + 4} onOpen={openProject} />
            ))}
          </div>
        </div>
      )}

      {createPortal(
      <AnimatePresence>
        {open && (
          <CaseStudy
            key="cs"
            p={open.p}
            origin={{ x: open.x, y: open.y }}
            next={nextOf(open.p)}
            onNext={() => setOpen((o) => (o ? { ...o, p: nextOf(o.p) } : o))}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>,
      document.body,
      )}
    </div>
  );
};

export default Projects;
