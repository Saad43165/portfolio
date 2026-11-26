import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { CountUp, FadeUp, ScrubText, SplitReveal } from '../motion/kit';

const About = () => {
  const { aboutData, portfolioInfo } = useData();
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const clip = useTransform(scrollYProgress, [0, 0.35], ['inset(12% 10% 12% 10% round 32px)', 'inset(0% 0% 0% 0% round 32px)']);

  const statement =
    aboutData.missionStatement?.replace(/^My mission is to /, 'I ') ??
    'I translate complex problems into intuitive digital solutions that empower users and scale businesses.';

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
      <FadeUp>
        <p className="mb-8 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
          <span className="h-px w-10 bg-current" />
          About me
        </p>
      </FadeUp>

      <ScrubText
        text={statement}
        className="max-w-[22ch] font-display text-[10vw] font-bold leading-[1.02] tracking-[-0.04em] text-slate-950 dark:text-white md:text-[5.2vw]"
      />

      <div className="mt-24 grid gap-14 md:mt-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div ref={imgRef} className="relative aspect-[4/5] w-full max-w-[520px]">
          <motion.div style={{ clipPath: clip }} className="absolute inset-0 overflow-hidden rounded-[32px] bg-slate-200 dark:bg-slate-800">
            <motion.img
              style={{ y: imgY, scale: 1.25 }}
              src={aboutData.aboutImage || portfolioInfo.profileImage}
              alt={`${portfolioInfo.name} portrait`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute -right-4 top-10 rounded-2xl bg-blue-600 px-5 py-4 text-white shadow-2xl shadow-blue-600/30 md:-right-10"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-xs font-semibold opacity-80">Based in</p>
            <p className="font-display text-lg font-bold">{portfolioInfo.location?.split(',')[0]}, PK</p>
          </motion.div>
        </div>

        <div className="flex flex-col justify-center">
          <SplitReveal
            text={aboutData.heading}
            className="font-display text-4xl font-black leading-[1.05] tracking-[-0.03em] text-slate-950 dark:text-white md:text-6xl"
          />
          {aboutData.paragraphs.map((p, i) => (
            <FadeUp key={i} delay={0.1 + i * 0.1}>
              <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-slate-600 dark:text-slate-400">{p}</p>
            </FadeUp>
          ))}

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 dark:border-white/10 dark:bg-white/10 sm:grid-cols-3">
            {aboutData.stats.map((s, i) => {
              const numeric = /^\d/.test(s.value);
              const lastOdd = aboutData.stats.length % 2 === 1 && i === aboutData.stats.length - 1;
              return (
                <FadeUp key={s.label} delay={i * 0.08} className={`bg-white p-6 dark:bg-slate-950 ${lastOdd ? 'col-span-2 sm:col-span-1' : ''}`}>
                  {numeric ? (
                    <CountUp value={s.value} className="block font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white md:text-5xl" />
                  ) : (
                    <span className="block font-display text-xl font-bold leading-snug tracking-tight text-slate-950 dark:text-white md:text-2xl">{s.value}</span>
                  )}
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
                </FadeUp>
              );
            })}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {aboutData.highlights.map((h, i) => (
              <FadeUp key={h} delay={0.2 + i * 0.05} y={16}>
                <span className="inline-block rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/10 dark:text-slate-300">
                  {h}
                </span>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
