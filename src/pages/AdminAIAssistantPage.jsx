import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bot, Brain, TrendingUp, AlertTriangle, CheckCircle, 
  MessageSquare, BarChart3, PieChart, Activity, Users,
  Map, DollarSign, Target, Zap, Settings, Download,
  Filter, Search, RefreshCw, Lightbulb, Shield,
  Database, Globe, Clock, ArrowUpRight, ArrowDownRight
} from "lucide-react";

export default function AdminAIAssistantPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("insights");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [aiQuery, setAiQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const menuItems = [
    { id: "insights", label: "AI Insights", icon: Brain },
    { id: "analytics", label: "Predictive Analytics", icon: TrendingUp },
    { id: "automation", label: "Automation", icon: Zap },
    { id: "monitoring", label: "AI Monitoring", icon: Shield },
    { id: "chat", label: "AI Assistant", icon: MessageSquare },
    { id: "settings", label: "AI Settings", icon: Settings },
  ];

  const aiInsights = [
    {
      title: "User Behavior Prediction",
      description: "AI predicts 23% increase in trip bookings next month based on current patterns",
      confidence: 94,
      trend: "up",
      impact: "high",
      category: "Growth"
    },
    {
      title: "Churn Risk Alert",
      description: "12 premium users showing decreased engagement, recommend retention campaign",
      confidence: 87,
      trend: "down",
      impact: "medium",
      category: "Retention"
    },
    {
      title: "Revenue Optimization",
      description: "Dynamic pricing model suggests 15% price increase for weekend bookings",
      confidence: 91,
      trend: "up",
      impact: "high",
      category: "Revenue"
    },
    {
      title: "Feature Adoption",
      description: "AI-powered trip planner showing 68% adoption rate, highest among new features",
      confidence: 89,
      trend: "up",
      impact: "medium",
      category: "Product"
    },
    {
      title: "Security Threat Detected",
      description: "Unusual login patterns detected from 3 IP addresses, investigation recommended",
      confidence: 76,
      trend: "down",
      impact: "high",
      category: "Security"
    }
  ];

  const predictiveModels = [
    {
      name: "User Lifetime Value",
      accuracy: 94.2,
      status: "active",
      lastTrained: "2 hours ago",
      predictions: 1284,
      performance: "excellent"
    },
    {
      name: "Trip Demand Forecast",
      accuracy: 89.7,
      status: "active",
      lastTrained: "6 hours ago",
      predictions: 856,
      performance: "good"
    },
    {
      name: "Churn Prediction",
      accuracy: 91.3,
      status: "training",
      lastTrained: "1 day ago",
      predictions: 423,
      performance: "good"
    },
    {
      name: "Price Optimization",
      accuracy: 87.8,
      status: "active",
      lastTrained: "3 hours ago",
      predictions: 2341,
      performance: "excellent"
    }
  ];

  const automationRules = [
    {
      name: "Welcome Email Sequence",
      status: "active",
      triggers: 1247,
      successRate: 96.3,
      lastRun: "5 minutes ago"
    },
    {
      name: "Inactive User Re-engagement",
      status: "active",
      triggers: 89,
      successRate: 78.4,
      lastRun: "1 hour ago"
    },
    {
      name: "Trip Reminder Notifications",
      status: "active",
      triggers: 456,
      successRate: 94.1,
      lastRun: "30 minutes ago"
    },
    {
      name: "Dynamic Pricing Adjustments",
      status: "paused",
      triggers: 0,
      successRate: 0,
      lastRun: "2 days ago"
    }
  ];

  const aiMetrics = [
    { label: "Total Predictions", value: "4.2M", change: "+18%", color: "text-[#006CE4]" },
    { label: "Accuracy Rate", value: "91.3%", change: "+2.1%", color: "text-[#00A651]" },
    { label: "Models Active", value: "12", change: "+3", color: "text-[#8B5CF6]" },
    { label: "Processing Time", value: "124ms", change: "-15ms", color: "text-[#F59E0B]" }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
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
              <p className="text-xs text-[#6B7280]">AI Assistant</p>
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
          <div className="space-y-2">
            <button
              onClick={() => navigate("/admin/profile")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#E8F1FD] text-[#006CE4] rounded-xl text-sm font-medium hover:bg-[#D1E7FF] transition-colors"
            >
              <Users size={14} />
              View Profile
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#FEF2F2] text-[#EF4444] rounded-xl text-sm font-medium hover:bg-[#FECACA] transition-colors"
            >
              <Settings size={14} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-[#E5E9F2] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E]">AI Assistant</h1>
              <p className="text-sm text-[#6B7280]">AI-powered insights and automation for platform management</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#E6F7EE] rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700">AI Systems Online</span>
              </div>
              <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                <RefreshCw size={18} />
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          {activeTab === "insights" && (
            <div className="space-y-6">
              {/* AI Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {aiMetrics.map((metric, index) => (
                  <div key={index} className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">{metric.label}</p>
                      <Brain size={16} className={metric.color} />
                    </div>
                    <p className={`text-3xl font-bold ${metric.color}`}>{metric.value}</p>
                    <p className="text-xs text-[#6B7280] mt-1">{metric.change}</p>
                  </div>
                ))}
              </div>

              {/* AI Insights */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <h2 className="text-base font-bold text-[#1A1A2E]">AI-Generated Insights</h2>
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
                  {aiInsights.map((insight, index) => (
                    <div key={index} className="p-4 hover:bg-[#F8FAFF] transition-colors">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-xl ${
                          insight.impact === "high" ? "bg-red-50 text-red-600" :
                          insight.impact === "medium" ? "bg-yellow-50 text-yellow-600" :
                          "bg-green-50 text-green-600"
                        }`}>
                          {insight.category === "Growth" && <TrendingUp size={16} />}
                          {insight.category === "Retention" && <Users size={16} />}
                          {insight.category === "Revenue" && <DollarSign size={16} />}
                          {insight.category === "Product" && <Target size={16} />}
                          {insight.category === "Security" && <Shield size={16} />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-[#1A1A2E]">{insight.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-1 bg-[#E8F1FD] text-[#006CE4] rounded-full font-medium">
                                {insight.confidence}% confidence
                              </span>
                              {insight.trend === "up" ? (
                                <ArrowUpRight size={14} className="text-green-500" />
                              ) : (
                                <ArrowDownRight size={14} className="text-red-500" />
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-[#6B7280] mb-3">{insight.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-xs px-2 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-full">
                              {insight.category}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              insight.impact === "high" ? "bg-red-100 text-red-700" :
                              insight.impact === "medium" ? "bg-yellow-100 text-yellow-700" :
                              "bg-green-100 text-green-700"
                            }`}>
                              {insight.impact} impact
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* Predictive Models */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <h2 className="text-base font-bold text-[#1A1A2E]">Predictive Models</h2>
                  <button className="px-3 py-1.5 bg-[#006CE4] text-white text-xs font-medium rounded-lg hover:bg-[#0057B8] transition-colors">
                    Train New Model
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#E5E9F2] bg-[#F8FAFF]">
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Model</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Accuracy</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Status</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Last Trained</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Predictions</th>
                        <th className="text-left px-5 py-3 text-xs text-[#6B7280] uppercase tracking-wider font-bold">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {predictiveModels.map((model, index) => (
                        <tr key={index} className="hover:bg-[#F8FAFF] transition-colors">
                          <td className="px-5 py-3 font-semibold text-[#1A1A2E]">{model.name}</td>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-[#1A1A2E]">{model.accuracy}%</span>
                              <div className="w-16 bg-[#E5E9F2] rounded-full h-2">
                                <div 
                                  className="bg-[#006CE4] h-2 rounded-full"
                                  style={{ width: `${model.accuracy}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              model.status === "active" ? "bg-[#E6F7EE] text-[#00A651]" :
                              "bg-[#FEF3C7] text-[#F59E0B]"
                            }`}>
                              {model.status}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-[#6B7280]">{model.lastTrained}</td>
                          <td className="px-5 py-3 font-semibold text-[#1A1A2E]">{model.predictions.toLocaleString()}</td>
                          <td className="px-5 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              model.performance === "excellent" ? "bg-[#E6F7EE] text-[#00A651]" :
                              "bg-[#E8F1FD] text-[#006CE4]"
                            }`}>
                              {model.performance}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Prediction Accuracy Trends</h3>
                  <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                      <p className="text-sm text-[#6B7280]">Model accuracy over time</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">Feature Importance</h3>
                  <div className="h-64 bg-[#F8FAFF] rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <PieChart size={32} className="text-[#9CA3AF] mx-auto mb-2" />
                      <p className="text-sm text-[#6B7280]">Key predictive factors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "automation" && (
            <div className="space-y-6">
              {/* Automation Rules */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <h2 className="text-base font-bold text-[#1A1A2E]">Automation Rules</h2>
                  <button className="px-3 py-1.5 bg-[#006CE4] text-white text-xs font-medium rounded-lg hover:bg-[#0057B8] transition-colors">
                    Create Rule
                  </button>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                  {automationRules.map((rule, index) => (
                    <div key={index} className="p-4 hover:bg-[#F8FAFF] transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-[#1A1A2E]">{rule.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                              rule.status === "active" ? "bg-[#E6F7EE] text-[#00A651]" :
                              "bg-[#F3F4F6] text-[#6B7280]"
                            }`}>
                              {rule.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-[#6B7280]">Triggers: </span>
                              <span className="font-semibold text-[#1A1A2E]">{rule.triggers.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-[#6B7280]">Success Rate: </span>
                              <span className="font-semibold text-[#1A1A2E]">{rule.successRate}%</span>
                            </div>
                            <div>
                              <span className="text-[#6B7280]">Last Run: </span>
                              <span className="font-semibold text-[#1A1A2E]">{rule.lastRun}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button className="p-2 text-[#6B7280] hover:text-[#006CE4] hover:bg-[#F8FAFF] rounded-lg transition-colors">
                            <Settings size={14} />
                          </button>
                          <button className="p-2 text-[#6B7280] hover:text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors">
                            <RefreshCw size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Automation Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Active Rules</p>
                    <Zap size={16} className="text-[#F59E0B]" />
                  </div>
                  <p className="text-3xl font-bold text-[#F59E0B]">3</p>
                  <p className="text-xs text-[#6B7280] mt-1">Automations running</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Tasks Completed</p>
                    <CheckCircle size={16} className="text-[#00A651]" />
                  </div>
                  <p className="text-3xl font-bold text-[#00A651]">1,792</p>
                  <p className="text-xs text-[#6B7280] mt-1">Last 24 hours</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Time Saved</p>
                    <Clock size={16} className="text-[#006CE4]" />
                  </div>
                  <p className="text-3xl font-bold text-[#006CE4]">47h</p>
                  <p className="text-xs text-[#6B7280] mt-1">This week</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "monitoring" && (
            <div className="space-y-6">
              {/* AI System Health */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Model Health</p>
                    <Brain size={16} className="text-[#00A651]" />
                  </div>
                  <p className="text-3xl font-bold text-[#00A651]">98.2%</p>
                  <p className="text-xs text-[#6B7280] mt-1">Overall health score</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">API Response</p>
                    <Globe size={16} className="text-[#006CE4]" />
                  </div>
                  <p className="text-3xl font-bold text-[#006CE4]">89ms</p>
                  <p className="text-xs text-[#6B7280] mt-1">Average response time</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">Error Rate</p>
                    <AlertTriangle size={16} className="text-[#EF4444]" />
                  </div>
                  <p className="text-3xl font-bold text-[#EF4444]">0.2%</p>
                  <p className="text-xs text-[#6B7280] mt-1">Last 24 hours</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-[#6B7280] uppercase tracking-wider font-bold">GPU Usage</p>
                    <Activity size={16} className="text-[#8B5CF6]" />
                  </div>
                  <p className="text-3xl font-bold text-[#8B5CF6]">67%</p>
                  <p className="text-xs text-[#6B7280] mt-1">Current utilization</p>
                </div>
              </div>

              {/* System Logs */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <h2 className="text-base font-bold text-[#1A1A2E]">AI System Logs</h2>
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
                    { time: "2 minutes ago", event: "Model training completed", type: "success", model: "User Lifetime Value" },
                    { time: "15 minutes ago", event: "Prediction accuracy improved", type: "info", model: "Trip Demand Forecast" },
                    { time: "1 hour ago", event: "Automation rule triggered", type: "success", model: "Welcome Email Sequence" },
                    { time: "2 hours ago", event: "Model retraining initiated", type: "warning", model: "Churn Prediction" },
                    { time: "3 hours ago", event: "API rate limit reached", type: "error", model: "Price Optimization" }
                  ].map((log, index) => (
                    <div key={index} className="p-4 hover:bg-[#F8FAFF] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          log.type === "success" ? "bg-green-500" :
                          log.type === "warning" ? "bg-yellow-500" :
                          log.type === "error" ? "bg-red-500" :
                          "bg-blue-500"
                        }`}></div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-[#1A1A2E]">{log.event}</p>
                            <span className="text-xs text-[#6B7280]">{log.time}</span>
                          </div>
                          <p className="text-sm text-[#6B7280]">{log.model}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="space-y-6">
              {/* AI Chat Interface */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl shadow-sm">
                <div className="px-5 py-4 border-b border-[#E5E9F2] flex items-center justify-between bg-[#F8FAFF]">
                  <div className="flex items-center gap-3">
                    <Bot size={20} className="text-[#006CE4]" />
                    <h2 className="text-base font-bold text-[#1A1A2E]">AI Assistant</h2>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">Online</span>
                    </div>
                  </div>
                  <select 
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="text-xs px-3 py-1.5 border border-[#E5E9F2] rounded-lg bg-white text-[#6B7280]"
                  >
                    <option value="gpt-4">GPT-4</option>
                    <option value="claude-3">Claude 3</option>
                    <option value="gemini-pro">Gemini Pro</option>
                  </select>
                </div>
                
                <div className="h-96 overflow-y-auto p-4 space-y-4 bg-[#F8FAFF]">
                  {/* AI Welcome Message */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#006CE4] rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-2xl p-4 shadow-sm">
                        <p className="text-sm text-[#1A1A2E]">
                          Hello! I'm your AI assistant for the Traveloop admin system. I can help you with:
                        </p>
                        <ul className="mt-2 space-y-1 text-sm text-[#6B7280]">
                          <li>• Analyzing user behavior and trends</li>
                          <li>• Generating reports and insights</li>
                          <li>• Optimizing pricing and recommendations</li>
                          <li>• Monitoring system performance</li>
                          <li>• Automating routine tasks</li>
                        </ul>
                        <p className="mt-2 text-sm text-[#1A1A2E]">
                          What would you like to know about your platform today?
                        </p>
                      </div>
                      <p className="text-xs text-[#9CA3AF] mt-1">AI Assistant • Just now</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-[#E5E9F2]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask me anything about your platform..."
                      className="flex-1 px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15"
                      onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                    />
                    <button
                      onClick={handleAnalyze}
                      disabled={!aiQuery.trim() || isAnalyzing}
                      className="px-4 py-3 bg-[#006CE4] text-white rounded-xl hover:bg-[#0057B8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <MessageSquare size={16} />
                          Send
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-xs text-[#6B7280] hover:text-[#006CE4] transition-colors">
                      💡 Suggest questions
                    </button>
                    <button className="text-xs text-[#6B7280] hover:text-[#006CE4] transition-colors">
                      📊 Generate report
                    </button>
                    <button className="text-xs text-[#6B7280] hover:text-[#006CE4] transition-colors">
                      🎯 Get recommendations
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm hover:border-[#006CE4]/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb size={20} className="text-[#F59E0B]" />
                    <h3 className="font-semibold text-[#1A1A2E]">Quick Insights</h3>
                  </div>
                  <p className="text-sm text-[#6B7280]">Get instant AI-powered insights about your platform performance</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm hover:border-[#006CE4]/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <BarChart3 size={20} className="text-[#006CE4]" />
                    <h3 className="font-semibold text-[#1A1A2E]">Generate Report</h3>
                  </div>
                  <p className="text-sm text-[#6B7280]">Create comprehensive reports with AI analysis and recommendations</p>
                </div>
                <div className="bg-white border border-[#E5E9F2] rounded-2xl p-5 shadow-sm hover:border-[#006CE4]/30 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <Target size={20} className="text-[#00A651]" />
                    <h3 className="font-semibold text-[#1A1A2E]">Optimization Tips</h3>
                  </div>
                  <p className="text-sm text-[#6B7280]">Receive AI suggestions for improving user experience and revenue</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* AI Configuration */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">AI Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Default Model
                    </label>
                    <select className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15">
                      <option>GPT-4 (Recommended)</option>
                      <option>Claude 3</option>
                      <option>Gemini Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Confidence Threshold
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="70"
                        max="95"
                        defaultValue="85"
                        className="flex-1"
                      />
                      <span className="text-sm font-semibold text-[#1A1A2E]">85%</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#374151] mb-1.5 uppercase tracking-wider">
                      Auto-training Schedule
                    </label>
                    <select className="w-full px-4 py-3 border border-[#E5E9F2] rounded-xl text-sm text-[#1A1A2E] bg-white focus:outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15">
                      <option>Daily at 2:00 AM</option>
                      <option>Weekly on Sunday</option>
                      <option>Monthly on 1st</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="bg-white border border-[#E5E9F2] rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-4">AI Features</h3>
                <div className="space-y-4">
                  {[
                    { name: "Predictive Analytics", description: "Enable AI-powered predictions and forecasts", enabled: true },
                    { name: "Smart Recommendations", description: "Provide AI-driven recommendations to users", enabled: true },
                    { name: "Automated Insights", description: "Generate automatic insights and reports", enabled: true },
                    { name: "Chat Assistant", description: "Enable AI chat assistant for support", enabled: false },
                    { name: "Dynamic Pricing", description: "AI-powered price optimization", enabled: false }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#F8FAFF] rounded-xl">
                      <div>
                        <p className="font-semibold text-[#1A1A2E]">{feature.name}</p>
                        <p className="text-sm text-[#6B7280]">{feature.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={feature.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006CE4]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
