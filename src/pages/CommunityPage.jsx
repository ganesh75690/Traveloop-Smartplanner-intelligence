import React, { useState, useEffect, useRef } from "react";
import { Search, Heart, MessageCircle, Share2, Bookmark, TrendingUp, MapPin, Calendar, Plus, Camera, X, ChevronDown, Users, Star, Globe, Home, Compass, Award, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

// Mock community data
const mockPosts = [
  {
    id: 1,
    user: {
      name: "Priya Sharma",
      avatar: "PS",
      verified: true
    },
    destination: "Goa",
    date: "2024-01-15",
    category: "Beach",
    story: "Amazing weekend getaway to Goa! The beaches were pristine and the local seafood was incredible. Highly recommend visiting Palolem Beach for the stunning sunsets. Don't miss the Saturday night market in Arpora for authentic local crafts and food!",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80",
      "https://images.unsplash.com/photo-1602216056056-7084e525845c?w=600&q=80"
    ],
    tags: ["#beach", "#goa", "#weekend", "#seafood"],
    likes: 234,
    comments: 45,
    shares: 12,
    saved: false,
    trending: true
  },
  {
    id: 2,
    user: {
      name: "Rahul Verma",
      avatar: "RV",
      verified: false
    },
    destination: "Bali",
    date: "2024-01-10",
    category: "Adventure",
    story: "Just returned from an incredible adventure in Bali! Trekking through the rice terraces of Tegallalang was breathtaking. The local culture is so warm and welcoming. Ubud's art markets are a must-visit for unique souvenirs!",
    images: [
      "https://images.unsplash.com/photo-1537953773345-b784a5ba9a2c?w=600&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80"
    ],
    tags: ["#bali", "#adventure", "#culture", "#ricefields"],
    likes: 189,
    comments: 32,
    shares: 8,
    saved: true,
    trending: false
  },
  {
    id: 3,
    user: {
      name: "Anita Patel",
      avatar: "AP",
      verified: true
    },
    destination: "Dubai",
    date: "2024-01-08",
    category: "Luxury",
    story: "Luxury shopping and dining in Dubai exceeded all expectations! The Burj Khalifa at night is absolutely magical. Desert safari with traditional BBQ dinner was the highlight of our trip. Gold Souk is paradise for jewelry lovers!",
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=600&q=80",
      "https://images.unsplash.com/photo-1580837119756-563d608dd119?w=600&q=80"
    ],
    tags: ["#dubai", "#luxury", "#shopping", "#desert"],
    likes: 456,
    comments: 78,
    shares: 34,
    saved: false,
    trending: true
  },
  {
    id: 4,
    user: {
      name: "Karan Singh",
      avatar: "KS",
      verified: false
    },
    destination: "Ladakh",
    date: "2024-01-05",
    category: "Adventure",
    story: "Ladakh's raw beauty is unmatched! Pangong Tso lake looks like something out of a dream. The bike trip through Khardung La pass was challenging but absolutely worth it for those views. Local monasteries offer such peace and spirituality.",
    images: [
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80",
      "https://images.unsplash.com/photo-1602216056056-7084e525845c?w=600&q=80"
    ],
    tags: ["#ladakh", "#mountains", "#adventure", "#biketrip"],
    likes: 523,
    comments: 92,
    shares: 45,
    saved: true,
    trending: true
  }
];

const communityGroups = [
  { id: 1, name: "Solo Travelers", icon: Users, members: "12.5k", posts: 3421, color: "from-blue-500 to-cyan-600" },
  { id: 2, name: "Budget Travelers", icon: Home, members: "8.2k", posts: 2156, color: "from-green-500 to-emerald-600" },
  { id: 3, name: "Adventure Explorers", icon: Compass, members: "15.7k", posts: 4892, color: "from-red-500 to-orange-600" },
  { id: 4, name: "International Trips", icon: Globe, members: "9.8k", posts: 3124, color: "from-purple-500 to-pink-600" },
  { id: 5, name: "Weekend Getaways", icon: Calendar, members: "6.3k", posts: 1876, color: "from-yellow-500 to-amber-600" },
  { id: 6, name: "Backpacking India", icon: MapPin, members: "11.2k", posts: 3987, color: "from-indigo-500 to-purple-600" },
  { id: 7, name: "Luxury Escapes", icon: Award, members: "4.5k", posts: 1234, color: "from-gold-500 to-amber-600" }
];

