import { useGetWeatherByCityQuery } from "../store/aoi/weatherApi";

export const useCityWeather = (cityName: string) => {
  const { data, error, isLoading, refetch } =
    useGetWeatherByCityQuery(cityName);
  return {
    weatherData: data,
    cityError: error,
    isLoading,
    refetch,
  };
};
