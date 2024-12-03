import { GroupedForecast } from "../types/weather";
import { toCelsius } from "../utils/toCelcius";

interface ForecastProps {
  groupedForecast: GroupedForecast;
}

const Forecast = ({ groupedForecast }: ForecastProps) => {
  const days = Object.keys(groupedForecast || {}).slice(0, 5);
  return (
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
  );
};

export default Forecast;
