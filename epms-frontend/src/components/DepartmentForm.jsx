// components/DepartmentForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentForm = ({ selected, onSave }) => {
  const [form, setForm] = useState({
    departmentCode: '',
    departmentName: '',
    grossSalary: ''
  });

  useEffect(() => {
    if (selected) {
      setForm(selected);
    } else {
      setForm({ departmentCode: '', departmentName: '', grossSalary: '' });
    }
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await axios.put(`http://localhost:5000/api/departments/${form.departmentCode}`, {
          departmentName: form.departmentName,
          grossSalary: form.grossSalary
        });
      } else {
        await axios.post("http://localhost:5000/api/departments", form);
      }
      onSave(); // close form and refresh list
    } catch (err) {
      console.error("Save error:", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-green p-4 rounded shadow">
      {!selected && (
        <div>
          <label className="block">Department Code</label>
          <input
            type="text"
            name="departmentCode"
            value={form.departmentCode}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
      )}
      <div>
        <label className="block">Department Name</label>
        <input
          type="text"
          name="departmentName"
          value={form.departmentName}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Gross Salary</label>
        <input
          type="number"
          name="grossSalary"
          value={form.grossSalary}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-green-600 text-green px-4 py-2 rounded">
        {selected ? 'Update' : 'Add'} Department
      </button>
    </form>
  );
};

export default DepartmentForm;
