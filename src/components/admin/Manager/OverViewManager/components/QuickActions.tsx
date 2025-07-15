import { FolderOpen, Code, Briefcase, Users, Star } from 'lucide-react';
import { calculateHealthScore } from '../utils/calculateHealthScore';
import { Project, Skill, Experience, Education } from '../../../../../types';
import { TabType, ColorMap } from '../types';

interface QuickActionsProps {
  setActiveTab: (tab: TabType) => void;
  mousePosition: { x: number; y: number };
  colorMap: ColorMap;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
}

const QuickActions: React.FC<QuickActionsProps> = ({
  setActiveTab,
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
    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
    <div
      className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
      style={{ animationDelay: '0.5s' }}
    ></div>
  </div>
);

export default QuickActions;