//Store API Key and URLs
const API_KEY = '39018b348a0841e08dc0bc4ccf539503';
const CURRENT_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct';

//Hooks
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');

//Add event handler to submit form
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    // let isAlphabetic = /^[A-Za-z]+$/.test(city);
    // if (isAlphabetic) {
    //     getGeolocation(city);
    // } else {
    //     alert("Please enter a valid city (A-Z only)");
    // };
    getGeolocation(city);
    if (!city) {
        alert('Please enter a city.');
    }
});

// Get latitude and longitude of city
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
    
    //Check if geolocation data exists
      if (data.length == 0) {
          alert('Location not found. Please try again.')
      } else {
          let lat = data[0].lat;
          let lon = data[0].lon;
          getCurrentWeather(lat, lon);
          getForecastWeather(lat, lon);
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
      updateCurrentWeatherUI(data);
    });
};

//Look up 5-day forecast data
function getForecastWeather(lat, lon) {
    const url = `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      updateForecastWeatherUI(data);
    });
};

//render current weather card
function updateCurrentWeatherUI(data) {
    document.getElementById('weatherInfo').classList.toggle('is-hidden');
    const cityName = data.name;
    const currentWeatherText = document.getElementById('currentWeatherDetails');
    const currentTemp = Math.round(data.main.temp);
    const currentFeelsLike = Math.round(data.main.feels_like);
    const currentWind = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById('currentCityName').innerHTML = `<strong>Current City:</strong> ${cityName}`;
    document.getElementById('currentTemp').textContent = currentTemp;
    document.getElementById('currentIcon').src = iconURL;
    document.getElementById('currentDescription').textContent = data.weather[0].description;
    
    currentWeatherText.innerHTML =  `
    <li><strong>Feels Like:</strong> ${currentFeelsLike}°F</li>
    <li><strong>Current Humidity:</strong> ${data.main.humidity}%</li>
    <li><strong>Current Wind:</strong> ${currentWind} mph</li>
   `;
};

//render forecast cards 
function updateForecastWeatherUI(data) {
    // Select one forecast per day
    const daily = data.list.filter((item) =>
        item.dt_txt.includes('12:00:00')
    );

    daily.forEach((item) => {
    const date = new Date(item.dt_txt);
    const {
      main: { temp },
      weather,
    } = item;
    
    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const icon = weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const forecastGrid = document.getElementById('forecastGrid');
    const forecastCard = document.createElement('div');
    forecastCard.classList.add('cell');
    forecastCard.innerHTML = `
        <div class="card content has-text-centered p-3">
            <h4 class="is-size-4">${formattedDate}</h4>
                <div class="card-image">
                    <figure class="image is-96x96 mx-auto">
                            <img src="${iconURL}" alt="" />
                    </figure>
                </div>
            <h5 class="is-size-5 has-text-centered is-capitalized">${Math.round(temp)}°F</h4>
            <p class="is-capitalized">${weather[0].description}</p>
        </div>
    `;
    forecastGrid.appendChild(forecastCard);
  });
};

//To-do:
//figure out way to accept city names with spaces (e.g., New York)
// add recent cities list
// think about better ways to render the UI and add error messages
// add date?