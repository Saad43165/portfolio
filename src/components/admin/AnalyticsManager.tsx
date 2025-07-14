import { Eye, Clock, TrendingUp, Activity, Plus } from 'lucide-react';
import { useState } from 'react';

interface QuickStats {
  totalViews: number;
  thisWeekViews: number;
  avgViewTime: string;
  bounceRate: string;
}

interface CustomMetrics {
  targetViews: number;
}

interface AnalyticsManagerProps {
  quickStats: QuickStats;
  customMetrics: CustomMetrics;
  setCustomMetrics: (metrics: CustomMetrics) => void;
  setQuickStats: (stats: QuickStats) => void;
}

const AnalyticsManager: React.FC<AnalyticsManagerProps> = ({ quickStats, customMetrics, setCustomMetrics, setQuickStats }) => {
  const analyticsData = [
    {
      label: 'Total Views',
      value: quickStats.totalViews,
      icon: Eye,
      color: 'blue',
      trend: `+${quickStats.thisWeekViews} this week`,
    },
    {
      label: 'Avg. View Time',
      value: quickStats.avgViewTime,
      icon: Clock,
      color: 'green',
      trend: '+12% from last week',
    },
    {
      label: 'Bounce Rate',
      value: quickStats.bounceRate,
      icon: TrendingUp,
      color: 'purple',
      trend: '-5% from last week',
    },
    {
      label: 'Active Projects',
      value: quickStats.thisWeekViews,
      icon: Activity,
      color: 'orange',
      trend: 'Currently active',
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
  };

  const [newTargetViews, setNewTargetViews] = useState(customMetrics.targetViews);

  const handleUpdateTarget = () => {
    setCustomMetrics({ targetViews: newTargetViews });
    if (newTargetViews > quickStats.totalViews) {
      setQuickStats({ ...quickStats, totalViews: newTargetViews });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Analytics Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {analyticsData.map((stat, index) => (
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
                <div className="text-xs text-gray-600">{stat.trend}</div>
              </div>
            </div>
            <h4 className="text-sm font-medium text-gray-900">{stat.label}</h4>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={newTargetViews}
          onChange={(e) => setNewTargetViews(parseInt(e.target.value) || 0)}
          className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Target Views"
        />
        <button
          onClick={handleUpdateTarget}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <Plus size={16} />
          Set Target
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Analytics Summary</h3>
        <p className="text-xs text-gray-600">
          Current total views: {quickStats.totalViews}. Target set at {customMetrics.targetViews}. You are {((quickStats.totalViews / customMetrics.targetViews) * 100).toFixed(1)}% toward your goal.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsManager;