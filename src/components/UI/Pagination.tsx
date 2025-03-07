import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  disableNext: boolean;
  loading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  disableNext,
  loading = false,
}) => {
  const { themeClasses } = useTheme();
  
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || loading}
        className={`px-4 py-2 rounded-md ${
          currentPage <= 1 || loading 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : themeClasses.button
        }`}
      >
        Previous
      </button>
      
      <span className={`font-medium ${themeClasses.text}`}>
        Page {currentPage}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={disableNext || loading}
        className={`px-4 py-2 rounded-md ${
          disableNext || loading 
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
            : themeClasses.button
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;