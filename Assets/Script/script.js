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
