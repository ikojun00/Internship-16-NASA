import { ReactNode } from "react";

const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
