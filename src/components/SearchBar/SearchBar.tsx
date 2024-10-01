import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex justify-center my-8 w-full">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search movies..."
          className="w-full pl-4 pr-12 pt-2 pb-2.5 border border-border-color rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background-secondary text-text-primary"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute -right-0.5 -top-0.5 mt-2 mr-2 flex items-center justify-center w-8 h-8 rounded-full transition-colors"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