const trendingDestinations = [
  { id: 1, name: "Goa", image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=400&q=80", trips: "2.3k", growth: "+15%" },
  { id: 2, name: "Bali", image: "https://images.unsplash.com/photo-1537953773345-b784a5ba9a2c?w=400&q=80", trips: "1.8k", growth: "+22%" },
  { id: 3, name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f88897c?w=400&q=80", trips: "3.1k", growth: "+18%" },
  { id: 4, name: "Manali", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&q=80", trips: "1.5k", growth: "+28%" },
  { id: 5, name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e9db6020a91?w=400&q=80", trips: "2.7k", growth: "+12%" },
  { id: 6, name: "Thailand", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", trips: "2.9k", growth: "+20%" }
];

const categories = [
  { id: "adventure", name: "Adventure", icon: Compass },
  { id: "family", name: "Family", icon: Users },
  { id: "luxury", name: "Luxury", icon: Award },
  { id: "budget", name: "Budget", icon: Home },
  { id: "solo", name: "Solo", icon: MapPin },
  { id: "romantic", name: "Romantic", icon: Heart },
  { id: "nature", name: "Nature", icon: Sparkles },
  { id: "food", name: "Food & Culture", icon: Star }
];

const sortOptions = [
  { id: "newest", name: "Newest First" },
  { id: "popular", name: "Most Popular" },
  { id: "trending", name: "Trending" },
  { id: "liked", name: "Most Liked" }
];

export default function CommunityPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({
    destination: "",
    category: "",
    story: "",
    images: [],
    tripTitle: "",
    startDate: "",
    endDate: "",
    duration: "",
    budget: "",
    companions: "",
    tripType: "",
    bestTimeToVisit: "",
    highlights: "",
    tips: ""
  });
  
  const fileInputRef = useRef(null);
  
  const bgClass = darkMode ? "bg-[#1E293B]" : "bg-[#EEF2FF]";
  const cardBg = darkMode ? "bg-[#0F172A]" : "bg-gray-50";
  const textClass = darkMode ? "text-[#F1F5F9]" : "text-gray-900";
  const inputBg = darkMode ? "bg-[#0F172A] border-[#334155]" : "bg-white border-gray-200";
  const inputText = darkMode ? "text-[#F1F5F9]" : "text-gray-900";
  const borderClass = darkMode ? "border-[#334155]" : "border-gray-200";
  const buttonBg = darkMode ? "bg-[#1E40AF] hover:bg-[#1E40AF]/90" : "bg-[#1A56DB] hover:bg-[#1A56DB]/90";

  // Filter and sort posts
  useEffect(() => {
    let filtered = [...posts];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.story.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Apply sorting
    switch (selectedSort) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "popular":
        filtered.sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares));
        break;
      case "trending":
        filtered.sort((a, b) => b.trending - a.trending);
        break;
      case "liked":
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      default:
        break;
    }
    
    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedCategory, selectedSort]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.saved ? post.likes - 1 : post.likes + 1, saved: !post.saved }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.destination && newPost.story && newPost.tripTitle) {
      const post = {
        id: posts.length + 1,
        user: {
          name: "Current User",
          avatar: "CU",
          verified: false
        },
        destination: newPost.destination,
        date: new Date().toISOString().split('T')[0],
        category: newPost.category,
        story: newPost.story,
        tripTitle: newPost.tripTitle,
        startDate: newPost.startDate,
        endDate: newPost.endDate,
        duration: newPost.duration,
        budget: newPost.budget,
        companions: newPost.companions,
        tripType: newPost.tripType,
        bestTimeToVisit: newPost.bestTimeToVisit,
        highlights: newPost.highlights,
        tips: newPost.tips,
        images: newPost.images,
        tags: [`#${newPost.destination.toLowerCase()}`, `#${newPost.category?.toLowerCase()}`],
        likes: 0,
        comments: 0,
        shares: 0,
        saved: false,
        trending: false
      };
      
      setPosts([post, ...posts]);
      setNewPost({ 
        destination: "", 
        category: "", 
        story: "", 
        images: [],
        tripTitle: "",
        startDate: "",
        endDate: "",
        duration: "",
        budget: "",
        companions: "",
        tripType: "",
        bestTimeToVisit: "",
        highlights: "",
        tips: ""
      });
      setShowCreatePost(false);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setNewPost({ ...newPost, images: [...newPost.images, ...imageUrls] });
  };

  const removeImage = (index) => {
    setNewPost({
      ...newPost,
      images: newPost.images.filter((_, i) => i !== index)
    });
  };

  return (
    <div className={`min-h-screen ${bgClass} p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold ${textClass} mb-2`}>Travel Community</h1>
          <p className="text-lg text-(--text-muted)">
            Share your travel experiences and discover amazing destinations from fellow travelers
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-(--text-muted)" size={20} />
            <input
              type="text"
              placeholder="Search destinations, stories, or hashtags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className={`px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Create Post Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowCreatePost(true)}
            className={`w-full md:w-auto px-6 py-3 ${buttonBg} text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors`}
          >
            <Plus size={20} />
            Share Your Travel Story
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Community Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Community Posts */}
            {filteredPosts.map(post => (
              <div key={post.id} className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {post.user.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${textClass}`}>{post.user.name}</span>
                        {post.user.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <Star size={10} className="text-white fill-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-(--text-muted)">
                        <MapPin size={12} />
                        <span>{post.destination}</span>
                        <span>•</span>
                        <Calendar size={12} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {post.trending && (
                    <div className="bg-linear-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <TrendingUp size={10} />
                      Trending
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className={`${textClass} mb-3 leading-relaxed`}>{post.story}</p>
                  
                  {/* Image Gallery */}
                  {post.images.length > 0 && (
                    <div className={`grid grid-cols-${post.images.length === 1 ? '1' : post.images.length === 2 ? '2' : '3'} gap-2 rounded-xl overflow-hidden`}>
                      {post.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`${post.destination} ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="text-sm text-blue-500 hover:text-blue-600 cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Engagement Actions */}
                <div className={`flex items-center justify-between pt-4 border-t ${borderClass}`}>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                        post.saved 
                          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
                          : darkMode 
                            ? 'hover:bg-[#334155] text-[#94A3B8]' 
                            : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Heart size={16} className={post.saved ? 'fill-current' : ''} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </button>
                    
                    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'hover:bg-[#334155] text-[#94A3B8]' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}>
                      <MessageCircle size={16} />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                    
                    <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'hover:bg-[#334155] text-[#94A3B8]' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}>
                      <Share2 size={16} />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleSave(post.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                      post.saved 
                        ? 'bg-blue-50 text-blue-500 hover:bg-blue-100' 
                        : darkMode 
                          ? 'hover:bg-[#334155] text-[#94A3B8]' 
                          : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Bookmark size={16} className={post.saved ? 'fill-current' : ''} />
                    <span className="text-sm font-medium">Save</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Groups */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold ${textClass} mb-4 flex items-center gap-2`}>
                <Users className="text-blue-500" />
                Community Groups
              </h2>
              <div className="space-y-3">
                {communityGroups.slice(0, 4).map(group => (
                  <div key={group.id} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'hover:bg-[#334155]' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}>
                    <div className={`w-10 h-10 bg-linear-to-br ${group.color} rounded-lg flex items-center justify-center`}>
                      <group.icon size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${textClass}`}>{group.name}</p>
                      <p className="text-xs text-(--text-muted)">{group.members} members • {group.posts} posts</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Destinations */}
            <div className={`${cardBg} rounded-2xl p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold ${textClass} mb-4 flex items-center gap-2`}>
                <TrendingUp className="text-orange-500" />
                Trending Destinations
              </h2>
              <div className="space-y-3">
                {trendingDestinations.slice(0, 4).map(dest => (
                  <div key={dest.id} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'hover:bg-[#334155]' : 'hover:bg-gray-100'} transition-colors cursor-pointer`}>
                    <img 
                      src={dest.image} 
                      alt={dest.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${textClass}`}>{dest.name}</p>
                      <div className="flex items-center gap-2 text-xs text-(--text-muted)">
                        <span>{dest.trips} trips</span>
                        <span className="text-green-500">•</span>
                        <span className="text-green-500">{dest.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className={`${cardBg} rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textClass}`}>Share Your Travel Story</h2>
                <button
                  onClick={() => setShowCreatePost(false)}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-[#334155]' : 'hover:bg-gray-100'} transition-colors`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Trip Title */}
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-2`}>Trip Title *</label>
                  <input
                    type="text"
                    placeholder="Give your trip a memorable title..."
                    value={newPost.tripTitle}
                    onChange={(e) => setNewPost({ ...newPost, tripTitle: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Destination *</label>
                    <input
                      type="text"
                      placeholder="e.g., Goa, Bali, Dubai"
                      value={newPost.destination}
                      onChange={(e) => setNewPost({ ...newPost, destination: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Travel Dates */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Start Date</label>
                    <input
                      type="date"
                      value={newPost.startDate}
                      onChange={(e) => setNewPost({ ...newPost, startDate: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>End Date</label>
                    <input
                      type="date"
                      value={newPost.endDate}
                      onChange={(e) => setNewPost({ ...newPost, endDate: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Duration (Days)</label>
                    <input
                      type="number"
                      placeholder="e.g., 5"
                      value={newPost.duration}
                      onChange={(e) => setNewPost({ ...newPost, duration: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                {/* Budget and Companions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Budget Range</label>
                    <select
                      value={newPost.budget}
                      onChange={(e) => setNewPost({ ...newPost, budget: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select budget range</option>
                      <option value="budget">Budget (Under ₹25,000)</option>
                      <option value="moderate">Moderate (₹25,000 - ₹75,000)</option>
                      <option value="luxury">Luxury (Above ₹75,000)</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Travel Companions</label>
                    <select
                      value={newPost.companions}
                      onChange={(e) => setNewPost({ ...newPost, companions: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select travel style</option>
                      <option value="solo">Solo Travel</option>
                      <option value="couple">Couple</option>
                      <option value="family">Family with Kids</option>
                      <option value="friends">Group of Friends</option>
                      <option value="business">Business Trip</option>
                    </select>
                  </div>
                </div>

                {/* Trip Type and Best Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Trip Type</label>
                    <select
                      value={newPost.tripType}
                      onChange={(e) => setNewPost({ ...newPost, tripType: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="">Select trip type</option>
                      <option value="leisure">Leisure & Relaxation</option>
                      <option value="adventure">Adventure & Activities</option>
                      <option value="cultural">Cultural & Historical</option>
                      <option value="nature">Nature & Wildlife</option>
                      <option value="food">Food & Culinary</option>
                      <option value="shopping">Shopping & Entertainment</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Best Time to Visit</label>
                    <input
                      type="text"
                      placeholder="e.g., October to March"
                      value={newPost.bestTimeToVisit}
                      onChange={(e) => setNewPost({ ...newPost, bestTimeToVisit: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                {/* Travel Story */}
                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-2`}>Your Travel Story *</label>
                  <textarea
                    placeholder="Share your amazing travel experience in detail..."
                    value={newPost.story}
                    onChange={(e) => setNewPost({ ...newPost, story: e.target.value })}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>

                {/* Highlights and Tips */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Trip Highlights</label>
                    <textarea
                      placeholder="What were the highlights of your trip?"
                      value={newPost.highlights}
                      onChange={(e) => setNewPost({ ...newPost, highlights: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textClass} mb-2`}>Travel Tips</label>
                    <textarea
                      placeholder="Share tips for fellow travelers..."
                      value={newPost.tips}
                      onChange={(e) => setNewPost({ ...newPost, tips: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-xl ${inputBg} ${inputText} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textClass} mb-2`}>Photos</label>
                  <div className="space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full px-4 py-3 border-2 border-dashed ${borderClass} rounded-xl ${darkMode ? 'hover:border-[#475569]' : 'hover:border-gray-300'} transition-colors flex items-center justify-center gap-2`}
                    >
                      <Camera size={20} />
                      <span>Add Photos</span>
                    </button>
                    
                    {newPost.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {newPost.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={image} 
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreatePost}
                    disabled={!newPost.destination || !newPost.story || !newPost.tripTitle}
                    className={`flex-1 px-6 py-3 ${buttonBg} text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Share Story
                  </button>
                  <button
                    onClick={() => setShowCreatePost(false)}
                    className={`px-6 py-3 ${darkMode ? 'bg-[#334155] text-[#F1F5F9]' : 'bg-gray-200 text-gray-700'} rounded-xl font-semibold transition-colors`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
