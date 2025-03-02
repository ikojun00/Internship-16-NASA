import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={`sticky top-0 left-0 z-10 px-4 py-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-blue-700"
      } text-white`}
    >
      <div className="mx-auto max-w-7xl flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <span className="mr-2">🚀</span> NASA Explorer
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
            ) : (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/apod" className="hover:text-blue-200">
            APOD
          </Link>
          <Link to="/mars-rover" className="hover:text-blue-200">
            Mars Rover
          </Link>
          <Link to="/neo-tracker" className="hover:text-blue-200">
            NEO Tracker
          </Link>
          <Link to="/earth-imagery" className="hover:text-blue-200">
            Earth Imagery
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-full focus:outline-none"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mt-2 md:hidden">
          <Link
            to="/apod"
            className="block py-2 px-4 hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            APOD
          </Link>
          <Link
            to="/mars-rover"
            className="block py-2 px-4 hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Mars Rover
          </Link>
          <Link
            to="/neo-tracker"
            className="block py-2 px-4 hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            NEO Tracker
          </Link>
          <Link
            to="/earth-imagery"
            className="block py-2 px-4 hover:bg-blue-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Earth Imagery
          </Link>
          <button
            onClick={toggleTheme}
            className="w-full text-left py-2 px-4 hover:bg-blue-700"
          >
            {theme === "dark"
              ? "Switch to Light Mode ☀️"
              : "Switch to Dark Mode 🌙"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
