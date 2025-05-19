

import { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    employeeNumber: '',
    firstName: '',
    lastName: '',
    address: '',
    position: '',
    telephone: '',
    gender: '',
    hiredDate: '',
    departmentCode: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/employees', formData);
      setMessage('Employee saved successfully!');
      setFormData({
        employeeNumber: '',
        firstName: '',
        lastName: '',
        address: '',
        position: '',
        telephone: '',
        gender: '',
        hiredDate: '',
        departmentCode: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Error saving employee.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} placeholder="Employee Number" className="input" required />
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="input" />
        <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="input" />
        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Telephone" className="input" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="input" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" name="hiredDate" value={formData.hiredDate} onChange={handleChange} className="input" />
        <input type="text" name="departmentCode" value={formData.departmentCode} onChange={handleChange} placeholder="Department Code (e.g. CW, ST)" className="input" required />
        <button type="submit" className="bg-blue-600 text-blue px-4 py-2 rounded hover:bg-blue-700">Save Employee</button>
      </form>
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default EmployeeForm;

