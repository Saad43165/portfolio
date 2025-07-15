import { Target } from 'lucide-react';
import { Goal, ColorMap } from '../types';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility';

interface GoalsProgressProps {
  goals: Goal[];
  setShowGoalsDialog: (value: boolean) => void;
  mousePosition: { x: number; y: number };
  colorMap: ColorMap;
}

const GoalsProgress: React.FC<GoalsProgressProps> = ({ goals, setShowGoalsDialog, mousePosition, colorMap }) => {
  useDialogAccessibility(setShowGoalsDialog);

  return (
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
      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
      <div
        className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full opacity-30 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"
        style={{ animationDelay: '0.5s' }}
      ></div>
    </div>
  );
};

export default GoalsProgress;