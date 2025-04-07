import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SavedArticles from "./pages/SavedArticles";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen font-sans">
        <nav className="bg-white shadow-md py-4 mb-4">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">mnzproject</h1>
            <div className="space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link to="/saved" className="text-gray-700 hover:text-blue-600">Saved Articles</Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedArticles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
