/* PUT CURRENT DAY AND HOUR */
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}

/* CURRENT HOUR */
function getTimeCity(response) {
  document.querySelector("#today-hour").innerHTML = formatDate(
    response.data.datetime
  );
}

function timeCity(city) {
  let apiKey = "a5982d63d74e479c94f562be7bc61e04&location";
  let apiTimeUrl = `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${city}`;
  axios.get(apiTimeUrl).then(getTimeCity);
}

/* GET FIVE DAYS FORECAST */
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row text-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  
      <div class="col-xs-2 col">
        <h4>${formatDay(forecastDay.time)}</h4>
        <div class="weather-icon"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" alt="${forecastDay.condition.description}" /></div>
        <p><strong class="forecast-temp">${Math.round(
          forecastDay.temperature.maximum
        )}</strong><strong>°</strong> <span class="forecast-temp">${Math.round(
          forecastDay.temperature.minimum
        )}</span>°</p>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let clearCity = city.replace(/\s/g, "+");
  let apiKey = "d0b6fd5o79fcec65aa41f33c5203dt9a";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${clearCity}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

/* SHOW AND SEARCH CITY WEATHER */

function showWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp-city").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "d0b6fd5o79fcec65aa41f33c5203dt9a";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  timeCity(city);
}

/* GET UNIT TEMP  */

function celciusToFarenheit(celcius) {
  let farenheit = (celcius * 9) / 5 + 32;
  return Math.round(farenheit);
}

function farenheitToCelcius(farenheit) {
  let celcius = ((farenheit - 32) * 5) / 9;
  return Math.round(celcius);
}

function tempToCelsius(event) {
  event.preventDefault();
  let tempCity = document.querySelector("#temp-city");
  tempCity.innerHTML = Math.round(celsiusTemperature);
  let forecastTemp = document.querySelectorAll(".forecast-temp");
  forecastTemp.forEach(function (element) {
    let value = farenheitToCelcius(parseInt(element.textContent));
    element.textContent = value;
  });
  unitCelsius.classList.add("active");
  unitFahrenheit.classList.remove("active");
}

function tempToFahrenheit(event) {
  event.preventDefault();
  let tempCity = document.querySelector("#temp-city");
  tempCity.innerHTML = celciusToFarenheit(celsiusTemperature);
  let forecastTemp = document.querySelectorAll(".forecast-temp");
  forecastTemp.forEach(function (element) {
    let value = celciusToFarenheit(parseInt(element.textContent));
    element.textContent = value;
  });
  unitFahrenheit.classList.add("active");
  unitCelsius.classList.remove("active");
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;
searchCity("Barcelona");
timeCity("Barcelona");

let unitCelsius = document.querySelector("#celsius-link");
unitCelsius.addEventListener("click", tempToCelsius);

let unitFahrenheit = document.querySelector("#fahrenheit-link");
unitFahrenheit.addEventListener("click", tempToFahrenheit);
