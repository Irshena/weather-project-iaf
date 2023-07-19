// to change background according to weather:

function changeBackground(icon) {
let appCard = document.querySelector("#app-card");
console.log(icon);
switch (icon) {
case "clear-sky-day":
  appCard.style.background = "radial-gradient(401px at 50.6% -0.3%, rgba(255, 255, 255, 0.31) 1.2%, rgb(165, 224, 248) 100.2%)";
  appCard.style.color = "#000";
  break;
case "clear-sky-night":
  appCard.style.background = "linear-gradient(36deg, rgb(22, 23, 30) 3.2%, rgb(118, 124, 163) 97.6%)";
  appCard.style.color = "#fff";
  break;
case "few-clouds-day":
  appCard.style.backgroundImage = "url(img/clouds.png)";
  appCard.style.color = "#000";
  break;
case "few-clouds-night":
  appCard.style.backgroundImage = "url(img/clouds-night.png)";
  appCard.style.color = "#fff";
  break;
case "scattered-clouds-day":
  appCard.style.backgroundImage = "url(img/clouds.png)";
  appCard.style.color = "#000";
  break;
case "scattered-clouds-night":
  appCard.style.backgroundImage = "url(img/clouds-night.png)";
  appCard.style.color = "#fff";
  break;
case "broken-clouds-day":
  appCard.style.backgroundImage = "url(img/broken-clouds-day.png)";
  appCard.style.color = "#000";
  break;
case "broken-clouds-night":
  appCard.style.backgroundImage = "url(img/broken-clouds-night.png)";
  appCard.style.color = "#fff";
  break;
case "shower-rain-day":
  appCard.style.backgroundImage = "url(img/rain-day.png)";
  appCard.style.color = "#000";
  break;
case "shower-rain-night":
  appCard.style.backgroundImage = "url(img/rain-night.png)";
  appCard.style.color = "#fff";
  break;
case "rain-day":
  appCard.style.backgroundImage = "url(img/rain-day.png)";
  appCard.style.color = "#000";
  break;
case "rain-night":
  appCard.style.backgroundImage = "url(img/rain-night.png)";
  appCard.style.color = "#fff";
  break;
case "thunderstorm-day":
  appCard.style.backgroundImage = "url(img/storm-day.png)";
  appCard.style.color = "#000";
  break;
case "thunderstorm-night":
  appCard.style.backgroundImage = "url(img/storm-night.png)";
  appCard.style.color = "#fff";
  break;
case "snow-day":
  appCard.style.backgroundImage = "url(img/snow-day.png)";
  appCard.style.color = "#000";
  break;
case "snow-night":
  appCard.style.backgroundImage = "url(img/snow-night.png)";
  appCard.style.color = "#fff";
  break;
case "mist-night":
  appCard.style.background = "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
  appCard.style.color = "#000";
  break;
case "mist-day":
  appCard.style.background = "linear-gradient(to top, lightgrey 0%, lightgrey 1%, #e0e0e0 26%, #efefef 48%, #d9d9d9 75%, #bcbcbc 100%)";
  appCard.style.color = "#000";
  break;
default:
  appCard.style.background = "#fff";
  appCard.style.color = "#000";
  break;
  }
}

// to display weather:

function showWeather(response) {
  document.querySelector("#city-output").innerHTML = response.data.city;
  document.querySelector("#degrees").innerHTML = Math.round(response.data.temperature.current);
  degreesCelsius = response.data.temperature.current;
  document.querySelector("#description").innerHTML = response.data.condition.description;
  document.querySelector("#humidity").innerHTML = `${
    response.data.temperature.humidity
  }%`;
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let todayWeatherPicture = document.querySelector("#today-weather-icon");
  todayWeatherPicture.setAttribute("src", response.data.condition.icon_url); 
  todayWeatherPicture.setAttribute("alt", response.data.condition.description);

  changeBackground(response.data.condition.icon);

  let now = new Date(response.data.time * 1000);

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  document.querySelector("#time").innerHTML = `${hours}:${minutes}`;

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  document.querySelector("#day").innerHTML = day;

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  document.querySelector("#month").innerHTML = month;

  let date = now.getDate();
  document.querySelector("#date").innerHTML = date;

  let year = now.getFullYear();
  document.querySelector("#year").innerHTML = year;
}

// to get defenite city weather:

function searchCity(cityName) {
  let apiKey = "ao16f54b719b1f7801e48t3fd0484c74";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(showWeather);
}

// to display weather forecast:

function formatTimestamp(timestamp) {
  let time = new Date(timestamp * 1000);
  let date = time.getDate();
  let month = time.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  return `${date}.${month}`;
  }

function showWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

   let forecastHTML = `<div class="row">`;
   forecast.forEach(function (dayInfo, index) {
    if (index < 6) {
    let date = formatTimestamp(dayInfo.time);
    if (index === 0) {
      date = "<strong>Today</strong>";
    }
    
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        ${date}
        <img
          src="${dayInfo.condition.icon_url}"
          alt="${dayInfo.condition.description}"
          width="42"
        />
          <span class="high-t"> ${Math.round(dayInfo.temperature.maximum)}° </span>
          <span class="low-t"> ${Math.round(dayInfo.temperature.minimum)}° </span>
      </div>
  `;
      }
   });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// to get defenite city weather forecast:

function searchCityForecast(cityName) {
  let apiKey = "ao16f54b719b1f7801e48t3fd0484c74";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${cityName}&key=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(showWeatherForecast);
}

// service function - handle city name and launch API request:

function handleCityValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
   if (cityInput.value) {
    searchCity(cityInput.value);
    searchCityForecast(cityInput.value);
  } else {
    alert("You forgot to enter your city 😉");
  }
}

let cityValueForm = document.querySelector("#city-form");
cityValueForm.addEventListener("submit", handleCityValue);

// to get current location weather and forecast with "Current" button:

function getApiCurrentLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ao16f54b719b1f7801e48t3fd0484c74";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getApiCurrentLocationWeatherForecast(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ao16f54b719b1f7801e48t3fd0484c74";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getApiCurrentLocationWeather);
  navigator.geolocation.getCurrentPosition(getApiCurrentLocationWeatherForecast);
}

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", getCurrentLocation);

// to display current location weather and forecast by default
navigator.geolocation.getCurrentPosition(getApiCurrentLocationWeather);
navigator.geolocation.getCurrentPosition(getApiCurrentLocationWeatherForecast);