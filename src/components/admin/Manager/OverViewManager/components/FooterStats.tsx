import { Education, Experience, Project, Skill } from "../../../../../types";
import { QuickStatsType } from "../types";

interface FooterStatsProps {
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
  quickStats: QuickStatsType;
  mousePosition: { x: number; y: number };
}

const FooterStats: React.FC<FooterStatsProps> = ({
  projects,
  skills,
  experiences,
  education,
  quickStats,
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
    <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
    <div
      className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
      style={{ animationDelay: '0.5s' }}
    ></div>
  </div>
);

export default FooterStats;