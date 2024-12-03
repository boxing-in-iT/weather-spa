import React from "react";

interface SearchInputProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchInput = ({ searchQuery, onSearchChange }: SearchInputProps) => {
  return (
    <input
      type="text"
      placeholder="Search for a city..."
      className="header__search-input"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchInput;
