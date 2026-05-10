import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MapPin, Calendar, Plane, TrendingUp, Star, Globe, Users, User, Crown, DollarSign, Heart, Coffee, Mountain, Waves, Music, Building, Trees, Sparkles, X, Clock, Thermometer, Map, Camera, PieChart, BarChart3 } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useTrips from "../hooks/useTrips";
import TripCard from "../components/trips/TripCard";
import PageTransition from "../components/ui/PageTransition";
import { mockCities, mockIndianCities } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";

// TODO: replace with API call

const costLabel = ["", "$", "$$", "$$$"];

// Travel Inspiration Categories Data
const travelCategories = [
  {
    id: "family",
    title: "Family Trips",
    icon: Users,
    description: "Create unforgettable memories with your loved ones",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    color: "from-blue-500 to-blue-700"
  },
  {
    id: "adventure",
    title: "Adventure Travel",
    icon: Mountain,
    description: "Thrilling experiences for adrenaline seekers",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80",
    color: "from-green-500 to-green-700"
  },
  {
    id: "solo",
    title: "Solo Travel",
    icon: User,
    description: "Discover yourself through solo journeys",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    color: "from-purple-500 to-purple-700"
  },
  {
    id: "luxury",
    title: "Luxury Travel",
    icon: Crown,
    description: "Indulge in premium travel experiences",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099920b?w=600&q=80",
    color: "from-yellow-500 to-yellow-700"
  },
  {
    id: "budget",
    title: "Budget Trips",
    icon: DollarSign,
    description: "Amazing adventures that won't break the bank",
    image: "https://images.unsplash.com/photo-1469474968023-6e5e2e8e6fe4?w=600&q=80",
    color: "from-emerald-500 to-emerald-700"
  },
  {
    id: "romantic",
    title: "Romantic Getaways",
    icon: Heart,
    description: "Perfect escapes for couples and honeymooners",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=600&q=80",
    color: "from-pink-500 to-pink-700"
  },
  {
    id: "weekend",
    title: "Weekend Escapes",
    icon: Coffee,
    description: "Quick rejuvenating trips for busy lives",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    color: "from-indigo-500 to-indigo-700"
  }
];

