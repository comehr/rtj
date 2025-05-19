import React, { useEffect, useState } from "react";

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch report");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched report data:", data); // Debug
        setReportData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading report...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Monthly Employee Payroll Report</h2>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">First Name</th>
            <th className="border border-gray-300 px-4 py-2">Last Name</th>
            <th className="border border-gray-300 px-4 py-2">Position</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Net Salary</th>
            <th className="border border-gray-300 px-4 py-2">Month</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((row, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 px-4 py-2">{row.firstName}</td>
              <td className="border border-gray-300 px-4 py-2">{row.lastName}</td>
              <td className="border border-gray-300 px-4 py-2">{row.position}</td>
              <td className="border border-gray-300 px-4 py-2">{row.departmentName}</td>
              <td className="border border-gray-300 px-4 py-2">
                {row.netSalary != null ? Number(row.netSalary).toFixed(2) : "-"}
              </td>
              <td className="border border-gray-300 px-4 py-2">{row.month}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
