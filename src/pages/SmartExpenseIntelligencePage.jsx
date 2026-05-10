import { useState } from "react";
import { 
  Wallet, TrendingUp, AlertCircle, CheckCircle, Download, 
  PieChart, DollarSign, Users, Receipt, Calendar, Shield,
  ChevronDown, ChevronUp, Mic, FileText, CreditCard,
  Plane, Hotel, Utensils, ShoppingBag, Car, HeartPulse,
  X, Plus, Trash2, RefreshCw, Globe, QrCode
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const EXPENSE_CATEGORIES = [
  { id: "all", label: "All Expenses", icon: Receipt },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Hotel },
  { id: "food", label: "Food & Dining", icon: Utensils },
  { id: "activities", label: "Activities", icon: TrendingUp },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
  { id: "transport", label: "Local Transport", icon: Car },
  { id: "insurance", label: "Insurance", icon: HeartPulse },
];

const catStyle = {
  flights:     "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  hotels:      "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  food:        "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  activities:  "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  shopping:    "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  transport:   "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
  insurance:   "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
};

const CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
];

const MOCK_EXPENSES = [
  { id: 1, category: "flights", description: "Mumbai to Delhi Flight", amount: 8500, date: "2024-03-15", paidBy: "Arjun", split: [{ name: "Arjun", share: 50 }, { name: "Priya", share: 50 }], status: "paid" },
  { id: 2, category: "hotels", description: "Hotel Taj Palace", amount: 12000, date: "2024-03-15", paidBy: "Priya", split: [{ name: "Arjun", share: 50 }, { name: "Priya", share: 50 }], status: "paid" },
  { id: 3, category: "food", description: "Dinner at Indian Accent", amount: 4500, date: "2024-03-16", paidBy: "Arjun", split: [{ name: "Arjun", share: 100 }], status: "pending" },
  { id: 4, category: "activities", description: "Red Fort Tour", amount: 1200, date: "2024-03-16", paidBy: "Priya", split: [{ name: "Arjun", share: 50 }, { name: "Priya", share: 50 }], status: "paid" },
  { id: 5, category: "transport", description: "Airport Transfer", amount: 800, date: "2024-03-15", paidBy: "Arjun", split: [{ name: "Arjun", share: 50 }, { name: "Priya", share: 50 }], status: "paid" },
];

const AI_INSIGHTS = [
  "You exceeded hotel budget by ₹12,000.",
  "Booking flights on weekdays could save ₹8,000.",
  "Food expenses are higher than average for this destination.",
  "Traveling in September instead of December may reduce costs by 20%.",
  "Using early booking could save ₹15,000.",
  "Eligible for travel cashback rewards.",
];

