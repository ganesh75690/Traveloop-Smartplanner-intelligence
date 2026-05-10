import { createContext, useContext, useState, useEffect } from 'react';

// Translation data for all supported languages
const translations = {
  en: {
    // Navigation & Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.explore': 'Explore',
    'nav.trips': 'My Trips',
    'nav.budget': 'AI Budget Intelligence',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Common Actions
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.edit': 'Edit',
    'action.delete': 'Delete',
    'action.add': 'Add',
    'action.search': 'Search',
    'action.filter': 'Filter',
    'action.book': 'Book',
    'action.bookNow': 'Book Now',
    'action.viewDetails': 'View Details',
    'action.back': 'Back',
    
    // Settings Page
    'settings.title': 'Settings',
    'settings.appearance': 'Appearance',
    'settings.notifications': 'Notifications',
    'settings.currency': 'Currency',
    'settings.password': 'Password',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.changePassword': 'Change Password',
    'settings.updatePassword': 'Update Password',
    'settings.currentPassword': 'Current Password',
    'settings.newPassword': 'New Password',
    'settings.confirmPassword': 'Confirm Password',
    'settings.passwordMinLength': 'Password must be at least 8 characters.',
    'settings.passwordMismatch': 'Passwords do not match.',
    'settings.passwordSuccess': 'Password updated successfully!',
    
    // Currency Settings
    'currency.preference': 'Currency Preference',
    'currency.description': 'All prices will be displayed in your selected currency.',
    'currency.inr': 'Indian Rupee',
    'currency.usd': 'US Dollar',
    'currency.eur': 'Euro',
    'currency.gbp': 'British Pound',
    'currency.aed': 'UAE Dirham',
    'currency.jpy': 'Japanese Yen',
    
    // Language Settings
    'language.preference': 'Language Preferences',
    'language.description': 'Choose your preferred language for the interface.',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.gujarati': 'ગુજરાતી',
    'language.tamil': 'தமிழ்',
    'language.telugu': 'తెలుగు',
    'language.bengali': 'বাংলা',
    'language.marathi': 'मराठी',
    'language.french': 'Français',
    'language.spanish': 'Español',
    'language.japanese': '日本語',
    
    // Profile
    'profile.myProfile': 'My Profile',
    'profile.settings': 'Settings',
    'profile.changePassword': 'Change Password',
    'profile.darkMode': 'Dark Mode',
    'profile.lightMode': 'Light Mode',
    'profile.signOut': 'Sign out',
    
    // Help & Support
    'help.title': 'Help & Support',
    'help.faq': 'Frequently Asked Questions',
    'help.contact': 'Contact Support',
    'help.email': 'Email Support',
    'help.phone': 'Phone Support',
    'help.liveChat': 'Live Chat',
    'help.emergency': 'Emergency Travel Assistance',
    'help.feedback': 'Feedback & Ratings',
    'help.submitTicket': 'Submit Support Ticket',
    'help.ticketForm.name': 'Name',
    'help.ticketForm.email': 'Email',
    'help.ticketForm.issueType': 'Issue Type',
    'help.ticketForm.subject': 'Subject',
    'help.ticketForm.description': 'Description',
    'help.ticketForm.submit': 'Submit Ticket',
    'help.ticketForm.success': 'Support ticket submitted successfully!',
    
    // AI Budget Intelligence
    'budget.title': 'AI Budget Intelligence',
    'budget.subtitle': 'Smart travel budget planning with AI-powered recommendations and expense optimization',
    'budget.planner': 'Budget Planner',
    'budget.totalBudget': 'Total Budget (INR)',
    'budget.travelers': 'Number of Travelers',
    'budget.duration': 'Trip Duration (Days)',
    'budget.tripType': 'Trip Type',
    'budget.travelStyle': 'Travel Style',
    'budget.hotelPreference': 'Hotel Preference',
    'budget.foodPreference': 'Food Preference',
    'budget.destinationType': 'Destination Type',
    'budget.generateRecommendations': 'Generate AI Recommendations',
    'budget.recommendations': 'Recommended Trips',
    'budget.savePerPerson': 'Save per person',
    'budget.dailyBudget': 'Daily Budget',
    'budget.perPerson': 'Per Person',
    'budget.budgetStatus': 'Budget Status',
    'budget.budgetFriendly': 'Budget-friendly',
    'budget.moderate': 'Moderate',
    'budget.comfortable': 'Comfortable',
    'budget.luxury': 'Luxury',
    
    // Trip Types
    'trip.domestic': 'Domestic',
    'trip.international': 'International',
    'trip.budget': 'Budget',
    'trip.luxury': 'Luxury',
    'trip.adventure': 'Adventure',
    'trip.family': 'Family',
    'trip.romantic': 'Romantic',
    'trip.solo': 'Solo',
    'trip.nature': 'Nature',
    'trip.beach': 'Beach',
    
    // Hotel & Food Preferences
    'hotel.budget': 'Budget',
    'hotel.midRange': 'Mid-Range',
    'hotel.luxury': 'Luxury',
    'food.local': 'Local',
    'food.mixed': 'Mixed',
    'food.international': 'International',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.tripReminders': 'Trip Reminders',
    'notifications.bookingUpdates': 'Booking Updates',
    'notifications.weatherAlerts': 'Weather Alerts',
    'notifications.recommendations': 'Destination Recommendations',
    'notifications.markAllRead': 'Mark all read',
    'notifications.viewAll': 'View all notifications',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.noResults': 'No results found',
    'common.tryAgain': 'Try again',
  },
  
  hi: {
    // Navigation & Sidebar
    'nav.dashboard': 'डैशबोर्ड',
    'nav.explore': 'अन्वेषण करें',
    'nav.trips': 'मेरी यात्राएं',
    'nav.budget': 'AI बजट इंटेलिजेंस',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    'nav.logout': 'लॉग आउट',
    
    // Common Actions
    'action.save': 'सेव करें',
    'action.cancel': 'रद्द करें',
    'action.edit': 'संपादित करें',
    'action.delete': 'हटाएं',
    'action.add': 'जोड़ें',
    'action.search': 'खोजें',
    'action.filter': 'फ़िल्टर करें',
    'action.book': 'बुक करें',
    'action.bookNow': 'अभी बुक करें',
    'action.viewDetails': 'विवरण देखें',
    'action.back': 'वापस',
    
    // Settings Page
    'settings.title': 'सेटिंग्स',
    'settings.appearance': 'दिखावट',
    'settings.notifications': 'सूचनाएं',
    'settings.currency': 'मुद्रा',
    'settings.password': 'पासवर्ड',
    'settings.language': 'भाषा',
    'settings.theme': 'थीम',
    'settings.light': 'लाइट',
    'settings.dark': 'डार्क',
    'settings.changePassword': 'पासवर्ड बदलें',
    'settings.updatePassword': 'पासवर्ड अपडेट करें',
    'settings.currentPassword': 'वर्तमान पासवर्ड',
    'settings.newPassword': 'नया पासवर्ड',
    'settings.confirmPassword': 'पासवर्ड की पुष्टि करें',
    'settings.passwordMinLength': 'पासवर्ड कम से कम 8 अक्षरों का होना चाहिए।',
    'settings.passwordMismatch': 'पासवर्ड मेल नहीं खाते।',
    'settings.passwordSuccess': 'पासवर्ड सफलतापूर्वक अपडेट हो गया!',
    
    // Currency Settings
    'currency.preference': 'मुद्रा वरीयता',
    'currency.description': 'सभी कीमतें आपकी चयनित मुद्रा में प्रदर्शित की जाएंगी।',
    'currency.inr': 'भारतीय रुपया',
    'currency.usd': 'अमेरिकी डॉलर',
    'currency.eur': 'यूरो',
    'currency.gbp': 'ब्रिटिश पाउंड',
    'currency.aed': 'यूएई दिरहम',
    'currency.jpy': 'जापानी येन',
    
    // Language Settings
    'language.preference': 'भाषा वरीयताएं',
    'language.description': 'इंटरफ़ेस के लिए अपनी पसंदीदा भाषा चुनें।',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.gujarati': 'ગુજરાતી',
    'language.tamil': 'தமிழ்',
    'language.telugu': 'తెలుగు',
    'language.bengali': 'বাংলা',
    'language.marathi': 'मराठी',
    'language.french': 'Français',
    'language.spanish': 'Español',
    'language.japanese': '日本語',
    
    // Profile
    'profile.myProfile': 'मेरी प्रोफाइल',
    'profile.settings': 'सेटिंग्स',
    'profile.changePassword': 'पासवर्ड बदलें',
    'profile.darkMode': 'डार्क मोड',
    'profile.lightMode': 'लाइट मोड',
    'profile.signOut': 'साइन आउट',
    
    // Help & Support
    'help.title': 'सहायता और समर्थन',
    'help.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'help.contact': 'संपर्क सहायता',
    'help.email': 'ईमेल सहायता',
    'help.phone': 'फोन सहायता',
    'help.liveChat': 'लाइव चैट',
    'help.emergency': 'आपातकालीन यात्रा सहायता',
    'help.feedback': 'प्रतिक्रिया और रेटिंग',
    'help.submitTicket': 'सहायता टिकट जमा करें',
    'help.ticketForm.name': 'नाम',
    'help.ticketForm.email': 'ईमेल',
    'help.ticketForm.issueType': 'समस्या प्रकार',
    'help.ticketForm.subject': 'विषय',
    'help.ticketForm.description': 'विवरण',
    'help.ticketForm.submit': 'टिकट जमा करें',
    'help.ticketForm.success': 'सहायता टिकट सफलतापूर्वक जमा हो गई!',
    
    // AI Budget Intelligence
    'budget.title': 'AI बजट इंटेलिजेंस',
    'budget.subtitle': 'AI-संचालित अनुशंसाओं और खर्च अनुकूलन के साथ स्मार्ट यात्रा बजट नियोजन',
    'budget.planner': 'बजट योजनाकार',
    'budget.totalBudget': 'कुल बजट (INR)',
    'budget.travelers': 'यात्रियों की संख्या',
    'budget.duration': 'यात्रा अवधि (दिन)',
    'budget.tripType': 'यात्रा प्रकार',
    'budget.travelStyle': 'यात्रा शैली',
    'budget.hotelPreference': 'होटल वरीयता',
    'budget.foodPreference': 'भोजन वरीयता',
    'budget.destinationType': 'गंतव्य प्रकार',
    'budget.generateRecommendations': 'AI अनुशंसाएं उत्पन्न करें',
    'budget.recommendations': 'अनुशंसित यात्राएं',
    'budget.savePerPerson': 'प्रति व्यक्ति बचत करें',
    'budget.dailyBudget': 'दैनिक बजट',
    'budget.perPerson': 'प्रति व्यक्ति',
    'budget.budgetStatus': 'बजट स्थिति',
    'budget.budgetFriendly': 'बजट-अनुकूल',
    'budget.moderate': 'मध्यम',
    'budget.comfortable': 'आरामदायक',
    'budget.luxury': 'विलासिता',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.noResults': 'कोई परिणाम नहीं मिला',
    'common.tryAgain': 'फिर से कोशिश करें',
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('traveloop_language') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('traveloop_language', lang);
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && value[fallbackKey]) {
            value = value[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        break;
      }
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