// Featured Destinations Data
const featuredDestinations = {
  domestic: [
    {
      id: "goa-featured",
      name: "Goa",
      description: "Sun, sand, and Portuguese heritage",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80",
      price: "₹25,000",
      duration: "5-7 days",
      bestSeason: "November to February"
    },
    {
      id: "kerala-featured",
      name: "Kerala",
      description: "Backwaters, tea plantations, and culture",
      image: "https://images.unsplash.com/photo-1602216056044-5d7b916d5a23?w=400&q=80",
      price: "₹30,000",
      duration: "6-8 days",
      bestSeason: "September to March"
    },
    {
      id: "jaipur-featured",
      name: "Jaipur",
      description: "Royal palaces and vibrant markets",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed939d9?w=400&q=80",
      price: "₹20,000",
      duration: "3-5 days",
      bestSeason: "October to March"
    },
    {
      id: "ladakh-featured",
      name: "Ladakh",
      description: "High-altitude adventures and monasteries",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80",
      price: "₹45,000",
      duration: "7-10 days",
      bestSeason: "June to September"
    },
    {
      id: "manali-featured",
      name: "Manali",
      description: "Snowy peaks and adventure sports",
      image: "https://images.unsplash.com/photo-1626627849720-6f3e5c6c6c8c?w=400&q=80",
      price: "₹22,000",
      duration: "4-6 days",
      bestSeason: "March to June"
    },
    {
      id: "andaman-featured",
      name: "Andaman",
      description: "Pristine beaches and marine life",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
      price: "₹55,000",
      duration: "5-7 days",
      bestSeason: "November to April"
    }
  ],
  international: [
    {
      id: "dubai-featured",
      name: "Dubai",
      description: "Luxury shopping and desert adventures",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266fccc393?w=400&q=80",
      price: "₹1,20,000",
      duration: "4-6 days",
      bestSeason: "November to March"
    },
    {
      id: "paris-featured",
      name: "Paris",
      description: "Romance, art, and iconic landmarks",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b528?w=400&q=80",
      price: "₹1,50,000",
      duration: "5-7 days",
      bestSeason: "April to June, September to October"
    },
    {
      id: "tokyo-featured",
      name: "Tokyo",
      description: "Modern culture and ancient traditions",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&q=80",
      price: "₹1,80,000",
      duration: "6-8 days",
      bestSeason: "March to May, October to November"
    },
    {
      id: "bali-featured",
      name: "Bali",
      description: "Tropical paradise and spiritual retreats",
      image: "https://images.unsplash.com/photo-1537953773180-b2f1f782b18a?w=400&q=80",
      price: "₹65,000",
      duration: "5-7 days",
      bestSeason: "April to October"
    },
    {
      id: "switzerland-featured",
      name: "Switzerland",
      description: "Alpine beauty and pristine lakes",
      image: "https://images.unsplash.com/photo-1524492412937-d80b95bae654?w=400&q=80",
      price: "₹2,50,000",
      duration: "7-10 days",
      bestSeason: "June to September"
    },
    {
      id: "singapore-featured",
      name: "Singapore",
      description: "Garden city and culinary paradise",
      image: "https://images.unsplash.com/photo-1525645322416-498d4002920e8?w=400&q=80",
      price: "₹95,000",
      duration: "4-6 days",
      bestSeason: "February to April"
    },
    {
      id: "london-featured",
      name: "London",
      description: "Royal history and modern culture",
      image: "https://images.unsplash.com/photo-1513635267778-4f00c3e6bf67?w=400&q=80",
      price: "₹1,40,000",
      duration: "5-7 days",
      bestSeason: "May to September"
    },
    {
      id: "newyork-featured",
      name: "New York",
      description: "The city that never sleeps",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e1e6e0c?w=400&q=80",
      price: "₹1,60,000",
      duration: "5-7 days",
      bestSeason: "April to June, September to November"
    }
  ]
};

// Travel Articles Data
const travelArticles = [
  {
    id: "article1",
    title: "Best Places to Visit in India This Summer",
    category: "Destinations",
    preview: "Discover the most breathtaking destinations across India perfect for your summer vacation, from hill stations to beach paradises...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    readTime: "5 min read"
  },
  {
    id: "article2",
    title: "Budget Travel Tips for Indian Travelers",
    category: "Budget Travel",
    preview: "Smart ways to save money while traveling without compromising on experience. Learn from seasoned travelers...",
    image: "https://images.unsplash.com/photo-1469474968023-6e5e2e8e6fe4?w=400&q=80",
    readTime: "7 min read"
  },
  {
    id: "article3",
    title: "Street Food Guide: Mumbai to Delhi",
    category: "Food & Culture",
    preview: "A culinary journey through India's most iconic street food destinations. Must-try dishes and hidden gems...",
    image: "https://images.unsplash.com/photo-1504674900247-08773dfb28e8?w=400&q=80",
    readTime: "6 min read"
  },
  {
    id: "article4",
    title: "Adventure Activities in Himalayas",
    category: "Adventure",
    preview: "From trekking to river rafting, discover the ultimate adventure experiences in the Himalayan region...",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    readTime: "8 min read"
  },
  {
    id: "article5",
    title: "Perfect 7-Day Kerala Itinerary",
    category: "Itineraries",
    preview: "A detailed day-by-day guide to exploring Kerala's backwaters, hills, and cultural treasures...",
    image: "https://images.unsplash.com/photo-1602216056044-5d7b916d5a23?w=400&q=80",
    readTime: "10 min read"
  },
  {
    id: "article6",
    title: "Monsoon Travel Destinations in India",
    category: "Seasonal",
    preview: "Best places to visit during the monsoon season for a unique travel experience in India...",
    image: "https://images.unsplash.com/photo-1519904941063-b0cf448d479e?w=400&q=80",
    readTime: "6 min read"
  }
];

