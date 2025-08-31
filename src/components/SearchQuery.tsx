import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate } from "react-router";

const SearchQuery = () => {
  const [query, setQuery] = useState<string>("");

  const navigate = useNavigate();

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (value.trim()) {
      navigate(`/search?query=${value}`);

    }
  }, 600);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debouncedSearch(e.target.value);
  };
  return (
    <div className="hidden sm:flex items-center gap-2 relative ">
      <Input
      type="search"
        placeholder="Search"
        aria-label="Search"
        className="h-10 w-[200px] sm:w-[300px] md:w-[400px] lg:w-[500px]   pl-10 shadow-none focus-visible:ring-1 focus-visible:ring-[var(--primary-500)]"
        value={query}
        onChange={handleChange}
      />

      <Search
        aria-label="Search"
        className="w-6 h-6 absolute left-2 top-1/2 -translate-y-1/2 text-[var(--neutral-500)]"
      />
    </div>
  );
};

export default SearchQuery;
