"use client";
import React, { useState } from "react";
require("dotenv").config();
import Input from "./component/Input";
import CurrentWeather from "./component/CurrentWeather";
import WeatherDetails from "./component/WeatherDetails";
import WeekForecast from "./component/WeekForecast";

const Home = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const Url = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

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
        //console.log(data);
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
      <div className="text-white text-center h-screen mt-[5rem]">
        <h2 className="text-3xl font-bold mb-4">Welcome to weather App</h2>
        <p className="text-xl font-thin">
          {" "}
          Enter a city name to get the weather forecast
        </p>
      </div>
    );
  } else if (error !== "") {
    content = (
      <div className="text-white text-center h-screen mt-[5rem]">
        <p className="text-3xl font-bold mb-4">City not found</p>
        <p className="text-xl font-thin">Enter a valid City </p>
      </div>
    );
  } else {
    content = (
      <>
        <div className="flex md:flex-row flex-col p-12 item-center justify-between">
          {/*//@ts-ignore*/}
          <CurrentWeather data={data} />
          {/*//@ts-ignore*/}
          <WeekForecast data={data} />
        </div>
        <div>
          {/*//@ts-ignore*/}
          <WeatherDetails data={data} />
        </div>
      </>
    );
  }

  return (
    <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-fit">
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
