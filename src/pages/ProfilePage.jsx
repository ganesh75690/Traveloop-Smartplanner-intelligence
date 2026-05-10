import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, AlertTriangle, User, MapPin, Phone, Globe, Calendar, Award, Heart, Clock, Settings, Shield, Edit2, Trash2, Plus, TrendingUp, Star, Mountain, Plane, Sun } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useTrips from "../hooks/useTrips";
import { mockCities, mockIndianCities } from "../data/mockData";
import { useTheme } from "../context/ThemeContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import PageTransition from "../components/ui/PageTransition";

// TODO: replace with authAPI.me() and authAPI.update()

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "ja", label: "Japanese" },
];

// Travel achievements data
const ACHIEVEMENTS = [
  { id: "mountain", name: "Mountain Explorer", icon: Mountain, color: "bg-green-100 text-green-700", description: "Visited 5+ mountain destinations" },
  { id: "beach", name: "Beach Lover", icon: Sun, color: "bg-blue-100 text-blue-700", description: "Explored 10+ beach destinations" },
  { id: "weekend", name: "Weekend Traveler", icon: Clock, color: "bg-purple-100 text-purple-700", description: "Completed 15+ weekend trips" },
  { id: "international", name: "International Explorer", icon: Globe, color: "bg-orange-100 text-orange-700", description: "Visited 10+ countries" },
];

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { trips } = useTrips();
  const { formatCurrency, currency } = useTheme();
  const navigate = useNavigate();
  const avatarRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "Mumbai, India",
    bio: user?.bio || "Travel enthusiast exploring India & the world.",
    language: user?.language || "en",
  });
  
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [savedCities, setSavedCities] = useState(
    mockCities.filter((c) => user?.savedDestinations?.includes(c.id))
  );
  const [deleteModal, setDeleteModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate travel statistics
  const stats = {
    tripsPlanned: trips.length,
    citiesVisited: trips.reduce((acc, t) => acc + (t.stops?.length || 0), 0),
    countriesVisited: new Set(trips.flatMap(t => t.stops?.map(s => s.country) || [])).size,
    totalDays: trips.reduce((acc, t) => {
      const diff = (new Date(t.endDate) - new Date(t.startDate)) / (1000 * 60 * 60 * 24);
      return acc + (isNaN(diff) ? 0 : Math.round(diff));
    }, 0),
    upcomingTrips: trips.filter(t => t.status === "Upcoming").length,
    completedTrips: trips.filter(t => t.status === "Past").length,
  };

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const removeCity = (id) => setSavedCities((prev) => prev.filter((c) => c.id !== id));
  const handleDeleteAccount = () => {
    logout();
    navigate("/auth");
  };

  // Favorite destinations
  const domesticFavorites = mockIndianCities.slice(0, 4);
  const internationalFavorites = mockCities.slice(0, 4);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary) mb-8">Profile</h1>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* User Information Section */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-bold text-(--text-primary)">User Information</h2>
            <Button size="sm" variant="outline">
              <Edit2 size={14} className="mr-1" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div
                  className="w-24 h-24 rounded-full bg-(--bg-input) flex items-center justify-center text-3xl font-bold text-(--primary) overflow-hidden cursor-pointer border-4 border-(--border) hover:border-(--primary) transition-colors"
                  onClick={() => avatarRef.current?.click()}
                  style={avatarPreview ? { backgroundImage: `url(${avatarPreview})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                >
                  {!avatarPreview && (user?.name?.[0]?.toUpperCase() || <User size={32} />)}
                </div>
                <button
                  type="button"
                  onClick={() => avatarRef.current?.click()}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-(--primary) rounded-full flex items-center justify-center shadow-md hover:bg-(--primary-hover) transition-colors"
                >
                  <Camera size={14} className="text-white" />
                </button>
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-(--text-primary)">{form.name}</h3>
                <p className="text-sm text-(--text-muted)">{form.email}</p>
                <p className="text-sm text-(--text-muted) flex items-center gap-1 mt-1">
                  <MapPin size={12} />
                  {form.location}
                </p>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Phone Number" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                <Input label="Location" value={form.location} onChange={set("location")} placeholder="City, Country" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your travel interests..."
                  value={form.bio}
                  onChange={set("bio")}
                  className="w-full bg-(--bg-input) border border-(--border) rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-light) outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/15 hover:border-(--border-focus) transition-all resize-none font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Travel Statistics Dashboard */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-(--text-primary) mb-6">Travel Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-(--bg-input) border border-(--border) rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-(--primary)">{stats.tripsPlanned}</p>
              <p className="text-xs text-(--text-muted) mt-1">Trips Planned</p>
            </div>
            <div className="bg-(--bg-input) border border-(--border) rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-(--success)">{stats.citiesVisited}</p>
              <p className="text-xs text-(--text-muted) mt-1">Cities Visited</p>
            </div>
            <div className="bg-(--bg-input) border border-(--border) rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-(--accent)">{stats.countriesVisited}</p>
              <p className="text-xs text-(--text-muted) mt-1">Countries Explored</p>
            </div>
            <div className="bg-(--bg-input) border border-(--border) rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-(--warning)">{stats.totalDays}</p>
              <p className="text-xs text-(--text-muted) mt-1">Total Travel Days</p>
            </div>
            <div className="bg-(--bg-input) border border-(--border) rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-(--success)">{stats.upcomingTrips}</p>
              <p className="text-xs text-(--text-muted) mt-1">Upcoming Trips</p>
            </div>
            <div className="bg-(--bg-input) border border-(--border) rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-(--primary)">{stats.completedTrips}</p>
              <p className="text-xs text-(--text-muted) mt-1">Completed Trips</p>
            </div>
          </div>
        </div>

        {/* Domestic & International Preferences */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-(--text-primary) mb-4 flex items-center gap-2">
              <Globe size={18} className="text-(--primary)" />
              Domestic Favorites
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {domesticFavorites.map((city) => (
                <div key={city.id} className="flex items-center gap-2 px-3 py-2 bg-(--bg-input) border border-(--border) rounded-xl text-sm">
                  <span>{city.flag}</span>
                  <span className="text-(--text-secondary)">{city.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-(--text-primary) mb-4 flex items-center gap-2">
              <Plane size={18} className="text-(--primary)" />
              International Favorites
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {internationalFavorites.map((city) => (
                <div key={city.id} className="flex items-center gap-2 px-3 py-2 bg-(--bg-input) border border-(--border) rounded-xl text-sm">
                  <span>{city.flag}</span>
                  <span className="text-(--text-secondary)">{city.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Trips / Wishlist */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-(--text-primary) flex items-center gap-2">
              <Heart size={18} className="text-red-500" />
              Saved Trips & Wishlist
            </h2>
            <Button size="sm" variant="outline">
              <Plus size={14} className="mr-1" />
              Add Trip
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Goa Beach Vacation", type: "Domestic", icon: "🏖️", status: "planned" },
              { name: "Bali Adventure", type: "International", icon: "🏝️", status: "wishlist" },
              { name: "Ladakh Bike Trip", type: "Domestic", icon: "🏔️", status: "planned" },
              { name: "Paris Getaway", type: "International", icon: "🗼️", status: "wishlist" },
              { name: "Kerala Backwaters", type: "Domestic", icon: "🌴", status: "completed" },
              { name: "Dubai Luxury", type: "International", icon: "🏙️", status: "planned" },
            ].map((trip, index) => (
              <div key={index} className="bg-(--bg-input) border border-(--border) rounded-xl p-4 hover:border-(--primary)/30 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{trip.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-(--text-primary)">{trip.name}</p>
                      <p className="text-xs text-(--text-muted)">{trip.type}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    trip.status === 'completed' ? 'bg-green-100 text-green-700' :
                    trip.status === 'planned' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {trip.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-(--text-primary) mb-4 flex items-center gap-2">
            <Clock size={18} className="text-(--primary)" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              { action: "Searched destinations in Bali", time: "2 hours ago", icon: "🔍" },
              { action: "Planned Goa Beach Vacation", time: "1 day ago", icon: "📅" },
              { action: "Viewed Paris activities", time: "2 days ago", icon: "👁️" },
              { action: "Updated Ladakh trip details", time: "3 days ago", icon: "✏️" },
              { action: "Booking confirmed for Kerala", time: "1 week ago", icon: "✅" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-(--bg-input) border border-(--border) rounded-xl">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-(--text-secondary)">{activity.action}</p>
                  <p className="text-xs text-(--text-muted)">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Achievements / Badges */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
            <Award size={18} className="text-yellow-500" />
            Travel Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((achievement) => (
              <div key={achievement.id} className={`${achievement.color} border border-transparent rounded-xl p-4 text-center`}>
                <achievement.icon size={24} className="mx-auto mb-2" />
                <p className="text-sm font-bold mb-1">{achievement.name}</p>
                <p className="text-xs opacity-75">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency & Safety Info */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
            <Shield size={18} className="text-red-500" />
            Emergency & Safety Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-(--text-primary) mb-3">Emergency Contact</h3>
              <div className="space-y-3">
                <Input label="Contact Name" placeholder="Emergency contact name" />
                <Input label="Phone Number" placeholder="+91 98765 43210" />
                <Input label="Relationship" placeholder="Parent, Spouse, Friend" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-(--text-primary) mb-3">Medical Information</h3>
              <div className="space-y-3">
                <Input label="Blood Group" placeholder="A+, B-, O+" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider">Medical Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Allergies, medications, conditions..."
                    value={form.bio}
                    onChange={set("bio")}
                    className="w-full bg-(--bg-input) border border-(--border) rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder:text-(--text-light) outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/15 hover:border-(--border-focus) transition-all resize-none font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-card border border-(--border) rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold text-(--text-primary) mb-6 flex items-center gap-2">
            <Settings size={18} className="text-(--primary)" />
            Account Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-(--text-primary) mb-3">Preferences</h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-(--text-secondary) uppercase tracking-wider">Language</label>
                  <select
                    value={form.language}
                    onChange={set("language")}
                    className="w-full bg-(--bg-input) border border-(--border) rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/15 transition-all cursor-pointer font-medium"
                  >
                    {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-(--text-secondary)">Currency</span>
                  <span className="text-sm text-(--text-primary) font-medium">{currency}</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-(--text-primary) mb-3">Security</h3>
              <div className="space-y-3">
                <Button variant="outline" fullWidth>
                  Change Password
                </Button>
                <Button variant="outline" fullWidth>
                  Two-Factor Authentication
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="submit" onClick={handleSave}>
            {saved ? "Saved ✓" : "Save Changes"}
          </Button>
          <Button variant="danger" onClick={() => setDeleteModal(true)}>
            <Trash2 size={14} className="mr-1" />
            Delete Account
          </Button>
        </div>
      </div>

      <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} title="Delete Account">
        <p className="text-sm text-(--text-secondary) mb-6 font-medium">
          Are you sure you want to delete your account? All your trips, itineraries, and data will be permanently removed.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={() => setDeleteModal(false)} fullWidth>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteAccount} fullWidth>Yes, Delete</Button>
        </div>
      </Modal>
      </div>
    </PageTransition>
  );
}
