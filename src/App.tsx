import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Faq from './pages/Faq';
import Analysis from './pages/Analysis';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <header className="bg-green-50 border-b border-green-100">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <a href="/" className="flex items-center space-x-2">
                  <Leaf className="h-8 w-8 text-green-600" />
                  <span className="text-2xl font-bold text-green-800">URBO</span>
                </a>
                <span className="ml-4 text-sm text-green-600">Sustainable Urban Planning Tool</span>
              </div>
            </div>
            <Navbar />
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;