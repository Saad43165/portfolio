import React, { useState, useEffect } from 'react';
import { Cpu, Database, Activity, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface TelemetryDashboardProps {
  onToggleConsole: () => void;
}

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({ onToggleConsole }) => {
  const [ram, setRam] = useState(41.4);
  const [fps, setFps] = useState(60);
  const [fdaLatency, setFdaLatency] = useState(12);
  const [inferenceTime, setInferenceTime] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro-fluctuations in engineering metrics
      setRam(prev => +(prev + (Math.random() - 0.5) * 0.15).toFixed(2));
      setFps(() => Math.random() > 0.95 ? 59 : 60);
      setFdaLatency(() => Math.floor(11 + Math.random() * 3));
      setInferenceTime(() => Math.floor(38 + Math.random() * 8));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 left-6 z-[80] hidden lg:flex items-center gap-4.5 px-4.5 py-3 bg-slate-950/70 border border-white/5 hover:border-emerald-500/30 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-300 font-mono text-[10px] text-gray-400 select-none group"
    >
      {/* Active Neural Node Link */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-extrabold text-emerald-400/80 uppercase tracking-widest text-[9px] group-hover:text-emerald-400 transition-colors">Core Systems Online</span>
      </div>

      <div className="h-3 w-[1px] bg-white/5" />

      {/* RAM Heap */}
      <div className="flex items-center gap-1.5" title="Active V8 Memory Allocation">
        <Activity size={12} className="text-blue-500" />
        <span>HEAP: <span className="font-bold text-gray-200">{ram}MB</span></span>
      </div>

      <div className="h-3 w-[1px] bg-white/5" />

      {/* FDA latency status */}
      <div className="flex items-center gap-1.5" title="FDA API Caching Pipeline Latency">
        <Database size={12} className="text-indigo-500" />
        <span>FDA CACHE: <span className="font-bold text-gray-200">{fdaLatency}ms</span></span>
      </div>

      <div className="h-3 w-[1px] bg-white/5" />

      {/* TFLite Inference */}
      <div className="flex items-center gap-1.5" title="EfficientNet Plant Disease Classifier Time">
        <Cpu size={12} className="text-cyan-500" />
        <span>TFLITE: <span className="font-bold text-gray-200">{inferenceTime}ms</span></span>
      </div>

      <div className="h-3 w-[1px] bg-white/5" />

      {/* Launch Shell Prompt */}
      <button
        onClick={onToggleConsole}
        className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/35 text-emerald-400 rounded-lg transition-all cursor-pointer group/btn font-extrabold uppercase tracking-widest text-[9px]"
      >
        <Terminal size={11} className="transition-transform group-hover/btn:scale-110" />
        Open Core Shell
      </button>
    </motion.div>
  );
};
