import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

const TableCell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return <td className={`p-2 ${themeClasses.secondaryText}`}>{children}</td>;
};

export default TableCell;
