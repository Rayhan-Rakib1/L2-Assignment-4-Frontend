import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-5 shadow-md bg-white dark:bg-gray-800">
      {/* Logo + Title */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-blue-600 dark:text-white">
          <span className="text-pink-500">Task</span>Master
        </span>
      </div>

      {/* Navigation Links */}
      <div className="space-x-4 justify-between">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
        >
          Tasks
        </Link>
        <Link
          to="/addBook"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
        >
          Add books
        </Link>
        <Link
          to="/borrowSummary"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-500 transition"
        >
        Borrow Summary
        </Link>

   
       
      </div>
    </nav>
  );
}
