const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all salaries with employee names
router.get("/", (req, res) => {
  const query = `
    SELECT s.*, e.firstName, e.lastName 
    FROM salary s
    LEFT JOIN employee e ON s.employeeNumber = e.employeeNumber
    ORDER BY s.salaryId DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST add new salary
router.post("/", (req, res) => {
  const { employeeNumber, grossSalary, totalDeduction, netSalary, month } = req.body;
  const query = `INSERT INTO salary (employeeNumber, grossSalary, totalDeduction, netSalary, month) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [employeeNumber, grossSalary, totalDeduction, netSalary, month], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Salary added successfully", salaryId: result.insertId });
  });
});

// PUT update salary by id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { employeeNumber, grossSalary, totalDeduction, netSalary, month } = req.body;
  const query = `UPDATE salary SET employeeNumber=?, grossSalary=?, totalDeduction=?, netSalary=?, month=? WHERE salaryId=?`;
  db.query(query, [employeeNumber, grossSalary, totalDeduction, netSalary, month, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Salary not found" });
    res.json({ message: "Salary updated successfully" });
  });
});

// DELETE salary by id
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM salary WHERE salaryId=?`;
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Salary not found" });
    res.json({ message: "Salary deleted successfully" });
  });
});

module.exports = router;
