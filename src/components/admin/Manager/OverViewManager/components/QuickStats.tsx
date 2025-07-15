import { TrendingUp } from 'lucide-react';
import { Stat, ColorMap } from '../types';

interface QuickStatsProps {
  stats: Stat[];
  mousePosition: { x: number; y: number };
  colorMap: ColorMap;
}

const QuickStats: React.FC<QuickStatsProps> = ({ stats, mousePosition, colorMap }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"></div>
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`${colorMap[stat.color].bg} ${colorMap[stat.color].border} border p-2 rounded-lg`}>
              <stat.icon size={20} className={colorMap[stat.color].text} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <div className={`text-xs ${stat.trendUp ? 'text-green-600' : 'text-gray-500'} flex items-center gap-1`}>
                {stat.trendUp && <TrendingUp size={12} />}
                {stat.trend}
              </div>
            </div>
          </div>
          <h3 className="text-sm font-medium text-gray-600">{stat.label}</h3>
        </div>
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
        <div
          className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        ></div>
      </div>
    ))}
  </div>
);

export default QuickStats;