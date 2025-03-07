import { ReactNode } from "react";

const FilterSection: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="flex flex-col items-center justify-center md:flex-row gap-4">
        {children}
      </div>
    </div>
  );
};

export default FilterSection;
