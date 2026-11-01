import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./Searchbox.css";
import { useState } from "react";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export default function Searchbox({ updateInfo }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherInfo = async (cityName) => {
    if (!API_KEY) {
      throw new Error("API key is missing. Add VITE_WEATHER_KEY to your .env file.");
    }

    const response = await fetch(
      `${API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );
    const jsonResponse = await response.json();

    // fetch does NOT throw on 404/401, so check response.ok yourself
    if (!response.ok) {
      throw new Error(
        response.status === 404
          ? "City not found. Please check the spelling."
          : jsonResponse.message || "Something went wrong. Please try again."
      );
    }

    return {
      city: jsonResponse.name,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
  };

  const handleChange = (evt) => {
    setCity(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const cityName = city.trim();
    if (!cityName) return;

    setLoading(true);
    setError("");
    try {
      const result = await getWeatherInfo(cityName);
      updateInfo(result);
      setCity(""); // clear the input only after a successful search
    } catch (err) {
      // A TypeError from fetch means the network request itself failed
      setError(
        err instanceof TypeError
          ? "Network error. Check your internet connection."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Searchbox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="Cityname"
          variant="outlined"
          value={city}
          onChange={handleChange}
          fullWidth
          required
        />
        <br />
        <br />
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </div>
  );
}