import { useState } from "react";
import { Link } from "react-router-dom";
import { useWeatherData } from "../hooks/useWeatherData";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { filteredCities, isFetching, error } = useWeatherData(searchQuery);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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
        />
      </div>
    </header>
  );
};

export default Header;
