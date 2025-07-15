import { useState, useEffect, useRef } from 'react';
import { useParticles } from '../hooks/useParticles';
import { useMousePosition } from '../hooks/useMousePosition';
import { ActivityItem, TabType, QuickStatsType, CustomMetrics } from '../types';
import WelcomeHeader from './WelcomeHeader';
import QuickStats from './QuickStats';
import PerformanceAnalytics from './PerformanceAnalytics';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';
import GoalsProgress from './GoalsProgress';
import FooterStats from './FooterStats';
import Dialog from './Dialog';
import { formatTimeAgo } from '../utils/formatTimeAgo';
import { getStatusIcon } from '../utils/getStatusIcon';
import { useAuth } from '../../../../../context/AuthContext';
import { FolderOpen, Code, Briefcase, GraduationCap, Eye, Clock, TrendingUp, Activity } from 'lucide-react';
import { useData } from '../../../../../context/DataContext';
import AnalyticsManager from '../../AnalyticsManager';
import SetGoalsManager from '../../SetGoalsManager';
import ViewAllManager from '../Dashboard/ViewAllManager';
import ViewDetailsManager from '../Dashboard/ViewDetailsManager';
import { LucideIcon } from 'lucide-react';

// Define the Color type to restrict color values
type Color = 'blue' | 'purple' | 'green' | 'orange';

interface OverviewManagerProps {
  setActiveTab: (tab: TabType) => void;
}

// Update colorMap to use the Color type
const colorMap: Record<Color, { bg: string; text: string; border: string; gradient: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-600', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600' },
  green: { bg: 'bg-green-100', text: 'text-green-600', border: 'border-green-200', gradient: 'from-green-500 to-green-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600' },
};

const OverviewManager: React.FC<OverviewManagerProps> = ({ setActiveTab }) => {
  const { projects, skills, experiences, education } = useData();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [quickStats, setQuickStats] = useState<QuickStatsType>({
    totalViews: 1247,
    thisWeekViews: 89,
    avgViewTime: '2:34',
    bounceRate: '34%',
  });
  const sectionRef = useRef<HTMLElement>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
  const [showGoalsDialog, setShowGoalsDialog] = useState(false);
  const [showAllDialog, setShowAllDialog] = useState(false);
  const [detailsToggle, setDetailsToggle] = useState(false);
  const [customMetrics, setCustomMetrics] = useState<CustomMetrics>({ targetViews: 1500 });
  const [activityFilter, setActivityFilter] = useState('all');
  const particles = useParticles();
  const mousePosition = useMousePosition(sectionRef);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

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

  // Explicitly type stats to match QuickStatsProps
  const stats: Array<{
    label: string;
    value: number;
    icon: LucideIcon;
    color: Color;
    trend: string;
    trendUp: boolean;
  }> = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderOpen,
      color: 'blue' as const,
      trend: projects.length > 0 ? `+${projects.length} this month` : 'No projects',
      trendUp: projects.length > 0,
    },
    {
      label: 'Skills',
      value: skills.length,
      icon: Code,
      color: 'purple' as const,
      trend: skills.length > 0 ? `+${skills.length} this month` : 'No skills',
      trendUp: skills.length > 0,
    },
    {
      label: 'Experience',
      value: experiences.length,
      icon: Briefcase,
      color: 'green' as const,
      trend: experiences.length > 0 ? `+${experiences.length} this month` : 'No experience',
      trendUp: experiences.length > 0,
    },
    {
      label: 'Education',
      value: education.length,
      icon: GraduationCap,
      color: 'orange' as const,
      trend: education.length > 0 ? `+${education.length} this month` : 'No education',
      trendUp: education.length > 0,
    },
  ];

  // Explicitly type performanceStats to match PerformanceAnalyticsProps
  const performanceStats: Array<{
    label: string;
    value: number | string;
    icon: LucideIcon;
    color: Color;
    subtitle: string;
  }> = [
    {
      label: 'Portfolio Views',
      value: quickStats.totalViews,
      icon: Eye,
      color: 'blue' as const,
      subtitle: `+${quickStats.thisWeekViews} this week`,
    },
    {
      label: 'Avg. View Time',
      value: quickStats.avgViewTime,
      icon: Clock,
      color: 'green' as const,
      subtitle: '+12% from last week',
    },
    {
      label: 'Bounce Rate',
      value: quickStats.bounceRate,
      icon: TrendingUp,
      color: 'purple' as const,
      subtitle: '-5% from last week',
    },
    {
      label: 'Active Projects',
      value: projects.length,
      icon: Activity,
      color: 'orange' as const,
      subtitle: 'Currently working on',
    },
  ];

  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete 5 Projects', target: 5, current: projects.length },
    { id: 2, text: 'Learn 10 New Skills', target: 10, current: skills.length },
    { id: 3, text: 'Update Portfolio Weekly', target: 4, current: Math.min(recentActivities.length, 4) },
  ]);

  return (
    <section
      ref={sectionRef}
      className="py-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}
    >
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
        <WelcomeHeader user={user} currentTime={currentTime} setShowAnalyticsDialog={setShowAnalyticsDialog} />
        <QuickStats stats={stats} mousePosition={mousePosition} colorMap={colorMap} />
        <PerformanceAnalytics
          performanceStats={performanceStats}
          setShowDetailsDialog={setShowDetailsDialog}
          mousePosition={mousePosition}
          colorMap={colorMap}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity
            recentActivities={recentActivities}
            setShowAllDialog={setShowAllDialog}
            getStatusIcon={getStatusIcon}
            formatTimeAgo={formatTimeAgo}
            mousePosition={mousePosition}
          />
          <QuickActions
            setActiveTab={setActiveTab}
            mousePosition={mousePosition}
            colorMap={colorMap}
            projects={projects}
            skills={skills}
            experiences={experiences}
            education={education}
          />
        </div>
        <GoalsProgress goals={goals} setShowGoalsDialog={setShowGoalsDialog} mousePosition={mousePosition} colorMap={colorMap} />
        <FooterStats
          projects={projects}
          skills={skills}
          experiences={experiences}
          education={education}
          quickStats={quickStats}
          mousePosition={mousePosition}
        />

        <Dialog isOpen={showDetailsDialog} onClose={() => setShowDetailsDialog(false)} title="Performance Analytics Details" mousePosition={mousePosition}>
          <ViewDetailsManager quickStats={quickStats} detailsToggle={detailsToggle} setDetailsToggle={setDetailsToggle} />
        </Dialog>
        <Dialog isOpen={showAnalyticsDialog} onClose={() => setShowAnalyticsDialog(false)} title="Analytics Overview" mousePosition={mousePosition}>
          <AnalyticsManager
            quickStats={quickStats}
            customMetrics={customMetrics}
            setCustomMetrics={setCustomMetrics}
            setQuickStats={setQuickStats}
          />
        </Dialog>
        <Dialog isOpen={showGoalsDialog} onClose={() => setShowGoalsDialog(false)} title="Set Goals" mousePosition={mousePosition}>
          <SetGoalsManager goals={goals} setGoals={setGoals} />
        </Dialog>
        <Dialog isOpen={showAllDialog} onClose={() => setShowAllDialog(false)} title="All Activities" mousePosition={mousePosition}>
          <ViewAllManager
            activities={allActivities}
            getStatusIcon={getStatusIcon}
            formatTimeAgo={formatTimeAgo}
            activityFilter={activityFilter}
            setActivityFilter={setActivityFilter}
          />
        </Dialog>
      </div>
    </section>
  );
};

export default OverviewManager;