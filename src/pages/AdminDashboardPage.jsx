import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Map, Activity, Globe, TrendingUp, Settings, Database, 
  Shield, DollarSign, Calendar, Eye, Edit, Trash2, Search,
  Filter, Download, Upload, BarChart3, PieChart, AlertTriangle,
  CheckCircle, Clock, ArrowUpRight, ArrowDownRight, MoreVertical, Brain
} from "lucide-react";
import { mockTrips, mockCities, mockActivities, mockUser } from "../data/mockData";
import PageTransition from "../components/ui/PageTransition";

function StatCard({ icon: Icon, label, value, change, changeType, color = "text-[#006CE4]", bg = "bg-[#E8F1FD]" }) {
  return (
    <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow card-hover animate-fadeInUp">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">{label}</p>
        <div className={`p-2 ${bg} rounded-xl`}>
          <Icon size={16} className={color} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {change && (
          <div className={`flex items-center gap-1 text-xs font-medium ${
            changeType === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

const statusStyle = {
  Upcoming: "bg-[#E8F1FD] text-[#006CE4]",
  Ongoing:  "bg-[#E6F7EE] text-[#00A651]",
  Past:     "bg-[#F3F4F6] text-[#6B7280]",
};

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const menuItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "trips", label: "Trips", icon: Map },
    { id: "cities", label: "Cities", icon: Globe },
    { id: "activities", label: "Activities", icon: Activity },
    { id: "analytics", label: "Analytics", icon: PieChart },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "ai-assistant", label: "AI Assistant", icon: Brain },
    { id: "profile", label: "Profile", icon: Users },
  ];

  const handleLogout = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    // Mock logout - redirect to auth page
    navigate("/auth");
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] flex">
      {/* Admin Sidebar */}
      <div className="w-64 bg-white border-r border-[#E5E9F2] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#E5E9F2]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#006CE4] rounded-xl flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#1A1A2E]">Traveloop</h1>
              <p className="text-xs text-[#6B7280]">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Admin User Info */}
        <div className="px-4 pb-4 border-b border-[#E5E9F2]">
          <div className="bg-[#F8FAFF] rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#006CE4] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#1A1A2E] truncate">Admin User</p>
                <p className="text-xs text-[#6B7280] truncate">admin@traveloop.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#6B7280]">
              <span className="flex items-center gap-1">
                <Shield size={10} className="text-[#006CE4]" />
                Administrator
              </span>
              <span className="flex items-center gap-1">
                <Clock size={10} className="text-[#00A651]" />
                2h ago
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "profile") {
                      navigate("/admin/profile");
                    } else if (item.id === "ai-assistant") {
                      navigate("/admin/ai-assistant");
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-[#E8F1FD] text-[#006CE4]"
                      : "text-[#6B7280] hover:bg-[#F8FAFF] hover:text-[#374151]"
                  }`}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#E5E9F2]">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#FEF2F2] text-[#EF4444] rounded-xl text-sm font-medium hover:bg-[#FECACA] transition-colors"
          >
            <Settings size={14} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-[#E5E9F2] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E] capitalize">{activeTab}</h1>
              <p className="text-sm text-[#6B7280]">
                {activeTab === "overview" && "Platform overview and statistics"}
                {activeTab === "users" && "Manage user accounts and permissions"}
                {activeTab === "trips" && "Monitor and manage trip activities"}
                {activeTab === "cities" && "Manage city data and information"}
                {activeTab === "activities" && " oversee activity listings"}
                {activeTab === "analytics" && "Detailed analytics and reports"}
                {activeTab === "settings" && "System configuration and settings"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                <Search size={18} />
              </button>
              <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                <AlertTriangle size={18} />
              </button>
              <span className="px-3 py-1 bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] rounded-full text-xs font-bold">
                ADMIN
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <PageTransition>
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  icon={Users}    
                  label="Total Users"  
                  value="1,284" 
                  change="+12%" 
                  changeType="up"
                  color="text-[#006CE4]" 
                  bg="bg-[#E8F1FD]" 
                />
                <StatCard 
                  icon={Map}      
                  label="Total Trips"  
                  value={mockTrips.length * 256} 
                  change="+8%" 
                  changeType="up"
                  color="text-[#3B82F6]" 
                  bg="bg-[#EFF6FF]" 
                />
                <StatCard 
                  icon={Globe}    
                  label="Cities"       
                  value={mockCities.length} 
                  change="+2%" 
                  changeType="up"
                  color="text-[#00A651]" 
                  bg="bg-[#E6F7EE]" 
                />
                <StatCard 
                  icon={Activity} 
                  label="Activities"   
                  value={mockActivities.length} 
                  change="+15%" 
                  changeType="up"
                  color="text-[#8B5CF6]" 
                  bg="bg-[#F5F3FF]" 
                />
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                  icon={DollarSign}    
                  label="Revenue"  
                  value="$45.2K" 
                  change="+23%" 
                  changeType="up"
                  color="text-[#00A651]" 
                  bg="bg-[#E6F7EE]" 
                />
                <StatCard 
                  icon={Calendar}      
                  label="Bookings Today"  
                  value="89" 
                  change="+5%" 
                  changeType="up"
                  color="text-[#F59E0B]" 
                  bg="bg-[#FEF3C7]" 
                />
                <StatCard 
                  icon={Shield}    
                  label="Security Score"       
                  value="98%" 
                  change="+2%" 
                  changeType="up"
                  color="text-[#10B981]" 
                  bg="bg-[#D1FAE5]" 
                />
                <StatCard 
                  icon={Database} 
                  label="Storage Used"   
                  value="2.4GB" 
                  change="-3%" 
                  changeType="down"
                  color="text-[#EF4444]" 
                  bg="bg-[#FEE2E2]" 
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Chart */}
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A2E]">Growth Overview</h3>
                    <select className="text-xs px-3 py-1 border border-[#E5E9F2] rounded-lg bg-white text-[#6B7280]">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                    </select>
                  </div>
                  <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                      <p className="text-sm text-[#6B7280]">User and trip growth trends</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">Interactive chart coming soon</p>
                    </div>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A2E]">Revenue Analytics</h3>
                    <span className="text-xs px-2 py-1 bg-[#E6F7EE] text-[#00A651] rounded-full font-medium">
                      +23% this month
                    </span>
                  </div>
                  <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <PieChart size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                      <p className="text-sm text-[#6B7280]">Revenue distribution</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">Premium vs Free users</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & System Health */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Enhanced Recent Trips */}
                <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                    <h2 className="text-base font-bold text-[#1A1A2E]">Recent Trips</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-[#E8F1FD] text-[#006CE4] rounded-full font-medium">
                        Last 24 hours
                      </span>
                      <TrendingUp size={16} className="text-[#9CA3AF]" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                    {[
                      { name: "European Adventure", user: "Sarah Johnson", status: "Active", budget: "$5,200", time: "2 hours ago", progress: 75 },
                      { name: "Weekend Gateway", user: "Mike Chen", status: "Planning", budget: "$1,800", time: "4 hours ago", progress: 45 },
                      { name: "Business Trip NYC", user: "Emma Wilson", status: "Active", budget: "$3,500", time: "6 hours ago", progress: 90 },
                      { name: "Family Vacation", user: "David Brown", status: "Completed", budget: "$4,200", time: "8 hours ago", progress: 100 },
                      { name: "Solo Backpacking", user: "Lisa Anderson", status: "Planning", budget: "$2,800", time: "12 hours ago", progress: 30 },
                      { name: "Honeymoon Special", user: "James Taylor", status: "Active", budget: "$6,500", time: "1 day ago", progress: 60 }
                    ].map((trip, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFF] rounded-xl hover:bg-[#E8F1FD] transition-colors cursor-pointer">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-semibold text-[#1A1A2E]">{trip.name}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                              trip.status === "Active" ? "bg-[#E6F7EE] text-[#00A651]" :
                              trip.status === "Planning" ? "bg-[#E8F1FD] text-[#006CE4]" :
                              "bg-[#F3F4F6] text-[#6B7280]"
                            }`}>
                              {trip.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-[#6B7280]">
                            <span>{trip.user}</span>
                            <span>{trip.time}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-[#6B7280]">Progress</span>
                              <span className="font-medium text-[#1A1A2E]">{trip.progress}%</span>
                            </div>
                            <div className="w-full bg-[#E5E9F2] rounded-full h-1.5">
                              <div 
                                className="bg-[#006CE4] h-1.5 rounded-full transition-all duration-300"
                                style={{ width: `${trip.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-sm font-semibold text-[#1A1A2E]">{trip.budget}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enhanced System Health */}
                <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                    <h2 className="text-base font-bold text-[#1A1A2E]">System Health</h2>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">All Systems Operational</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-4">
                    {/* Performance Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe size={14} className="text-[#006CE4]" />
                          <span className="text-sm text-[#6B7280]">API Response Time</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-green-600">45ms</span>
                          <span className="text-xs text-green-600">↓ 5ms</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Database size={14} className="text-[#8B5CF6]" />
                          <span className="text-sm text-[#6B7280]">Database Status</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-green-600">Healthy</span>
                          <span className="text-xs text-[#6B7280]">99.9% uptime</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Shield size={14} className="text-[#00A651]" />
                          <span className="text-sm text-[#6B7280]">Server Uptime</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-green-600">99.9%</span>
                          <span className="text-xs text-green-600">↑ 0.1%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-[#F59E0B]" />
                          <span className="text-sm text-[#6B7280]">Active Sessions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#006CE4]">342</span>
                          <span className="text-xs text-[#006CE4]">↑ 12%</span>
                        </div>
                      </div>
                    </div>

                    {/* Resource Usage */}
                    <div className="border-t border-[#E5E9F2] pt-4">
                      <h4 className="text-sm font-semibold text-[#1A1A2E] mb-3">Resource Usage</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[#6B7280]">CPU Usage</span>
                            <span className="font-medium text-[#1A1A2E]">32%</span>
                          </div>
                          <div className="w-full bg-[#E5E9F2] rounded-full h-2">
                            <div className="bg-[#006CE4] h-2 rounded-full" style={{ width: "32%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[#6B7280]">Memory Usage</span>
                            <span className="font-medium text-[#1A1A2E]">68%</span>
                          </div>
                          <div className="w-full bg-[#E5E9F2] rounded-full h-2">
                            <div className="bg-[#F59E0B] h-2 rounded-full" style={{ width: "68%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-[#6B7280]">Storage Usage</span>
                            <span className="font-medium text-[#1A1A2E]">45%</span>
                          </div>
                          <div className="w-full bg-[#E5E9F2] rounded-full h-2">
                            <div className="bg-[#00A651] h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Alerts */}
                    <div className="border-t border-[#E5E9F2] pt-4">
                      <h4 className="text-sm font-semibold text-[#1A1A2E] mb-3">Recent Alerts</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-[#E6F7EE] rounded-lg">
                          <CheckCircle size={12} className="text-[#00A651]" />
                          <span className="text-xs text-[#00A651]">Database backup completed</span>
                          <span className="text-xs text-[#6B7280] ml-auto">2h ago</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-[#FEF3C7] rounded-lg">
                          <AlertTriangle size={12} className="text-[#F59E0B]" />
                          <span className="text-xs text-[#F59E0B]">High traffic detected</span>
                          <span className="text-xs text-[#6B7280] ml-auto">4h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Destinations & User Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Destinations */}
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A2E]">Top Destinations</h3>
                    <Globe size={16} className="text-[#9CA3AF]" />
                  </div>
                  <div className="space-y-3">
                    {[
                      { city: "Paris", country: "France", trips: 156, change: "+12%", flag: "🇫🇷" },
                      { city: "Tokyo", country: "Japan", trips: 142, change: "+8%", flag: "🇯🇵" },
                      { city: "New York", country: "USA", trips: 128, change: "+15%", flag: "🇺🇸" },
                      { city: "London", country: "UK", trips: 115, change: "+5%", flag: "🇬🇧" },
                      { city: "Barcelona", country: "Spain", trips: 98, change: "+18%", flag: "🇪🇸" }
                    ].map((destination, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFF] rounded-xl hover:bg-[#E8F1FD] transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{destination.flag}</span>
                          <div>
                            <p className="text-sm font-semibold text-[#1A1A2E]">{destination.city}</p>
                            <p className="text-xs text-[#6B7280]">{destination.country}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-[#1A1A2E]">{destination.trips}</p>
                          <p className="text-xs text-green-600">{destination.change}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Activity Summary */}
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#1A1A2E]">User Activity Summary</h3>
                    <Activity size={16} className="text-[#9CA3AF]" />
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-[#E8F1FD] rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Users size={16} className="text-[#006CE4]" />
                          <span className="text-sm font-semibold text-[#1A1A2E]">New Users</span>
                        </div>
                        <p className="text-2xl font-bold text-[#006CE4]">47</p>
                        <p className="text-xs text-[#6B7280]">This week</p>
                      </div>
                      <div className="p-4 bg-[#E6F7EE] rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Map size={16} className="text-[#00A651]" />
                          <span className="text-sm font-semibold text-[#1A1A2E]">New Trips</span>
                        </div>
                        <p className="text-2xl font-bold text-[#00A651]">23</p>
                        <p className="text-xs text-[#6B7280]">This week</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-[#F8FAFF] rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-[#6B7280]">Avg. Session Duration</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1A1A2E]">12m 34s</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F8FAFF] rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-[#6B7280]">Page Views</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1A1A2E]">8,432</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[#F8FAFF] rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-[#6B7280]">Conversion Rate</span>
                        </div>
                        <span className="text-sm font-semibold text-[#1A1A2E]">3.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Total Users</p>
                    <div className="p-2 bg-[#E8F1FD] rounded-xl">
                      <Users size={16} className="text-[#006CE4]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#006CE4]">1,284</p>
                  <p className="text-xs text-[#6B7280] mt-1">Registered users</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Active Today</p>
                    <div className="p-2 bg-[#E6F7EE] rounded-xl">
                      <CheckCircle size={16} className="text-[#00A651]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#00A651]">89</p>
                  <p className="text-xs text-[#6B7280] mt-1">Active users</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">New This Week</p>
                    <div className="p-2 bg-[#EFF6FF] rounded-xl">
                      <TrendingUp size={16} className="text-[#3B82F6]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#3B82F6]">47</p>
                  <p className="text-xs text-[#6B7280] mt-1">New registrations</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Premium Users</p>
                    <div className="p-2 bg-[#F5F3FF] rounded-xl">
                      <Shield size={16} className="text-[#8B5CF6]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#8B5CF6]">156</p>
                  <p className="text-xs text-[#6B7280] mt-1">Premium accounts</p>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <h2 className="text-base font-bold text-[#1A1A2E]">User Management</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <Search size={16} />
                    </button>
                    <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <Filter size={16} />
                    </button>
                    <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E9F2] bg-[#F8FAFF]">
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">User</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Contact</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Role</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Status</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Joined</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Last Active</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Trips</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {[
                        {
                          id: 1,
                          name: "John Doe",
                          email: "john.doe@example.com",
                          phone: "+1 (555) 123-4567",
                          avatar: "JD",
                          role: "User",
                          status: "Active",
                          joined: "2024-01-15",
                          lastActive: "2 hours ago",
                          trips: 5,
                          location: "New York, USA"
                        },
                        {
                          id: 2,
                          name: "Sarah Johnson",
                          email: "sarah.j@example.com",
                          phone: "+1 (555) 234-5678",
                          avatar: "SJ",
                          role: "Premium",
                          status: "Active",
                          joined: "2024-02-20",
                          lastActive: "5 minutes ago",
                          trips: 12,
                          location: "Los Angeles, USA"
                        },
                        {
                          id: 3,
                          name: "Mike Chen",
                          email: "mike.chen@example.com",
                          phone: "+1 (555) 345-6789",
                          avatar: "MC",
                          role: "User",
                          status: "Active",
                          joined: "2024-03-10",
                          lastActive: "1 day ago",
                          trips: 3,
                          location: "San Francisco, USA"
                        },
                        {
                          id: 4,
                          name: "Emma Wilson",
                          email: "emma.w@example.com",
                          phone: "+1 (555) 456-7890",
                          avatar: "EW",
                          role: "Premium",
                          status: "Active",
                          joined: "2024-01-25",
                          lastActive: "3 hours ago",
                          trips: 8,
                          location: "Chicago, USA"
                        },
                        {
                          id: 5,
                          name: "David Brown",
                          email: "david.brown@example.com",
                          phone: "+1 (555) 567-8901",
                          avatar: "DB",
                          role: "User",
                          status: "Inactive",
                          joined: "2023-12-05",
                          lastActive: "2 weeks ago",
                          trips: 2,
                          location: "Houston, USA"
                        },
                        {
                          id: 6,
                          name: "Lisa Anderson",
                          email: "lisa.a@example.com",
                          phone: "+1 (555) 678-9012",
                          avatar: "LA",
                          role: "Premium",
                          status: "Active",
                          joined: "2024-02-15",
                          lastActive: "30 minutes ago",
                          trips: 15,
                          location: "Seattle, USA"
                        },
                        {
                          id: 7,
                          name: "James Taylor",
                          email: "james.t@example.com",
                          phone: "+1 (555) 789-0123",
                          avatar: "JT",
                          role: "User",
                          status: "Suspended",
                          joined: "2023-11-20",
                          lastActive: "1 month ago",
                          trips: 1,
                          location: "Boston, USA"
                        },
                        {
                          id: 8,
                          name: "Maria Garcia",
                          email: "maria.g@example.com",
                          phone: "+1 (555) 890-1234",
                          avatar: "MG",
                          role: "User",
                          status: "Active",
                          joined: "2024-03-01",
                          lastActive: "4 hours ago",
                          trips: 6,
                          location: "Miami, USA"
                        },
                        {
                          id: 9,
                          name: "Robert Martinez",
                          email: "robert.m@example.com",
                          phone: "+1 (555) 901-2345",
                          avatar: "RM",
                          role: "Premium",
                          status: "Active",
                          joined: "2024-01-10",
                          lastActive: "1 hour ago",
                          trips: 10,
                          location: "Denver, USA"
                        },
                        {
                          id: 10,
                          name: "Jennifer Lee",
                          email: "jennifer.lee@example.com",
                          phone: "+1 (555) 012-3456",
                          avatar: "JL",
                          role: "User",
                          status: "Active",
                          joined: "2024-03-15",
                          lastActive: "15 minutes ago",
                          trips: 4,
                          location: "Portland, USA"
                        }
                      ].map((user) => (
                        <tr key={user.id} className="hover:bg-[#F8FAFF] transition-colors">
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                                user.role === "Premium" ? "bg-[#8B5CF6]" : "bg-[#006CE4]"
                              }`}>
                                {user.avatar}
                              </div>
                              <div>
                                <p className="font-semibold text-[#1A1A2E]">{user.name}</p>
                                <p className="text-xs text-[#6B7280]">{user.location}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div>
                              <p className="text-[#374151] font-medium">{user.email}</p>
                              <p className="text-xs text-[#6B7280]">{user.phone}</p>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              user.role === "Premium" 
                                ? "bg-[#F5F3FF] text-[#8B5CF6]" 
                                : "bg-[#E8F1FD] text-[#006CE4]"
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                              user.status === "Active" 
                                ? "bg-[#E6F7EE] text-[#00A651]" 
                                : user.status === "Inactive"
                                ? "bg-[#F3F4F6] text-[#6B7280]"
                                : "bg-[#FEF2F2] text-[#EF4444]"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#6B7280] font-medium">{user.joined}</td>
                          <td className="px-5 py-3 text-[#6B7280] font-medium">{user.lastActive}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1">
                              <Map size={14} className="text-[#006CE4]" />
                              <span className="text-[#374151] font-semibold">{user.trips}</span>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-1">
                              <button className="p-1.5 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors" title="View User">
                                <Eye size={14} />
                              </button>
                              <button className="p-1.5 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors" title="Edit User">
                                <Edit size={14} />
                              </button>
                              <button className="p-1.5 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors" title="Suspend User">
                                <AlertTriangle size={14} />
                              </button>
                              <button className="p-1.5 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors" title="Delete User">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* User Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">User Growth</h3>
                  <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                      <p className="text-sm text-[#6B7280]">User registration trends</p>
                      <p className="text-xs text-[#9CA3AF] mt-1">Chart visualization coming soon</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">User Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#006CE4] rounded-full"></div>
                        <span className="text-sm text-[#374151]">Regular Users</span>
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A2E]">1,128 (87.8%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#8B5CF6] rounded-full"></div>
                        <span className="text-sm text-[#374151]">Premium Users</span>
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A2E]">156 (12.2%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#00A651] rounded-full"></div>
                        <span className="text-sm text-[#374151]">Active Users</span>
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A2E]">89 (6.9%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#EF4444] rounded-full"></div>
                        <span className="text-sm text-[#374151]">Suspended Users</span>
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A2E]">1 (0.1%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "trips" && (
            <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                <h2 className="text-base font-bold text-[#1A1A2E]">Trip Management</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                    <Filter size={16} />
                  </button>
                  <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E9F2] bg-[#F8FAFF]">
                      {["Trip Name", "User", "Cities", "Status", "Budget", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    {mockTrips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-[#F8FAFF] transition-colors">
                        <td className="px-5 py-3 text-[#374151] font-semibold">{trip.name}</td>
                        <td className="px-5 py-3 text-[#6B7280] font-medium">{mockUser.name}</td>
                        <td className="px-5 py-3 text-[#6B7280] font-medium">{trip.stops?.length || 0}</td>
                        <td className="px-5 py-3">
                          <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${statusStyle[trip.status] || statusStyle.Past}`}>
                            {trip.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[#374151] font-semibold">${trip.totalBudget?.toLocaleString()}</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded transition-colors">
                              <Eye size={14} />
                            </button>
                            <button className="p-1 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded transition-colors">
                              <Edit size={14} />
                            </button>
                            <button className="p-1 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "cities" && (
            <div className="bg-white border border-[#E5E9F2] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-[#E5E9F2] bg-[#F8FAFF]">
                <h2 className="text-base font-bold text-[#1A1A2E]">City Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E5E9F2] bg-[#F8FAFF]">
                      {["City", "Country", "Region", "Cost Index", "Popularity", "Actions"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3F4F6]">
                    {mockCities.slice(0, 10).map((city) => (
                      <tr key={city.id} className="hover:bg-[#F8FAFF] transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <span>{city.flag}</span>
                            <span className="text-[#374151] font-semibold">{city.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-[#6B7280] font-medium">{city.country}</td>
                        <td className="px-5 py-3 text-[#6B7280] font-medium">{city.region}</td>
                        <td className="px-5 py-3 text-[#006CE4] font-bold">{"$".repeat(city.costIndex)}</td>
                        <td className="px-5 py-3 text-[#374151] font-semibold">{city.popularity} ⭐</td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded transition-colors">
                              <Edit size={14} />
                            </button>
                            <button className="p-1 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "activities" && (
            <div className="space-y-6">
              {/* Test: Simple rendering check */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">Activity Management</h2>
                <p className="text-sm text-[#6B7280]">This is a test to ensure the activity page renders correctly.</p>
              </div>
              
              {/* Activity Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Today</p>
                    <div className="p-2 bg-[#E8F1FD] rounded-xl">
                      <Activity size={16} className="text-[#006CE4]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#006CE4]">142</p>
                  <p className="text-xs text-[#6B7280] mt-1">Total activities</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Users</p>
                    <div className="p-2 bg-[#E6F7EE] rounded-xl">
                      <Users size={16} className="text-[#00A651]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#00A651]">28</p>
                  <p className="text-xs text-[#6B7280] mt-1">Active today</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Trips</p>
                    <div className="p-2 bg-[#EFF6FF] rounded-xl">
                      <Map size={16} className="text-[#3B82F6]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#3B82F6]">15</p>
                  <p className="text-xs text-[#6B7280] mt-1">Created today</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">System</p>
                    <div className="p-2 bg-[#F5F3FF] rounded-xl">
                      <Database size={16} className="text-[#8B5CF6]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#8B5CF6]">99.9%</p>
                  <p className="text-xs text-[#6B7280] mt-1">Uptime</p>
                </div>
              </div>

              {/* Activity Log */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <h2 className="text-base font-bold text-[#1A1A2E]">System Activity Log</h2>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <Filter size={16} />
                    </button>
                    <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                      <Download size={16} />
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                  {[
                    { 
                      icon: Users, 
                      color: "text-green-500", 
                      bg: "bg-green-50",
                      title: "New User Registration", 
                      description: "john.doe@example.com registered from United States", 
                      user: "John Doe",
                      time: "2 minutes ago",
                      type: "User"
                    },
                    { 
                      icon: Map, 
                      color: "text-blue-500", 
                      bg: "bg-blue-50",
                      title: "Trip Created", 
                      description: "European Adventure trip created with 5 stops", 
                      user: "Sarah Johnson",
                      time: "15 minutes ago",
                      type: "Trip"
                    },
                    { 
                      icon: Activity, 
                      color: "text-purple-500", 
                      bg: "bg-purple-50",
                      title: "Activity Added", 
                      description: "Eiffel Tower Tour added to Paris itinerary", 
                      user: "Mike Chen",
                      time: "1 hour ago",
                      type: "Activity"
                    },
                    { 
                      icon: Shield, 
                      color: "text-red-500", 
                      bg: "bg-red-50",
                      title: "Admin Login", 
                      description: "Admin user logged in from IP 192.168.1.1", 
                      user: "Admin User",
                      time: "2 hours ago",
                      type: "Security"
                    },
                    { 
                      icon: Database, 
                      color: "text-yellow-500", 
                      bg: "bg-yellow-50",
                      title: "Database Backup", 
                      description: "Scheduled backup completed successfully", 
                      user: "System",
                      time: "3 hours ago",
                      type: "System"
                    },
                    { 
                      icon: Globe, 
                      color: "text-indigo-500", 
                      bg: "bg-indigo-50",
                      title: "City Data Updated", 
                      description: "Population data updated for 50 cities", 
                      user: "Data Sync",
                      time: "4 hours ago",
                      type: "Data"
                    },
                    { 
                      icon: Users, 
                      color: "text-green-500", 
                      bg: "bg-green-50",
                      title: "Profile Updated", 
                      description: "User profile information updated", 
                      user: "Emma Wilson",
                      time: "5 hours ago",
                      type: "User"
                    },
                    { 
                      icon: Map, 
                      color: "text-blue-500", 
                      bg: "bg-blue-50",
                      title: "Trip Shared", 
                      description: "Weekend Gateway trip shared with 3 people", 
                      user: "David Brown",
                      time: "6 hours ago",
                      type: "Trip"
                    },
                    { 
                      icon: AlertTriangle, 
                      color: "text-orange-500", 
                      bg: "bg-orange-50",
                      title: "Failed Login Attempt", 
                      description: "Multiple failed login attempts detected", 
                      user: "Security System",
                      time: "8 hours ago",
                      type: "Security"
                    },
                    { 
                      icon: Settings, 
                      color: "text-gray-500", 
                      bg: "bg-gray-50",
                      title: "System Update", 
                      description: "Security patches installed successfully", 
                      user: "System Admin",
                      time: "12 hours ago",
                      type: "System"
                    }
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="p-4 hover:bg-[#F8FAFF] transition-colors">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-xl ${activity.bg} ${activity.color}`}>
                            <Icon size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold text-[#1A1A2E]">{activity.title}</p>
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${activity.bg} ${activity.color}`}>
                                    {activity.type}
                                  </span>
                                </div>
                                <p className="text-sm text-[#6B7280] mb-2">{activity.description}</p>
                                <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
                                  <span className="flex items-center gap-1">
                                    <Users size={12} />
                                    {activity.user}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    {activity.time}
                                  </span>
                                </div>
                              </div>
                              <button className="p-1.5 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                                <MoreVertical size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Activity Chart */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Activity Trends</h3>
                <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-sm text-[#6B7280]">Activity chart visualization</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">Real-time activity monitoring coming soon</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">User Growth</h3>
                <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                  <BarChart3 size={32} className="text-[#9CA3AF]" />
                </div>
              </div>
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Trip Distribution</h3>
                <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                  <PieChart size={32} className="text-[#9CA3AF]" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">System Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#F8FAFF] rounded-xl">
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">General Settings</h4>
                  <p className="text-sm text-[#6B7280]">Configure system-wide settings and preferences</p>
                </div>
                <div className="p-4 bg-[#F8FAFF] rounded-xl">
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">Email Configuration</h4>
                  <p className="text-sm text-[#6B7280]">Manage email templates and SMTP settings</p>
                </div>
                <div className="p-4 bg-[#F8FAFF] rounded-xl">
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">Security Settings</h4>
                  <p className="text-sm text-[#6B7280]">Configure authentication and security policies</p>
                </div>
              </div>
            </div>
          )}
          </PageTransition>
        </main>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#FEF2F2] rounded-full flex items-center justify-center">
                <Settings size={20} className="text-[#EF4444]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1A1A2E]">Confirm Logout</h3>
                <p className="text-sm text-[#6B7280]">Are you sure you want to logout from the admin panel?</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 bg-[#F3F4F6] text-[#6B7280] rounded-xl text-sm font-medium hover:bg-[#E5E7EB] transition-colors"
              >
                No, Stay
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-[#EF4444] text-white rounded-xl text-sm font-medium hover:bg-[#DC2626] transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
