import { useTheme } from "../../contexts/ThemeContext";
import Button from "./Button/Button";

interface SavedLocationItemProps {
  name: string;
  onView: () => void;
  onDelete: () => void;
}

const SavedLocationItem: React.FC<SavedLocationItemProps> = ({
  name,
  onView,
  onDelete,
}) => {
  const { themeClasses } = useTheme();

  return (
    <li
      className={`flex justify-between items-center ${themeClasses.card} p-2 mb-2 rounded`}
    >
      <span>{name}</span>
      <div className="flex gap-4">
        <Button onClick={onView} className="text-sm px-2 py-1">
          View
        </Button>
        <Button onClick={onDelete} className="text-sm px-2 py-1">
          Delete
        </Button>
      </div>
    </li>
  );
};

export default SavedLocationItem;
