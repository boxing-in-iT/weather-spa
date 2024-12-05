import { useState } from "react";
import { Link } from "react-router-dom";
import { useWeatherData } from "../hooks/useWeatherData";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { filteredCities, setFilteredCities, isFetching, error } =
    useWeatherData(searchQuery);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCitySelect = () => {
    setSearchQuery("");
    setFilteredCities([]);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to={"/"}>WeatherApp</Link>
      </div>
      <div className="header__search">
        <SearchInput
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <SearchResults
          filteredCities={filteredCities}
          isFetching={isFetching}
          error={!!error}
          onCitySelect={handleCitySelect}
        />
      </div>
    </header>
  );
};

export default Header;
