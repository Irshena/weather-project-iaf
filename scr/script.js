let now = new Date();

function showTime(todayData) {
  let hours = todayData.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = todayData.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentTime = document.querySelector("#time");
currentTime.innerHTML = showTime(now);

function showDay(todayData) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[todayData.getDay()];

  return day;
}

let currentDay = document.querySelector("#day");
currentDay.innerHTML = showDay(now);

function showMonth(todayData) {
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
  let month = months[todayData.getMonth()];

  return month;
}

let currentMonth = document.querySelector("#month");
currentMonth.innerHTML = showMonth(now);

function showDate(todayData) {
  let date = todayData.getDate();

  return date;
}

let currentDate = document.querySelector("#date");
currentDate.innerHTML = showDate(now);

function showYear(todayData) {
  let year = todayData.getFullYear();

  return year;
}
let currentYear = document.querySelector("#year");
currentYear.innerHTML = showYear(now);

// to display weather:

function showWeather(response) {
  let currentCity = document.querySelector("#city-output");
  currentCity.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = currentTemperature;
  document.querySelector("#high-t").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#low-t").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
}

// to get defenite city weather:

function searchCity(cityName) {
  let apiKey = "578c15a350f88f1079a1a1c56c09d39b";
  let units = "metric";
  let language = "en";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${language}`;
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
  let language = "en";
  let units = "metric";
  let apiKey = "578c15a350f88f1079a1a1c56c09d39b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}&lang=${language}`;

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