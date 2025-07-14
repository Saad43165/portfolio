import { useState } from 'react';
import { Target, Check, Plus } from 'lucide-react';

interface Goal {
  id: number;
  text: string;
  target: number;
  current: number;
}

interface SetGoalsManagerProps {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
}

const SetGoalsManager: React.FC<SetGoalsManagerProps> = ({ goals, setGoals }) => {
  const [newGoal, setNewGoal] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const handleAddGoal = () => {
    if (newGoal && newTarget) {
      setGoals([
        ...goals,
        {
          id: goals.length + 1,
          text: newGoal,
          target: parseInt(newTarget),
          current: 0,
        },
      ]);
      setNewGoal('');
      setNewTarget('');
    }
  };

  const handleUpdateGoal = (id: number, current: number) => {
    setGoals(goals.map((goal) => (goal.id === id ? { ...goal, current } : goal)));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Set New Goals</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Enter goal (e.g., Complete 3 Projects)"
            className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="New goal"
          />
          <input
            type="number"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            placeholder="Target (e.g., 3)"
            className="w-24 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Goal target"
          />
          <button
            onClick={handleAddGoal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Add goal"
          >
            <Plus size={16} />
            Add Goal
          </button>
        </div>
        <div className="space-y-3">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <Target size={16} className="text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{goal.text}</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={goal.current}
                    onChange={(e) => handleUpdateGoal(goal.id, parseInt(e.target.value) || 0)}
                    className="w-20 p-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Progress for ${goal.text}`}
                  />
                  <span className="text-xs text-gray-600">/ {goal.target}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Check size={16} className={goal.current >= goal.target ? 'text-green-500' : 'text-gray-500'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SetGoalsManager;