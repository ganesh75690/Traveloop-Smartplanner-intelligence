import { useState } from "react";
import { X, Moon, Sun, Bell, DollarSign, Lock, Check, Globe } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";

const TABS = [
  { id: "appearance", label: "Appearance", icon: Sun },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "language", label: "Language", icon: Globe },
  { id: "currency", label: "Currency", icon: DollarSign },
  { id: "password", label: "Password", icon: Lock },
];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm font-medium text-[var(--text-secondary)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
          ${checked ? "bg-[#1A56DB]" : "bg-[var(--border)]"}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200
          ${checked ? "translate-x-5" : "translate-x-0"}`}
        />
      </button>
    </label>
  );
}

export default function SettingsModal({ isOpen, onClose }) {
  const { darkMode, toggleDark, currency, setCurrency, notifPrefs, setNotifPrefs, currencyConfig } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState("appearance");
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handlePwSubmit = (e) => {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwMsg("Passwords do not match."); return; }
    if (pwForm.newPw.length < 8) { setPwMsg("Password must be at least 8 characters."); return; }
    setPwMsg("success");
    setPwForm({ current: "", newPw: "", confirm: "" });
    setTimeout(() => setPwMsg(""), 3000);
    // TODO: authAPI.changePassword(pwForm)
  };

  const cardBg  = darkMode ? "bg-[#1E293B]" : "bg-white";
  const border  = darkMode ? "border-[#334155]" : "border-[#E5E7EB]";
  const inputCls = `w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all
    ${darkMode
      ? "bg-[#0F172A] border-[#334155] text-[#F1F5F9] placeholder-[#64748B] focus:border-[#3B82F6]"
      : "bg-[#F8FAFF] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A56DB]"
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative z-10 w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden ${cardBg} ${border}`}>
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${border}`}>
          <h2 className="text-base font-bold text-[var(--text-primary)]">{t('settings.title')}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--border)] transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-[380px]">
          {/* Sidebar tabs */}
          <div className={`w-44 border-r ${border} p-3 space-y-0.5 shrink-0`}>
            {TABS.map(({ id, label, icon: Icon }) => (
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
            {/* Appearance */}
            {activeTab === "appearance" && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{t('settings.theme')}</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-4">Choose your preferred display mode.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "light", label: t('settings.light'), icon: Sun },
                      { id: "dark",  label: t('settings.dark'),  icon: Moon },
                    ].map(({ id, label, icon: Icon }) => {
                      const active = (id === "dark") === darkMode;
                      return (
                        <button
                          key={id}
                          onClick={toggleDark}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-150
                            ${active
                              ? "border-[#1A56DB] bg-[#EBF2FF]"
                              : `border-[var(--border)] ${darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFF]"} hover:border-[#1A56DB]/40`
                            }`}
                        >
                          <Icon size={22} className={active ? "text-[#1A56DB]" : "text-[var(--text-muted)]"} />
                          <span className={`text-sm font-semibold ${active ? "text-[#1A56DB]" : "text-[var(--text-muted)]"}`}>{label}</span>
                          {active && <Check size={14} className="text-[#1A56DB]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{t('settings.notifications')}</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-4">Choose what you want to be notified about.</p>
                </div>
                <div className={`rounded-xl border ${border} divide-y ${border}`}>
                  {[
                    { key: "tripReminders",    label: t('notifications.tripReminders') },
                    { key: "bookingUpdates",   label: t('notifications.bookingUpdates') },
                    { key: "weatherAlerts",    label: t('notifications.weatherAlerts') },
                    { key: "recommendations",  label: t('notifications.recommendations') },
                  ].map(({ key, label }) => (
                    <div key={key} className="px-4 py-3">
                      <Toggle
                        checked={notifPrefs[key]}
                        onChange={(v) => setNotifPrefs((p) => ({ ...p, [key]: v }))}
                        label={label}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language */}
            {activeTab === "language" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{t('language.preference')}</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-4">{t('language.description')}</p>
                </div>
                
                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('action.search')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                    className={`w-full px-4 py-2.5 pl-10 rounded-xl border text-sm font-medium outline-none transition-all
                      ${darkMode
                        ? "bg-[#0F172A] border-[#334155] text-[#F1F5F9] placeholder-[#64748B] focus:border-[#3B82F6]"
                        : "bg-[#F8FAFF] border-[#E5E7EB] text-[#111827] placeholder-[#9CA3AF] focus:border-[#1A56DB]"
                      }`}
                  />
                  <div className="absolute left-3 top-3 text-[var(--text-muted)]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>

                {/* Language Options */}
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                  {[
                    { id: "en", name: t('language.english'), native: "English" },
                    { id: "hi", name: t('language.hindi'), native: "हिन्दी" },
                    { id: "gu", name: t('language.gujarati'), native: "ગુજરાતી" },
                    { id: "ta", name: t('language.tamil'), native: "தமிழ்" },
                    { id: "te", name: t('language.telugu'), native: "తెలుగు" },
                    { id: "bn", name: t('language.bengali'), native: "বাংলা" },
                    { id: "mr", name: t('language.marathi'), native: "मराठी" },
                    { id: "fr", name: t('language.french'), native: "Français" },
                    { id: "es", name: t('language.spanish'), native: "Español" },
                    { id: "ja", name: t('language.japanese'), native: "日本語" },
                  ]
                    .filter(lang => 
                      searchQuery === "" || 
                      lang.name.toLowerCase().includes(searchQuery) ||
                      lang.native.toLowerCase().includes(searchQuery)
                    )
                    .map(({ id, name, native }) => (
                    <button
                      key={id}
                      onClick={() => setLanguage(id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-150 text-left
                        ${language === id
                          ? "border-[#1A56DB] bg-[#EBF2FF]"
                          : `border-[var(--border)] ${darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFF]"} hover:border-[#1A56DB]/40`
                        }`}
                    >
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${language === id ? "text-[#1A56DB]" : "text-[var(--text-primary)]"}`}>
                          {name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{native}</p>
                      </div>
                      {language === id && <Check size={14} className="text-[#1A56DB]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Currency */}
            {activeTab === "currency" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{t('currency.preference')}</h3>
                  <p className="text-xs text-[var(--text-muted)] mb-4">{t('currency.description')}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "INR", label: t('currency.inr'), symbol: "₹", sub: "INR" },
                    { id: "USD", label: t('currency.usd'), symbol: "$", sub: "USD" },
                    { id: "EUR", label: t('currency.eur'), symbol: "€", sub: "EUR" },
                    { id: "GBP", label: t('currency.gbp'), symbol: "£", sub: "GBP" },
                    { id: "AED", label: t('currency.aed'), symbol: "د.إ", sub: "AED" },
                    { id: "JPY", label: t('currency.jpy'), symbol: "¥", sub: "JPY" },
                  ].map(({ id, label, symbol, sub }) => (
                    <button
                      key={id}
                      onClick={() => setCurrency(id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-150 text-left
                        ${currency === id
                          ? "border-[#1A56DB] bg-[#EBF2FF]"
                          : `border-[var(--border)] ${darkMode ? "bg-[#0F172A]" : "bg-[#F8FAFF]"} hover:border-[#1A56DB]/40`
                        }`}
                    >
                      <span className={`text-2xl font-bold ${currency === id ? "text-[#1A56DB]" : "text-[var(--text-muted)]"}`}>{symbol}</span>
                      <div>
                        <p className={`text-sm font-semibold ${currency === id ? "text-[#1A56DB]" : "text-[var(--text-primary)]"}`}>{label}</p>
                        <p className="text-xs text-[var(--text-muted)]">{sub}</p>
                      </div>
                      {currency === id && <Check size={14} className="text-[#1A56DB]" />}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-2">
                  Note: Currency conversions are approximate and based on current exchange rates for display purposes.
                </p>
              </div>
            )}

            {/* Change Password */}
            {activeTab === "password" && (
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{t('settings.changePassword')}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-4">Update your account password.</p>
                <form onSubmit={handlePwSubmit} className="space-y-3">
                  {[
                    { key: "current", label: t('settings.currentPassword'),  ph: "Enter current password" },
                    { key: "newPw",   label: t('settings.newPassword'),       ph: "Min. 8 characters" },
                    { key: "confirm", label: t('settings.confirmPassword'),   ph: "Repeat new password" },
                  ].map(({ key, label, ph }) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">{label}</label>
                      <input
                        type="password"
                        placeholder={ph}
                        value={pwForm[key]}
                        onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                        className={inputCls}
                      />
                    </div>
                  ))}
                  {pwMsg && (
                    <p className={`text-xs font-medium px-3 py-2 rounded-lg ${pwMsg === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
                      {pwMsg === "success" ? "✓ " + t('settings.passwordSuccess') : pwMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1A56DB] text-white text-sm font-bold rounded-xl hover:bg-[#1648C0] transition-colors shadow-sm mt-1"
                  >
                    {t('settings.updatePassword')}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
