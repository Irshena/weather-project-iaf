// to display weather:

function showWeather(response) {
  let currentCity = document.querySelector("#city-output");
  currentCity.innerHTML = response.data.city;
  let currentTemperature = Math.round(response.data.temperature.current);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = currentTemperature;
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

function handleCityValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value;
  if (cityInput.value) {
    searchCity(cityName);
  } else {
    alert("You forgot to enter your city 😉");
  }
}

let cityValueForm = document.querySelector("#city-form");
cityValueForm.addEventListener("submit", handleCityValue);

// to get current location weather with "Current" button:

function getApiCurrentLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ao16f54b719b1f7801e48t3fd0484c74";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getApiCurrentLocationWeather);
}

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", getCurrentLocation);

// to display current location weather by default
navigator.geolocation.getCurrentPosition(getApiCurrentLocationWeather);