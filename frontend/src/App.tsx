import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import History from './components/History';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between">
              <div className="flex space-x-7">
                <div className="flex items-center py-4">
                  <Link to="/" className="text-xl font-bold text-gray-800">
                    Vehicle Challan System
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="py-4 px-2 text-gray-500 hover:text-gray-900">
                    Search
                  </Link>
                  <Link to="/history" className="py-4 px-2 text-gray-500 hover:text-gray-900">
                    History
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-6xl mx-auto mt-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
