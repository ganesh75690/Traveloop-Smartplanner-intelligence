import { useState, useEffect } from "react";
import { expensesAPI } from "../services/api";

export default function useExpenses(tripId) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const params = tripId ? { tripId } : {};
        const [expensesRes, insightsRes] = await Promise.all([
          expensesAPI.getAll(params),
          expensesAPI.insights()
        ]);
        
        setExpenses(expensesRes.data.data?.expenses || []);
        setInsights(insightsRes.data.data);
      } catch (err) {
        console.error("Failed to fetch expenses:", err);
        setError(err.response?.data?.message || "Failed to load expenses");
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, [tripId]);

  const addExpense = async (expenseData) => {
    try {
      const res = await expensesAPI.create(expenseData);
      const newExpense = res.data.data;
      setExpenses(prev => [newExpense, ...prev]);
      return newExpense;
    } catch (err) {
      console.error("Failed to add expense:", err);
      throw err;
    }
  };

  const updateExpense = async (id, data) => {
    try {
      const res = await expensesAPI.update(id, data);
      const updatedExpense = res.data.data;
      setExpenses(prev => prev.map(e => e.id === id ? updatedExpense : e));
      return updatedExpense;
    } catch (err) {
      console.error("Failed to update expense:", err);
      throw err;
    }
  };

  const removeExpense = async (id) => {
    try {
      await expensesAPI.remove(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error("Failed to remove expense:", err);
      throw err;
    }
  };

  const refreshInsights = async () => {
    try {
      const res = await expensesAPI.insights();
      setInsights(res.data.data);
    } catch (err) {
      console.error("Failed to refresh insights:", err);
    }
  };

  return {
    expenses,
    loading,
    error,
    insights,
    addExpense,
    updateExpense,
    removeExpense,
    refreshInsights
  };
}
