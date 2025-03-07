import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

const TableHead: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return (
    <thead>
      <tr className={`border-b ${themeClasses.table.header}`}>{children}</tr>
    </thead>
  );
};

export default TableHead;