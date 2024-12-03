import { renderHook } from "@testing-library/react";
import { useWeatherData } from "../hooks/useWeatherData";
import { useGetWeatherByCityQuery } from "../store/aoi/weatherApi";

// Мок для useGetWeatherByCityQuery
jest.mock("../store/aoi/weatherApi", () => ({
  useGetWeatherByCityQuery: jest.fn(),
}));

describe("useWeatherData hook", () => {
  it("повертає відфільтровані міста після успішного запиту", () => {
    // Мок данных API
    const mockData = {
      name: "Kyiv",
      sys: { country: "UA" },
      main: { temp: 10 },
    };
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: mockData,
      error: null,
      isFetching: false,
    });

    const { result } = renderHook(() => useWeatherData("Kyiv"));

    expect(result.current.filteredCities).toEqual([
      { name: "Kyiv", country: "UA", temperature: 10 },
    ]);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("повертає порожній список у разі помилки", () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      error: { message: "Not Found" },
      isFetching: false,
    });

    const { result } = renderHook(() => useWeatherData("InvalidCity"));

    expect(result.current.filteredCities).toEqual([]);
    expect(result.current.isFetching).toBe(false);
    expect(result.current.error).toEqual({ message: "Not Found" });
  });

  it("правильно встановлює стан isFetching під час завантаження", () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isFetching: true,
    });

    const { result } = renderHook(() => useWeatherData("Kyiv"));

    expect(result.current.isFetching).toBe(true);
    expect(result.current.filteredCities).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
