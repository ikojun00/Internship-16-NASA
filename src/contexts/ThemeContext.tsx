import React, { createContext, useContext, useState, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
  themeClasses: {
    container: string;
    text: string;
    secondaryText: string;
    card: string;
    hazardousCard: string;
    input: string;
    label: string;
    button: string;
    table: {
      header: string;
      row: string;
    };
  };
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const themeClasses = {
    container: theme === "dark" ? "bg-gray-900" : "bg-white",
    text: theme === "dark" ? "text-white" : "text-gray-800",
    secondaryText: theme === "dark" ? "text-gray-300" : "text-gray-700",
    card:
      theme === "dark"
        ? "bg-gray-700 text-gray-300"
        : "bg-gray-200 text-gray-800",
    hazardousCard:
      theme === "dark" ? "bg-red-800 text-red-200" : "bg-red-200 text-red-800",
    input:
      theme === "dark"
        ? "bg-gray-800 border-gray-600 text-white"
        : "bg-white border-gray-300 text-gray-800",
    label: theme === "dark" ? "text-gray-300" : "text-gray-700",
    button:
      theme === "dark"
        ? "bg-blue-700 hover:bg-blue-600 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white",
    table: {
      header: theme === "dark" ? "bg-gray-700" : "bg-gray-200",
      row: theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100",
    },
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
