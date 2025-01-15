const fetchWeatherData = async () => {
  let city = document.getElementById("city").value.trim();
  city = sanitizeInput(city);
  if (!city) {
    displayError("Please enter a city name.");
    return;
  }

  const refreshButton = document.getElementById("refresh-weather");
  refreshButton.classList.add("loading");

  try {
    const currentTime = new Date().toLocaleString();
    // Replace `/weather` with your full API URL
    const response = await fetch(`https://lwahr.vercel.app/weather?city=${city}`);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const data = await response.json();

    updateWeatherInfo(data.weatherAPI, "weatherapi", currentTime);
    updateWeatherInfo(data.openWeather, "openweather", currentTime);
    updateWeatherInfo(data.accuWeather, "accuweather", currentTime);

    updateSummary(data.summary);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    displayError("Failed to fetch weather data. Please try again.");
  } finally {
    refreshButton.classList.remove("loading");
  }
};
