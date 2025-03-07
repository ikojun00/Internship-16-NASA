import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className = "",
}) => {
  const { themeClasses } = useTheme();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-md transition-colors ${themeClasses.button} disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
