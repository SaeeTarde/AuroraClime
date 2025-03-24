document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.querySelector(".city-input");

  const getWeatherBtn = document.getElementById("get-weather-btn");

  const weatherInfo = document.getElementById("weather-info");

  const temperatureDisplay = document.getElementById("temperature");

  const humidityDisplay = document.getElementById("humidity");

  const descriptionDisplay = document.getElementById("description");

  const errorMessage = document.getElementById("error-message");
  errorMessage.classList.add("hidden");

  const API_KEY = "61b338af7f59d003bb344157fca8a871";

  getWeatherBtn.addEventListener("click", async () => {
    errorMessage.classList.add("hidden");
    weatherInfo.classList.add("hidden");
    const city = cityInput.value.trim();
    if (!city) {
      showError();
      return;
    }
    try {
      const weatherData = await fetchData(city);
      console.log("Weather API Response:", weatherData); // Debugging
      if (weatherData.cod !== 200) {
        showError("Incorrect city name!");
        return;
      }
      displayWeatherData(weatherData);
      const cat = document.querySelector(".cat");
      if (cat) {
        cat.style.animation = "shake 0.5s infinite alternate ease-in-out";
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      showError("Network error! Please try again.");
    }
  });

  document.querySelector(".cat").addEventListener("mouseleave", () => {
    document.querySelector(".cat").style.animation = "";
  });

  const styleSheet = document.createElement("style");

  styleSheet.innerHTML = `@keyframes shake {
    0% { transform: rotate(-10deg); }
    100% { transform: rotate(10deg); }
  }`;

  document.head.appendChild(styleSheet);

  async function fetchData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Check the API response in console
      return data;
    } catch (error) {
      console.error("Fetch Error:", error);
      return null;
    }
  }

  function displayWeatherData(weatherData) {
    const { main, weather } = weatherData;
    temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    humidityDisplay.textContent = `Humidity : ${main.humidity}`;
    descriptionDisplay.textContent = `${weather[0].description}`;
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    cityInput.textContent = "";
  }

  function showError() {
    // Display a specific error message
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
