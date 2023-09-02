function loadNewCityTemp(response) {
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°F`;

  let lowTemp = Math.round(response.data.main.temp_min);
  let lowTempPlaceholder = document.querySelector("#low-temp");
  lowTempPlaceholder.innerHTML = `Low: <strong>${lowTemp}°F</strong>`;

  let highTemp = Math.round(response.data.main.temp_max);
  let highTempPlaceholder = document.querySelector("#high-temp");
  highTempPlaceholder.innerHTML = `High: <strong>${highTemp}°F</strong>`;

  let wind = Math.round(response.data.wind.speed);
  let windPlaceholder = document.querySelector("#wind");
  windPlaceholder.innerHTML = `Wind: <strong>${wind} mph</strong>`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPlaceholder = document.querySelector("#humidity");
  humidityPlaceholder.innerHTML = `Humidity: <strong>${humidity}%`;

  let description = response.data.weather[0].description;
  let descriptionPlaceholder = document.querySelector("#description");
  descriptionPlaceholder.innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);
}

function showCurrentTemperature(response) {
  console.log(response.data);
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°F`;

  let lowTemp = Math.round(response.data.main.temp_min);
  let lowTempPlaceholder = document.querySelector("#low-temp");
  lowTempPlaceholder.innerHTML = `Low: <strong>${lowTemp}°F</strong>`;

  let highTemp = Math.round(response.data.main.temp_max);
  let highTempPlaceholder = document.querySelector("#high-temp");
  highTempPlaceholder.innerHTML = `High: <strong>${highTemp}°F</strong>`;

  let wind = Math.round(response.data.wind.speed);
  let windPlaceholder = document.querySelector("#wind");
  windPlaceholder.innerHTML = `Wind: <strong>${wind} mph</strong>`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityPlaceholder = document.querySelector("#humidity");
  humidityPlaceholder.innerHTML = `Humidity: <strong>${humidity}%`;

  let description = response.data.weather[0].description;
  let descriptionPlaceholder = document.querySelector("#description");
  descriptionPlaceholder.innerHTML =
    description.charAt(0).toUpperCase() + description.slice(1);
}

function showCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function inputNewCity(event) {
  event.preventDefault();
  let heading = document.querySelector("h1");
  let cityInput = document.querySelector("#city-input");
  let newCity = cityInput.value;
  heading.innerHTML = newCity;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(loadNewCityTemp);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", inputNewCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentWeather);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let currentTime = `${days[now.getDay()]} ${now.getHours()}:${currentMinutes}`;
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${currentTime}`;

navigator.geolocation.getCurrentPosition(showCurrentWeather);
