import { Routes, Route } from 'react-router-dom';
import { useAuth} from  '../../context/AuthContext';
import AdminLogin from '../admin/Manager/OverViewManager/Dashboard/AdminLogin';
import AdminDashboard from '../admin/Manager/OverViewManager/Dashboard/AdminDashboard';
//import { form } from 'framer-motion/client';

const AdminRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route 
        path="/*" 
        element={isAuthenticated ? <AdminDashboard /> : <AdminLogin />} 
      />
    </Routes>
  );
};

export default AdminRoute;