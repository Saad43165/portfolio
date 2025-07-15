import { ArrowUpRight } from 'lucide-react';
import { PerformanceStat, ColorMap } from '../types';

interface PerformanceAnalyticsProps {
  performanceStats: PerformanceStat[];
  setShowDetailsDialog: (value: boolean) => void;
  mousePosition: { x: number; y: number };
  colorMap: ColorMap;
}

const PerformanceAnalytics: React.FC<PerformanceAnalyticsProps> = ({
  performanceStats,
  setShowDetailsDialog,
  mousePosition,
  colorMap,
}) => (
  <div
    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
    style={{
      transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
    <div className="relative z-10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Performance Analytics</h2>
          <p className="text-sm text-gray-600">Track your portfolio's performance metrics</p>
        </div>
        <button
          onClick={() => setShowDetailsDialog(true)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View analytics details"
        >
          View Details
          <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat, index) => (
          <div
            key={index}
            className={`${colorMap[stat.color].bg} rounded-lg p-4 hover:bg-opacity-80 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${colorMap[stat.color].bg} p-2 rounded-lg`}>
                <stat.icon size={18} className={colorMap[stat.color].text} />
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-gray-900">{stat.value}</div>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-900">{stat.label}</h4>
            <p className="text-xs text-gray-600">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
    <div
      className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
      style={{ animationDelay: '0.5s' }}
    ></div>
  </div>
);

export default PerformanceAnalytics;