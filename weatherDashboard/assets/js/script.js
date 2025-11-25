//Store API Key and URLs
const API_KEY = '39018b348a0841e08dc0bc4ccf539503';
const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

//Hooks
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
let currentWeather = null;
let forecastWeather = null;

//Add event handler to submit form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    console.log(`The city is ${city}`);
    getCurrentWeather(city);
    //getForecastWeather();
});

function getCurrentWeather(city) {
    const url = `${CURRENT_URL}?q=${encodeURIComponent(
        city
    )}&appid=${API_KEY}&units=imperial`;
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      currentWeather = data;
       updateCurrentWeatherUI();
    });
};

function updateCurrentWeatherUI() {
    const currentWeatherText = document.getElementById('currentWeatherDetails');
    const currentTemp = Math.round(currentWeather.main.temp);
    const currentFeelsLike = Math.round(currentWeather.main.feels_like);
    const currentWind = Math.round(currentWeather.wind.speed);
    const icon = currentWeather.weather[0].icon;
    
    document.getElementById('currentCityName').textContent = currentWeather.name;
    currentWeatherText.innerHTML =  `
    <li>${currentWeather.weather[0].description}</li>
    <li>Current Temp: ${currentTemp}°F</li>
    <li>Feels Like: ${currentFeelsLike}°F</li>
    <li>Current Humidity: ${currentWeather.main.humidity}%</li>
    <li>Current Wind: ${currentWind} mph</li>
   `
}

