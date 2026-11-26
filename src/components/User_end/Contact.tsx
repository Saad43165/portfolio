import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, Linkedin, Github, Copy, Check, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FadeUp, Magnetic, SplitReveal } from '../motion/kit';

const Contact = () => {
  const { portfolioInfo } = useData();
  const [copied, setCopied] = useState(false);

  const phone = portfolioInfo.phone ?? '';
  const wa = phone.replace(/[^0-9]/g, '');
  const msg = encodeURIComponent("Hi Saad! I'd like to talk about a project.");
  const social = (name: string) => portfolioInfo.socialLinks.find((s) => s.platform.toLowerCase() === name)?.url;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(portfolioInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const channels = [
    { label: 'WhatsApp', value: 'Message me', href: `https://wa.me/${wa}?text=${msg}`, Icon: MessageCircle, color: '#22C55E' },
    { label: 'LinkedIn', value: 'Connect', href: social('linkedin'), Icon: Linkedin, color: '#0A66C2' },
    { label: 'GitHub', value: 'View code', href: social('github'), Icon: Github, color: '#64748B' },
    { label: 'Phone', value: phone, href: `tel:${phone.replace(/[^0-9+]/g, '')}`, Icon: Phone, color: '#8B5CF6' },
  ].filter((c) => c.href);

  return (
    <div className="relative z-10 mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
      <FadeUp>
        <p className="mb-6 flex items-center gap-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
          <span className="h-px w-10 bg-current" />
          Contact
        </p>
      </FadeUp>
      <SplitReveal
        text="Let’s build something great."
        className="max-w-[12ch] font-display text-[15vw] font-black leading-[0.88] tracking-[-0.06em] text-slate-950 dark:text-white md:text-[8.5vw]"
        wordClassName={(w) => (w === 'great.' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600' : undefined)}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <FadeUp>
          <p className="mb-4 text-slate-500 dark:text-slate-400">Fastest reply by email</p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${portfolioInfo.email}`}
              data-cursor="hide"
              className="group relative break-all font-display text-3xl font-bold tracking-tight text-slate-950 dark:text-white md:text-5xl"
            >
              {portfolioInfo.email}
              <span className="absolute -bottom-2 left-0 h-[3px] w-full origin-left scale-x-0 bg-blue-600 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
            </a>
            <Magnetic strength={0.5}>
              <button
                onClick={copy}
                aria-label="Copy email address"
                className="flex h-12 items-center gap-2 rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-600 hover:text-blue-600 dark:border-white/15 dark:text-slate-200"
              >
                <motion.span key={String(copied)} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </motion.span>
                {copied ? 'Copied' : 'Copy'}
              </button>
            </Magnetic>
          </div>
          <a
            href={`mailto:${portfolioInfo.email}?subject=${encodeURIComponent('Project enquiry')}`}
            className="group mt-10 inline-flex min-h-[60px] items-center gap-3 overflow-hidden rounded-full bg-blue-600 px-8 text-base font-semibold text-white shadow-xl shadow-blue-600/25"
          >
            <Mail size={18} />
            Start a conversation
            <ArrowUpRight size={18} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </FadeUp>

        <div className="grid grid-cols-2 gap-3">
          {channels.map((c, i) => (
            <FadeUp key={c.label} delay={i * 0.07}>
              <a
                href={c.href}
                target={c.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group relative flex h-full min-h-[132px] flex-col justify-between overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 transition-colors duration-500 hover:border-transparent dark:border-white/10 dark:bg-white/[0.03]"
                style={{ ['--c' as string]: c.color }}
              >
                <span className="absolute inset-0 translate-y-full bg-[var(--c)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0" />
                <span className="relative flex items-center justify-between">
                  <c.Icon size={22} className="text-[var(--c)] transition-colors duration-300 group-hover:text-white" />
                  <ArrowUpRight size={18} className="text-slate-400 transition-all duration-500 group-hover:rotate-45 group-hover:text-white" />
                </span>
                <span className="relative">
                  <span className="block text-xs font-semibold text-slate-500 transition-colors group-hover:text-white/80 dark:text-slate-400">{c.label}</span>
                  <span className="mt-1 block break-all font-display text-lg font-bold text-slate-900 transition-colors group-hover:text-white dark:text-white">{c.value}</span>
                </span>
              </a>
            </FadeUp>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
