import { useState, useEffect } from "react";
import { journalAPI } from "../services/api";

export default function useJournal(tripId) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const params = tripId ? { tripId } : {};
        const res = await journalAPI.getAll(params);
        setEntries(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch journal entries:", err);
        setError(err.response?.data?.message || "Failed to load journal entries");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, [tripId]);

  const addEntry = async (entryData) => {
    try {
      const res = await journalAPI.create(entryData);
      const newEntry = res.data.data;
      setEntries(prev => [newEntry, ...prev]);
      return newEntry;
    } catch (err) {
      console.error("Failed to add journal entry:", err);
      throw err;
    }
  };

  const updateEntry = async (id, data) => {
    try {
      const res = await journalAPI.update(id, data);
      const updatedEntry = res.data.data;
      setEntries(prev => prev.map(entry => entry.id === id ? updatedEntry : entry));
      return updatedEntry;
    } catch (err) {
      console.error("Failed to update journal entry:", err);
      throw err;
    }
  };

  const removeEntry = async (id) => {
    try {
      await journalAPI.remove(id);
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (err) {
      console.error("Failed to remove journal entry:", err);
      throw err;
    }
  };

  const getEntryById = (id) => entries.find(entry => entry.id === id) || null;

  return {
    entries,
    loading,
    error,
    addEntry,
    updateEntry,
    removeEntry,
    getEntryById
  };
}
