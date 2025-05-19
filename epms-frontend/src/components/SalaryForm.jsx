import { useState, useEffect } from "react";
import axios from "axios";

const SalaryForm = ({ selected, onSave }) => {
  const [form, setForm] = useState({
    employeeNumber: "",
    grossSalary: "",
    totalDeduction: "",
    month: ""
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
    if (selected) {
      setForm(selected);
    } else {
      setForm({
        employeeNumber: "",
        grossSalary: "",
        totalDeduction: "",
        month: ""
      });
    }
  }, [selected]);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await axios.put(`http://localhost:5000/api/salaries/${selected.salaryId}`, form);
      } else {
        await axios.post("http://localhost:5000/api/salaries", form);
      }
      onSave();
    } catch (err) {
      console.error("Error saving salary", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      {!selected && (
        <div>
          <label className="block mb-1">Employee</label>
          <select
            name="employeeNumber"
            value={form.employeeNumber}
            onChange={handleChange}
            required
            className="w-full border p-2"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp.employeeNumber} value={emp.employeeNumber}>
                {emp.employeeNumber} - {emp.firstName} {emp.lastName}
              </option>
            ))}
          </select>
        </div>
      )}
      <div>
        <label className="block mb-1">Gross Salary</label>
        <input
          type="number"
          name="grossSalary"
          value={form.grossSalary}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Total Deduction</label>
        <input
          type="number"
          name="totalDeduction"
          value={form.totalDeduction}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Month</label>
        <input
          type="month"
          name="month"
          value={form.month}
          onChange={handleChange}
          required
          className="w-full border p-2"
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {selected ? "Update" : "Add"} Salary
      </button>
    </form>
  );
};

export default SalaryForm;
