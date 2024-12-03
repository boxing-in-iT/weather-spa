import {
  useGetForecastWeatherQuery,
  useGetWeatherByCityQuery,
} from "../store/aoi/weatherApi";

export const useWeatherDetails = (cityName: string) => {
  const {
    data: currentWeather,
    error: currentError,
    isLoading: isCurrentLoading,
    refetch: refetchCurrentWeather,
  } = useGetWeatherByCityQuery(cityName);

  const {
    data: forecast,
    error: forecastError,
    isLoading: isForecastLoading,
    refetch: refetchForecastWeather,
  } = useGetForecastWeatherQuery(cityName);

  const groupedForecast = forecast?.list.reduce(
    (acc: Record<string, any[]>, item: any) => {
      const date = item.dt_txt.split(" ")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {}
  );

  return {
    currentWeather,
    currentError,
    isCurrentLoading,
    forecast,
    forecastError,
    isForecastLoading,
    groupedForecast,
    refetchCurrentWeather,
    refetchForecastWeather,
  };
};
