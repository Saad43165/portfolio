import { Activity } from 'lucide-react';
import { ActivityItem } from '../types';

interface RecentActivityProps {
  recentActivities: ActivityItem[];
  setShowAllDialog: (value: boolean) => void;
  getStatusIcon: (status: string) => JSX.Element;
  formatTimeAgo: (timestamp: Date) => string;
  mousePosition: { x: number; y: number };
}

const RecentActivity: React.FC<RecentActivityProps> = ({
  recentActivities,
  setShowAllDialog,
  getStatusIcon,
  formatTimeAgo,
  mousePosition,
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
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <p className="text-sm text-gray-600">Your latest updates and changes</p>
        </div>
        <button
          onClick={() => setShowAllDialog(true)}
          className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="View all activities"
        >
          View All
        </button>
      </div>
      <div className="space-y-3">
        {recentActivities.length > 0 ? (
          recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex-shrink-0">{getStatusIcon(activity.status)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{activity.title}</span>
                  <span className="text-xs text-gray-500 capitalize">({activity.type})</span>
                </div>
                <p className="text-sm text-gray-600">{activity.action}</p>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-500">
                {formatTimeAgo(activity.timestamp)}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">
            <Activity size={24} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent activity</p>
          </div>
        )}
      </div>
    </div>
    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
    <div
      className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
      style={{ animationDelay: '0.5s' }}
    ></div>
  </div>
);

export default RecentActivity;