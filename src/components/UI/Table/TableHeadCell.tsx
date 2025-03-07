import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

const TableHeadCell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return <th className={`p-2 text-left ${themeClasses.text}`}>{children}</th>;
};

export default TableHeadCell;