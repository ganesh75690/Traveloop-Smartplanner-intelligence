import { useState, useEffect } from "react";
import { activitiesAPI } from "../services/api";

export default function useActivities(stopId) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        let res;
        if (stopId) {
          res = await activitiesAPI.getByStop(stopId);
        } else {
          res = await activitiesAPI.getAll({});
        }
        setActivities(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError(err.response?.data?.message || "Failed to load activities");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, [stopId]);

  const addActivity = async (stopId, activityData) => {
    try {
      const res = await activitiesAPI.addToStop(stopId, activityData);
      const newActivity = res.data.data;
      setActivities(prev => [...prev, newActivity]);
      return newActivity;
    } catch (err) {
      console.error("Failed to add activity:", err);
      throw err;
    }
  };

  const removeFromStop = async (stopActivityId) => {
    try {
      await activitiesAPI.removeFromStop(stopActivityId);
      setActivities(prev => prev.filter(activity => activity.id !== stopActivityId));
    } catch (err) {
      console.error("Failed to remove activity:", err);
      throw err;
    }
  };

  return {
    activities,
    loading,
    error,
    addActivity,
    removeFromStop
  };
}
