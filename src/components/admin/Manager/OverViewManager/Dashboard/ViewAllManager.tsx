import { Activity } from 'lucide-react';

interface Activity {
  id: string | number;
  title: string;
  type: string;
  status: string;
  action: string;
  timestamp: Date;
}

interface ViewAllManagerProps {
  activities: Activity[];
  getStatusIcon: (status: string) => JSX.Element;
  formatTimeAgo: (timestamp: Date) => string;
  activityFilter: string;
  setActivityFilter: (filter: string) => void;
}

const ViewAllManager: React.FC<ViewAllManagerProps> = ({ activities, getStatusIcon, formatTimeAgo, activityFilter, setActivityFilter }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">All Recent Activities</h2>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActivityFilter('all')}
          className={`px-3 py-1 rounded-lg ${activityFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setActivityFilter('project')}
          className={`px-3 py-1 rounded-lg ${activityFilter === 'project' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Projects
        </button>
        <button
          onClick={() => setActivityFilter('skill')}
          className={`px-3 py-1 rounded-lg ${activityFilter === 'skill' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Skills
        </button>
        <button
          onClick={() => setActivityFilter('experience')}
          className={`px-3 py-1 rounded-lg ${activityFilter === 'experience' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Experience
        </button>
        <button
          onClick={() => setActivityFilter('education')}
          className={`px-3 py-1 rounded-lg ${activityFilter === 'education' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Education
        </button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {activities.length > 0 ? (
          activities.map((activity) => (
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
            <p className="text-sm">No activities available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllManager;