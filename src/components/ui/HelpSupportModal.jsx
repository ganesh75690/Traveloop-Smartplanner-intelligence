import { useState } from "react";
import { X, Mail, Phone, MessageCircle, AlertTriangle, Star, ChevronDown, ChevronUp, Send, Shield, Heart, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

function FAQItem({ question, answer, isOpen, onToggle }) {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  
  return (
    <div className={`border rounded-xl overflow-hidden transition-all duration-200 ${
      darkMode ? "border-[#334155] bg-[#1E293B]" : "border-[#E5E7EB] bg-white"
    }`}>
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-[var(--border)]/40 transition-colors"
      >
        <span className="text-sm font-medium text-[var(--text-primary)]">{question}</span>
        {isOpen ? (
          <ChevronUp size={16} className="text-[var(--text-muted)]" />
        ) : (
          <ChevronDown size={16} className="text-[var(--text-muted)]" />
        )}
      </button>
      {isOpen && (
        <div className={`px-4 py-3 border-t ${darkMode ? "border-[#334155]" : "border-[#E5E7EB]"}`}>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function StarRating({ rating, onRatingChange }) {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRatingChange(star)}
          className="transition-colors duration-200"
        >
          <Star
            size={20}
            className={star <= rating ? "text-yellow-400 fill-yellow-400" : "text-[var(--text-muted)]"}
            strokeWidth={star <= rating ? 0 : 2}
          />
        </button>
      ))}
    </div>
  );
}

