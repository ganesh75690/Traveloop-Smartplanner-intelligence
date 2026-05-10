import { useState, useEffect } from "react";
import { usersAPI } from "../services/api";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        // Note: This would be implemented in backend
        // const res = await notificationsAPI.getAll();
        // setNotifications(res.data.data || []);
        
        // Mock implementation for now
        setNotifications([]);
        setUnreadCount(0);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
        setError(err.response?.data?.message || "Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      // Note: This would be implemented in backend
      // await notificationsAPI.markAsRead(id);
      
      setNotifications(prev => prev.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      ));
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      // Note: This would be implemented in backend
      // await notificationsAPI.markAllAsRead();
      
      setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      throw err;
    }
  };

  const clearAll = async () => {
    try {
      // Note: This would be implemented in backend
      // await notificationsAPI.clearAll();
      
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to clear notifications:", err);
      throw err;
    }
  };

  return {
    notifications,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll
  };
}
