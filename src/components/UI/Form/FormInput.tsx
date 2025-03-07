import { useTheme } from "../../../contexts/ThemeContext";

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type,
  value,
  onChange,
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
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded-md border ${themeClasses.input}`}
      />
    </div>
  );
};

export default FormInput;