export default function HelpSupportModal({ isOpen, onClose }) {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  
  const [activeTab, setActiveTab] = useState("faq");
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [ticketForm, setTicketForm] = useState({
    name: "",
    email: "",
    issueType: "",
    subject: "",
    description: ""
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const faqs = [
    {
      question: "How do I book a trip?",
      answer: "To book a trip, navigate to the Explore page, select your destination, choose your travel dates, and click on the 'Book Now' button. Follow the payment process to confirm your booking."
    },
    {
      question: "How does AI Budget Intelligence work?",
      answer: "AI Budget Intelligence analyzes your travel preferences, budget, and destination data to provide personalized recommendations, expense breakdowns, and savings tips. It uses machine learning to optimize your travel spending."
    },
    {
      question: "How can I change currency or language?",
      answer: "Go to Settings from the profile dropdown. You can change your preferred currency and language from the respective tabs. Your preferences will be saved automatically."
    },
    {
      question: "How do I use Travel Simulation?",
      answer: "Travel Simulation allows you to virtually experience destinations before booking. Click on the Travel Simulation button in the sidebar to explore destinations in 360° view and plan your itinerary."
    },
    {
      question: "How does the AI chatbot work?",
      answer: "The AI chatbot provides instant travel assistance, destination recommendations, and booking help. Click on the chat button and ask your travel-related questions in natural language."
    },
    {
      question: "How can I save trips?",
      answer: "You can save trips by clicking the heart icon on any destination or trip card. Saved trips appear in your profile under 'Saved Trips' for easy access."
    }
  ];

  const issueTypes = [
    "Booking Issue",
    "Payment Problem", 
    "Account Access",
    "Technical Bug",
    "Feature Request",
    "Other"
  ];

  if (!isOpen) return null;

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketForm({ name: "", email: "", issueType: "", subject: "", description: "" });
      onClose();
    }, 3000);
  };

  const bg = darkMode ? "bg-[#1E293B]" : "bg-white";
  const border = darkMode ? "border-[#334155]" : "border-[#E5E7EB]";
  const inputCls = `w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
    ${darkMode
      ? "bg-[#0F172A] border-[#334155] text-[#F1F5F9] placeholder-[#64748B] focus:border-[#3B82F6]"
      : "bg-[#F8FAFF] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A56DB]"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-4xl max-h-[90vh] rounded-2xl border shadow-2xl overflow-hidden ${bg} ${border}`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
          <h2 className="text-base font-bold text-[var(--text-primary)]">{t('help.title')}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--border)] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-[500px]">
          {/* Sidebar tabs */}
          <div className={`w-48 border-r ${border} p-3 space-y-0.5 shrink-0`}>
            {[
              { id: "faq", label: "FAQ", icon: MessageCircle },
              { id: "contact", label: "Contact Support", icon: Mail },
              { id: "ticket", label: "Submit Ticket", icon: Send },
              { id: "emergency", label: "Emergency Help", icon: AlertTriangle },
              { id: "feedback", label: "Feedback", icon: Star },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left
                  ${activeTab === id
                    ? darkMode ? "bg-[#1E3A5F] text-[#93C5FD]" : "bg-[#EBF2FF] text-[#1A56DB]"
                    : "text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                  }`}
              >
                <Icon size={15} strokeWidth={activeTab === id ? 2.5 : 1.75} />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* FAQ Section */}
            {activeTab === "faq" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('help.faq')}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Find answers to commonly asked questions about Traveloop.
                  </p>
                </div>
                
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <FAQItem
                      key={index}
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={expandedFAQ === index}
                      onToggle={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Contact Support Section */}
            {activeTab === "contact" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('help.contact')}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Get in touch with our support team through multiple channels.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl border ${border} text-center`}>
                    <Mail className="mx-auto mb-3 text-blue-500" size={24} />
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">{t('help.email')}</h4>
                    <p className="text-sm text-[var(--text-muted)] mb-2">support@traveloop.com</p>
                    <p className="text-xs text-[var(--text-light)]">24-48 hour response</p>
                  </div>

                  <div className={`p-4 rounded-xl border ${border} text-center`}>
                    <Phone className="mx-auto mb-3 text-green-500" size={24} />
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">{t('help.phone')}</h4>
                    <p className="text-sm text-[var(--text-muted)] mb-2">+91 9876543210</p>
                    <p className="text-xs text-[var(--text-light)]">Mon-Fri, 9AM-6PM IST</p>
                  </div>

                  <div className={`p-4 rounded-xl border ${border} text-center`}>
                    <MessageCircle className="mx-auto mb-3 text-purple-500" size={24} />
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">{t('help.liveChat')}</h4>
                    <p className="text-sm text-[var(--text-muted)] mb-2">Available 24/7</p>
                    <button className="text-xs bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-colors">
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Support Ticket Section */}
            {activeTab === "ticket" && (
              <div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('help.submitTicket')}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Submit a detailed support ticket and we'll get back to you soon.
                  </p>
                </div>

                {ticketSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="text-green-600" size={32} />
                    </div>
                    <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {t('help.ticketForm.success')}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)]">
                      We'll respond to your ticket within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                          {t('help.ticketForm.name')}
                        </label>
                        <input
                          type="text"
                          required
                          value={ticketForm.name}
                          onChange={(e) => setTicketForm({ ...ticketForm, name: e.target.value })}
                          className={inputCls}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                          {t('help.ticketForm.email')}
                        </label>
                        <input
                          type="email"
                          required
                          value={ticketForm.email}
                          onChange={(e) => setTicketForm({ ...ticketForm, email: e.target.value })}
                          className={inputCls}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        {t('help.ticketForm.issueType')}
                      </label>
                      <select
                        required
                        value={ticketForm.issueType}
                        onChange={(e) => setTicketForm({ ...ticketForm, issueType: e.target.value })}
                        className={inputCls}
                      >
                        <option value="">Select issue type</option>
                        {issueTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        {t('help.ticketForm.subject')}
                      </label>
                      <input
                        type="text"
                        required
                        value={ticketForm.subject}
                        onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                        className={inputCls}
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                        {t('help.ticketForm.description')}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={ticketForm.description}
                        onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                        className={inputCls}
                        placeholder="Detailed description of your issue..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#1A56DB] text-white text-sm font-bold rounded-xl hover:bg-[#1648C0] transition-colors shadow-sm"
                    >
                      {t('help.ticketForm.submit')}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Emergency Help Section */}
            {activeTab === "emergency" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('help.emergency')}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Immediate assistance for urgent travel emergencies.
                  </p>
                </div>

                <div className={`p-4 rounded-xl border-2 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800`}>
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle className="text-red-600" size={24} />
                    <h4 className="font-bold text-red-900 dark:text-red-100">Emergency Hotline</h4>
                  </div>
                  <p className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">+91 9999999999</p>
                  <p className="text-sm text-red-700 dark:text-red-200">Available 24/7 for travel emergencies</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border ${border}`}>
                    <Shield className="mb-2 text-blue-500" size={20} />
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">Lost Documents</h4>
                    <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                      <li>• Passport assistance</li>
                      <li>• Emergency travel documents</li>
                      <li>• Embassy contact help</li>
                    </ul>
                  </div>

                  <div className={`p-4 rounded-xl border ${border}`}>
                    <Heart className="mb-2 text-red-500" size={20} />
                    <h4 className="font-semibold text-[var(--text-primary)] mb-2">Medical Assistance</h4>
                    <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                      <li>• Hospital locator</li>
                      <li>• Medical evacuation</li>
                      <li>• Travel insurance claims</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback Section */}
            {activeTab === "feedback" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t('help.feedback')}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-6">
                    Help us improve Traveloop with your feedback.
                  </p>
                </div>

                <div className={`p-6 rounded-xl border ${border}`}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                      Rate your experience
                    </label>
                    <StarRating rating={rating} onRatingChange={setRating} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                      Tell us more about your experience
                    </label>
                    <textarea
                      rows={4}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className={inputCls}
                      placeholder="Share your thoughts, suggestions, or report issues..."
                    />
                  </div>

                  <button className="mt-4 px-6 py-2.5 bg-[#1A56DB] text-white text-sm font-bold rounded-xl hover:bg-[#1648C0] transition-colors shadow-sm">
                    Submit Feedback
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
