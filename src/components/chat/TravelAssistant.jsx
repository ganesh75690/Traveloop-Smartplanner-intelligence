import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Mic, MicOff, Volume2, VolumeX, Minimize2, X, Sparkles, MapPin, Calendar, DollarSign, Users, Heart, Globe, Plane, TrendingUp } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// Mock AI responses for travel assistance
const travelResponses = {
  weekend: [
    "For a perfect weekend getaway, I recommend visiting Goa! Beautiful beaches, vibrant nightlife, and delicious seafood. Best time to visit is November to February.",
    "Consider a quick trip to Kerala's backwaters in Alleppey. Houseboat stays, serene landscapes, and authentic cuisine make it ideal for a relaxing weekend.",
    "Udaipur in Rajasthan offers a romantic weekend with lakes, palaces, and heritage hotels. Don't miss the sunset boat ride on Lake Pichola!"
  ],
  goa: [
    "Goa is fantastic! Top attractions: Baga Beach, Dudhsagar Falls, Old Portuguese churches, and spice plantations. Best time: November to March.",
    "In Goa, try water sports at Calangute, visit Anjuna Market on Wednesdays, and experience the vibrant nightlife in Tito's Lane. Budget: ₹3,000-8,000 for 3 days.",
    "For authentic Goa, visit South Goa beaches like Palolem and Agonda, explore spice farms, and enjoy fresh seafood at beach shacks."
  ],
  budget: [
    "Great budget options within ₹50,000: Himachal Pradesh (McLeod Ganj, Manali), Rajasthan (Jaipur, Udaipur), or Kerala (Munnar, Alleppey).",
    "For budget international trips, consider Nepal (Kathmandu, Pokhara), Thailand (Bangkok, Phuket), or Sri Lanka. Budget: ₹40,000-60,000 for 5-7 days.",
    "Domestic budget gems: Rishikesh for adventure, Pondicherry for French vibes, or Hampi for history. All under ₹30,000 for 4-5 days!"
  ],
  international: [
    "Top international destinations: Dubai for luxury, Thailand for beaches, Singapore for city experience, or Maldives for romance.",
    "Europe on budget: Prague, Budapest, and Portugal offer amazing experiences. Best time: May-September. Budget: ₹80,000-1,20,000 for 7 days.",
    "For first-time international travelers, I recommend Dubai or Singapore - easy visa process, great connectivity, and Indian-friendly food options."
  ],
  family: [
    "Perfect family destinations: Kerala backwaters, Jim Corbett National Park, Andaman Islands, or Ooty-Coonoor in Nilgiris.",
    "For family with kids, consider Singapore (Universal Studios), Dubai (Burj Khalifa, Desert Safari), or Kerala (houseboats, beaches).",
    "Domestic family favorites: Rajasthan (Jaipur, Udaipur), Gujarat (Rann of Kutch), or Karnataka (Coorg, Hampi)."
  ],
  adventure: [
    "Adventure hotspots: Rishikesh (rafting, camping), Ladakh (trekking, biking), Spiti Valley (off-road), or Meghalaya (caving, living root bridges).",
    "For trekking, try Valley of Flowers, Hampta Pass, or Sandakphu. Best seasons: March-June and September-November.",
    "Water sports: Goa, Andaman, or Rishikesh. Mountain adventures: Manali, Leh, or Sikkim. Budget: ₹25,000-50,000 for adventure trips."
  ],
  default: [
    "I'm your travel assistant! I can help with destination suggestions, itinerary planning, budget recommendations, and travel tips. Ask me anything!",
    "Tell me about your travel preferences - budget, duration, interests (beaches, mountains, culture, adventure), and I'll suggest perfect destinations!",
    "I can help with domestic and international travel, family trips, solo adventures, or romantic getaways. What kind of trip are you planning?"
  ]
};

