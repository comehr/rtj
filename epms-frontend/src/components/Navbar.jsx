import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="font-extrabold text-2xl text-white tracking-wide select-none">
          EPMS
        </div>
        <div className="space-x-8 text-white text-lg font-medium">
          <Link
            to="/employees"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Employees
          </Link>
          <Link
            to="/departments"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Departments
          </Link>
          <Link
            to="/salaries"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Salaries
          </Link>
          <Link
            to="/reports"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Reports
          </Link>
          <Link
            to="/login"
            className="hover:text-yellow-400 transition-colors duration-300"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
