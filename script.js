const axios = require('axios');

export default async function handler(req, res) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const weatherApiResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=YOUR_WEATHERAPI_KEY&q=${city}`);
    const openWeatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_OPENWEATHERMAP_KEY`);

    res.status(200).json({
      weatherAPI: {
        temp: weatherApiResponse.data.current.temp_c,
        condition: weatherApiResponse.data.current.condition.text,
        humidity: weatherApiResponse.data.current.humidity,
      },
      openWeather: {
        temp: (openWeatherResponse.data.main.temp - 273.15).toFixed(1), // Convert Kelvin to Celsius
        condition: openWeatherResponse.data.weather[0].description,
        humidity: openWeatherResponse.data.main.humidity,
      },
    });
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
