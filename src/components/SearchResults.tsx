import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toggleCities } from "../store/features/citiesSlice";
import { toCelsius } from "../utils/toCelcius";

interface SearchResultsProps {
  filteredCities: { name: string; country: string; temperature: number }[];
  isFetching: boolean;
  error: boolean;
  onCitySelect: () => void;
}

const SearchResults = ({
  filteredCities,
  isFetching,
  error,
  onCitySelect,
}: SearchResultsProps) => {
  const dispatch = useAppDispatch();
  // const [results, setResults] = useState(filteredCities);

  return (
    <div className="search-results">
      {isFetching && <p>Loading...</p>}
      {error && <p className="error">City not found</p>}
      {filteredCities.length > 0 && (
        <ul>
          {filteredCities.map((city, index) => (
            <li
              key={index}
              onClick={() => {
                dispatch(toggleCities(city));
                onCitySelect();
              }}
            >
              {city.name}, {city.country} - {toCelsius(city.temperature)}°C
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
