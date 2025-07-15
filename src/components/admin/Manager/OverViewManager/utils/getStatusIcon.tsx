import { CheckCircle, AlertCircle, Activity } from 'lucide-react';

export const getStatusIcon = (status: string): JSX.Element => {
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