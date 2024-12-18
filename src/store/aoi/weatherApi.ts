import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/",
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city: string) =>
        `weather?q=${city}&appid=830e6cfba3a0fb5b39877d118cb488ef`, // Получаем координаты города
    }),
    getForecastWeather: builder.query({
      query: (city: string) =>
        `forecast?q=${city}&appid=830e6cfba3a0fb5b39877d118cb488ef`,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetForecastWeatherQuery } =
  weatherApi;
