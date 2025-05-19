import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Salaries from "./pages/Salaries";
import ReportsPage from "./pages/ReportsPage";


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/salaries" element={<Salaries />} />
          <Route path="/reports" element={<ReportsPage />} />
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
