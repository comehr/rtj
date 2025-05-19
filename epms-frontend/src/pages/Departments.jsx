import { useEffect, useState } from 'react';
import axios from 'axios';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newDepartment, setNewDepartment] = useState({
    departmentCode: '',
    departmentName: '',
    grossSalary: ''
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/departments');
      setDepartments(res.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/departments', newDepartment);
      setNewDepartment({ departmentCode: '', departmentName: '', grossSalary: '' });
      fetchDepartments();
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleDelete = async (code) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      try {
        await axios.delete(`http://localhost:5000/api/departments/${code}`);
        fetchDepartments();
      } catch (error) {
        console.error('Error deleting department:', error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Departments</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          name="departmentCode"
          value={newDepartment.departmentCode}
          onChange={handleChange}
          placeholder="Department Code"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="departmentName"
          value={newDepartment.departmentName}
          onChange={handleChange}
          placeholder="Department Name"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="number"
          name="grossSalary"
          value={newDepartment.grossSalary}
          onChange={handleChange}
          placeholder="Gross Salary"
          className="border p-2 rounded w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Department
        </button>
      </form>

      {loading ? (
        <p>Loading departments...</p>
      ) : departments.length > 0 ? (
        <table className="min-w-full bg-blue border border-gray-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Code</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Gross Salary</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept, index) => (
              <tr key={dept.departmentCode} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{dept.departmentCode}</td>
                <td className="border px-4 py-2">{dept.departmentName}</td>
                <td className="border px-4 py-2">{dept.grossSalary}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(dept.departmentCode)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No departments found.</p>
      )}
    </div>
  );
};

export default Departments;
