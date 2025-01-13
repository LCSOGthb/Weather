const debounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const sanitizeInput = (input) => {
  const element = document.createElement('div');
  element.innerText = input;
  return element.innerHTML;
};

const displayError = (message) => {
  const errorElement = document.getElementById("error-message");
  errorElement.textContent = message;
  errorElement.style.display = "block";
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 5000);
};

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
    const response = await fetch(`/weather?city=${city}`);
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

document.getElementById("fetch-weather").addEventListener("click", debounce(fetchWeatherData, 300));
