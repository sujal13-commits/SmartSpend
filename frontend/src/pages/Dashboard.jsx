import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import CategoryPieChart from '../components/CategoryPieChart';

function Dashboard() {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get('/expenses');
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);

  const handleExpenseAdded = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  const handleExpenseDeleted = (id) => {
    setExpenses(expenses.filter((exp) => exp._id !== id));
  };

  const handleExpenseUpdated = (updatedExpense) => {
  setExpenses(
    expenses.map((exp) => (exp._id === updatedExpense._id ? updatedExpense : exp))
  );
};

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">
          Welcome, {user?.name} 👋
        </h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-500 text-sm">Total Spend</p>
        <p className="text-3xl font-bold text-gray-800">₹{total}</p>
      </div>

      <CategoryPieChart expenses={expenses} />

      <ExpenseForm onExpenseAdded={handleExpenseAdded} />

      {loading ? (
        <p className="text-center text-gray-500">Loading expenses...</p>
      ) : (
        <ExpenseList
  expenses={expenses}
  onExpenseDeleted={handleExpenseDeleted}
  onExpenseUpdated={handleExpenseUpdated}
/>
      )}
    </div>
  );
}

export default Dashboard;