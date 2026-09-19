import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const [focused, setFocused] = useState(false);
  useEffect(() => {}, [value]);

  return (
    <div className={`relative transition-all ${focused ? 'scale-[1.01]' : ''}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-violet-300/70 pointer-events-none">
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
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search the universe of your missions..."
        className="cosmic-input w-full rounded-xl pl-11 pr-10 py-3 text-sm"
        autoComplete="off"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors"
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
      {/* focus glow */}
      {focused && (
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ boxShadow: '0 0 0 1px rgba(139,92,246,0.5), 0 0 24px rgba(139,92,246,0.2)' }}
          aria-hidden
        />
      )}
    </div>
  );
}
