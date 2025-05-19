const express = require("express");
const router = express.Router();
const db = require("../db");

// GET monthly payroll report
router.get("/monthly-payroll", (req, res) => {
  const sql = `
    SELECT 
      e.firstName, 
      e.lastName, 
      e.position, 
      d.departmentName, 
      s.netSalary, 
      s.month
    FROM salary s
    JOIN employee e ON s.employeeNumber = e.employeeNumber
    JOIN department d ON e.departmentCode = d.departmentCode
    ORDER BY s.month, d.departmentName, e.lastName, e.firstName;
  `;
  
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
