"use client";
import React, { useState } from "react";

import Input from "./component/Input";
import CurrentWeather from "./component/CurrentWeather";
import WeatherDetails from "./component/WeatherDetails";
import WeekForecast from "./component/WeekForecast";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const Url: string = "1d76c28c9c7b4088a6f35632241002";
  const url: string = `http://api.weatherapi.com/v1/forecast.json?key=${Url}&q=${location}&days=7&aqi=yes&alerts=yes`;

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        console.log(data);
        setData(data);
        setLocation("");
        setError("");
      } catch (error) {
        setError("City not found");
        console.log(error);
      }
    }
  };

  let content;
  if (Object.keys(data).length === 0 && error === "") {
    content = (
      <div>
        <h2>Welcome to weather App</h2>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div>
        <p>City not found</p>
        <p>Enter a valid City </p>
      </div>
    );
  } else {
    content = (
      <>
        <div>
          <CurrentWeather data={data} />
          <WeekForecast data={data} />
        </div>
        <div>
          <WeatherDetails />
        </div>
      </>
    );
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
      <div className="bg-white/25 w-full flex flex-col h-fit">
        {/* Input and Logo */}
        <div className="flex flex-col justify-between items-center p-12 md:flex-row">
          <Input handleSearch={handleSearch} setLocation={setLocation} />
          <h1 className="mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold font">
            Weather App.
          </h1>
        </div>
        {content}
      </div>
    </div>
  );
};

export default Home;
