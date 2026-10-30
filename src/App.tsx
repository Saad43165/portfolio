import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PortfolioLayout from './components/User_end/PortfolioLayout';

import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="*" element={< PortfolioLayout/>} />
        </Routes>
      </Router>
      <Analytics />
    </DataProvider>
  );
}

export default App;
