import { useState } from "react";
import SearchBox from "./Searchbox";
import InfoBox from "./InfoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState(null);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Weather App</h2>
      <SearchBox updateInfo={setWeatherInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}