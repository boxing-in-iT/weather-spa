import { useAppDispatch } from "../hooks/useAppDispatch";
import { City } from "../types/global";
import { useCityWeather } from "../hooks/useCityWeather";
import { toCelsius } from "../utils/toCelcius";

interface CityProps {
  city: City;
  onRemove: (city: City) => void;
}

const CityCard = ({ city, onRemove }: CityProps) => {
  const { weatherData, cityError } = useCityWeather(city.name);

  if (cityError) return <div>Error loading data for {city.name}</div>;

  if (!weatherData) return <div>Loading...</div>;

  const { main, weather } = weatherData;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div key={city.name} className="city-card">
      <span className="remove-icon" onClick={() => onRemove(city)}>
        &times;
      </span>
      <h3>{city.name}</h3>
      <img src={weatherIconUrl} alt={weather[0].description} />
      <p>{weather[0].description}</p>
      <p>
        Температура: {toCelsius(main.temp)}°C (мин: {toCelsius(main.temp_min)}
        °C, макс: {toCelsius(main.temp_max)}°C)
      </p>
    </div>
  );
};

export default CityCard;
