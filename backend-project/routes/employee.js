const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all employees - returns JSON array of employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// POST add a new employee
router.post("/", (req, res) => {
  const {
    employeeNumber,
    firstName,
    lastName,
    position,
    address,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  } = req.body;

  const sql = `
    INSERT INTO employee 
    (employeeNumber, firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    employeeNumber,
    firstName,
    lastName,
    position,
    address,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Employee added successfully" });
  });
});

// GET single employee by employeeNumber
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM employee WHERE employeeNumber = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.length === 0) return res.status(404).json({ message: "Employee not found" });
      res.json(result[0]);
    }
  );
});

// PUT update employee by employeeNumber
router.put("/:id", (req, res) => {
  const {
    firstName,
    lastName,
    position,
    address,
    telephone,
    gender,
    hiredDate,
    departmentCode,
  } = req.body;

  db.query(
    `UPDATE employee SET firstName=?, lastName=?, position=?, address=?, telephone=?, gender=?, hiredDate=?, departmentCode=?
     WHERE employeeNumber=?`,
    [firstName, lastName, position, address, telephone, gender, hiredDate, departmentCode, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" });
      res.json({ message: "Employee updated successfully" });
    }
  );
});

// DELETE employee by employeeNumber
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM employee WHERE employeeNumber = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Employee not found" });
      res.json({ message: "Employee deleted successfully" });
    }
  );
});

module.exports = router;
