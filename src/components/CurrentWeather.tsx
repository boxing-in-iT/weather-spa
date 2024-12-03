// components/CurrentWeather.tsx
import React from "react";
import { toCelsius } from "../utils/toCelcius";

const CurrentWeather = ({ weatherData }: any) => {
  return (
    <div className="city-detail-current__content">
      <div className="city-detail-current__content-box">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="current-weather__icon"
        />
      </div>
      <div className="city-detail-current__content-box">
        <p>
          <strong>Temperature:</strong> {toCelsius(weatherData.main.temp)}°C
        </p>
        <p>
          <strong>Feels like:</strong> {toCelsius(weatherData.main.feels_like)}
          °C
        </p>
        <p>
          <strong>Humidity:</strong> {weatherData.main.humidity}%
        </p>
        <p>
          <strong>Wind:</strong> {weatherData.wind.speed} m/s
        </p>
        <p>
          <strong>Visibility:</strong> {weatherData.visibility / 1000} km
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
