import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

function ExpenseForm({ onExpenseAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: '',
  });

  const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Bills', 'Other'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/expenses', formData);
      onExpenseAdded(res.data);
      toast.success('Expense added!');
      setFormData({ title: '', amount: '', category: 'Food', date: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-4 gap-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Title (e.g. Groceries)"
        value={formData.title}
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount (₹)"
        value={formData.amount}
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="md:col-span-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add Expense
      </button>
    </form>
  );
}

export default ExpenseForm;