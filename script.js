const fetchWeatherData = async () => {
  const city = document.getElementById("city").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const refreshButton = document.getElementById("refresh-weather");
  refreshButton.classList.add("loading");

  try {
    const currentTime = new Date().toLocaleString();
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    updateWeatherInfo(data.weatherAPI, "weatherapi", currentTime);
    updateWeatherInfo(data.openWeather, "openweather", currentTime);
    updateWeatherInfo(data.accuWeather, "accuweather", currentTime);

    updateSummary(data.summary);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Failed to fetch weather data. Please try again.");
  } finally {
    refreshButton.classList.remove("loading");
  }
};

const updateWeatherInfo = (data, containerId, time) => {
  const container = document.getElementById(containerId);
  if (data) {
    container.querySelector(".info").innerHTML = `
      Temperature: ${data.temp}°C<br>
      Condition: ${data.condition}<br>
      Humidity: ${data.humidity}%
    `;
    container.querySelector(".timestamp").textContent = `Data collected at: ${time}`;
  } else {
    container.querySelector(".info").textContent = "No data available.";
  }
};

document.getElementById("fetch-weather").addEventListener("click", fetchWeatherData);
