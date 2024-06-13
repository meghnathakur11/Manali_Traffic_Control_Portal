import React from "react";
import { useState } from "react";
import "./weather.css";

function Weather() {
  const api = {
    key: "6ccbc9bd2bf34768c20958871558f1bd",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  console.log(weather, "=========");

  return (
    <div className="weather_main">
        {/* <h4 id="heading_weather">Weather</h4> */}
      <div className="search_weather">
        
        <input
          className="input_weather"
          type="text"
          placeholder="Enter city/town..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search_butn" onClick={searchPressed}>
          Search
        </button>
      </div>

      {/* If weather is not undefined display results from API */}
      {typeof weather.main !== "undefined" ? (
        <>
          <div id="weather_det1">
            <p id="w">{weather.name}</p>

            <p id="w">{weather.main.temp}°C</p>
          
            <p id="w">{weather.weather[0].main}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Weather;
