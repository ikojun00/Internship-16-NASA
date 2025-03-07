import { useTheme } from "../../../contexts/ThemeContext";

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  id,
  value,
  onChange,
  options,
}) => {
  const { themeClasses } = useTheme();

  return (
    <div className="flex flex-col w-full">
      <label
        htmlFor={id}
        className={`block mb-2 text-sm font-medium ${themeClasses.label}`}
      >
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded-md border ${themeClasses.input}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;