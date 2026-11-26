import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Code2, Layers, Cloud, Database, FlaskConical, Palette, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EASE, FadeUp, SplitReveal } from '../motion/kit';

const ICONS: Record<string, typeof Code2> = {
  'Programming Languages': Code2,
  'Frameworks & Libraries': Layers,
  'Backend & Cloud Services': Cloud,
  'Database Systems': Database,
  'Testing & Tools': FlaskConical,
  'UI/UX & Design': Palette,
};
const SHORT: Record<string, string> = {
  'Programming Languages': 'Languages',
  'Frameworks & Libraries': 'Frameworks',
  'Backend & Cloud Services': 'Backend & Cloud',
  'Database Systems': 'Databases',
  'Testing & Tools': 'Testing & Tools',
  'UI/UX & Design': 'Design',
};

function Ring({ value, play }: { value: number; play: boolean }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90" aria-hidden>
      <circle cx="32" cy="32" r={r} fill="none" strokeWidth="5" className="stroke-slate-200 dark:stroke-white/10" />
      <motion.circle
        cx="32"
        cy="32"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        stroke="url(#skg)"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: play ? c * (1 - value / 100) : c }}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </svg>
  );
}

const Skills = () => {
  const { skills } = useData();
  const categories = useMemo(() => Array.from(new Set(skills.map((s) => s.category))), [skills]);
  // Phones open on one category (3 cards) so the section stays short; desktop shows everything.
  const [tab, setTab] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 && categories[0] ? categories[0] : 'All'));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });

  const list = tab === 'All' ? [...skills].sort((a, b) => b.level - a.level) : skills.filter((s) => s.category === tab);
  const top = [...skills].sort((a, b) => b.level - a.level).slice(0, 3);

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="skg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#9333EA" />
          </linearGradient>
        </defs>
      </svg>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16 [&>*]:min-w-0">
        {/* left: heading + strongest */}
        <div>
          <FadeUp>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-px w-10 bg-current" />
              Skills
            </p>
          </FadeUp>
          <SplitReveal
            text="My toolkit."
            className="font-display text-[14vw] font-black leading-[0.92] tracking-[-0.05em] text-slate-950 dark:text-white md:text-[6vw]"
          />
          <FadeUp delay={0.15}>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {skills.length} technologies across {categories.length} areas, used in real shipped apps.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-8">
            <div className="rounded-3xl bg-slate-950 p-6 text-white dark:bg-white/[0.04] dark:ring-1 dark:ring-white/10">
              <p className="flex items-center gap-2 text-sm font-semibold text-blue-300">
                <Sparkles size={16} /> Strongest
              </p>
              <ul className="mt-4 space-y-3">
                {top.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-4">
                    <span className="font-display text-xl font-bold">{s.name}</span>
                    <span className="text-sm text-slate-400">
                      {s.yearsOfExperience} yr{s.yearsOfExperience === 1 ? '' : 's'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>

        {/* right: tabs + grid */}
        <div ref={ref}>
          <div className="-mx-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:px-0" data-lenis-prevent>
            <div className="flex w-max gap-2 md:w-auto md:flex-wrap" role="tablist" aria-label="Skill categories">
              {['All', ...categories].map((c) => {
                const Icon = ICONS[c];
                const on = tab === c;
                return (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setTab(c)}
                    className={`relative flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors ${on ? 'text-white' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'}`}
                  >
                    {on && <motion.span layoutId="sktab" className="absolute inset-0 rounded-full bg-blue-600" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    {Icon && <Icon size={15} className="relative" />}
                    <span className="relative whitespace-nowrap">{SHORT[c] ?? c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.ul layout className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((s, i) => (
                <motion.li
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: EASE, delay: Math.min(i, 8) * 0.025 }}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 p-4 transition-colors hover:border-blue-600/50 dark:border-white/10 dark:bg-white/[0.03]"
                  title={s.description}
                >
                  <div className="relative shrink-0">
                    <Ring value={s.level} play={inView} />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white">{s.level}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-bold text-slate-950 dark:text-white">{s.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {s.yearsOfExperience} yr{s.yearsOfExperience === 1 ? '' : 's'} · {SHORT[s.category] ?? s.category}
                    </p>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Skills;
