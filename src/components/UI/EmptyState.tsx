import { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export const EmptyState: React.FC<{
  message: string;
  icon?: ReactNode;
}> = ({ message, icon }) => {
  const { themeClasses } = useTheme();

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      {icon && <div className="text-6xl mb-4">{icon}</div>}
      <p className={`text-xl ${themeClasses.secondaryText}`}>{message}</p>
    </div>
  );
};
