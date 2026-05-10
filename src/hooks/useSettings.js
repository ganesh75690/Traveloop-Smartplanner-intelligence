import { useState, useEffect } from "react";
import { usersAPI } from "../services/api";

export default function useSettings() {
  const [settings, setSettings] = useState({
    language: "en",
    currency: "INR",
    darkMode: false,
    notifications: true,
    emailAlerts: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await usersAPI.getProfile();
        const { preferences } = res.data.data;
        
        setSettings(prev => ({
          ...prev,
          ...preferences
        }));
      } catch (err) {
        console.error("Failed to fetch settings:", err);
        setError(err.response?.data?.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const updateProfile = async (profileData) => {
    try {
      const res = await usersAPI.updateProfile(profileData);
      return res.data.data;
    } catch (err) {
      console.error("Failed to update profile:", err);
      throw err;
    }
  };

  const updatePreferences = async (preferencesData) => {
    try {
      const res = await usersAPI.updatePreferences(preferencesData);
      const updatedPrefs = res.data.data;
      
      setSettings(prev => ({
        ...prev,
        ...updatedPrefs
      }));
      
      return updatedPrefs;
    } catch (err) {
      console.error("Failed to update preferences:", err);
      throw err;
    }
  };

  const changePassword = async (passwordData) => {
    try {
      await usersAPI.changePassword(passwordData);
      return { success: true };
    } catch (err) {
      console.error("Failed to change password:", err);
      throw err;
    }
  };

  const deleteAccount = async () => {
    try {
      await usersAPI.deleteAccount();
      return { success: true };
    } catch (err) {
      console.error("Failed to delete account:", err);
      throw err;
    }
  };

  return {
    settings,
    loading,
    error,
    updateProfile,
    updatePreferences,
    changePassword,
    deleteAccount
  };
}
