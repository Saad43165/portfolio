import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeUp, SplitReveal } from '../motion/kit';

const fmt = (d: string) => (d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present');

const Experience = () => {
  const { experiences } = useData();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const h = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), { stiffness: 120, damping: 30 });

  const sorted = [...experiences].sort((a, b) => +new Date(b.startDate) - +new Date(a.startDate));

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-36">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20 [&>*]:min-w-0">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <FadeUp>
            <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              <span className="h-px w-10 bg-current" />
              Experience
            </p>
          </FadeUp>
          <SplitReveal
            text="Where I’ve shipped."
            className="font-display text-[13vw] font-black leading-[0.92] tracking-[-0.05em] text-slate-950 dark:text-white md:text-[6vw]"
          />
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {experiences.length} internships across mobile, cross-platform and corporate teams, plus independent client work.
            </p>
          </FadeUp>
        </div>

        <div ref={ref} className="relative pl-10 md:pl-14">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-slate-200 dark:bg-white/10" />
          <motion.div className="absolute left-[11px] top-2 w-px bg-blue-600" style={{ height: h }} />

          <ol className="flex flex-col gap-14">
            {sorted.map((e, i) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-10 top-2 flex h-[23px] w-[23px] items-center justify-center rounded-full border-2 border-blue-600 bg-white dark:bg-slate-950 md:-left-14">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                </span>
                <FadeUp delay={i * 0.05}>
                  <article className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white/70 p-7 backdrop-blur transition-colors duration-500 hover:border-blue-600/50 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
                    <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-blue-600/[0.06] to-purple-600/[0.06] transition-transform duration-700 ease-[cubic-bezier(.76,0,.24,1)] group-hover:scale-x-100" />
                    <div className="relative">
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {fmt(e.startDate)} — {fmt(e.endDate)}
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-black tracking-tight text-slate-950 dark:text-white md:text-4xl">{e.title}</h3>
                      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-600 dark:text-slate-400">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{e.company}</span>
                        <span className="inline-flex items-center gap-1 text-sm">
                          <MapPin size={14} />
                          {e.location}
                        </span>
                      </p>
                      <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">{e.description}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {e.technologies.map((t) => (
                          <span key={t} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Experience;
