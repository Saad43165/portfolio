import { useRef } from 'react';
import { X } from 'lucide-react';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  mousePosition: { x: number; y: number };
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children, title, mousePosition }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useDialogAccessibility(onClose);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
      aria-label={title}
      onClose={onClose}
    >
      <div
        className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
        <div className="relative z-10 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close dialog"
          >
            <X size={24} />
          </button>
          {children}
        </div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
        <div
          className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
    </dialog>
  );
};

export default Dialog;