import { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  FolderOpen,
  Code,
  Briefcase,
  GraduationCap,
  Eye,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  ArrowUpRight,
  BarChart3,
  Users,
  Target,
  CheckCircle,
  AlertCircle,
  Activity,
  ExternalLink,
  X,
} from 'lucide-react';
import ViewDetailsManager from './ViewDetailsManager';
import AnalyticsManager from './AnalyticsManager';
import SetGoalsManager from './SetGoalsManager';
import ViewAllManager from './ViewAllManager';

interface ActivityItem {
  id: string;
  type: 'project' | 'skill' | 'experience' | 'education';
  title: string;
  action: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'in-progress';
}

type TabType = 'overview' | 'projects' | 'skills' | 'experience' | 'education' | 'about' | 'settings';

interface OverviewManagerProps {
  setActiveTab: (tab: TabType) => void;
}

const OverviewManager: React.FC<OverviewManagerProps> = ({ setActiveTab }) => {
  const { projects, skills, experiences, education } = useData();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quickStats, setQuickStats] = useState({
    totalViews: 1247,
    thisWeekViews: 89,
    avgViewTime: '2:34',
    bounceRate: '34%',
  });
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; size: number; speed: number; opacity: number; color: string }[]
  >([]);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
  const [showGoalsDialog, setShowGoalsDialog] = useState(false);
  const [showAllDialog, setShowAllDialog] = useState(false);
  const [detailsToggle, setDetailsToggle] = useState(false);
  const [customMetrics, setCustomMetrics] = useState({ targetViews: 1500 });

  // Dynamic recent activities

  // Dynamic recent activities
  const recentActivities: ActivityItem[] = [
    ...projects.slice(0, 1).map((project, i) => ({
      id: `project-${i}`,
      type: 'project' as const,
      title: project.title || 'Untitled Project',
      action: 'Updated project details',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed' as const,
    })),
    ...skills.slice(0, 1).map((skill, i) => ({
      id: `skill-${i}`,
      type: 'skill' as const,
      title: skill.name || 'New Skill',
      action: 'Added new skill',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed' as const,
    })),
    ...experiences.slice(0, 1).map((exp, i) => ({
      id: `experience-${i}`,
      type: 'experience' as const,
      title: exp.position || 'New Experience',
      action: 'Updated experience',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'in-progress' as const,
    })),
    ...education.slice(0, 1).map((edu, i) => ({
      id: `education-${i}`,
      type: 'education' as const,
      title: edu.degree || 'New Education',
      action: 'Added education',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: 'completed' as const,
    })),
  ].slice(0, 3);

  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete 5 Projects', target: 5, current: projects.length },
    { id: 2, text: 'Learn 10 New Skills', target: 10, current: skills.length },
    { id: 3, text: 'Update Portfolio Weekly', target: 4, current: Math.min(recentActivities.length, 4) },
  ]);
  const [activityFilter, setActivityFilter] = useState('all');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x: x - 0.5, y: y - 0.5 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      color: ['blue', 'purple', 'cyan', 'pink', 'indigo'][Math.floor(Math.random() * 5)],
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          y: particle.y > 100 ? -10 : particle.y + particle.speed * 0.05,
          x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.05,
        }))
      );
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  // Dialog keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDetailsDialog(false);
        setShowAnalyticsDialog(false);
        setShowGoalsDialog(false);
        setShowAllDialog(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allActivities: ActivityItem[] = [
    ...projects.map((project, i) => ({
      id: `project-${i}`,
      type: 'project' as const,
      title: project.title || 'Untitled Project',
      action: 'Updated project details',
      timestamp: new Date(Date.now() - (i + 1) * 2 * 60 * 60 * 1000),
      status: 'completed' as const,
    })),
    ...skills.map((skill, i) => ({
      id: `skill-${i}`,
      type: 'skill' as const,
      title: skill.name || 'New Skill',
      action: 'Added new skill',
      timestamp: new Date(Date.now() - (i + 1) * 5 * 60 * 60 * 1000),
      status: 'completed' as const,
    })),
    ...experiences.map((exp, i) => ({
      id: `experience-${i}`,
      type: 'experience' as const,
      title: exp.position || 'New Experience',
      action: 'Updated experience',
      timestamp: new Date(Date.now() - (i + 1) * 24 * 60 * 60 * 1000),
      status: 'in-progress' as const,
    })),
    ...education.map((edu, i) => ({
      id: `education-${i}`,
      type: 'education' as const,
      title: edu.degree || 'New Education',
      action: 'Added education',
      timestamp: new Date(Date.now() - (i + 1) * 48 * 60 * 60 * 1000),
      status: 'completed' as const,
    })),
  ].filter((activity) => activityFilter === 'all' || activity.type === activityFilter);

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'blue',
      trend: projects.length > 0 ? `+${projects.length} this month` : 'No projects',
      trendUp: projects.length > 0,
    },
    {
      label: 'Skills',
      value: skills.length,
      icon: Code,
      color: 'purple',
      trend: skills.length > 0 ? `+${skills.length} this month` : 'No skills',
      trendUp: skills.length > 0,
    },
    {
      label: 'Experience',
      value: experiences.length,
      icon: Briefcase,
      color: 'green',
      trend: experiences.length > 0 ? `+${experiences.length} this month` : 'No experience',
      trendUp: experiences.length > 0,
    },
    {
      label: 'Education',
      value: education.length,
      icon: GraduationCap,
      color: 'orange',
      trend: education.length > 0 ? `+${education.length} this month` : 'No education',
      trendUp: education.length > 0,
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
      value: projects.length,
      icon: Activity,
      color: 'orange',
      subtitle: 'Currently working on',
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; gradient: string }> = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
    green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'in-progress':
        return <Activity size={16} className="text-blue-500" />;
      default:
        return <Activity size={16} className="text-gray-500" />;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const calculateHealthScore = () => {
    const totalItems = projects.length + skills.length + experiences.length + education.length;
    const maxItems = 20;
    const score = Math.min((totalItems / maxItems) * 10, 10);
    return score.toFixed(1);
  };

  return (
    <section
      ref={sectionRef}
      className="py-6 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              radial-gradient(circle at ${50 + mousePosition.x * 15}% ${50 + mousePosition.y * 15}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at ${80 + mousePosition.x * -10}% ${20 + mousePosition.y * 10}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              radial-gradient(circle at ${20 + mousePosition.x * 20}% ${80 + mousePosition.y * -15}%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)
            `,
            transition: 'all 0.3s ease-out',
          }}
        />
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute bg-${particle.color}-400 rounded-full opacity-30`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        ))}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99, 102, 241, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Welcome Header */}
        <div
          className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
              mousePosition.x * 2
            }deg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          ></div>
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
                      {currentTime.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
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
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
          ></div>
          <div
            className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
                  mousePosition.x * 2
                }deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              ></div>
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
              <div
                className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              ></div>
              <div
                className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          ))}
        </div>

        {/* Performance Analytics */}
        <div
          className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
              mousePosition.x * 2
            }deg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          ></div>
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
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
          ></div>
          <div
            className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
                mousePosition.x * 2
              }deg)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            ></div>
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
            <div
              className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
            ></div>
            <div
              className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>

          {/* Quick Actions */}
          <div
            className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
                mousePosition.x * 2
              }deg)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div
              className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
            ></div>
            <div className="relative z-10 p-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                <p className="text-sm text-gray-600">Common tasks and shortcuts</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Add Project', icon: FolderOpen, color: 'blue', tab: 'projects' },
                  { label: 'Add Skill', icon: Code, color: 'purple', tab: 'skills' },
                  { label: 'Add Experience', icon: Briefcase, color: 'green', tab: 'experience' },
                  { label: 'Update Profile', icon: Users, color: 'orange', tab: 'about' },
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(action.tab as TabType)}
                    className={`${colorMap[action.color].bg} ${colorMap[action.color].border} border p-3 rounded-lg hover:bg-opacity-80 transition-all duration-200 flex flex-col items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    aria-label={action.label}
                  >
                    <action.icon size={20} className={colorMap[action.color].text} />
                    <span className={`text-sm font-medium ${colorMap[action.color].text}`}>
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Portfolio Health Score</h3>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-semibold text-gray-900">{calculateHealthScore()}/10</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(parseFloat(calculateHealthScore()) / 10) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {parseFloat(calculateHealthScore()) >= 8
                    ? 'Great job! Consider adding more projects to boost your score.'
                    : 'Add more content to improve your portfolio health.'}
                </p>
              </div>
            </div>
            <div
              className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
            ></div>
            <div
              className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>
        </div>

        {/* Goals & Progress */}
        <div
          className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
              mousePosition.x * 2
            }deg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          ></div>
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Goals & Progress</h2>
                <p className="text-sm text-gray-600">Track your portfolio development goals</p>
              </div>
              <button
                onClick={() => setShowGoalsDialog(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Set new goals"
              >
                <Target size={16} />
                Set Goals
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => {
                const progress = Math.min((goal.current / goal.target) * 100, 100);
                return (
                  <div key={goal.id} className={`${colorMap['blue'].bg} rounded-lg p-4 hover:bg-opacity-80 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-900">{goal.text}</h4>
                      <span className="text-xs text-gray-500">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{Math.round(progress)}% complete</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
          ></div>
          <div
            className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>

        {/* Footer Stats */}
        <div
          className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${
              mousePosition.x * 2
            }deg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
          ></div>
          <div className="relative z-10 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-xl font-semibold text-gray-900">
                  {projects.length + skills.length + experiences.length + education.length}
                </div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold text-gray-900">
                  {Math.round(((projects.length + skills.length) / 20) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Profile Complete</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold text-gray-900">
                  {new Date().getFullYear() - 2020}
                </div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl font-semibold text-gray-900">{quickStats.totalViews}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
            </div>
          </div>
          <div
            className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
          ></div>
          <div
            className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>

        {/* Dialogs */}
        {showDetailsDialog && (
          <dialog
            ref={dialogRef}
            open
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            }}
            aria-label="Performance Analytics Details"
            onClose={() => setShowDetailsDialog(false)}
          >
            <div
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              ></div>
              <div className="relative z-10 p-6">
                <button
                  onClick={() => setShowDetailsDialog(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close dialog"
                >
                  <X size={24} />
                </button>
                <ViewDetailsManager
                  quickStats={quickStats}
                  detailsToggle={detailsToggle}
                  setDetailsToggle={setDetailsToggle}
                />
              </div>
              <div
                className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              ></div>
              <div
                className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          </dialog>
        )}

        {showAnalyticsDialog && (
          <dialog
            ref={dialogRef}
            open
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            }}
            aria-label="Analytics Overview"
            onClose={() => setShowAnalyticsDialog(false)}
          >
            <div
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              ></div>
              <div className="relative z-10 p-6">
                <button
                  onClick={() => setShowAnalyticsDialog(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close dialog"
                >
                  <X size={24} />
                </button>
                <AnalyticsManager
                  quickStats={quickStats}
                  customMetrics={customMetrics}
                  setCustomMetrics={setCustomMetrics}
                  setQuickStats={setQuickStats}
                />
              </div>
              <div
                className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              ></div>
              <div
                className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          </dialog>
        )}

        {showGoalsDialog && (
          <dialog
            ref={dialogRef}
            open
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            }}
            aria-label="Set Goals"
            onClose={() => setShowGoalsDialog(false)}
          >
            <div
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              ></div>
              <div className="relative z-10 p-6">
                <button
                  onClick={() => setShowGoalsDialog(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close dialog"
                >
                  <X size={24} />
                </button>
                <SetGoalsManager goals={goals} setGoals={setGoals} />
              </div>
              <div
                className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              ></div>
              <div
                className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          </dialog>
        )}

        {showAllDialog && (
          <dialog
            ref={dialogRef}
            open
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            }}
            aria-label="All Activities"
            onClose={() => setShowAllDialog(false)}
          >
            <div
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 border border-white/50 overflow-hidden animate-fadeInUp"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div
                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500"
              ></div>
              <div className="relative z-10 p-6">
                <button
                  onClick={() => setShowAllDialog(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close dialog"
                >
                  <X size={24} />
                </button>
                <ViewAllManager
                  activities={allActivities}
                  getStatusIcon={getStatusIcon}
                  formatTimeAgo={formatTimeAgo}
                  activityFilter={activityFilter}
                  setActivityFilter={setActivityFilter}
                />
              </div>
              <div
                className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"
              ></div>
              <div
                className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          </dialog>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default OverviewManager;