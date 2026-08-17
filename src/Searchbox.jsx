import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./Searchbox.css";
import { useState } from 'react';

export default function Searchbox({ updateInfo }) {
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "ed9d42e5504ac5821ae0df0d70a9b0f0";
    let [city, setCity] = useState("");

    let getWeatherInfo = async () => {
        let response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
        );
        let jsonResponse = await response.json();
        let result = {
            city: jsonResponse.name,
            temp: jsonResponse.main.temp,
            tempMin: jsonResponse.main.temp_min,
            tempMax: jsonResponse.main.temp_max,
            humidity: jsonResponse.main.humidity,
            feelsLike: jsonResponse.main.feels_like,
            weather: jsonResponse.weather[0].description,
        };
        updateInfo(result);
    };

    let handleChange = (evt) => {
        setCity(evt.target.value);
    };

    let handleSubmit = (evt) => {
        evt.preventDefault();
        getWeatherInfo();
        setCity("");
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
                <br /><br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
            </form>
        </div>
    );
}