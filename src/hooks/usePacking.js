import { useState, useEffect } from "react";
import { packingAPI } from "../services/api";

export default function usePacking(tripId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [progress, setProgress] = useState({ total: 0, packed: 0, percentage: 0 });

  useEffect(() => {
    const fetchPacking = async () => {
      try {
        setLoading(true);
        const params = tripId ? { tripId } : {};
        const [itemsRes, suggestionsRes] = await Promise.all([
          packingAPI.getAll(params),
          packingAPI.suggestions(params)
        ]);
        
        setItems(itemsRes.data.data?.items || []);
        setSuggestions(suggestionsRes.data.data?.suggestions || []);
        setProgress(itemsRes.data.data?.progress || { total: 0, packed: 0, percentage: 0 });
      } catch (err) {
        console.error("Failed to fetch packing items:", err);
        setError(err.response?.data?.message || "Failed to load packing items");
      } finally {
        setLoading(false);
      }
    };
    fetchPacking();
  }, [tripId]);

  const addItem = async (itemData) => {
    try {
      const res = await packingAPI.create(itemData);
      const newItem = res.data.data;
      setItems(prev => [...prev, newItem]);
      
      // Update progress
      setProgress(prev => ({
        ...prev,
        total: prev.total + 1,
        percentage: Math.round(((prev.packed) / (prev.total + 1)) * 100)
      }));
      
      return newItem;
    } catch (err) {
      console.error("Failed to add packing item:", err);
      throw err;
    }
  };

  const togglePacked = async (id) => {
    try {
      await packingAPI.togglePacked(id);
      setItems(prev => prev.map(item => {
        if (item.id === id) {
          const newPacked = !item.isPacked;
          setProgress(current => {
            const packedCount = newPacked ? current.packed + 1 : current.packed - 1;
            return {
              ...current,
              packed: packedCount,
              percentage: Math.round((packedCount / current.total) * 100)
            };
          });
          return { ...item, isPacked: newPacked };
        }
        return item;
      }));
    } catch (err) {
      console.error("Failed to toggle packed status:", err);
      throw err;
    }
  };

  const removeItem = async (id) => {
    try {
      await packingAPI.remove(id);
      const itemToRemove = items.find(i => i.id === id);
      setItems(prev => prev.filter(i => i.id !== id));
      
      // Update progress
      setProgress(current => {
        const newTotal = current.total - 1;
        const newPacked = itemToRemove?.isPacked ? current.packed - 1 : current.packed;
        return {
          total: newTotal,
          packed: newPacked,
          percentage: newTotal > 0 ? Math.round((newPacked / newTotal) * 100) : 0
        };
      });
    } catch (err) {
      console.error("Failed to remove packing item:", err);
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    suggestions,
    progress,
    addItem,
    togglePacked,
    removeItem
  };
}
