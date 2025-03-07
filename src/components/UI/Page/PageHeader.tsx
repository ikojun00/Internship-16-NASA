import { useTheme } from "../../../contexts/ThemeContext";

const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const { themeClasses } = useTheme();

  return (
    <h1 className={`text-3xl font-bold py-8 text-center ${themeClasses.text}`}>
      {title}
    </h1>
  );
};

export default PageHeader;
