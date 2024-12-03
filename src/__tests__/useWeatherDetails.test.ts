import { renderHook } from "@testing-library/react";
import { useWeatherDetails } from "../hooks/useWeatherDetails";
import {
  useGetForecastWeatherQuery,
  useGetWeatherByCityQuery,
} from "../store/aoi/weatherApi";

// Мокаем оба API-хука
jest.mock("../store/aoi/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn(),
  useGetForecastWeatherQuery: jest.fn(),
}));

describe("useWeatherDetails hook", () => {
  it("возвращает корректные данные для текущей погоды и прогноза", () => {
    // Мок данных для текущей погоды
    const mockCurrentWeather = {
      name: "Kyiv",
      sys: { country: "UA" },
      main: { temp: 10 },
    };

    // Мок данных для прогноза погоды
    const mockForecast = {
      list: [
        { dt_txt: "2024-12-03 12:00:00", main: { temp: 5 } },
        { dt_txt: "2024-12-03 18:00:00", main: { temp: 3 } },
        { dt_txt: "2024-12-04 06:00:00", main: { temp: 0 } },
      ],
    };

    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: mockCurrentWeather,
      error: null,
      isLoading: false,
    });

    (useGetForecastWeatherQuery as jest.Mock).mockReturnValue({
      data: mockForecast,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useWeatherDetails("Kyiv"));

    // Проверяем данные текущей погоды
    expect(result.current.currentWeather).toEqual(mockCurrentWeather);
    expect(result.current.currentError).toBeNull();
    expect(result.current.isCurrentLoading).toBe(false);

    // Проверяем данные прогноза погоды
    expect(result.current.forecast).toEqual(mockForecast);
    expect(result.current.forecastError).toBeNull();
    expect(result.current.isForecastLoading).toBe(false);

    // Проверяем сгруппированные данные прогноза
    expect(result.current.groupedForecast).toEqual({
      "2024-12-03": [
        { dt_txt: "2024-12-03 12:00:00", main: { temp: 5 } },
        { dt_txt: "2024-12-03 18:00:00", main: { temp: 3 } },
      ],
      "2024-12-04": [{ dt_txt: "2024-12-04 06:00:00", main: { temp: 0 } }],
    });
  });

  it("возвращает ошибки, если оба запроса завершились неудачно", () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      error: { message: "City not found" },
      isLoading: false,
    });

    (useGetForecastWeatherQuery as jest.Mock).mockReturnValue({
      data: null,
      error: { message: "Forecast not available" },
      isLoading: false,
    });

    const { result } = renderHook(() => useWeatherDetails("InvalidCity"));

    // Проверяем ошибки
    expect(result.current.currentWeather).toBeNull();
    expect(result.current.currentError).toEqual({ message: "City not found" });
    expect(result.current.isCurrentLoading).toBe(false);

    expect(result.current.forecast).toBeNull();
    expect(result.current.forecastError).toEqual({
      message: "Forecast not available",
    });
    expect(result.current.isForecastLoading).toBe(false);
  });

  it("правильно устанавливает состояние загрузки", () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    (useGetForecastWeatherQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useWeatherDetails("Kyiv"));

    // Проверяем состояние загрузки
    expect(result.current.isCurrentLoading).toBe(true);
    expect(result.current.isForecastLoading).toBe(true);
    expect(result.current.currentWeather).toBeNull();
    expect(result.current.forecast).toBeNull();
  });
});
