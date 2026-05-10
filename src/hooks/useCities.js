import { useState, useEffect } from "react";
import { citiesAPI } from "../services/api";

export default function useCities() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);
        const res = await citiesAPI.getAll();
        setCities(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch cities:", err);
        setError(err.response?.data?.message || "Failed to load cities");
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const getCityById = (id) => cities.find(city => city.id === id) || null;

  const searchCities = async (params) => {
    try {
      setLoading(true);
      const res = await citiesAPI.getAll(params);
      setCities(res.data.data || []);
    } catch (err) {
      console.error("Failed to search cities:", err);
      setError(err.response?.data?.message || "Failed to search cities");
    } finally {
      setLoading(false);
    }
  };

  return {
    cities,
    loading,
    error,
    getCityById,
    searchCities
  };
}
