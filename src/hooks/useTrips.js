import { useState, useEffect } from "react";
import { tripsAPI } from "../services/api";
import { mockTrips } from "../data/mockData";

export default function useTrips() {
  const [trips, setTrips]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const res = await tripsAPI.getAll();
        setTrips(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
        // Provide fallback demo data when API fails
        setTrips(mockTrips.map(trip => ({
          ...trip,
          title: trip.name,
          destination: trip.stops?.map(s => s.cityName).join(", ") || "Multiple destinations"
        })));
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const getTripById = (id) => trips.find((t) => t.id === id) || null;

  const addTrip = async (trip) => {
    try {
      const res = await tripsAPI.create(trip);
      const newTrip = res.data.data;
      setTrips((prev) => [newTrip, ...prev]);
      return newTrip;
    } catch (err) {
      console.error("Failed to add trip:", err);
      throw err;
    }
  };

  const updateTrip = async (id, data) => {
    try {
      const res = await tripsAPI.update(id, data);
      setTrips((prev) => prev.map((t) => (t.id === id ? res.data.data : t)));
      return res.data.data;
    } catch (err) {
      console.error("Failed to update trip:", err);
      throw err;
    }
  };

  const removeTrip = async (id) => {
    try {
      await tripsAPI.remove(id);
      setTrips((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Failed to remove trip:", err);
      throw err;
    }
  };

  return { trips, loading, error, getTripById, addTrip, updateTrip, removeTrip };
}
