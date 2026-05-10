import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/welcome.css";
import { 
  Sparkles, Globe, MapPin, Users, TrendingUp, 
  ArrowRight, Play, Shield, Brain, Heart, Star,
  ChevronDown, Plane, Compass, Camera, DollarSign,
  Mic, Calendar, Clock, Award, Zap, Target, Luggage
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const WelcomePage = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const destinationsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const refs = [heroRef, featuresRef, destinationsRef];
    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Travel Assistant",
      description: "Intelligent travel planning with personalized recommendations",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: DollarSign,
      title: "Smart Budget Intelligence",
      description: "AI-powered expense tracking and budget optimization",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Community Travel Sharing",
      description: "Connect with travelers and share experiences",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Luggage,
      title: "Smart Packing Assistant",
      description: "AI-generated packing lists based on destination and weather",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: TrendingUp,
      title: "Travel Simulation",
      description: "Preview your trips with AI-powered simulations",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Target,
      title: "Expense Analytics",
      description: "Detailed insights into your travel spending patterns",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const destinations = [
    {
      name: "Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80",
      description: "Beaches & Nightlife",
      rating: 4.8,
      price: "₹25,000"
    },
    {
      name: "Ladakh",
      country: "India", 
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
      description: "Mountain Adventure",
      rating: 4.9,
      price: "₹40,000"
    },
    {
      name: "Kerala",
      country: "India",
      image: "https://images.unsplash.com/photo-1602216056056-7084e525845c?w=600&q=80",
      description: "Backwaters & Culture",
      rating: 4.7,
      price: "₹30,000"
    },
    {
      name: "Dubai",
      country: "UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80",
      description: "Luxury & Shopping",
      rating: 4.8,
      price: "₹80,000"
    },
    {
      name: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&q=80",
      description: "Romance & Art",
      rating: 4.9,
      price: "₹1,20,000"
    },
    {
      name: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-b784a5ba9a2c?w=600&q=80",
      description: "Island Paradise",
      rating: 4.8,
      price: "₹60,000"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Travelers", icon: Users },
    { number: "200+", label: "Destinations", icon: MapPin },
    { number: "1M+", label: "Trips Planned", icon: Globe },
    { number: "98%", label: "Satisfaction", icon: Star }
  ];

  const bgStyle = darkMode 
    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
    : "bg-gradient-to-br from-blue-50 via-white to-cyan-50";

  const cardStyle = darkMode
    ? "bg-slate-800/50 backdrop-blur-xl border-slate-700/50"
    : "bg-white/70 backdrop-blur-xl border-white/20";

  const textStyle = darkMode ? "text-white" : "text-gray-900";
  const subTextStyle = darkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`min-h-screen ${bgStyle} transition-all duration-500`}>
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              <div className={`w-2 h-2 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} rounded-full opacity-60`} />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 transform ${
            isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cardStyle} border mb-8`}>
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className={`text-sm font-semibold ${subTextStyle}`}>AI-Powered Travel Planning</span>
            </div>

            {/* Main Heading */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${textStyle} leading-tight`}>
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Travel Smarter
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                with AI
              </span>
            </h1>

            {/* Subheading */}
            <p className={`text-xl md:text-2xl mb-12 ${subTextStyle} max-w-3xl mx-auto leading-relaxed`}>
              Experience the future of travel planning with intelligent itineraries, 
              smart budget management, and personalized recommendations powered by advanced AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/auth')}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button
                onClick={() => navigate('/auth')}
                className={`px-8 py-4 ${cardStyle} border font-semibold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${textStyle}`}
              >
                Sign In
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className={`text-center ${cardStyle} border rounded-2xl p-6 backdrop-blur-xl`}>
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                  <div className={`text-3xl font-bold ${textStyle}`}>{stat.number}</div>
                  <div className={`text-sm ${subTextStyle}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-6 h-6 ${subTextStyle}`} />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${
            isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textStyle}`}>
              Powerful AI Features
            </h2>
            <p className={`text-xl ${subTextStyle} max-w-3xl mx-auto`}>
              Discover how our AI-powered features transform your travel planning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group ${cardStyle} border rounded-3xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-xl`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-4 ${textStyle}`}>{feature.title}</h3>
                <p className={`${subTextStyle} leading-relaxed`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section ref={destinationsRef} id="destinations" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textStyle}`}>
              Popular Destinations
            </h2>
            <p className={`text-xl ${subTextStyle} max-w-3xl mx-auto`}>
              Explore our curated selection of amazing destinations around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/auth')}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white font-semibold">{dest.rating}</span>
                      </div>
                    </div>
                    <p className="text-white/80 mb-2">{dest.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">{dest.price}</span>
                      <span className="text-white/60 text-sm">per person</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textStyle}`}>
              AI-Powered Experience
            </h2>
            <p className={`text-xl ${subTextStyle} max-w-3xl mx-auto`}>
              Our advanced AI algorithms understand your preferences and create personalized travel experiences
            </p>
          </div>

          <div className={`${cardStyle} border rounded-3xl p-12 backdrop-blur-xl`}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className={`text-3xl font-bold mb-6 ${textStyle}`}>
                  Intelligent Travel Planning
                </h3>
                <div className="space-y-4">
                  {[
                    "Personalized itinerary recommendations",
                    "Smart budget optimization",
                    "Real-time travel insights",
                    "Adaptive planning based on preferences"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-blue-500" />
                      <span className={`${subTextStyle}`}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                  <Brain className="w-24 h-24 text-blue-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${cardStyle} border rounded-3xl p-12 backdrop-blur-xl`}>
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${textStyle}`}>
              Start Your Journey Today
            </h2>
            <p className={`text-xl ${subTextStyle} mb-8 max-w-2xl mx-auto`}>
              Join thousands of travelers who are already experiencing the future of travel planning with AI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/auth')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-2xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Create Free Account <ArrowRight className="w-5 h-5" />
                </span>
              </button>
              
              <button
                onClick={() => navigate('/auth')}
                className={`px-8 py-4 ${cardStyle} border font-semibold rounded-2xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${textStyle}`}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 px-4 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <p className={`${subTextStyle}`}>
            © 2024 TravelLoop. AI-Powered Travel Planning Platform.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WelcomePage;
