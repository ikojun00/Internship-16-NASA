import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

const PageContainer: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`min-h-screen ${themeClasses.container} ${themeClasses.text} pb-8`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default PageContainer;