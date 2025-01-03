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
  const infoElement = document.getElementById(`${containerId}-info`);
  const timeElement = document.getElementById(`${containerId}-time`);

  if (data) {
    infoElement.innerHTML = `
      Temperature: ${data.temp}°C<br>
      Condition: ${data.condition}<br>
      Humidity: ${data.humidity}%
    `;
    timeElement.textContent = `Data collected at: ${time}`;
  } else {
    infoElement.textContent = "No data available.";
  }
};

document.getElementById("fetch-weather").addEventListener("click", fetchWeatherData);
