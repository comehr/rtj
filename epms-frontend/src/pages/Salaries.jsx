import React, { useEffect, useState } from "react";

const Salaries = () => {
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [employeeNumber, setEmployeeNumber] = useState("");
  const [grossSalary, setGrossSalary] = useState("");
  const [totalDeduction, setTotalDeduction] = useState("");
  const [netSalary, setNetSalary] = useState("");
  const [month, setMonth] = useState("");

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/salaries")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch salaries");
        return res.json();
      })
      .then((data) => {
        setSalaries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleAddSalary = (e) => {
    e.preventDefault();

    const newSalary = {
      employeeNumber,
      grossSalary,
      totalDeduction,
      netSalary,
      month,
    };

    fetch("http://localhost:5000/api/salaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSalary),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add salary");
        return res.json();
      })
      .then(() => {
        setEmployeeNumber("");
        setGrossSalary("");
        setTotalDeduction("");
        setNetSalary("");
        setMonth("");
        fetchSalaries();
      })
      .catch((err) => setError(err.message));
  };

  if (loading) return <p>Loading salaries...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Salaries List</h2>

      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Employee Number</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Gross Salary</th>
            <th style={styles.th}>Total Deduction</th>
            <th style={styles.th}>Net Salary</th>
            <th style={styles.th}>Month</th>
          </tr>
        </thead>
        <tbody>
          {salaries.map((salary) => (
            <tr key={salary.salaryId} style={styles.tr}>
              <td style={styles.td}>{salary.employeeNumber}</td>
              <td style={styles.td}>{salary.firstName} {salary.lastName}</td>
              <td style={styles.td}>{salary.grossSalary}</td>
              <td style={styles.td}>{salary.totalDeduction}</td>
              <td style={styles.td}>{salary.netSalary}</td>
              <td style={styles.td}>{salary.month}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 40, marginBottom: 20 }}>Add New Salary</h3>
      <form onSubmit={handleAddSalary} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Employee Number:</label>
          <input
            type="number"
            value={employeeNumber}
            onChange={(e) => setEmployeeNumber(e.target.value)}
            required
            style={styles.input}
            placeholder="e.g. 123456"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Gross Salary:</label>
          <input
            type="number"
            step="0.01"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            required
            style={styles.input}
            placeholder="e.g. 4000.00"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Total Deduction:</label>
          <input
            type="number"
            step="0.01"
            value={totalDeduction}
            onChange={(e) => setTotalDeduction(e.target.value)}
            required
            style={styles.input}
            placeholder="e.g. 500.00"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Net Salary:</label>
          <input
            type="number"
            step="0.01"
            value={netSalary}
            onChange={(e) => setNetSalary(e.target.value)}
            required
            style={styles.input}
            placeholder="e.g. 3500.00"
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Month (1-12):</label>
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            style={styles.input}
            placeholder="e.g. 4"
          />
        </div>
        <button type="submit" style={styles.button}>Add Salary</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#333",
  },
  heading: {
    textAlign: "center",
    color: "#222",
    marginBottom: 20,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  thead: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  th: {
    padding: "12px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px 15px",
  },
  form: {
    backgroundColor: "#f7f7f7",
    padding: 20,
    borderRadius: 6,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  formGroup: {
    marginBottom: 15,
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    color: "#555",
  },
  input: {
    padding: "8px 12px",
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    outline: "none",
    transition: "border-color 0.3s ease",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
    fontSize: 16,
  },
};

export default Salaries;
