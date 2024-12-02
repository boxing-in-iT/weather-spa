import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetForecastWeatherQuery,
  useGetWeatherByCityQuery,
} from "../../store/aoi/weatherApi";
import { toCelsius } from "../../utils/toCelcius";

const CityDetailPage = () => {
  const { name } = useParams<{ name: string }>();

  const {
    data: currentWeather,
    error: currentError,
    isLoading: isCurrentLoading,
  } = useGetWeatherByCityQuery(name ?? "");
  const {
    data: forecast,
    error: forecastError,
    isLoading: isForecastLoading,
  } = useGetForecastWeatherQuery(name ?? "");

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

  const groupedForecast = forecast?.list.reduce(
    (acc: Record<string, any[]>, item: any) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {}
  );

  const days = Object.keys(groupedForecast || {}).slice(0, 5);

  return (
    <div className="city-detail">
      <div className="city-detail-current">
        <h1 className="city-detail-current__title">Weather in {name}</h1>
        <div className="city-detail-current__content">
          <div className="city-detail-current__content-box">
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
              alt={currentWeather.weather[0].description}
              className="current-weather__icon"
            />
          </div>
          <div className="city-detail-current__content-box">
            <p>
              <strong>Temperature:</strong>{" "}
              {toCelsius(currentWeather.main.temp)}°C
            </p>
            <p>
              <strong>Feels like:</strong>{" "}
              {toCelsius(currentWeather.main.feels_like)}°C
            </p>
            <p>
              <strong>Humidity:</strong> {currentWeather.main.humidity}%
            </p>
            <p>
              <strong>Wind:</strong> {currentWeather.wind.speed} m/s
            </p>
            <p>
              <strong>Visibility:</strong> {currentWeather.visibility / 1000} km
            </p>
          </div>
        </div>
        <div className="city-detail-cards">
          <div className="city-detail-cards__title">Forecast</div>
          <div className="city-detail-cards__content">
            {days.map((date) => (
              <div key={date} className="city-detail-cards__content-card">
                <h4>{date}</h4>
                <div className="forecast__items">
                  {groupedForecast[date]
                    .filter((item: any) =>
                      [
                        "09:00:00",
                        "12:00:00",
                        "15:00:00",
                        "18:00:00",
                        "21:00:00",
                      ].includes(item.dt_txt.split(" ")[1])
                    )
                    .map((item: any) => (
                      <div key={item.dt} className="forecast__item">
                        <p className="forecast__time">
                          <strong>Time:</strong>{" "}
                          {item.dt_txt.split(" ")[1].slice(0, 5)}
                        </p>
                        <p className="forecast__temperature">
                          {toCelsius(item.main.temp)}°C
                        </p>
                        <img
                          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          alt={item.weather[0].description}
                          className="forecast__icon"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;
