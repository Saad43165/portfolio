// import React from 'react';
// import { LucideIcon } from 'lucide-react';
// import { colorMap } from '../utils/colors';

// interface StatCardProps {
//   label: string;
//   value: string | number;
//   icon: LucideIcon;
//   color: keyof typeof colorMap;
//   onClick?: () => void;
// }

// const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className={`group relative p-4 rounded-3xl border border-white/50 shadow-xl transition transform hover:scale-105 hover:-translate-y-1 cursor-pointer ${colorMap[color].bg}`}
//     >
//       <div className="flex items-center justify-between mb-3">
//         <div className={`${colorMap[color].border} border p-2 rounded-lg`}>
//           <Icon size={20} className={colorMap[color].text} />
//         </div>
//         <div className="text-right">
//           <div className="text-xl font-semibold text-gray-900">{value}</div>
//           <div className="text-xs text-gray-600">{label}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatCard;
