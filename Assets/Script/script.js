const API_KEY = "9747fc5f9f0716bfbe8bab5aa1dc7a61";



// DOM element references
const locationInput = document.getElementById('locationInput');
const findWeatherButton = document.getElementById('findWeather');
const pastSearchesSection = document.getElementById('pastSearches');
const placeNameElement = document.getElementById('placeName');
const weatherDateElement = document.getElementById('weatherDate');
const currentIcon = document.getElementById('currentIcon');
const tempNowElement = document.getElementById('tempNow');
const windNowElement = document.getElementById('windNow');
const humidityNowElement = document.getElementById('humidityNow');
const forecastContainer = document.getElementById('forecastContainer');

// Function to handle city searches
function fetchCityWeather(cityName) {
  const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  fetch(geocodeUrl)
      .then(response => response.json())
      .then(locations => {
          if (locations && locations.length > 0) {
              const { lat, lon } = locations[0];
              fetchWeather(lat, lon);
          } else {
              alert('City not found. Please try another search.');
          }
      })
      .catch(error => console.error('Error fetching city coordinates:', error));
}
// Function to fetch weather forecast from OpenWeatherMap
function fetchWeather(lat, lon) {
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&cnt=40&appid=${API_KEY}`;

  fetch(forecastUrl)
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to fetch weather data: ' + response.status);
          }
          return response.json();
      })
      .then(data => {
          displayWeather(data);
          displayFiveDay(data);
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
          alert('Error fetching weather data: ' + error.message);
      });
}
// Display current weather data
function displayWeather(data) {
  placeNameElement.textContent = data.city.name;
  const currentDate = new Date(data.list[0].dt * 1000);
  weatherDateElement.textContent = currentDate.toLocaleDateString();
  currentIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
  currentIcon.style.display = 'block';
  tempNowElement.textContent = `${data.list[0].main.temp} °F`;
  windNowElement.textContent = `${data.list[0].wind.speed} mph`;
  humidityNowElement.textContent = `${data.list[0].main.humidity} %`;
}