// Explore By Mood Data
const exploreByMood = [
  {
    id: "beaches",
    title: "Beaches",
    description: "Sun, sand, and crystal clear waters",
    destinations: ["Goa", "Kerala", "Andaman", "Bali", "Maldives"],
    image: "https://images.unsplash.com/photo-1507525428034-b723a96ce1bf?w=400&q=80",
    icon: Waves
  },
  {
    id: "mountains",
    title: "Mountains",
    description: "Majestic peaks and adventure trails",
    destinations: ["Manali", "Ladakh", "Switzerland", "Nepal"],
    image: "https://images.unsplash.com/photo-1464822759853-d696d6e7a53a?w=400&q=80",
    icon: Mountain
  },
  {
    id: "desert",
    title: "Desert Adventures",
    description: "Golden dunes and desert safaris",
    destinations: ["Dubai", "Rajasthan", "Egypt", "Morocco"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266fccc393?w=400&q=80",
    icon: Sparkles
  },
  {
    id: "nightlife",
    title: "Nightlife",
    description: "Cities that never sleep",
    destinations: ["Mumbai", "Bangkok", "New York", "London"],
    image: "https://images.unsplash.com/photo-1514528740989-1e5b40c0f5b5?w=400&q=80",
    icon: Music
  },
  {
    id: "heritage",
    title: "Heritage Sites",
    description: "Ancient history and culture",
    destinations: ["Jaipur", "Rome", "Athens", "Cairo"],
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&q=80",
    icon: Building
  },
  {
    id: "nature",
    title: "Nature Escapes",
    description: "Pristine wilderness and wildlife",
    destinations: ["Kerala", "Costa Rica", "Amazon", "Kenya"],
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
    icon: Trees
  }
];

// Personalized Recommendations Data
const personalizedRecommendations = [
  {
    id: "rec1",
    type: "Trending Now",
    title: "Andaman Islands",
    description: "Hottest destination this month",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=80",
    price: "₹55,000",
    badge: "Trending"
  },
  {
    id: "rec2",
    type: "Seasonal Pick",
    title: "Manali Summer Trip",
    description: "Perfect for summer vacations",
    image: "https://images.unsplash.com/photo-1626627849720-6f3e5c6c6c8c?w=400&q=80",
    price: "₹22,000",
    badge: "Summer"
  },
  {
    id: "rec3",
    type: "Nearby",
    title: "Lonavala Weekend",
    description: "Quick escape from Mumbai",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    price: "₹8,000",
    badge: "Nearby"
  },
  {
    id: "rec4",
    type: "Budget Friendly",
    title: "Goa Budget Trip",
    description: "Amazing value for money",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80",
    price: "₹15,000",
    badge: "Best Value"
  }
];

function StatCard({ value, label, color = "var(--primary)", bg = "var(--bg-card)" }) {
  return (
    <div className="bg-card border border-blue-500 rounded-2xl p-4 md:p-5 flex-1 min-w-0 shadow-sm">
      <p className="text-2xl md:text-3xl font-bold leading-none mb-1" style={{ color }}>
        {value}
      </p>
      <p className="text-xs text-(--text-muted) font-medium leading-tight">{label}</p>
    </div>
  );
}

function TravelInspirationCard({ category, onClick }) {
  const Icon = category.icon;
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="relative h-48">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${category.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`} />
        
        {/* Content */}
        <div className="relative z-10 h-full p-6 flex flex-col justify-between text-white">
          <div className="flex items-center gap-3">
            <Icon size={24} className="drop-shadow-lg" />
            <h3 className="text-lg font-bold drop-shadow-md">{category.title}</h3>
          </div>
          <p className="text-sm opacity-90 drop-shadow-sm">{category.description}</p>
        </div>
      </div>
    </div>
  );
}

function FeaturedDestinationCard({ destination, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.03]"
    >
      <div className="relative h-64">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
          <div>
            <h3 className="text-xl font-bold mb-2 drop-shadow-md">{destination.name}</h3>
            <p className="text-sm opacity-90 drop-shadow-sm">{destination.description}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold">{destination.price}</span>
              <span className="opacity-90">{destination.duration}</span>
            </div>
            <div className="text-xs opacity-80">
              Best time: {destination.bestSeason}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card border border-[var(--border)] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                {article.category}
              </span>
              <span className="text-xs opacity-80">{article.readTime}</span>
            </div>
            <h3 className="text-sm font-bold leading-tight drop-shadow-sm">{article.title}</h3>
          </div>
          <div className="text-xs opacity-90 drop-shadow-sm">
            {article.preview}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreMoodCard({ mood, onClick }) {
  const Icon = mood.icon;
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-w-[200px]"
    >
      <div className="relative h-32">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${mood.image})` }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full p-4 flex flex-col justify-between text-white">
          <div className="flex items-center gap-2">
            <Icon size={18} className="drop-shadow-sm" />
            <h4 className="text-sm font-bold drop-shadow-sm">{mood.title}</h4>
          </div>
          <div className="text-xs opacity-90 drop-shadow-sm">
            {mood.destinations.length}+ destinations
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-card border border-[var(--border)] rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-56">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${recommendation.image})` }}
        />
        
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs px-2 py-1 bg-[var(--primary)] text-white rounded-full font-medium">
            {recommendation.badge}
          </span>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        
        {/* Content */}
        <div className="relative z-10 h-full p-5 flex flex-col justify-between text-white">
          <div>
            <div className="text-xs opacity-80 mb-2">{recommendation.type}</div>
            <h3 className="text-lg font-bold mb-2 drop-shadow-md">{recommendation.title}</h3>
            <p className="text-sm opacity-90 drop-shadow-sm">{recommendation.description}</p>
          </div>
          <div className="text-lg font-bold drop-shadow-md">
            {recommendation.price}
          </div>
        </div>
      </div>
    </div>
  );
}

