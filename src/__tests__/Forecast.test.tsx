import { render, screen } from "@testing-library/react";
import Forecast from "../components/Forecast";
import { toCelsius } from "../utils/toCelcius";

jest.mock("../utils/toCelcius", () => ({
  toCelsius: jest.fn(),
}));

describe("Forecast component", () => {
  const mockGroupedForecast = {
    "2024-12-03": [
      {
        dt: 1,
        dt_txt: "2024-12-03 09:00:00",
        main: { temp: 280 },
        weather: [{ icon: "10d", description: "rain" }],
      },
      {
        dt: 2,
        dt_txt: "2024-12-03 12:00:00",
        main: { temp: 285 },
        weather: [{ icon: "01d", description: "clear sky" }],
      },
    ],
    "2024-12-04": [
      {
        dt: 3,
        dt_txt: "2024-12-04 15:00:00",
        main: { temp: 290 },
        weather: [{ icon: "02d", description: "few clouds" }],
      },
    ],
  };

  beforeEach(() => {
    (toCelsius as jest.Mock).mockImplementation((temp: number) =>
      Math.round(temp - 273.15)
    );
  });

  it("рендерит дни и прогнозы для каждого дня", () => {
    render(<Forecast groupedForecast={mockGroupedForecast} />);

    // Проверяем заголовки с датами
    expect(screen.getByText("2024-12-03")).toBeInTheDocument();
    expect(screen.getByText("2024-12-04")).toBeInTheDocument();

    // Проверяем отфильтрованные времена
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("15:00")).toBeInTheDocument();
  });

  it("отображает температуру в Цельсиях", () => {
    render(<Forecast groupedForecast={mockGroupedForecast} />);

    expect(toCelsius).toHaveBeenCalledWith(280);
    expect(toCelsius).toHaveBeenCalledWith(285);
    expect(toCelsius).toHaveBeenCalledWith(290);

    // Проверяем отображение температуры
    expect(screen.getByText("7°C")).toBeInTheDocument(); // 280 K -> 7°C
    expect(screen.getByText("12°C")).toBeInTheDocument(); // 285 K -> 12°C
    expect(screen.getByText("17°C")).toBeInTheDocument(); // 290 K -> 17°C
  });

  it("рендерит иконки и описания погоды", () => {
    render(<Forecast groupedForecast={mockGroupedForecast} />);

    const icons = screen.getAllByRole("img");
    expect(icons).toHaveLength(3);

    expect(icons[0]).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/10d@2x.png"
    );
    expect(icons[0]).toHaveAttribute("alt", "rain");

    expect(icons[1]).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/01d@2x.png"
    );
    expect(icons[1]).toHaveAttribute("alt", "clear sky");

    expect(icons[2]).toHaveAttribute(
      "src",
      "https://openweathermap.org/img/wn/02d@2x.png"
    );
    expect(icons[2]).toHaveAttribute("alt", "few clouds");
  });

  it("ничего не рендерит, если groupedForecast пустой", () => {
    render(<Forecast groupedForecast={{}} />);

    expect(screen.queryByText("2024-12-03")).not.toBeInTheDocument();
    expect(screen.queryByText("09:00")).not.toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
