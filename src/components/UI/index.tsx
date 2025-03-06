import React, { ReactNode } from "react";
import { useTheme } from "../../contexts/ThemeContext";

export const PageContainer: React.FC<{ children: ReactNode }> = ({
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

export const PageHeader: React.FC<{ title: string }> = ({ title }) => {
  const { themeClasses } = useTheme();

  return (
    <h1 className={`text-3xl font-bold py-8 text-center ${themeClasses.text}`}>
      {title}
    </h1>
  );
};

export const FilterSection: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex flex-col items-center justify-center md:flex-row gap-4">
        {children}
      </div>
    </div>
  );
};

interface FormInputProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
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

interface FormSelectProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

export const FormSelect: React.FC<FormSelectProps> = ({
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

interface CardProps {
  children: ReactNode;
  hazardous?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hazardous = false }) => {
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

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
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

export const Table: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
};

export const TableHead: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return (
    <thead>
      <tr className={`border-b ${themeClasses.table.header}`}>{children}</tr>
    </thead>
  );
};

export const TableHeadCell: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { themeClasses } = useTheme();

  return <th className={`p-2 text-left ${themeClasses.text}`}>{children}</th>;
};

export const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return <tr className={`border-b ${themeClasses.table.row}`}>{children}</tr>;
};

export const TableCell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { themeClasses } = useTheme();

  return <td className={`p-2 ${themeClasses.secondaryText}`}>{children}</td>;
};

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

export const LoadMoreButton: React.FC<{
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

interface SavedLocationItemProps {
  name: string;
  onView: () => void;
  onDelete: () => void;
}

export const SavedLocationItem: React.FC<SavedLocationItemProps> = ({
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

export const LeftArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
