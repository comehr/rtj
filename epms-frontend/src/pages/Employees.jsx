import React, { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/employees")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch employees");
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEmployeeAdded = () => {
    fetchEmployees();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-2 pb-2">
        Employees
      </h1>

      <div className="mb-10">
        <EmployeeForm onEmployeeAdded={handleEmployeeAdded} />
      </div>

      <section className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Employee List</h2>

        {loading && (
          <p className="text-gray-500 text-center py-10">Loading employees...</p>
        )}

        {error && (
          <p className="text-red-600 text-center py-10">Error: {error}</p>
        )}

        {!loading && !error && employees.length === 0 && (
          <p className="text-gray-600 text-center py-10">No employees found.</p>
        )}

        {!loading && !error && employees.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                  {[
                    "Employee Number",
                    "First Name",
                    "Last Name",
                    "Address",
                    "Position",
                    "Telephone",
                    "Gender",
                    "Hired Date",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border border-gray-300 px-5 py-3 text-left whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((emp, idx) => (
                  <tr
                    key={emp.employeeNumber}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-indigo-100 transition-colors duration-200 cursor-pointer`}
                  >
                    <td className="border border-gray-300 px-5 py-3">{emp.employeeNumber}</td>
                    <td className="border border-gray-300 px-5 py-3">{emp.firstName}</td>
                    <td className="border border-gray-300 px-5 py-3">{emp.lastName}</td>
                    <td className="border border-gray-300 px-5 py-3">{emp.address}</td>
                    <td className="border border-gray-300 px-5 py-3">{emp.position}</td>
                    <td className="border border-gray-300 px-5 py-3">{emp.telephone}</td>
                    <td className="border border-gray-300 px-5 py-3">{emp.gender}</td>
                    <td className="border border-gray-300 px-5 py-3">
                      {new Date(emp.hiredDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Employees;
