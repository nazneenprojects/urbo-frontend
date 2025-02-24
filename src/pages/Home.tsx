import React from 'react';
import { ArrowRight, MapPin, Database, TreePine, Building2, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/analysis');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80"
            alt="Modern city with green spaces"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-green-800 mb-6">
              Reimagining Urban Spaces for a Sustainable Future
            </h1>
            <p className="text-xl text-blue-700 mb-8 max-w-3xl mx-auto">
              Empowering urban planners with data-driven insights to create greener, more sustainable cities across India
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleGetStarted}
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition flex items-center"
              >
                Get Started <ArrowRight className="ml-2" />
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Powered by Advanced Technology</h2>
          <p className="text-lg text-blue-600">
            Leveraging trusted geospatial and AQL data from official partners
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-xl">
            <MapPin className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Geospatial Analysis</h3>
            <p className="text-blue-600">
              Precise mapping and analysis using official geospatial data from trusted government sources
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl">
            <Database className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Real-time Data</h3>
            <p className="text-blue-600">
              Live air quality and environmental metrics from authorized monitoring stations
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl">
            <TreePine className="w-12 h-12 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold text-green-800 mb-2">Green Space Planning</h3>
            <p className="text-blue-600">
              Optimize urban green spaces using advanced algorithms and environmental data
            </p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-white text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-green-100">Cities Analyzed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-green-100">Green Spaces Mapped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25K+</div>
              <div className="text-green-100">Data Points</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-green-100">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Why Choose URBO?</h2>
          <p className="text-lg text-blue-600">
            Comprehensive urban planning solutions backed by reliable data
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="flex gap-4">
            <Building2 className="w-8 h-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Smart City Integration</h3>
              <p className="text-blue-600">
                Seamlessly integrate with existing smart city infrastructure and data systems
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Wind className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Air Quality Monitoring</h3>
              <p className="text-blue-600">
                Real-time air quality monitoring and predictive analysis for better urban planning
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Ready to Transform Urban Planning?
          </h2>
          <p className="text-lg text-blue-600 mb-8 max-w-2xl mx-auto">
            Join the movement towards sustainable urban development with URBO's comprehensive planning tools
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;