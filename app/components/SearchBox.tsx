import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <FaSearch className="absolute top-3 left-3 text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search products..."
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {query && (
        <FaTimes
          onClick={clearSearch}
          className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-red-500"
        />
      )}
    </div>
  );
};

export default SearchBox;
