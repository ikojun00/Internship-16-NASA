import { useTheme } from "../../../contexts/ThemeContext";

const LoadMoreButton: React.FC<{
  onClick: () => void;
  loading: boolean;
}> = ({ onClick, loading }) => {
  const { themeClasses } = useTheme();

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onClick}
        className={`px-6 py-2 rounded-md ${themeClasses.button}`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
