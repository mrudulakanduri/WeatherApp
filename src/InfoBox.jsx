import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./InfoBox.css";

const INIT_URL =
  "https://images.unsplash.com/photo-1680352267694-a7fd4c33d4e1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VhdGhlciUyMGhhemV8ZW58MHx8MHx8fDA%3D";

export default function InfoBox({ info }) {
  // Nothing searched yet
  if (!info) {
    return (
      <div className="InfoBox">
        <p>Search for a city to see its weather.</p>
      </div>
    );
  }

  return (
    <div className="InfoBox">
      <h1>WeatherInfo - {info.weather}</h1>
      <div className="Container">
        <Card sx={{ maxWidth: 545 }}>
          <CardMedia sx={{ height: 140 }} image={INIT_URL} title={info.weather} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
            </Typography>
            <Typography variant="body2" color="text.secondary" component={"span"}>
              <p>Temperature = {info.temp}&deg;C</p>
              <p>Humidity = {info.humidity}%</p>
              <p>Min Temp = {info.tempMin}&deg;C</p>
              <p>Max Temp = {info.tempMax}&deg;C</p>
              <p>The weather feels like {info.feelsLike}&deg;C</p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}