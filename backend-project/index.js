const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

// ✅ Middleware
app.use(cors());
app.use(express.json()); // Parses JSON request bodies

// ✅ Routes
app.use("/api/employees", require("./routes/employee"));
app.use("/api/departments", require("./routes/department"));
app.use("/api/salaries", require("./routes/salary"));
app.use("/api/reports", require("./routes/salary"));



// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Employee Payroll Management System");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
