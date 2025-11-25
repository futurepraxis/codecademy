//Store API Key and URLs
const API_KEY = '39018b348a0841e08dc0bc4ccf539503';
const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';

//Hooks
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
let currentWeather = null;
let forecastWeather = null;

//Add event handler to submit form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    let isAlphabetic = /^[A-Za-z]+$/.test(city);
    if (isAlphabetic) {
        getGeolocation(city);
        //getForecastWeather();
    } else {
        alert("Please enter a valid city (A-Z only)");
    };
});

//Look up latitude and longitude based on city name
// function getGeolocation(city) {
//     const url = `${GEO_URL}?q=${encodeURIComponent(
//         city
//     )}&appid=${API_KEY}&units=imperial`;
//     fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       let lat = data[0].lat;
//       let lon = data[0].lon;
//       getCurrentWeather(lat, lon);
//     });
// };

async function getGeolocation(city) {
  const url = `${GEO_URL}?q=${encodeURIComponent(
        city
    )}&appid=${API_KEY}&units=imperial`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
      if (data.length == 0) {
          alert('Location not found. Please try again.')
      } else {
          let lat = data[0].lat;
          let lon = data[0].lon;
          getCurrentWeather(lat, lon);
      }
  } catch (error) {
    console.error(error.message);
  }
}

//Look up current weather data
function getCurrentWeather(lat, lon) {
    const url = `${CURRENT_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentWeather = data;
      updateCurrentWeatherUI();
    });
};

//render current weather card
function updateCurrentWeatherUI() {
    const cityName = currentWeather.name;
    const currentWeatherText = document.getElementById('currentWeatherDetails');
    const currentTemp = Math.round(currentWeather.main.temp);
    const currentFeelsLike = Math.round(currentWeather.main.feels_like);
    const currentWind = Math.round(currentWeather.wind.speed);
    const icon = currentWeather.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    // document.getElementById('weatherInfo').classList.toggle('is-hidden');
    document.getElementById('currentCityName').innerHTML = `<strong>Current City:</strong> ${cityName}`;
    document.getElementById('currentTemp').textContent = currentTemp;
    document.getElementById('currentIcon').src = iconURL;
    document.getElementById('currentDescription').textContent = currentWeather.weather[0].description;
    
    currentWeatherText.innerHTML =  `
    <li><strong>Feels Like:</strong> ${currentFeelsLike}°F</li>
    <li><strong>Current Humidity:</strong> ${currentWeather.main.humidity}%</li>
    <li><strong>Current Wind:</strong> ${currentWind} mph</li>
   `
}

