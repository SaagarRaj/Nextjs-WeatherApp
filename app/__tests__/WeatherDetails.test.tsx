import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherDetails from "../component/WeatherDetails";

const MockData = {
  data: {
    current: {
      wind_mph: 10,
      humidity: 15,
      wind_dir: "SE",
      pressure_mb: 1000,
      feelslike_c: 11,
      vis_km: 10,
    },
    forecast: {
      forecastday: [
        {
          astro: {
            sunrise: "6:00 AM",
            sunset: "8:00 PM",
          },
        },
      ],
    },
  },
};

test("renders Weather Details with the correct data", () => {
  render(<WeatherDetails data={MockData} />);

  // Check if the main heading is rendered
  expect(screen.getByText("Weather Details")).toBeInTheDocument();

  // Check if Wind Speed is rendered
  expect(screen.getByText("Wind Speed")).toBeInTheDocument();
  expect(screen.getByText("10 mph")).toBeInTheDocument();

  // Check if Humidity is rendered
  expect(screen.getByText("Humidity")).toBeInTheDocument();
  expect(screen.getByText("80 %")).toBeInTheDocument();

  // Check if Wind Direction is rendered
  expect(screen.getByText("Wind Direction")).toBeInTheDocument();
  expect(screen.getByText("NE")).toBeInTheDocument();

  // Check if Sunrise is rendered
  expect(screen.getByText("Sunrise")).toBeInTheDocument();
  expect(screen.getByText("6:00 AM")).toBeInTheDocument();

  // Check if Sunset is rendered
  expect(screen.getByText("Sunset")).toBeInTheDocument();
  expect(screen.getByText("8:00 PM")).toBeInTheDocument();

  // Check if Air Pressure is rendered
  expect(screen.getByText("Air Pressure")).toBeInTheDocument();
  expect(screen.getByText("1015 hpa")).toBeInTheDocument();

  // Check if Feels Like is rendered
  expect(screen.getByText("Feels Like")).toBeInTheDocument();
  expect(screen.getByText("25°C")).toBeInTheDocument();

  // Check if Visibility is rendered
  expect(screen.getByText("Visibility")).toBeInTheDocument();
  expect(screen.getByText("10 km")).toBeInTheDocument();
});
