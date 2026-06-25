import React, { useState, useEffect, useRef, useContext } from 'react';
import { Terminal as TerminalIcon, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { ThemeContext } from './PortfolioLayout';

interface TerminalConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TerminalConsole: React.FC<TerminalConsoleProps> = ({ isOpen, onClose }) => {
  const { projects, skills } = useData();
  const theme = useContext(ThemeContext);
  const [history, setHistory] = useState<string[]>([
    'Welcome to Saad\'s Interactive Dev Terminal v1.0.0',
    'Type "help" to see available commands or "matrix" to initialize visual neural stream.',
    ''
  ]);
  const [input, setInput] = useState('');
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Matrix Rain Effect
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const columns = Math.floor(canvas.width / 14);
    const rainDrops = Array(columns).fill(1);
    const chars = '0101011001010100110011010101011011110001011010001';

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981';
      ctx.font = '14px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * 14, rainDrops[i] * 14);

        if (rainDrops[i] * 14 > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const run = () => {
      draw();
      animationId = requestAnimationFrame(run);
    };
    run();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [matrixActive]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `saad-dev-console> ${cmd}`];

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (trimmed === 'exit') {
      onClose();
      setInput('');
      return;
    }

    if (trimmed === 'matrix') {
      setMatrixActive(!matrixActive);
      setHistory([
        ...newHistory,
        matrixActive ? 'Neural matrix stream terminated.' : 'Neural matrix stream initialized. Click anywhere in background to return.'
      ]);
      setInput('');
      return;
    }

    let output: string[] = [];

    switch (trimmed) {
      case 'help':
        output = [
          'Available Commands:',
          '  help      - List all interactive commands',
          '  about     - Output Saad\'s system background summary',
          '  projects  - Render structured table of engineering systems',
          '  skills    - Output technical proficiency data modules',
          '  contact   - Display encrypted communication endpoints',
          '  matrix    - Toggle full-screen binary visual stream',
          '  clear     - Wipe terminal output log',
          '  exit      - Close dev terminal'
        ];
        break;

      case 'about':
        output = [
          'SYSTEM PROFILE SUMMARY:',
          '==================================================',
          'Role: Lead Flutter Developer & Mobile Architect',
          'Expertise: High-Performance Cross-Platform Engineering, AI Model Inference',
          'Bio: Software Engineering graduate specializing in building robust, low-latency mobile apps.',
          'State: Ready for deployment to university/admissions boards.'
        ];
        break;

      case 'projects':
        output = [
          'REGISTERED SYSTEMS PORTFOLIO:',
          '----------------------------------------------------------------------------------',
          'PROJECT NAME                     | PLATFORM            | TECH STACK',
          '----------------------------------------------------------------------------------',
          ...projects.map(p => {
            const name = p.title.split(':')[0].padEnd(32, ' ');
            const plat = (p.platforms ? p.platforms.join(', ') : 'Cross-Platform').padEnd(19, ' ');
            const tech = p.technologies.slice(0, 3).join(', ');
            return `${name} | ${plat} | ${tech}`;
          }),
          '----------------------------------------------------------------------------------',
          'For details, click "Details" inside the dashboard projects grid.'
        ];
        break;

      case 'skills':
        output = [
          'TECHNICAL ARSENAL MODULES:',
          '==================================================',
          ...skills.slice(0, 10).map(s => {
            const barWidth = Math.floor(s.level / 10);
            const bar = '█'.repeat(barWidth) + '░'.repeat(10 - barWidth);
            const name = s.name.padEnd(24, ' ');
            return `${name} [${bar}] ${s.level}%`;
          }),
          '=================================================='
        ];
        break;

      case 'contact':
        output = [
          'COMMUNICATION ENDPOINTS:',
          '  Email:    saadnaz43165@gmail.com',
          '  Phone:    +92-314-5459961',
          '  Github:   https://github.com/saad43165',
          '  LinkedIn: https://linkedin.com/in/saad-i-786123406'
        ];
        break;

      case '':
        output = [];
        break;

      default:
        output = [`bash: command not found: ${trimmed}. Type "help" for a list of valid commands.`];
    }

    setHistory([...newHistory, ...output, '']);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[105] flex items-center justify-center p-0 md:p-6 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
            onClick={onClose}
          />

          {matrixActive && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 z-0 pointer-events-auto cursor-pointer"
              onClick={() => setMatrixActive(false)}
            />
          )}

          {/* Terminal Window */}
          <motion.div
            initial={{ scale: 0.95, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 15, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full h-full md:h-[80vh] md:max-w-4xl bg-slate-950/90 border border-emerald-500/30 rounded-none md:rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden font-mono text-xs text-emerald-400 select-text"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-emerald-500/20 backdrop-blur-lg">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50" />
                </div>
                <div className="h-4 w-[1px] bg-emerald-500/20" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400/80 flex items-center gap-1.5">
                  <TerminalIcon size={12} className="animate-pulse" /> developer-core-shell
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-400 transition-colors cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Logs Area */}
            <div className="flex-grow p-6 overflow-y-auto space-y-2 select-text scrollbar-thin scrollbar-thumb-emerald-500/20">
              {history.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {line}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Input Line */}
            <div className="p-4 bg-slate-900/60 border-t border-emerald-500/20 flex items-center gap-3">
              <span className="text-emerald-500 font-extrabold flex items-center gap-1">
                saad-dev-console<span className="text-emerald-400/60">$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type command here (e.g. help)..."
                className="flex-grow bg-transparent border-none outline-none text-emerald-300 placeholder-emerald-800 py-1"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                onClick={() => handleCommand(input)}
                className="p-2 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all flex items-center justify-center cursor-pointer"
              >
                <Send size={12} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
