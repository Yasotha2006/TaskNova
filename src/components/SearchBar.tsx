import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300/70 pointer-events-none" aria-hidden>
        <Search size={18} />
      </div>
      <label htmlFor="mission-search" className="sr-only">
        Search missions
      </label>
      <input
        id="mission-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search the universe of your missions..."
        className="cosmic-input w-full rounded-xl pl-11 pr-10 py-3 text-sm"
        autoComplete="off"
        aria-describedby="search-help"
      />
      <span id="search-help" className="sr-only">
        Type to filter missions by title. Results update instantly.
      </span>
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
