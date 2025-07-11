import { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import {
  FolderOpen,
  Code,
  Briefcase,
  GraduationCap,
  Eye,
  TrendingUp,
  Calendar,
  Activity,
  Clock,
  Star,
  ArrowUpRight,
  BarChart3,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ActivityItem {
  id: string;
  type: 'project' | 'skill' | 'experience' | 'education';
  title: string;
  action: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'in-progress';
}

const OverviewManager = () => {
  const { projects, skills, experiences, education } = useData();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quickStats] = useState({
    totalViews: 1247,
    thisWeekViews: 89,
    avgViewTime: '2:34',
    bounceRate: '34%',
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock recent activities
  const recentActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'project',
      title: 'Portfolio Website',
      action: 'Updated project details',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '2',
      type: 'skill',
      title: 'React.js',
      action: 'Added new skill',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      id: '3',
      type: 'experience',
      title: 'Senior Developer',
      action: 'Updated experience',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'in-progress',
    },
  ];

  const stats = [
    { 
      label: 'Total Projects', 
      value: projects.length, 
      icon: FolderOpen, 
      color: 'blue',
      trend: '+2 this month',
      trendUp: true,
    },
    { 
      label: 'Skills', 
      value: skills.length, 
      icon: Code, 
      color: 'purple',
      trend: '+5 this month',
      trendUp: true,
    },
    { 
      label: 'Experience', 
      value: experiences.length, 
      icon: Briefcase, 
      color: 'green',
      trend: '+1 this month',
      trendUp: true,
    },
    { 
      label: 'Education', 
      value: education.length, 
      icon: GraduationCap, 
      color: 'orange',
      trend: 'No change',
      trendUp: false,
    },
  ];

  const performanceStats = [
    { 
      label: 'Portfolio Views', 
      value: quickStats.totalViews, 
      icon: Eye, 
      color: 'blue',
      subtitle: `+${quickStats.thisWeekViews} this week`,
    },
    { 
      label: 'Avg. View Time', 
      value: quickStats.avgViewTime, 
      icon: Clock, 
      color: 'green',
      subtitle: '+12% from last week',
    },
    { 
      label: 'Bounce Rate', 
      value: quickStats.bounceRate, 
      icon: TrendingUp, 
      color: 'purple',
      subtitle: '-5% from last week',
    },
    { 
      label: 'Active Projects', 
      value: projects.length, // Fixed this line
      icon: Activity, 
      color: 'orange',
      subtitle: 'Currently working on',
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-800' },
    purple: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-800' },
    green: { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-600 dark:text-green-400', border: 'border-green-200 dark:border-green-800' },
    orange: { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-800' },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'pending': return <AlertCircle size={16} className="text-yellow-500" />;
      case 'in-progress': return <Activity size={16} className="text-blue-500" />;
      default: return <Activity size={16} className="text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    const diffInHours = Math.floor(diffInSeconds / 3600);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInHours < 1) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          <div className="space-y-2 mb-4 lg:mb-0">
            <h1 className="text-3xl lg:text-4xl font-bold">
              Welcome back, {user?.username || 'User '}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your portfolio today
            </p>
            <div className="flex items-center space-x-4 text-sm text-blue-100">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <span>{currentTime.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={16} />
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              <Eye size={18} />
              View Portfolio
              <ExternalLink size={16} />
            </a>
            <button className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium">
              <BarChart3 size={18} />
              Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${colorMap[stat.color].bg} ${colorMap[stat.color].border} border p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} className={colorMap[stat.color].text} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className={`text-sm flex items-center gap-1 ${stat.trendUp ? 'text-green-600' : 'text-gray-500'}`}>
                  {stat.trendUp && <TrendingUp size={14} />}
                  {stat.trend}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Performance Analytics</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your portfolio's performance metrics</p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            View Details
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceStats.map((stat, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className={`${colorMap[stat.color].bg} p-2 rounded-lg`}>
                  <stat.icon size={20} className={colorMap[stat.color].text} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{stat.label}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
              <p className="text-gray-600 dark:text-gray-400">Your latest updates and changes</p>
            </div>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex-shrink-0">
                  {getStatusIcon(activity.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">({activity.type})</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quick Actions</h2>
            <p className="text-gray-600 dark:text-gray-400">Common tasks and shortcuts</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Project', icon: FolderOpen, color: 'blue' },
              { label: 'Add Skill', icon: Code, color: 'purple' },
              { label: 'Add Experience', icon: Briefcase, color: 'green' },
              { label: 'Update Profile', icon: Users, color: 'orange' },
            ].map((action, index) => (
              <button
                key={index}
                className={`${colorMap[action.color].bg} ${colorMap[action.color].border} border-2 border-dashed p-4 rounded-lg hover:bg-opacity-80 transition-all duration-300 group flex flex-col items-center gap-2`}
              >
                <action.icon size={24} className={`${colorMap[action.color].text} group-hover:scale-110 transition-transform`} />
                <span className={`text-sm font-medium ${colorMap[action.color].text}`}>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Portfolio Health Score */}
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">Portfolio Health Score</h3>
              <div className="flex items-center gap-1">
                <Star className="text-yellow-500" size={16} />
                <span className="text-sm font-bold text-gray-900 dark:text-white">8.7/10</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              Great job! Consider adding more projects to boost your score.
            </p>
          </div>
        </div>
      </div>

      {/* Goals & Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Goals & Progress</h2>
            <p className="text-gray-600 dark:text-gray-400">Track your portfolio development goals</p>
          </div>
          <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
            <Target size={16} />
            Set Goals
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { goal: 'Complete 5 Projects', current: 3, target: 5, color: 'blue' },
            { goal: 'Learn 10 New Skills', current: 7, target: 10, color: 'purple' },
            { goal: 'Update Portfolio Weekly', current: 2, target: 4, color: 'green' },
                   ].map((goal, index) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{goal.goal}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      goal.color === 'blue' ? 'from-blue-400 to-blue-600' :
                      goal.color === 'purple' ? 'from-purple-400 to-purple-600' :
                      'from-green-400 to-green-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {Math.round(progress)}% complete
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {projects.length + skills.length + experiences.length + education.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {Math.round(((projects.length + skills.length) / 20) * 100)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Profile Complete</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {new Date().getFullYear() - 2020}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {quickStats.totalViews}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewManager;