// Quick suggestion chips
const quickSuggestions = [
  { text: "Suggest a weekend trip", icon: Sparkles, category: "weekend" },
  { text: "Best places in Goa", icon: MapPin, category: "goa" },
  { text: "Budget trips under ₹50,000", icon: DollarSign, category: "budget" },
  { text: "Adventure destinations", icon: Plane, category: "adventure" },
  { text: "Family vacation ideas", icon: Users, category: "family" },
  { text: "International destinations", icon: Globe, category: "international" },
  { text: "Plan a trip simulation", icon: Calendar, category: "simulation" },
  { text: "AI Budget Intelligence", icon: TrendingUp, category: "budget-intelligence" }
];

export default function TravelAssistant({ isOpen, onClose, onMinimize }) {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI travel assistant. I can help you plan amazing trips, suggest destinations, and provide travel recommendations. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [synthesis, setSynthesis] = useState(null);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const bgClass = darkMode ? "bg-[#1E293B] border-[#334155]" : "bg-white border-[#E5E7EB]";
  const messageBg = darkMode ? "bg-[#0F172A]" : "bg-gray-50";
  const inputBg = darkMode ? "bg-[#0F172A] border-[#334155]" : "bg-gray-50 border-gray-200";

  // Initialize speech recognition and synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Speech Recognition
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          setIsListening(false);
        };

        recognitionInstance.onerror = () => {
          setIsListening(false);
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }

      // Speech Synthesis
      if ('speechSynthesis' in window) {
        setSynthesis(window.speechSynthesis);
      }
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (recognition) {
        recognition.stop();
      }
      if (synthesis) {
        synthesis.cancel();
      }
    };
  }, [recognition, synthesis]);

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for budget intelligence requests
    const budgetResponse = handleBudgetIntelligenceRequest(userMessage);
    if (budgetResponse) {
      return budgetResponse;
    }
    
    // Check for travel simulation requests
    if (lowerMessage.includes('simulate') || lowerMessage.includes('plan') || lowerMessage.includes('simulation')) {
      return handleTravelSimulationRequest(userMessage);
    }
    
    // Check for keywords and return relevant responses
    if (lowerMessage.includes('weekend')) {
      return travelResponses.weekend[Math.floor(Math.random() * travelResponses.weekend.length)];
    } else if (lowerMessage.includes('goa')) {
      return travelResponses.goa[Math.floor(Math.random() * travelResponses.goa.length)];
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('50,000') || lowerMessage.includes('50000')) {
      return travelResponses.budget[Math.floor(Math.random() * travelResponses.budget.length)];
    } else if (lowerMessage.includes('international') || lowerMessage.includes('abroad')) {
      return travelResponses.international[Math.floor(Math.random() * travelResponses.international.length)];
    } else if (lowerMessage.includes('family')) {
      return travelResponses.family[Math.floor(Math.random() * travelResponses.family.length)];
    } else if (lowerMessage.includes('adventure') || lowerMessage.includes('trek') || lowerMessage.includes('sports')) {
      return travelResponses.adventure[Math.floor(Math.random() * travelResponses.adventure.length)];
    } else {
      return travelResponses.default[Math.floor(Math.random() * travelResponses.default.length)];
    }
  };

  const handleTravelSimulationRequest = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Extract trip details from message
    let destination = '';
    let days = 4;
    let budget = 50000;
    let style = 'adventure';
    
    // Extract destination
    const destinations = ['goa', 'kerala', 'rajasthan', 'dubai', 'bali', 'singapore', 'thailand', 'europe'];
    for (const dest of destinations) {
      if (lowerMessage.includes(dest)) {
        destination = dest;
        break;
      }
    }
    
    // Extract days
    const dayMatch = lowerMessage.match(/(\d+)\s*(?:day|days)/);
    if (dayMatch) {
      days = parseInt(dayMatch[1]);
    }
    
    // Extract budget
    const budgetMatch = lowerMessage.match(/(?:₹|rs\.?|rupees?)\s*(\d+(?:,\d+)*)/i);
    if (budgetMatch) {
      budget = parseInt(budgetMatch[1].replace(',', ''));
    } else if (lowerMessage.includes('under') || lowerMessage.includes('below')) {
      const underMatch = lowerMessage.match(/(under|below)\s*(?:₹|rs\.?|rupees?)\s*(\d+(?:,\d+)*)/i);
      if (underMatch) {
        budget = parseInt(underMatch[2].replace(',', ''));
      }
    }
    
    // Extract travel style
    if (lowerMessage.includes('luxury')) style = 'luxury';
    else if (lowerMessage.includes('family')) style = 'family';
    else if (lowerMessage.includes('romantic') || lowerMessage.includes('couple')) style = 'romantic';
    else if (lowerMessage.includes('solo')) style = 'solo';
    else if (lowerMessage.includes('budget')) style = 'budget';
    else if (lowerMessage.includes('beach')) style = 'beach';
    else if (lowerMessage.includes('nature')) style = 'nature';
    
    let response = "I can help you create a travel simulation! 🗺️\n\n";
    
    if (destination) {
      response += `I found you're interested in ${destination.charAt(0).toUpperCase() + destination.slice(1)}. `;
    }
    
    response += `Based on your request, I've configured:\n`;
    response += `📍 Destination: ${destination || 'To be selected'}\n`;
    response += `📅 Duration: ${days} days\n`;
    response += `💰 Budget: ₹${budget.toLocaleString('en-IN')}\n`;
    response += `🎯 Style: ${style.charAt(0).toUpperCase() + style.slice(1)}\n\n`;
    
    response += `Click the 📍 Travel Simulation button in the top navigation to open the simulation panel and generate your complete itinerary with day-by-day planning, budget breakdown, and AI recommendations!`;
    
    return response;
  };

  const handleBudgetIntelligenceRequest = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for budget intelligence related keywords
    if (lowerMessage.includes('budget') || lowerMessage.includes('plan') || lowerMessage.includes('intelligence') || 
        lowerMessage.includes('spending') || lowerMessage.includes('save') || lowerMessage.includes('expense')) {
      
      let budget = 50000;
      let travelers = 2;
      let tripType = 'domestic';
      
      // Extract budget
      const budgetMatch = lowerMessage.match(/(?:₹|rs\.?|rupees?)\s*(\d+(?:,\d+)*)/i);
      if (budgetMatch) {
        budget = parseInt(budgetMatch[1].replace(',', ''));
      } else if (lowerMessage.includes('under') || lowerMessage.includes('below')) {
        const underMatch = lowerMessage.match(/(under|below)\s*(?:₹|rs\.?|rupees?)\s*(\d+(?:,\d+)*)/i);
        if (underMatch) {
          budget = parseInt(underMatch[2].replace(',', ''));
        }
      }
      
      // Extract travelers
      const travelerMatch = lowerMessage.match(/(\d+)\s*(?:traveler|people|person)/);
      if (travelerMatch) {
        travelers = parseInt(travelerMatch[1]);
      }
      
      // Extract trip type
      if (lowerMessage.includes('international') || lowerMessage.includes('abroad')) {
        tripType = 'international';
      }
      
      let response = "I can help you with budget intelligence! 💰\n\n";
      response += `Based on your request, I've analyzed:\n`;
      response += `💰 Budget: ₹${budget.toLocaleString('en-IN')}\n`;
      response += `👥 Travelers: ${travelers}\n`;
      response += `🌍 Type: ${tripType}\n\n`;
      
      response += `💡 AI Recommendations:\n`;
      response += `• Best destinations under ₹${budget.toLocaleString('en-IN')}: Goa, Kerala, Rajasthan\n`;
      response += `• Optimal travel season for budget travel: Off-peak months\n`;
      response += `• Estimated savings with smart booking: ₹${Math.round(budget * 0.15).toLocaleString('en-IN')}\n`;
      response += `• Recommended accommodation: Budget hotels with good ratings\n\n`;
      
      response += `📊 Click 💹 AI Budget Intelligence in the sidebar to open the comprehensive budget planning dashboard!`;
      
      return response;
    }
    
    return null;
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputText);
      const assistantMessage = {
        id: Date.now() + 1,
        text: response,
        sender: "assistant",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);

      // Auto-speak response if not muted
      if (!isMuted && synthesis) {
        speakResponse(response);
      }
    }, 1000 + Math.random() * 1000);
  };

  const speakResponse = (text) => {
    if (!synthesis || isMuted) return;

    synthesis.cancel(); // Stop any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopSpeaking = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const handleQuickSuggestion = (suggestion) => {
    if (suggestion.category === 'simulation') {
      setInputText("Open travel simulation to plan your perfect trip!");
      setTimeout(() => sendMessage(), 100);
    } else if (suggestion.category === 'budget-intelligence') {
      setInputText("Help me plan my travel budget with AI intelligence!");
      setTimeout(() => sendMessage(), 100);
    } else {
      setInputText(suggestion.text);
      setTimeout(() => sendMessage(), 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 w-full max-w-sm h-[600px] md:w-96 md:h-[600px] mx-4 md:mx-0 rounded-2xl border shadow-2xl z-50 flex flex-col ${bgClass} transition-all duration-300 ease-in-out`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-header-title"
      aria-describedby="chat-header-description"
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-[#334155]' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <MessageCircle size={18} className="text-white" />
          </div>
          <div>
            <h3 id="chat-header-title" className="text-sm font-bold text-[var(--text-primary)]">Travel Assistant</h3>
            <p id="chat-header-description" className="text-xs text-[var(--text-muted)]">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onMinimize}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--border)] transition-colors"
            aria-label="Minimize"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-3"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : `${messageBg} text-[var(--text-primary)]`
              }`}
              role="article"
              aria-label={`${message.sender === 'user' ? 'You' : 'Assistant'} message`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-[var(--text-muted)]'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className={`px-4 py-2.5 rounded-2xl ${messageBg}`}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-sm text-[var(--text-muted)]">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2" role="region" aria-label="Quick suggestions">
          <p className="text-xs text-[var(--text-muted)] mb-2">Quick suggestions:</p>
          <div className="flex flex-wrap gap-2" role="list">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleQuickSuggestion(suggestion)}
                role="listitem"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  darkMode 
                    ? 'bg-[#334155] text-[#CBD5E1] hover:bg-[#475569]' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`Quick suggestion: ${suggestion.text}`}
              >
                <suggestion.icon size={12} aria-hidden="true" />
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className={`p-4 border-t ${darkMode ? 'border-[#334155]' : 'border-gray-200'}`}>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about destinations, budget trips, travel advice..."
              className={`w-full px-3 py-2 rounded-xl resize-none text-sm ${inputBg} text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows={1}
              style={{ minHeight: '40px', maxHeight: '100px' }}
              aria-label="Type your message here"
              aria-describedby="voice-status"
            />
          </div>
          
          {/* Voice Controls */}
          <div className="flex items-center gap-1">
            {/* Microphone Button */}
            <button
              onClick={toggleListening}
              disabled={!recognition}
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : recognition
                  ? darkMode 
                    ? 'bg-[#334155] text-[#CBD5E1] hover:bg-[#475569]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label={isListening ? "Stop recording" : "Start voice input"}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            {/* Speaker Controls */}
            {isSpeaking ? (
              <button
                onClick={stopSpeaking}
                className="p-2 rounded-xl bg-red-500 text-white animate-pulse transition-all"
                aria-label="Stop speaking"
              >
                <VolumeX size={16} />
              </button>
            ) : (
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-xl transition-all ${
                  isMuted
                    ? 'bg-gray-100 text-gray-400'
                    : darkMode 
                      ? 'bg-[#334155] text-[#CBD5E1] hover:bg-[#475569]'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={isMuted ? "Unmute responses" : "Mute responses"}
              >
                <Volume2 size={16} />
              </button>
            )}

            {/* Send Button */}
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className={`p-2 rounded-xl transition-all ${
                inputText.trim()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

        {/* Voice Status Indicator */}
        {isListening && (
          <div 
            id="voice-status"
            className="mt-2 text-xs text-red-500 font-medium animate-pulse"
            role="status"
            aria-live="assertive"
          >
            🎤 Listening... Speak now!
          </div>
        )}
      </div>
    </div>
  );
}
