// hooks/useWeatherData.ts
import { useEffect, useState } from "react";
import { useGetWeatherByCityQuery } from "../store/aoi/weatherApi";

export const useWeatherData = (searchQuery: string) => {
  const [filteredCities, setFilteredCities] = useState<
    { name: string; country: string; temperature: number }[]
  >([]);

  const { data, error, isFetching } = useGetWeatherByCityQuery(searchQuery, {
    skip: !searchQuery, // Skip request if search query is empty
  });

  useEffect(() => {
    if (data) {
      const cityInfo = {
        name: data.name,
        country: data.sys.country,
        temperature: data.main.temp, // Temperature in Kelvin
      };
      setFilteredCities([cityInfo]);
    } else if (error) {
      setFilteredCities([]);
    }
  }, [data, error]);

  return { filteredCities, isFetching, error };
};
