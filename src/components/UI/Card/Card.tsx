import { ReactNode } from "react";
import { useTheme } from "../../../contexts/ThemeContext";

interface CardProps {
  children: ReactNode;
  hazardous?: boolean;
}

const Card: React.FC<CardProps> = ({ children, hazardous = false }) => {
  const { themeClasses } = useTheme();

  return (
    <div
      className={`p-4 rounded ${
        hazardous ? themeClasses.hazardousCard : themeClasses.card
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
