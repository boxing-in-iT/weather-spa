import { render, screen, fireEvent } from "@testing-library/react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { toggleCities } from "../store/features/citiesSlice";
import { toCelsius } from "../utils/toCelcius";
import SearchResults from "../components/SearchResults";

jest.mock("../hooks/useAppDispatch", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("../utils/toCelcius", () => ({
  toCelsius: jest.fn(),
}));

jest.mock("../store/features/citiesSlice", () => ({
  toggleCities: jest.fn(),
}));

describe("SearchResults component", () => {
  const mockDispatch = jest.fn();
  const mockCities = [
    { name: "London", country: "UK", temperature: 285 },
    { name: "Paris", country: "France", temperature: 290 },
  ];

  beforeEach(() => {
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (toCelsius as jest.Mock).mockImplementation((temp: number) =>
      Math.round(temp - 273.15)
    );
    jest.clearAllMocks();
  });

  it("показывает сообщение о загрузке, если `isFetching` равно `true`", () => {
    render(
      <SearchResults filteredCities={[]} isFetching={true} error={false} />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("показывает сообщение об ошибке, если `error` равно `true`", () => {
    render(
      <SearchResults filteredCities={[]} isFetching={false} error={true} />
    );

    expect(screen.getByText("City not found")).toBeInTheDocument();
  });

  it("рендерит список городов, если `filteredCities` не пустой", () => {
    render(
      <SearchResults
        filteredCities={mockCities}
        isFetching={false}
        error={false}
      />
    );

    expect(screen.getByText("London, UK - 12°C")).toBeInTheDocument(); // 285 K -> 12°C
    expect(screen.getByText("Paris, France - 17°C")).toBeInTheDocument(); // 290 K -> 17°C
  });

  it("вызывает `toggleCities` с корректным параметром при клике на город", () => {
    render(
      <SearchResults
        filteredCities={mockCities}
        isFetching={false}
        error={false}
      />
    );

    const londonItem = screen.getByText("London, UK - 12°C");
    fireEvent.click(londonItem);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(toggleCities(mockCities[0]));
  });

  it("ничего не рендерит, если `filteredCities` пустой и нет ошибок", () => {
    render(
      <SearchResults filteredCities={[]} isFetching={false} error={false} />
    );

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("City not found")).not.toBeInTheDocument();
  });
});