export default function SmartExpenseIntelligencePage() {
  const { darkMode } = useTheme();
  const [expenses, setExpenses] = useState(MOCK_EXPENSES);
  const [activeTab, setActiveTab] = useState("all");
  const [currency, setCurrency] = useState(CURRENCIES[0]);
  const [showNewExpense, setShowNewExpense] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [collapsedCats, setCollapsedCats] = useState({});
  const [isListening, setIsListening] = useState(false);

  const [newExpense, setNewExpense] = useState({
    category: "flights",
    description: "",
    amount: "",
    paidBy: "Arjun",
    date: new Date().toISOString().split("T")[0],
  });

  const bgClass = darkMode ? "bg-[#1E293B]" : "bg-white";
  const textClass = darkMode ? "text-[#F1F5F9]" : "text-[#1A1A2E]";
  const mutedClass = darkMode ? "text-[#94A3B8]" : "text-[#6B7280]";
  const borderClass = darkMode ? "border-[#334155]" : "border-[#E5E9F2]";
  const inputBg = darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFF]";

  const totalBudget = 150000;
  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100);

  const getBudgetHealth = () => {
    if (spentPercentage < 50) return { status: "safe", label: "Budget Safe", color: "text-green-500", bg: "bg-green-500" };
    if (spentPercentage < 80) return { status: "moderate", label: "Moderate Spending", color: "text-amber-500", bg: "bg-amber-500" };
    return { status: "over", label: "Over Budget", color: "text-red-500", bg: "bg-red-500" };
  };

  const budgetHealth = getBudgetHealth();

  const filteredExpenses = expenses.filter((e) => activeTab === "all" || e.category === activeTab);

  const addExpense = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;
    setExpenses((prev) => [...prev, { 
      id: Date.now(), 
      ...newExpense, 
      amount: parseFloat(newExpense.amount),
      status: "paid",
      split: [{ name: newExpense.paidBy, share: 100 }]
    }]);
    setShowNewExpense(false);
    setNewExpense({
      category: "flights",
      description: "",
      amount: "",
      paidBy: "Arjun",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const removeExpense = (id) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  const formatAmount = (amount) => {
    return `${currency.symbol}${amount.toLocaleString("en-IN")}`;
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewExpense(prev => ({ ...prev, description: transcript }));
      };
      
      recognition.start();
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const toggleCategory = (catId) => {
    setCollapsedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF] p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary) flex items-center gap-2">
            <Wallet className="text-[#006CE4]" />
            AI Travel Expense Intelligence
          </h1>
          <p className="text-sm text-(--text-muted)">Smart budget & billing center</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNewExpense(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-all hover:-translate-y-0.5 shadow-sm"
          >
            <Plus size={16} />
            Add Expense
          </button>
          <select
            value={currency.code}
            onChange={(e) => setCurrency(CURRENCIES.find(c => c.code === e.target.value))}
            className={`${bgClass} ${borderClass} rounded-xl px-3 py-2.5 text-sm font-semibold ${textClass} cursor-pointer`}
          >
            {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>)}
          </select>
        </div>
      </div>

      {/* Budget Health Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Circular Progress */}
        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-semibold ${mutedClass}`}>Budget Health</span>
            {budgetHealth.status === "safe" ? <CheckCircle size={18} className="text-green-500" /> : <AlertCircle size={18} className={budgetHealth.color} />}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 transform -rotate-90">
                <circle cx="40" cy="40" r="35" stroke={darkMode ? "#334155" : "#E5E9F2"} strokeWidth="6" fill="none" />
                <circle
                  cx="40" cy="40" r="35"
                  stroke={spentPercentage > 80 ? "#EF4444" : spentPercentage > 50 ? "#F59E0B" : "#22C55E"}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 35}`}
                  strokeDashoffset={`${2 * Math.PI * 35 * (1 - spentPercentage / 100)}`}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-lg font-bold ${textClass}`}>{spentPercentage}%</span>
              </div>
            </div>
            <div>
              <p className={`text-lg font-bold ${budgetHealth.color}`}>{budgetHealth.label}</p>
              <p className={`text-xs ${mutedClass}`}>{formatAmount(totalSpent)} spent</p>
            </div>
          </div>
        </div>

        {/* Total Budget */}
        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-[#006CE4]" />
            <span className={`text-sm font-semibold ${mutedClass}`}>Total Budget</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{formatAmount(totalBudget)}</p>
          <p className={`text-xs ${mutedClass}`}>Trip budget allocated</p>
        </div>

        {/* Remaining */}
        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center gap-2 mb-3">
            <PieChart size={18} className="text-green-500" />
            <span className={`text-sm font-semibold ${mutedClass}`}>Remaining</span>
          </div>
          <p className={`text-2xl font-bold ${remaining < 0 ? "text-red-500" : "text-green-500"}`}>{formatAmount(remaining)}</p>
          <p className={`text-xs ${mutedClass}`}>Available to spend</p>
        </div>

        {/* Predicted */}
        <div className={`${bgClass} ${borderClass} rounded-2xl p-5 shadow-sm`}>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-purple-500" />
            <span className={`text-sm font-semibold ${mutedClass}`}>Predicted</span>
          </div>
          <p className={`text-2xl font-bold ${textClass}`}>{formatAmount(180000)}</p>
          <p className={`text-xs ${mutedClass}`}>Est. total spend</p>
        </div>
      </div>

      {/* AI Insights Alert */}
      {spentPercentage > 80 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-bold text-red-800 dark:text-red-200 mb-1">⚠️ Budget Alert</p>
              <p className={`text-sm ${mutedClass}`}>You have exceeded 80% of your budget. Consider reducing expenses.</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showNewExpense && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgClass} ${borderClass} rounded-2xl w-full max-w-lg shadow-2xl`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-bold ${textClass} flex items-center gap-2`}>
                  <Receipt className="text-[#006CE4]" />
                  Add New Expense
                </h2>
                <button onClick={() => setShowNewExpense(false)} className={`p-2 rounded-lg ${mutedClass} hover:text-[#EF4444]`}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={addExpense} className="space-y-4">
                <div>
                  <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Description</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g., Dinner at Taj"
                      value={newExpense.description}
                      onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      className={`flex-1 ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) placeholder-(--text-light) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                    <button
                      type="button"
                      onClick={startVoiceInput}
                      className={`p-3 rounded-xl ${isListening ? "bg-red-500 text-white" : `${bgClass} ${borderClass} ${mutedClass} hover:text-[#006CE4]`} transition-colors`}
                    >
                      <Mic size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Amount ({currency.symbol})</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Category</label>
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-all cursor-pointer font-medium`}
                    >
                      {EXPENSE_CATEGORIES.slice(1).map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Date</label>
                    <input
                      type="date"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] focus:ring-2 focus:ring-[#006CE4]/15 transition-all font-medium`}
                    />
                  </div>
                  <div>
                    <label className={`text-sm font-semibold text-(--text-secondary) mb-1.5 block`}>Paid By</label>
                    <select
                      value={newExpense.paidBy}
                      onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
                      className={`w-full ${inputBg} ${borderClass} rounded-xl px-4 py-3 text-sm text-(--text-primary) outline-none focus:border-[#006CE4] transition-all cursor-pointer font-medium`}
                    >
                      <option value="Arjun">Arjun</option>
                      <option value="Priya">Priya</option>
                      <option value="Rahul">Rahul</option>
                      <option value="Neha">Neha</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowNewExpense(false)}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold ${bgClass} ${borderClass} ${mutedClass} hover:text-[#374151] transition-colors`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors shadow-sm"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
        {EXPENSE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const catTotal = expenses.filter(e => e.category === cat.id).reduce((acc, e) => acc + e.amount, 0);
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200
                ${activeTab === cat.id
                  ? "bg-[#006CE4] text-white shadow-sm"
                  : `${bgClass} ${borderClass} ${mutedClass} hover:text-[#006CE4] hover:border-[#006CE4]/30 shadow-sm`
                }`}
            >
              <Icon size={16} />
              {cat.label}
              {cat.id !== "all" && catTotal > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === cat.id ? "bg-white/20" : "bg-[#006CE4]/10 text-[#006CE4]"
                }`}>
                  {formatAmount(catTotal)}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Expense List */}
      <div className={`${bgClass} ${borderClass} rounded-2xl overflow-hidden shadow-sm`}>
        {filteredExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-[#E8F1FD] rounded-2xl flex items-center justify-center mb-4">
              <Receipt size={28} className="text-[#006CE4]" />
            </div>
            <p className={`text-sm ${mutedClass} font-medium mb-2`}>No expenses recorded</p>
            <button
              onClick={() => setShowNewExpense(true)}
              className="px-4 py-2 bg-[#006CE4] text-white text-sm font-bold rounded-xl hover:bg-[#0057B8] transition-colors"
            >
              Add Your First Expense
            </button>
          </div>
        ) : (
          <div className="divide-y divide-(--border)">
            {filteredExpenses.map((expense) => {
              const Icon = EXPENSE_CATEGORIES.find(c => c.id === expense.category)?.icon || Receipt;
              return (
                <div key={expense.id} className="flex items-center gap-4 px-4 py-4 group hover:bg-(--bg-input) transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${catStyle[expense.category]?.split(' ')[0]} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={catStyle[expense.category]?.split(' ')[1]} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-semibold ${textClass} truncate`}>{expense.description}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        expense.status === "paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {expense.status}
                      </span>
                    </div>
                    <p className={`text-xs ${mutedClass}`}>{expense.date} • Paid by {expense.paidBy}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${textClass}`}>{formatAmount(expense.amount)}</p>
                    {expense.split.length > 1 && (
                      <p className={`text-xs ${mutedClass}`}>Split {expense.split.length} ways</p>
                    )}
                  </div>
                  <button
                    onClick={() => removeExpense(expense.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-[#9CA3AF] hover:text-[#EF4444] hover:bg-red-50 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* AI Insights Section */}
      <div className="mt-6">
        <button
          onClick={() => setShowInsights(!showInsights)}
          className={`w-full flex items-center justify-between p-4 ${bgClass} ${borderClass} rounded-2xl shadow-sm hover:border-[#006CE4]/30 transition-colors`}
        >
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-[#006CE4]" />
            <span className={`text-sm font-semibold ${textClass}`}>AI Expense Insights</span>
          </div>
          {showInsights ? <ChevronUp size={18} className={mutedClass} /> : <ChevronDown size={18} className={mutedClass} />}
        </button>
        {showInsights && (
          <div className={`mt-2 ${bgClass} ${borderClass} rounded-2xl p-4 shadow-sm`}>
            <div className="space-y-3">
              {AI_INSIGHTS.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-(--bg-input) rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-[#006CE4]/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={14} className="text-[#006CE4]" />
                  </div>
                  <div>
                    <p className={`text-sm ${textClass} font-medium`}>{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Export & Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <button className={`flex items-center gap-2 px-4 py-2.5 ${bgClass} ${borderClass} rounded-xl text-sm font-semibold ${mutedClass} hover:text-[#006CE4] transition-colors shadow-sm`}>
          <Download size={16} />
          Export PDF
        </button>
        <button className={`flex items-center gap-2 px-4 py-2.5 ${bgClass} ${borderClass} rounded-xl text-sm font-semibold ${mutedClass} hover:text-[#006CE4] transition-colors shadow-sm`}>
          <FileText size={16} />
          Download Invoice
        </button>
        <button className={`flex items-center gap-2 px-4 py-2.5 ${bgClass} ${borderClass} rounded-xl text-sm font-semibold ${mutedClass} hover:text-[#006CE4] transition-colors shadow-sm`}>
          <QrCode size={16} />
          Generate QR
        </button>
        <button className={`flex items-center gap-2 px-4 py-2.5 ${bgClass} ${borderClass} rounded-xl text-sm font-semibold ${mutedClass} hover:text-[#006CE4] transition-colors shadow-sm`}>
          <Users size={16} />
          Split Expenses
        </button>
      </div>
    </div>
  );
}
