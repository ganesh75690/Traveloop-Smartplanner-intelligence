import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, Users, Mail, Shield, Calendar, MapPin, Phone, Globe, 
  Settings, Eye, EyeOff, Edit2, Save, X, Camera,
  Lock, Bell, Palette, Database, HelpCircle, LogOut,
  CheckCircle, AlertCircle, Clock, Activity
} from "lucide-react";

export default function AdminProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    system: true
  });

  const [profile, setProfile] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@traveloop.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    department: "System Administration",
    location: "San Francisco, CA",
    joinDate: "2024-01-15",
    lastActive: "2024-12-10 14:30",
    bio: "System administrator responsible for managing the Traveloop platform, ensuring optimal performance, and maintaining security standards.",
    avatar: null
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "activity", label: "Activity", icon: Activity },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Mock save - in real app would save to backend
    console.log("Profile saved:", profile);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    // Mock password change
    alert("Password changed successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handleLogout = () => {
    navigate("/auth");
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

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => navigate("/admin")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#F8FAFF] hover:text-[#374151] transition-all duration-200"
            >
              <Settings size={16} />
              Dashboard
            </button>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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

        {/* User Info & Logout */}
        <div className="p-4 border-t border-[#E5E9F2]">
          <div className="bg-[#F8FAFF] rounded-xl p-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#006CE4] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1A1A2E] truncate">Admin User</p>
                <p className="text-xs text-[#6B7280]">admin@traveloop.com</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#FEF2F2] text-[#EF4444] rounded-xl text-sm font-medium hover:bg-[#FECACA] transition-colors"
          >
            <LogOut size={14} />
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
              <h1 className="text-2xl font-bold text-[#1A1A2E]">Admin Profile</h1>
              <p className="text-sm text-[#6B7280]">Manage your admin account settings and preferences</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                <HelpCircle size={18} />
              </button>
              <span className="px-3 py-1 bg-[#FEF2F2] text-[#EF4444] border border-[#FECACA] rounded-full text-xs font-bold">
                ADMIN
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {activeTab === "profile" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                {/* Profile Header */}
                <div className="p-6 border-b border-[#E5E9F2]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-20 h-20 bg-[#006CE4] rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">A</span>
                        </div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-[#006CE4] text-white rounded-full hover:bg-[#0057B8] transition-colors">
                          <Camera size={12} />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-[#1A1A2E]">
                          {profile.firstName} {profile.lastName}
                        </h2>
                        <p className="text-sm text-[#6B7280]">{profile.role}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                            <Calendar size={12} />
                            Joined {profile.joinDate}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                            <Clock size={12} />
                            Last active {profile.lastActive}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        isEditing 
                          ? "bg-[#00A651] text-white hover:bg-[#009045]" 
                          : "bg-[#006CE4] text-white hover:bg-[#0057B8]"
                      }`}
                    >
                      {isEditing ? <Save size={14} /> : <Edit2 size={14} />}
                      {isEditing ? "Save" : "Edit"}
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all ${
                          !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all ${
                          !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all ${
                          !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all ${
                          !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                        Department
                      </label>
                      <input
                        type="text"
                        value={profile.department}
                        onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all ${
                          !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all ${
                          !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Bio
                    </label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className={`w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all resize-none ${
                        !isEditing ? "bg-[#F8FAFF] cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Password Change */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Change Password</h3>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#374151] transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#374151] transition-colors"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Security Settings */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-xl">
                    <div>
                      <p className="font-semibold text-[#1A1A2E]">Two-Factor Authentication</p>
                      <p className="text-sm text-[#6B7280]">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-[#006CE4] text-white text-sm font-medium rounded-xl hover:bg-[#0057B8] transition-colors">
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-xl">
                    <div>
                      <p className="font-semibold text-[#1A1A2E]">Login Alerts</p>
                      <p className="text-sm text-[#6B7280]">Get notified when someone logs into your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006CE4]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: "email", label: "Email Notifications", description: "Receive updates and alerts via email" },
                    { key: "push", label: "Push Notifications", description: "Get real-time notifications in your browser" },
                    { key: "sms", label: "SMS Notifications", description: "Receive critical alerts via text message" },
                    { key: "system", label: "System Updates", description: "Get notified about system maintenance and updates" }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-xl">
                      <div>
                        <p className="font-semibold text-[#1A1A2E]">{item.label}</p>
                        <p className="text-sm text-[#6B7280]">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notifications[item.key]}
                          onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006CE4]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Display Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Language
                    </label>
                    <select className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Timezone
                    </label>
                    <select className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all">
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Central Time (CT)</option>
                      <option>Mountain Time (MT)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Dashboard Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-xl">
                    <div>
                      <p className="font-semibold text-[#1A1A2E]">Compact View</p>
                      <p className="text-sm text-[#6B7280]">Show more data in less space</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006CE4]"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-xl">
                    <div>
                      <p className="font-semibold text-[#1A1A2E]">Show Tooltips</p>
                      <p className="text-sm text-[#6B7280]">Display helpful hints on hover</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006CE4]"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="p-6 border-b border-[#E5E9F2]">
                  <h3 className="text-lg font-bold text-[#1A1A2E]">Recent Activity</h3>
                  <p className="text-sm text-[#6B7280]">Your recent admin actions and system events</p>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                  {[
                    { icon: CheckCircle, color: "text-green-500", title: "User Account Approved", description: "Approved user registration for john.doe@example.com", time: "2 hours ago" },
                    { icon: Database, color: "text-blue-500", title: "Database Backup", description: "Scheduled database backup completed successfully", time: "4 hours ago" },
                    { icon: AlertCircle, color: "text-yellow-500", title: "System Update", description: "System security patches installed", time: "6 hours ago" },
                    { icon: Users, color: "text-purple-500", title: "New User Registration", description: "5 new users registered in the last 24 hours", time: "1 day ago" },
                    { icon: Settings, color: "text-gray-500", title: "Settings Updated", description: "Admin panel settings were modified", time: "2 days ago" }
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="p-4 hover:bg-[#F8FAFF] transition-colors">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg bg-white ${activity.color}`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-[#1A1A2E]">{activity.title}</p>
                            <p className="text-sm text-[#6B7280]">{activity.description}</p>
                            <p className="text-xs text-[#9CA3AF] mt-1">{activity.time}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
