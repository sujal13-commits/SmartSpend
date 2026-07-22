import toast from 'react-hot-toast';
import api from '../api/axios';

function ExpenseList({ expenses, onExpenseDeleted }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      onExpenseDeleted(id);
      toast.success('Expense deleted');
    } catch (err) {
      toast.error('Failed to delete expense');
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
          {expenses.map((exp) => (
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
              <td className="px-4 py-3">
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;