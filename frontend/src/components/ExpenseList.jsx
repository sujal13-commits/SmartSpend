import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const categories = ['Food', 'Travel', 'Rent', 'Shopping', 'Bills', 'Other'];

function ExpenseList({ expenses, onExpenseDeleted, onExpenseUpdated }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      onExpenseDeleted(id);
      toast.success('Expense deleted');
    } catch (err) {
      toast.error('Failed to delete expense');
    }
  };

  const startEditing = (exp) => {
    setEditingId(exp._id);
    setEditData({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date.slice(0, 10), // format YYYY-MM-DD for date input
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/expenses/${id}`, editData);
      onExpenseUpdated(res.data);
      toast.success('Expense updated');
      setEditingId(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update expense');
    }
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        No expenses yet. Add your first one above!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Title</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600">Amount</th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) =>
            editingId === exp._id ? (
              <tr key={exp._id} className="border-b bg-blue-50">
                <td className="px-4 py-3">
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded-md"
                  />
                </td>
                <td className="px-4 py-3">
                  <select
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded-md"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="date"
                    name="date"
                    value={editData.date}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded-md"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    name="amount"
                    value={editData.amount}
                    onChange={handleEditChange}
                    className="w-full px-2 py-1 border rounded-md"
                  />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => saveEdit(exp._id)}
                    className="text-green-600 hover:text-green-800 text-sm mr-3"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={exp._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{exp.title}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    {exp.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-sm">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-semibold">₹{exp.amount}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    onClick={() => startEditing(exp)}
                    className="text-blue-600 hover:text-blue-800 text-sm mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;