function DestinationDetailModal({ destination, isOpen, onClose }) {
  if (!destination) return null;

  const sampleDetails = {
    duration: "5-7 days",
    budget: destination.price || "₹45,000",
    weather: "25°C - 32°C",
    bestSeason: "October to March",
    activities: ["Sightseeing", "Adventure Sports", "Cultural Tours", "Beach Activities", "Local Cuisine"],
    highlights: ["Stunning beaches", "Rich cultural heritage", "Adventure activities", "Local markets", "Scenic landscapes"],
    images: [
      destination.image,
      `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=600&q=80`,
      `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=600&q=80`,
      `https://images.unsplash.com/photo-${Math.random().toString(36).substring(7)}?w=600&q=80`
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-bold text-(--text-primary)">{destination.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--bg-input)] rounded-lg transition-colors"
          >
            <X size={20} className="text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Images */}
            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {sampleDetails.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative h-32 rounded-xl overflow-hidden">
                    <img
                      src={image}
                      alt={`${destination.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4">
              {/* Overview */}
              <div className="bg-[var(--bg-input)] border border-[var(--border)] rounded-xl p-4">
                <h3 className="text-sm font-bold text-(--text-primary) mb-3">Trip Overview</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Duration:</span>
                    <span className="text-sm font-medium text-(--text-primary)">{sampleDetails.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Budget:</span>
                    <span className="text-sm font-bold text-(--primary)">{sampleDetails.budget}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Weather:</span>
                    <span className="text-sm font-medium text-(--text-primary)">{sampleDetails.weather}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Best Time:</span>
                    <span className="text-sm font-medium text-(--text-primary)">{sampleDetails.bestSeason}</span>
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="bg-[var(--bg-input)] border border-[var(--border)] rounded-xl p-4">
                <h3 className="text-sm font-bold text-(--text-primary) mb-3">Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {sampleDetails.highlights.map((highlight, index) => (
                    <span key={index} className="text-xs px-2 py-1 bg-[var(--primary)]/10 text-(--primary) rounded-lg font-medium">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="bg-[var(--bg-input)] border border-[var(--border)] rounded-xl p-4">
                <h3 className="text-sm font-bold text-(--text-primary) mb-3">Popular Activities</h3>
                <div className="space-y-2">
                  {sampleDetails.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full" />
                      <span className="text-sm text-[var(--text-secondary)]">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[var(--border)] bg-[var(--bg-input)]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[var(--text-secondary)] hover:text-(--text-primary) transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Handle booking/plan trip
              console.log(`Planning trip to ${destination.name}`);
            }}
            className="px-6 py-2 bg-[var(--primary)] text-white rounded-xl font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            Plan Your Trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips, loading } = useTrips();
  const navigate = useNavigate();
  const { formatCurrency, currency } = useTheme();

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const recentTrips = trips.slice(0, 5);
  const popularDomestic = mockIndianCities.slice(0, 6);
  const popularInternational = mockCities.slice(0, 6);

  const costLabel = ["", "₹", "₹₹", "₹₹₹"];

  const totalCities = trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0);
  const totalDays = trips.reduce((acc, t) => {
    const diff = (new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24);
    return acc + (isNaN(diff) ? 0 : Math.round(diff));
  }, 0);

  // Modal state for destination preview
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Travel statistics
  const travelStats = {
    tripsCompleted: trips.filter(t => t.status === "Past").length,
    countriesVisited: new Set(trips.flatMap(t => t.stops?.map(s => s.country) || [])).size,
    citiesExplored: totalCities,
    upcomingTrips: trips.filter(t => t.status === "Upcoming").length,
    budgetSpent: trips.reduce((acc, t) => {
      const budget = t.budget || 45000;
      return acc + (t.status === "Past" ? budget : 0);
    }, 0),
    favoriteDestinationType: "Beach Destinations"
  };

  // Analytics data for charts
  const tripTypeData = [
    { name: "Adventure", value: 35, color: "#10B981" },
    { name: "Beach", value: 25, color: "#3B82F6" },
    { name: "Cultural", value: 20, color: "#F59E0B" },
    { name: "Luxury", value: 15, color: "#8B5CF6" },
    { name: "Business", value: 5, color: "#EF4444" }
  ];

  const monthlySpendingData = [
    { month: "Jan", amount: 45000 },
    { month: "Feb", amount: 32000 },
    { month: "Mar", amount: 58000 },
    { month: "Apr", amount: 41000 },
    { month: "May", amount: 67000 },
    { month: "Jun", amount: 52000 }
  ];

  const destinationData = [
    { destination: "Goa", trips: 8, budget: 200000 },
    { destination: "Kerala", trips: 6, budget: 180000 },
    { destination: "Rajasthan", trips: 5, budget: 175000 },
    { destination: "Himachal", trips: 4, budget: 160000 },
    { destination: "Dubai", trips: 3, budget: 360000 }
  ];

  // Simple Pie Chart Component
  const PieChart = ({ data, size = 200 }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-(--text-primary)">0</div>
            <div className="text-xs text-(--text-muted)">No Data</div>
          </div>
        </div>
      );
    }
    
    const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
    let currentAngle = 0;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 200 200">
          {data.map((segment, index) => {
            const percentage = (segment.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle = endAngle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-(--text-primary)">{total}</div>
            <div className="text-xs text-(--text-muted)">Total Trips</div>
          </div>
        </div>
      </div>
    );
  };

  // Simple Bar Chart Component
  const BarChart = ({ data, height = 200 }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <div className="w-full flex items-center justify-center" style={{ height }}>
          <div className="text-center">
            <div className="text-lg font-bold text-(--text-primary)">No Data</div>
            <div className="text-xs text-(--text-muted)">No spending data available</div>
          </div>
        </div>
      );
    }
    
    const maxAmount = Math.max(...data.map(item => item.amount || 0));
    
    return (
      <div className="w-full" style={{ height }}>
        <div className="flex items-end justify-between h-full px-2">
          {data.map((item, index) => {
            const barHeight = (item.amount / maxAmount) * (height - 40);
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="text-xs text-(--text-muted) mb-1">
                  {formatCurrency(item.amount)}
                </div>
                <div
                  className="w-full bg-linear-to-t from-blue-500 to-blue-600 rounded-t"
                  style={{ height: barHeight, maxWidth: '40px' }}
                />
                <div className="text-xs text-(--text-muted) mt-1">
                  {item.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Horizontal Bar Chart for Destinations
  const HorizontalBarChart = ({ data }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="text-lg font-bold text-(--text-primary)">No Data</div>
            <div className="text-xs text-(--text-muted)">No destination data available</div>
          </div>
        </div>
      );
    }
    
    const maxBudget = Math.max(...data.map(item => item.budget || 0));
    
    return (
      <div className="space-y-3">
        {data.map((item, index) => {
          const barWidth = (item.budget / maxBudget) * 100;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="w-20 text-sm text-(--text-primary) font-medium">
                {item.destination}
              </div>
              <div className="flex-1 relative">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: barWidth }}
                  />
                </div>
                <div className="absolute right-2 top-0.5 text-xs text-(--text-primary) font-medium">
                  {item.trips} trips
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const openDestinationModal = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const closeDestinationModal = () => {
    setSelectedDestination(null);
    setIsModalOpen(false);
  };

  return (
    <>
    <PageTransition>
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 md:mb-8">
        <div>
          <p className="text-xs font-bold text-(--primary) uppercase tracking-widest mb-1">Welcome</p>
          <h1 className="text-xl md:text-2xl font-bold text-(--text-primary) leading-tight">
            {greeting}, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-(--text-muted) mt-1 font-medium">Where are you heading next?</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
        <StatCard value={trips.length} label="Trips planned" color="#006CE4" />
        <StatCard value={totalCities} label="Cities explored" color="#00A651" />
        <StatCard value={totalDays} label="Days traveled" color="#FF6B35" />
      </div>

      {/* CTA Banner */}
      <div
        className="relative rounded-2xl p-5 md:p-7 mb-6 md:mb-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #003580 0%, #006CE4 60%, #0080FF 100%)" }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-48 opacity-10 flex items-center justify-center">
          <TrendingUp size={120} className="text-white" />
        </div>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/5 rounded-full" />
        <div className="absolute -bottom-8 right-20 w-32 h-32 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <p className="text-xs text-white/70 uppercase tracking-widest font-semibold mb-1">
            New adventure awaits
          </p>
          <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
            Ready for your next adventure?
          </h2>
          <button
            onClick={() => navigate("/trips/new")}
            className="px-5 py-2.5 bg-white text-[#006CE4] text-sm font-bold rounded-xl hover:bg-[#F0F7FF] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
          >
            Plan a Trip →
          </button>
        </div>
      </div>

      {/* Travel Inspiration Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-bold text-(--text-primary)">Travel Inspiration</h2>
          <button onClick={() => navigate("/inspiration")} className="text-xs text-(--primary) hover:underline font-semibold">
            Explore all →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {travelCategories.map((category) => (
            <TravelInspirationCard 
              key={category.id} 
              category={category} 
              onClick={() => openDestinationModal({
                name: category.title,
                image: category.image,
                price: "₹25,000"
              })} 
            />
          ))}
        </div>
      </section>

      {/* Analytics Charts Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-bold text-(--text-primary) flex items-center gap-2">
            <BarChart3 size={20} className="text-(--primary)" />
            Travel Analytics
          </h2>
          <button className="text-xs text-(--primary) hover:underline font-semibold">
            View Details →
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Trip Types Pie Chart */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold text-(--text-primary) mb-4 flex items-center gap-2">
              <PieChart size={16} className="text-(--primary)" />
              Trip Types
            </h3>
            <div className="flex flex-col items-center">
              <PieChart data={tripTypeData} size={180} />
              <div className="mt-4 space-y-2 w-full">
                {tripTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-(--text-secondary)">{item.name}</span>
                    </div>
                    <span className="text-(--text-primary) font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Monthly Spending Bar Chart */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold text-(--text-primary) mb-4 flex items-center gap-2">
              <TrendingUp size={16} className="text-(--primary)" />
              Monthly Spending
            </h3>
            <div className="h-48">
              <BarChart data={monthlySpendingData} height={192} />
            </div>
            <div className="mt-4 text-center">
              <div className="text-xs text-(--text-muted)">Total this period</div>
              <div className="text-lg font-bold text-(--text-primary)">
                {formatCurrency(monthlySpendingData.reduce((sum, item) => sum + item.amount, 0))}
              </div>
            </div>
          </div>

          {/* Top Destinations */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-6">
            <h3 className="text-sm font-bold text-(--text-primary) mb-4 flex items-center gap-2">
              <MapPin size={16} className="text-(--primary)" />
              Top Destinations
            </h3>
            <div className="space-y-1">
              <HorizontalBarChart data={destinationData} />
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-xs text-(--text-muted)">Most visited</span>
                <span className="text-sm font-bold text-(--primary)">Goa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Trips */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-bold text-(--text-primary)">Your recent trips</h2>
          <button onClick={() => navigate("/trips")} className="text-xs text-(--primary) hover:underline font-semibold">
            View all →
          </button>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-w-[200px] md:min-w-[220px] h-48 bg-white animate-pulse rounded-2xl shrink-0 border border-[#E5E9F2]" />
            ))}
          </div>
        ) : recentTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 md:py-12 bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-3">
              <Plane size={22} className="text-[#006CE4]" />
            </div>
            <p className="text-[#374151] font-semibold text-sm mb-1">No trips yet</p>
            <p className="text-[#6B7280] text-xs mb-4">Start planning your first adventure</p>
            <button
              onClick={() => navigate("/trips/new")}
              className="text-xs px-4 py-2 bg-[#006CE4] text-white rounded-xl font-bold hover:bg-[#0057B8] transition-colors shadow-sm"
            >
              Plan your first trip
            </button>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentTrips.map((trip, i) => (
              <div
                key={trip.id}
                className="min-w-[200px] md:min-w-[220px] shrink-0 cursor-pointer"
                onClick={() => navigate(`/trips/${trip.id}/view`)}
              >
                <TripCard trip={trip} index={i} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Destinations Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">Featured Destinations</h2>
          <button onClick={() => navigate("/destinations")} className="text-sm text-(--primary) hover:underline font-semibold">
            Explore all →
          </button>
        </div>

        {/* Domestic Featured Destinations */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-(--primary)" />
            <h3 className="text-lg font-bold text-(--text-primary)">Domestic Gems</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDestinations.domestic.map((destination) => (
              <FeaturedDestinationCard 
                key={destination.id} 
                destination={destination} 
                onClick={() => openDestinationModal(destination)} 
              />
            ))}
          </div>
        </div>

        {/* International Featured Destinations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Plane size={18} className="text-(--primary)" />
            <h3 className="text-lg font-bold text-(--text-primary)">International Wonders</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredDestinations.international.map((destination) => (
              <FeaturedDestinationCard 
                key={destination.id} 
                destination={destination} 
                onClick={() => openDestinationModal(destination)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Guides / Articles Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">Travel Guides & Articles</h2>
          <button onClick={() => navigate("/articles")} className="text-sm text-(--primary) hover:underline font-semibold">
            Read all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelArticles.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onClick={() => openDestinationModal({
                name: article.title,
                image: article.image,
                price: "₹15,000"
              })} 
            />
          ))}
        </div>
      </section>

      {/* Explore By Mood / Experience Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">Explore by Experience</h2>
          <button onClick={() => navigate("/experiences")} className="text-sm text-(--primary) hover:underline font-semibold">
            Discover more →
          </button>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {exploreByMood.map((mood) => (
              <ExploreMoodCard 
                key={mood.id} 
                mood={mood} 
                onClick={() => openDestinationModal({
                  name: mood.title,
                  image: mood.image,
                  price: "₹35,000"
                })} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">Recommended For You</h2>
          <button onClick={() => navigate("/recommendations")} className="text-sm text-(--primary) hover:underline font-semibold">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalizedRecommendations.map((recommendation) => (
            <RecommendationCard 
              key={recommendation.id} 
              recommendation={recommendation} 
              onClick={() => openDestinationModal({
                name: recommendation.title,
                image: recommendation.image,
                price: recommendation.price
              })} 
            />
          ))}
        </div>
      </section>

      {/* Travel Statistics & Insights Section */}
      <section className="mb-6 md:mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">Travel Insights</h2>
          <button onClick={() => navigate("/insights")} className="text-sm text-(--primary) hover:underline font-semibold">
            View details →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--success)]/10 rounded-xl flex items-center justify-center">
                <Plane size={20} className="text-[var(--success)]" />
              </div>
              <h3 className="text-sm font-bold text-(--text-primary)">Trips Completed</h3>
            </div>
            <p className="text-2xl font-bold text-[var(--success)]">{travelStats.tripsCompleted}</p>
            <p className="text-xs text-(--text-muted) mt-1">Amazing adventures so far</p>
          </div>
          
          <div className="bg-card border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
                <Globe size={20} className="text-(--primary)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-primary)">Countries Visited</h3>
            </div>
            <p className="text-2xl font-bold text-(--primary)">{travelStats.countriesVisited}</p>
            <p className="text-xs text-(--text-muted) mt-1">Explore more cultures</p>
          </div>
          
          <div className="bg-card border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-xl flex items-center justify-center">
                <MapPin size={20} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-sm font-bold text-(--text-primary)">Cities Explored</h3>
            </div>
            <p className="text-2xl font-bold text-[var(--accent)]">{travelStats.citiesExplored}</p>
            <p className="text-xs text-(--text-muted) mt-1">Discover new places</p>
          </div>
          
          <div className="bg-card border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--warning)]/10 rounded-xl flex items-center justify-center">
                <Calendar size={20} className="text-[var(--warning)]" />
              </div>
              <h3 className="text-sm font-bold text-(--text-primary)">Upcoming Trips</h3>
            </div>
            <p className="text-2xl font-bold text-[var(--warning)]">{travelStats.upcomingTrips}</p>
            <p className="text-xs text-(--text-muted) mt-1">Get ready for adventure</p>
          </div>
          
          <div className="bg-card border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--success)]/10 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-[var(--success)]" />
              </div>
              <h3 className="text-sm font-bold text-(--text-primary)">Budget Spent</h3>
            </div>
            <p className="text-2xl font-bold text-[var(--success)]">{formatCurrency(travelStats.budgetSpent)}</p>
            <p className="text-xs text-(--text-muted) mt-1">Invest in experiences</p>
          </div>
          
          <div className="bg-card border border-[var(--border)] rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center">
                <Heart size={20} className="text-(--primary)" />
              </div>
              <h3 className="text-sm font-bold text-(--text-primary)">Favorite Type</h3>
            </div>
            <p className="text-lg font-bold text-(--primary)">{travelStats.favoriteDestinationType}</p>
            <p className="text-xs text-(--text-muted) mt-1">Your travel preference</p>
          </div>
        </div>
      </section>
    </div>

    {/* Destination Detail Modal */}
    <DestinationDetailModal 
      destination={selectedDestination}
      isOpen={isModalOpen}
      onClose={closeDestinationModal}
    />
    </PageTransition>
    </>
  );
}
