import { FC } from "react";
import { Search as SearchIcon } from "lucide-react";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const Search: FC<IProps> = ({ value, onChange, ...props }) => {
  return (
    <div className="relative w-full rounded-2xl font-medium  border-[3px] border-tertiary bg-secondary pl-10 pr-5 focus-within:outline focus-within:outline-2 focus-within:outline-tertiary">
      <div className="absolute left-2 top-3.5">
        <SearchIcon color="var(--placeholder)" size={20} />
      </div>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-secondary outline-none w-full placeholder:text-placeholder h-12 ${
          props.className || ""
        }`}
      />
    </div>
  );
};
