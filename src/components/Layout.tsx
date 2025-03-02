import { Outlet } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import Navbar from "./Navbar";

const Layout: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col gap-16 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Navbar />
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
