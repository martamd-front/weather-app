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
    "Saturday"
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


/* CURRENT HOUR */
 function getTimeCity(response) {
  document.querySelector("#today-hour").innerHTML = 
  formatDate(response.data.datetime);;
} 

function timeCity(city) {
  let apiKey = "a5982d63d74e479c94f562be7bc61e04&location";
  let apiTimeUrl = `https://timezone.abstractapi.com/v1/current_time/?api_key=${apiKey}&location=${city}`;
  axios.get(apiTimeUrl).then(getTimeCity);
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


  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
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
  timeCity(city)
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




let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;
searchCity("Barcelona");
timeCity("Barcelona")

let unitCelsius = document.querySelector("#celsius-link");
unitCelsius.addEventListener("click", tempToCelsius);

let unitFahrenheit = document.querySelector("#fahrenheit-link");
unitFahrenheit.addEventListener("click", tempToFahrenheit);
