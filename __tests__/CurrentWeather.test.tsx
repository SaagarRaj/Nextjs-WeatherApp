import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CurrentWeather from "../app/component/CurrentWeather";

describe("CurrentWeather", () => {
  const mockData = {
    current: {
      condition: {
        icon: "mock-icon-url",
        text: "mock-condition-text",
      },
      temp_c: 25,
    },
    location: {
      name: "MockCity",
      region: "MockRegion",
    },
  };

  it("renders current date", () => {
    const { getByText } = render(<CurrentWeather data={mockData} />);
    const todayHeader = getByText(/Today/i);
    expect(todayHeader).toBeInTheDocument();
  });

  it("renders current temperature", () => {
    const { getByText } = render(<CurrentWeather data={mockData} />);
    const temperatureText = getByText(/25°C/i);
    expect(temperatureText).toBeInTheDocument();
  });

  it("renders current condition text", () => {
    const { getByText } = render(<CurrentWeather data={mockData} />);
    const conditionText = getByText(/mock-condition-text/i);
    expect(conditionText).toBeInTheDocument();
  });

  it("renders location information", () => {
    const { getByText } = render(<CurrentWeather data={mockData} />);
    const locationText = getByText(/MockCity, MockRegion/i);
    expect(locationText).toBeInTheDocument();
  });

  it("renders weather icon if provided", () => {
    const { getByAltText } = render(<CurrentWeather data={mockData} />);
    const weatherIcon = getByAltText(/mock-condition-text/i);
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute("src", "mock-icon-url");
  });

  it("does not render weather icon if not provided", () => {
    const dataWithoutIcon = {
      ...mockData,
      current: {
        ...mockData.current,
        condition: { text: "mock-condition-text" },
      },
    };
    const { queryByAltText } = render(
      <CurrentWeather data={dataWithoutIcon} />
    );
    const weatherIcon = queryByAltText(/mock-condition-text/i);
    expect(weatherIcon).not.toBeInTheDocument();
  });
});
