import { BarChart3, Eye, Clock, TrendingUp,  } from 'lucide-react';

interface QuickStats {
  totalViews: number;
  thisWeekViews: number;
  avgViewTime: string;
  bounceRate: string;
}

interface ViewDetailsManagerProps {
  quickStats: QuickStats;
  detailsToggle: boolean;
  setDetailsToggle: (toggle: boolean) => void;
}

const ViewDetailsManager: React.FC<ViewDetailsManagerProps> = ({ quickStats, detailsToggle, setDetailsToggle }) => {
  const detailedStats = [
    {
      label: 'Total Views',
      value: quickStats.totalViews,
      icon: Eye,
      color: 'blue',
      details: 'Total number of portfolio views since creation',
    },
    {
      label: 'This Week Views',
      value: quickStats.thisWeekViews,
      icon: BarChart3,
      color: 'purple',
      details: 'Views recorded in the current week',
    },
    {
      label: 'Avg. View Time',
      value: quickStats.avgViewTime,
      icon: Clock,
      color: 'green',
      details: 'Average time spent per visit',
    },
    {
      label: 'Bounce Rate',
      value: quickStats.bounceRate,
      icon: TrendingUp,
      color: 'orange',
      details: 'Percentage of visitors leaving after viewing one page',
    },
  ];

  const historicalData = {
    totalViews: 1100,
    thisWeekViews: 75,
    avgViewTime: '2:15',
    bounceRate: '38%',
  };

  const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Performance Analytics Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {detailedStats.map((stat, index) => (
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
            <p className="text-xs text-gray-600">{stat.details}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setDetailsToggle(!detailsToggle)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          {detailsToggle ? 'Hide Historical Data' : 'Show Historical Data'}
        </button>
      </div>
      {detailsToggle && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {Object.entries(historicalData).map(([label, value], index) => {
            const stat = detailedStats.find((s) => s.label === label.replace('This Week ', ''));
            return (
              <div
                key={index}
                className={`${stat ? colorMap[stat.color].bg : 'bg-gray-100'} rounded-lg p-4 hover:bg-opacity-80 transition-all duration-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={stat ? `${colorMap[stat.color].bg} p-2 rounded-lg` : 'bg-gray-200 p-2 rounded-lg'}>
                    {stat?.icon && <stat.icon size={18} className={stat ? colorMap[stat.color].text : 'text-gray-500'} />}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-semibold text-gray-900">{value}</div>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-gray-900">{label} (Last Month)</h4>
              </div>
            );
          })}
        </div>
      )}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Additional Insights</h3>
        <p className="text-xs text-gray-600">
          Your portfolio has improved by {quickStats.totalViews - historicalData.totalViews} views since last month. Keep engaging visitors to reduce the {quickStats.bounceRate} bounce rate.
        </p>
      </div>
    </div>
  );
};

export default ViewDetailsManager;