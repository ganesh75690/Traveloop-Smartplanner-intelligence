import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("traveloop_theme") === "dark";
  });

  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem("traveloop_currency") || "INR";
  });

  const [notifPrefs, setNotifPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("traveloop_notif_prefs")) || {
        tripReminders: true,
        bookingUpdates: true,
        weatherAlerts: true,
        recommendations: true,
      };
    } catch {
      return { tripReminders: true, bookingUpdates: true, weatherAlerts: true, recommendations: true };
    }
  });

  // Apply dark class to <html>
  useEffect(() => {
    localStorage.setItem("traveloop_theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("traveloop_currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("traveloop_notif_prefs", JSON.stringify(notifPrefs));
  }, [notifPrefs]);

  const toggleDark = () => setDarkMode((v) => !v);

  const setCurrency = (c) => setCurrencyState(c);

  // Currency configuration
  const currencyConfig = {
    INR: { symbol: '₹', code: 'INR', locale: 'en-IN', rate: 1 },
    USD: { symbol: '$', code: 'USD', locale: 'en-US', rate: 0.012 },
    EUR: { symbol: '€', code: 'EUR', locale: 'de-DE', rate: 0.011 },
    GBP: { symbol: '£', code: 'GBP', locale: 'en-GB', rate: 0.0095 },
    AED: { symbol: 'د.إ', code: 'AED', locale: 'ar-AE', rate: 0.044 },
    JPY: { symbol: '¥', code: 'JPY', locale: 'ja-JP', rate: 1.8 }
  };

  // Format amount in selected currency with proper locale formatting
  const formatCurrency = (amount, fromCurrency = 'INR') => {
    const num = Number(amount) || 0;
    const config = currencyConfig[currency] || currencyConfig.INR;
    
    // Convert from source currency to target currency
    const fromRate = currencyConfig[fromCurrency]?.rate || 1;
    const toRate = config.rate;
    const convertedAmount = (num / fromRate) * toRate;
    
    // Special formatting for INR (Indian numbering system)
    if (currency === 'INR') {
      return config.symbol + convertedAmount.toLocaleString('en-IN', {
        maximumFractionDigits: 0
      });
    }
    
    // For other currencies, use 2 decimal places
    return config.symbol + convertedAmount.toLocaleString(config.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Convert amount from INR base to display currency
  const toDisplayAmount = (inrAmount) => {
    const num = Number(inrAmount) || 0;
    const config = currencyConfig[currency] || currencyConfig.INR;
    return (num * config.rate);
  };

  // Convert from any currency to INR
  const toINR = (amount, fromCurrency = 'INR') => {
    const num = Number(amount) || 0;
    const fromRate = currencyConfig[fromCurrency]?.rate || 1;
    return num / fromRate;
  };

  return (
    <ThemeContext.Provider value={{
      darkMode, toggleDark,
      currency, setCurrency,
      notifPrefs, setNotifPrefs,
      formatCurrency, toDisplayAmount, toINR, currencyConfig,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
