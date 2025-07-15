import { Calendar, Clock, Eye, BarChart3, ExternalLink } from 'lucide-react';
import { User } from '../types';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

interface WelcomeHeaderProps {
  user: User | null;
  currentTime: Date;
  setShowAnalyticsDialog: (value: boolean) => void;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ user, currentTime, setShowAnalyticsDialog }) => {
  useDialogAccessibility(setShowAnalyticsDialog);

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
      <div className="relative z-10 p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="space-y-2 mb-4 lg:mb-0">
            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back, {user?.username || 'User'}! 👋
            </h1>
            <p className="text-sm text-gray-600">
              Here's what's happening with your portfolio today
            </p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>
                  {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="View portfolio"
            >
              <Eye size={16} />
              View Portfolio
              <ExternalLink size={16} />
            </a>
            <button
              onClick={() => setShowAnalyticsDialog(true)}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 hover:border-blue-300"
              aria-label="View analytics"
            >
              <BarChart3 size={16} />
              Analytics
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
      <div
        className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
        style={{ animationDelay: '0.5s' }}
      ></div>
    </div>
  );
};

export default WelcomeHeader;