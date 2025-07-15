import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { AuthProvider } from './context/AuthContext';
//import PortfolioLayout from './components/User_end/PortfolioLayout';
import AdminRoute from './components/User_end/AdminRoute';
import PortfolioLayout from './components/User_end/PortfolioLayout';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={< PortfolioLayout/>} />
            <Route path="/admin/*" element={<AdminRoute />} />
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

export default App;