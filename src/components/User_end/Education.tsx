import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EASE, FadeUp, SplitReveal } from '../motion/kit';

const yr = (d?: string) => (d ? new Date(d).getFullYear() : 'Now');

const Education = () => {
  const { education } = useData();
  const sorted = [...education].sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate));
  const [main, ...rest] = sorted;
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: '-10% 0px' });
  if (!main) return null;

  const start = +new Date(main.startDate);
  const end = main.endDate ? +new Date(main.endDate) : Date.now();
  const done = Math.max(0, Math.min(1, (Date.now() - start) / (end - start)));
  const years = Array.from({ length: (yr(main.endDate) as number) - (yr(main.startDate) as number) + 1 }, (_, i) => (yr(main.startDate) as number) + i);

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <FadeUp>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-px w-10 bg-current" />
              Education
            </p>
          </FadeUp>
          <SplitReveal text="Where I learned." className="font-display text-[14vw] font-black leading-[0.92] tracking-[-0.05em] text-slate-950 dark:text-white md:text-[6vw]" />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* featured degree */}
        <FadeUp>
          <article className="relative h-full overflow-hidden rounded-[32px] bg-slate-950 p-7 text-white md:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/40 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-purple-600/30 blur-[90px]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <GraduationCap size={24} />
                </span>
                {main.gpa && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                    CGPA {main.gpa.replace(/\s/g, '')}
                  </span>
                )}
              </div>
              <h3 className="mt-8 font-display text-4xl font-black leading-[1] tracking-[-0.03em] md:text-6xl">{main.degree}</h3>
              <p className="mt-4 text-lg text-slate-300">{main.institution}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                <MapPin size={14} /> {main.location}
              </p>
              <p className="mt-6 max-w-[56ch] leading-relaxed text-slate-300">{main.description}</p>

              {/* degree timeline */}
              <div ref={barRef} className="mt-auto pt-10">
                <div className="relative h-1.5 rounded-full bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${done * 100}%` : 0 }}
                    transition={{ duration: 1.4, ease: EASE }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-xs font-semibold text-slate-400">
                  {years.map((y) => (
                    <span key={y}>{y}</span>
                  ))}
                </div>
                {done >= 1 && <p className="mt-4 text-sm font-semibold text-emerald-400">Graduated {new Date(end).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>}
              </div>
            </div>
          </article>
        </FadeUp>

        {/* earlier schooling */}
        <div className="grid gap-4">
          {rest.map((e, i) => (
            <FadeUp key={e.id} delay={0.1 + i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-[28px] border border-slate-200 bg-white/80 p-6 transition-colors duration-500 hover:border-blue-600/50 dark:border-white/10 dark:bg-white/[0.03] md:p-8">
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blue-600/[0.06] to-purple-600/[0.06] transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4 text-sm font-semibold">
                    <span className="text-blue-600 dark:text-blue-400">
                      {yr(e.startDate)} — {yr(e.endDate)}
                    </span>
                    {e.gpa && (
                      <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                        <Award size={14} /> {e.gpa}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-slate-950 dark:text-white md:text-3xl">{e.degree}</h3>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">
                    {e.institution}
                    {e.location && e.location !== 'Pakistan' ? ` · ${e.location}` : ''}
                  </p>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
