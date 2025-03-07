import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

const TableRow: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return <tr className={`border-b ${themeClasses.table.row}`}>{children}</tr>;
};

export default TableRow;
