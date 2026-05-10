import { useNavigate } from "react-router-dom";
import { Brain, Globe, Users, DollarSign, MapPin, Calendar, TrendingUp, Shield, ArrowRight, Star, CheckCircle } from "lucide-react";
import PageTransition from "../components/ui/PageTransition";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition animation="fadeIn">
      <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 animate-gradient-shift"></div>
      
      {/* Moving Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-3xl animate-float-fast"></div>
        <div className="absolute bottom-10 right-1/3 w-88 h-88 bg-pink-500/20 rounded-full filter blur-3xl animate-float-medium"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Globe className="w-8 h-8 text-blue-400 animate-pulse" />
            <span className="text-2xl font-bold text-white">TravelLoop</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">Features</button>
            <button className="text-gray-300 hover:text-white transition-colors">About</button>
            <button 
              onClick={() => navigate('/auth')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      <div className="relative z-10">

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full mb-6 animate-fade-in-up">
              <Star className="w-4 h-4 text-yellow-400 mr-2 animate-pulse" />
              <span className="text-blue-300 text-sm font-medium">AI-Powered Travel Planning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200">
              Transform Your
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-text">
                Travel Experience
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
              Experience the next generation of travel planning with intelligent itineraries, 
              real-time budget optimization, and personalized AI recommendations tailored to your unique travel style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up animation-delay-600">
              <button
                onClick={() => navigate('/auth')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                14-day free trial
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">AI Travel Assistant</h3>
              <p className="text-gray-400 leading-relaxed">Advanced AI algorithms create personalized itineraries based on your preferences, budget, and travel history.</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Budget Management</h3>
              <p className="text-gray-400 leading-relaxed">Real-time expense tracking, budget optimization, and intelligent spending recommendations to maximize your travel value.</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Insights</h3>
              <p className="text-gray-400 leading-relaxed">Connect with fellow travelers, share experiences, and discover hidden gems through our global community.</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Destinations</h3>
              <p className="text-gray-400 leading-relaxed">Access comprehensive guides for 200+ destinations with real-time updates and local recommendations.</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Scheduling</h3>
              <p className="text-gray-400 leading-relaxed">Optimize your travel schedule with AI-powered timing recommendations and weather-aware planning.</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure & Private</h3>
              <p className="text-gray-400 leading-relaxed">Enterprise-grade security ensures your travel data and personal information are always protected.</p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-12 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400">Active Travelers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">200+</div>
                <div className="text-gray-400">Destinations</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">1M+</div>
                <div className="text-gray-400">Trips Planned</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-gray-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Transform Your Travel?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of smart travelers who are already using AI to plan their perfect trips.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/auth')}
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};

export default WelcomePage;
