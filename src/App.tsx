import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
import PortfolioLayout from './components/User_end/PortfolioLayout';

import { Analytics } from "@vercel/analytics/react";

// Admin dashboard is code-split so public visitors never download it
const AdminRoute = lazy(() => import('./components/User_end/AdminRoute'));

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={< PortfolioLayout/>} />
            <Route
              path="/admin/*"
              element={
                <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
                  <AdminRoute />
                </Suspense>
              }
            />
          </Routes>
        </Router>
        <Analytics />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
