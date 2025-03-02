import { useTheme } from "../contexts/ThemeContext";

const MarsRover: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center">
      <h1
        className={`text-3xl font-bold mb-8 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Mars Rover Photos
      </h1>
      {/* Only implementing the title as requested */}
    </div>
  );
};

export default MarsRover;
