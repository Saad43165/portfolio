import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { Download, Github, Linkedin, ArrowDownRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { EASE, EASE_IO, Magnetic, RollText, SplitReveal, useGo, useReady } from '../motion/kit';

const ORBIT = ['Flutter', 'TFLite', 'Firebase', 'FastAPI', 'Next.js', 'Groq'];

const Hero = () => {
  const { portfolioInfo, projects } = useData();
  const ready = useReady();
  const go = useGo();
  const ref = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);
  const roles = ['Flutter apps', 'AI features', 'offline-first apps', 'React Native apps', 'Next.js sites'];

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, [roles.length]);

  // Scroll choreography
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const nameX = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Pointer tilt on the portrait
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 14 });

  const [first, ...rest] = (portfolioInfo.name || 'Saad Ikram').split(' ');
  const shipped = projects.filter((p) => p.status === 'completed').length;

  return (
    <section ref={ref} id="home" className="relative min-h-[100svh] overflow-hidden pt-28 md:pt-32">
      {/* ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <motion.div
          className="absolute -top-40 -left-40 h-[60vw] w-[60vw] rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-600/20"
        />
        <motion.div
          className="absolute -bottom-40 -right-40 h-[50vw] w-[50vw] rounded-full bg-purple-500/20 blur-[120px] dark:bg-purple-600/15"
        />
      </div>

      <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto max-w-[1400px] px-5 md:px-10">
        {/* top row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-3 rounded-full border border-blue-500/25 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-700 backdrop-blur dark:bg-white/5 dark:text-slate-300"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Open to Flutter roles and freelance work
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden text-sm font-medium text-slate-500 dark:text-slate-400 md:block"
          >
            {portfolioInfo.location}
          </motion.p>
        </div>

        {/* giant name */}
        <motion.h1 style={{ x: nameX }} className="mt-8 whitespace-nowrap font-display font-black leading-[0.82] tracking-[-0.065em] text-slate-950 dark:text-white text-[18vw] md:text-[17.5vw]">
          <SplitReveal as="span" text={first} onLoad delay={0.05} />
          <span className="inline-block w-[0.18em]" />
          <SplitReveal
            as="span"
            text={rest.join(' ')}
            onLoad
            delay={0.18}
            wordClassName={() => 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600'}
          />
        </motion.h1>

        <div className="mt-6 grid items-end gap-12 md:mt-2 lg:grid-cols-[1.1fr_0.9fr]">
          {/* left column */}
          <div className="order-2 lg:order-1 lg:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
              className="flex flex-wrap items-baseline gap-x-3 font-display text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-200 md:text-5xl"
            >
              <span>I build</span>
              <span className="relative inline-flex h-[1.15em] min-w-[12ch] overflow-hidden align-bottom">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={role}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.6, ease: EASE_IO }}
                    className="whitespace-nowrap text-blue-600 dark:text-blue-400"
                  >
                    {roles[role]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
              className="mt-6 max-w-[46ch] text-lg leading-relaxed text-slate-600 dark:text-slate-400"
            >
              Flutter developer shipping AI-powered mobile apps: on-device TensorFlow Lite models, LLM assistants and Firebase backends that work even when the network doesn’t.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Magnetic>
                <button
                  onClick={() => go('projects', 'Work')}
                  data-cursor="hide"
                  className="group relative inline-flex min-h-[56px] items-center gap-3 overflow-hidden rounded-full bg-slate-950 px-8 text-[15px] font-semibold text-white dark:bg-white dark:text-slate-950"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-blue-600 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                  <span className="relative group-hover:text-white">
                    <RollText>See my work</RollText>
                  </span>
                  <ArrowDownRight className="relative transition-transform duration-500 group-hover:-rotate-45 group-hover:text-white" size={18} />
                </button>
              </Magnetic>
              <Magnetic>
                <a
                  href={portfolioInfo.resumeUrl}
                  download
                  data-cursor="hide"
                  className="group inline-flex min-h-[56px] items-center gap-3 rounded-full border border-slate-300 px-7 text-[15px] font-semibold text-slate-800 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-white"
                >
                  <Download size={18} />
                  <RollText>Download CV</RollText>
                </a>
              </Magnetic>
              <div className="ml-1 flex gap-2">
                {portfolioInfo.socialLinks.map((s) => {
                  const Icon = s.platform.toLowerCase() === 'github' ? Github : Linkedin;
                  return (
                    <Magnetic key={s.url} strength={0.5}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:border-white/10 dark:text-slate-300"
                      >
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </motion.div>

            {/* quick facts */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={ready ? { opacity: 1 } : {}}
              transition={{ delay: 1.1 }}
              className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-slate-200 pt-6 dark:border-white/10"
            >
              {[
                { v: `${projects.length}`, l: 'Apps built' },
                { v: `${shipped}`, l: 'Shipped' },
                { v: '3', l: 'Internships' },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="font-display text-4xl font-black tracking-tight text-slate-950 dark:text-white">{s.v}</dt>
                  <dd className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.l}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* portrait */}
          <motion.div style={{ y: photoY, scale: photoScale }} className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <motion.div
              className="relative w-[68vw] max-w-[400px] [perspective:1000px]"
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                mx.set((e.clientX - r.left) / r.width - 0.5);
                my.set((e.clientY - r.top) / r.height - 0.5);
              }}
              onPointerLeave={() => {
                mx.set(0);
                my.set(0);
              }}
            >
              <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative [transform-style:preserve-3d]">
                <motion.div
                  initial={{ clipPath: 'inset(100% 0% 0% 0% round 36px)' }}
                  animate={ready ? { clipPath: 'inset(0% 0% 0% 0% round 36px)' } : {}}
                  transition={{ duration: 1.3, delay: 0.25, ease: EASE_IO }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[36px] bg-slate-200 shadow-[0_50px_100px_-30px_rgba(37,99,235,.45)] dark:bg-slate-800"
                >
                  <motion.img
                    src={portfolioInfo.profileImage}
                    alt={portfolioInfo.name}
                    className="h-full w-full object-cover"
                    initial={{ scale: 1.4 }}
                    animate={ready ? { scale: 1 } : {}}
                    transition={{ duration: 1.8, delay: 0.25, ease: EASE }}
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
                </motion.div>

                {/* role tag */}
                <motion.div
                  style={{ transform: 'translateZ(60px)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={ready ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2, duration: 0.7, ease: EASE }}
                  className="absolute -bottom-5 -left-5 rounded-2xl border border-white/60 bg-white/90 px-5 py-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-slate-900/90"
                >
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Currently building</p>
                  <p className="font-display text-lg font-bold text-slate-900 dark:text-white">AI-first Flutter apps</p>
                </motion.div>
              </motion.div>

              {/* orbiting stack chips */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-[-14%] hidden md:block"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                {ORBIT.map((t, i) => {
                  const a = (i / ORBIT.length) * Math.PI * 2;
                  return (
                    <motion.span
                      key={t}
                      className="absolute rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-md dark:border-white/10 dark:bg-slate-900 dark:text-slate-200"
                      style={{ left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%`, translateX: '-50%', translateY: '-50%' }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    >
                      {t}
                    </motion.span>
                  );
                })}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => go('about')}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.4 }}
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold text-slate-500 md:flex"
      >
        <span className="relative h-10 w-6 rounded-full border border-slate-300 dark:border-white/20">
          <motion.span className="absolute left-1/2 top-2 h-2 w-1 -translate-x-1/2 rounded-full bg-blue-600" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.6, repeat: Infinity }} />
        </span>
        Scroll
      </motion.button>
    </section>
  );
};

export default Hero;
