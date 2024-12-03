import { useParams } from "react-router-dom";
import { useWeatherDetails } from "../../hooks/useWeatherDetails";
import CurrentWeather from "../../components/CurrentWeather";
import Forecast from "../../components/Forecast";

const CityDetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const {
    currentWeather,
    currentError,
    isCurrentLoading,
    forecastError,
    isForecastLoading,
    groupedForecast,
    refetchCurrentWeather,
    refetchForecastWeather,
  } = useWeatherDetails(name ?? "");

  if (currentError || forecastError)
    return (
      <div className="error">
        Could not load weather data for {name}. Please try again later.
      </div>
    );

  if (isCurrentLoading || isForecastLoading)
    return (
      <div className="loading">Fetching weather details for {name}...</div>
    );

  return (
    <div className="city-detail">
      <div className="city-detail-current">
        <h1 className="city-detail-current__title">Weather in {name}</h1>
        <CurrentWeather weatherData={currentWeather} />
        <div className="city-detaile-current_buttons">
          <button
            className="update-button"
            onClick={() => {
              refetchCurrentWeather();
              refetchForecastWeather();
            }}
          >
            Оновити дані
          </button>
        </div>

        <div className="city-detail-cards">
          <div className="city-detail-cards__title">Forecast</div>
          <Forecast groupedForecast={groupedForecast} />
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;
