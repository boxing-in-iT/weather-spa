import { useEffect, useState } from "react";
import { useGetWeatherByCityQuery } from "../store/aoi/weatherApi";

export const useWeatherData = (searchQuery: string) => {
  const [filteredCities, setFilteredCities] = useState<
    { name: string; country: string; temperature: number }[]
  >([]);

  const { data, error, isFetching } = useGetWeatherByCityQuery(searchQuery, {
    skip: !searchQuery,
  });

  useEffect(() => {
    if (data) {
      const cityInfo = {
        name: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
      };
      setFilteredCities([cityInfo]);
    } else if (error) {
      setFilteredCities([]);
    }
  }, [data, error]);

  console.log("filteredCities", filteredCities);

  return { filteredCities, isFetching, error };
};
