import { NavLink } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-block pb-1 transition-all duration-300 
   text-gray-700 dark:text-gray-200
   after:content-[''] after:absolute after:left-0 after:bottom-0 
   after:h-[2px] after:bg-black after:transition-transform after:duration-300 
   after:w-full after:scale-x-0 after:origin-left 
   ${isActive ? "after:scale-x-100" : "hover:after:scale-x-100"}`;

  return (
    <nav className="max-w-7xl mx-auto h-16 flex items-center justify-between px-5 shadow-md bg-white dark:bg-gray-800">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-xl font-bold text-blue-600 dark:text-white">
          <span className="text-pink-500">Book</span>Library
        </span>
      </div>

      {/* Nav Links */}
      <div className="space-x-6 flex items-center">
        <NavLink to="/" className={navLinkClass}>
          All Books
        </NavLink>
        <NavLink to="/addBook" className={navLinkClass}>
          Add Books
        </NavLink>
        <NavLink to="/borrowSummary" className={navLinkClass}>
          Borrow Summary
        </NavLink>
        <ModeToggle />
      </div>
    </nav>
  );
}
