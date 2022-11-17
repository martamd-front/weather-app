import axios from "axios";

/* PUT CURRENT DAY AND HOUR */
function formatDate(now) {
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
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

/* SHOW AND SEARCH CITY WEATHER */

function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-city").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

/* GET GEOLOCALITATION */

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fda3688b1db05987dd5d07c237aecfba";
  let unit = "metric";
  let apiEndPont = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndPont}?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

/* GET UNIT TEMP  */

function tempToCelsius(event) {
  event.preventDefault();
  let tempCity = document.querySelector("#temp-city");
  tempCity.innerHTML = Math.round(celsiusTemperature);
}
function tempToFahrenheit(event) {
  event.preventDefault();
  let tempCity = document.querySelector("#temp-city");
  tempCity.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}

let dateElement = document.querySelector("#today-hour");
let currentDayHour = new Date();
dateElement.innerHTML = formatDate(currentDayHour);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Barcelona");

let celsiusTemperature = null;
showWeather("Barcelona");
let unitCelsius = document.querySelector("#celsius-link");
unitCelsius.addEventListener("click", tempToCelsius);

let unitFahrenheit = document.querySelector("#fahrenheit-link");
unitFahrenheit.addEventListener("click", tempToFahrenheit);
