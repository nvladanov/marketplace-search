import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { debounce } from "lodash";

import { getAutocomplete } from "@/api/search";
import { ISuggestion } from "@/interfaces/search";

interface IProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
}

const MAX_SUGGESTION_AMOUNT = 6;

export const Search: FC<IProps> = ({ value, onChange, onSearch, ...props }) => {
  const searchComponentRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const fetchAutocompleteSuggestions = useCallback(async (value: string) => {
    if (!value.trim()) {
      setSuggestions([]);

      return;
    }

    const {
      data: { suggestions },
    } = await getAutocomplete(value);

    setSuggestions(suggestions.slice(0, MAX_SUGGESTION_AMOUNT));
  }, []);

  const debouncedAutocompleteFetch = useCallback(
    debounce(fetchAutocompleteSuggestions, 200),
    [fetchAutocompleteSuggestions]
  );

  const onChangeValueHandler = (value: string) => {
    onChange(value);
    debouncedAutocompleteFetch(value);
  };

  const onApplySuggestion = (phrase: string) => {
    onChange(phrase);
    onSeachHandler(phrase);
  };

  const onSeachHandler = (value: string) => {
    onSearch(value);
    setSuggestions([]);
  };

  const onClearSearch = () => {
    onChange("");
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSeachHandler(value);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchComponentRef.current &&
        !searchComponentRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isEmptyValue = value.trim() === "";

  return (
    <div
      ref={searchComponentRef}
      className="relative w-full z-50 rounded-2xl font-medium overflow-hidden border-[3px] border-tertiary focus-within:outline focus-within:outline-2 focus-within:outline-tertiary bg-tertiary"
    >
      <div className="absolute left-2 top-3.5">
        <SearchIcon color="var(--placeholder)" size={20} />
      </div>
      <div className="flex grow gap-2 pl-10 bg-secondary rounded-b-xl">
        <input
          {...props}
          value={value}
          onChange={(e) => onChangeValueHandler(e.target.value)}
          className={`bg-secondary outline-none w-full placeholder:text-placeholder h-12 ${
            props.className || ""
          }`}
          onKeyDown={handleKeyDown}
        />
        {!isEmptyValue && (
          <>
            <button onClick={onClearSearch}>
              <X color="var(--placeholder)" />
            </button>
            <button
              className="text-secondary py-2 px-4 rounded-lg m-1 bg-primary"
              onClick={() => onSeachHandler(value)}
            >
              Search
            </button>
          </>
        )}
      </div>
      {suggestions.length > 0 && (
        <div className="rounded-t-xl mt-1 p-1 bg-secondary">
          {suggestions.map(({ persistentId, phrase }) => (
            <div
              key={persistentId}
              className="py-2 px-6 cursor-pointer rounded-lg hover:bg-tertiary"
              onClick={() => onApplySuggestion(phrase)}
            >
              {phrase}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
