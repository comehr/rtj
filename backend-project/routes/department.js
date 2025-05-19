// routes/department.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all departments
router.get("/", (req, res) => {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST a new department
router.post("/", (req, res) => {
  const { departmentCode, departmentName, grossSalary } = req.body;
  db.query(
    `INSERT INTO department (departmentCode, departmentName, grossSalary) VALUES (?, ?, ?)`,
    [departmentCode, departmentName, grossSalary],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Department added successfully" });
    }
  );
});

// PUT update department
router.put("/:code", (req, res) => {
  const departmentCode = req.params.code;
  const { departmentName, grossSalary } = req.body;
  db.query(
    `UPDATE department SET departmentName = ?, grossSalary = ? WHERE departmentCode = ?`,
    [departmentName, grossSalary, departmentCode],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Updated successfully" });
    }
  );
});

// DELETE department
router.delete("/:code", (req, res) => {
  const departmentCode = req.params.code;
  db.query(
    `DELETE FROM department WHERE departmentCode = ?`,
    [departmentCode],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Not found" });
      res.json({ message: "Deleted successfully" });
    }
  );
});

module.exports = router;
