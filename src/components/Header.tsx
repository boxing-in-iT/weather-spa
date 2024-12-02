import React, { useEffect, useState } from "react";
import { useGetWeatherByCityQuery } from "../store/aoi/weatherApi";
import { toCelsius } from "../utils/toCelcius";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toggleCities } from "../store/features/citiesSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState<
    { name: string; country: string; temperature: number }[]
  >([]);
  const dispatch = useAppDispatch();

  // Выполняем запрос к API
  const { data, error, isFetching } = useGetWeatherByCityQuery(searchQuery, {
    skip: !searchQuery, // Пропуск запроса, если строка поиска пуста
  });

  console.log("Data:", data);

  // Обновляем список результатов, если данные обновились
  useEffect(() => {
    if (data) {
      const cityInfo = {
        name: data.name,
        country: data.sys.country,
        temperature: data.main.temp, // Температура в Кельвинах
      };
      setFilteredCities([cityInfo]);
    } else if (error) {
      setFilteredCities([]);
    }
  }, [data, error]);

  // Обработчик изменения строки поиска
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setFilteredCities([]); // Очищаем результаты до получения новых данных
  };

  return (
    <header className="header">
      <div className="header__logo">WeatherApp</div>
      <div className="header__search">
        <input
          type="text"
          placeholder="Search for a city..."
          className="header__search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="search-results">
          {isFetching && <p>Loading...</p>}
          {error && <p className="error">City not found</p>}
          {filteredCities.length > 0 && (
            <ul>
              {filteredCities.map((city, index) => (
                <li key={index} onClick={() => dispatch(toggleCities(city))}>
                  {city.name}, {city.country} - {toCelsius(city.temperature)}°C
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
