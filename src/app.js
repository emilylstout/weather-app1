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
  let minutes = date.getMinutes();
  return `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#date-time");
  let currentTempElement = document.querySelector("#current-temp");
  let lowTempElement = document.querySelector("#low-temp");
  let highTempElement = document.querySelector("#high-temp");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  timeElement.innerHTML = formatDate(response.data.dt * 1000);
  currentTempElement.innerHTML = `${Math.round(response.data.main.temp)}`;
  lowTempElement.innerHTML = `Low: <strong>${Math.round(
    response.data.main.temp_min
  )}°F</strong>`;
  highTempElement.innerHTML = `High: <strong>${Math.round(
    response.data.main.temp_max
  )}°F</strong>`;
  windElement.innerHTML = `Wind: <strong>${Math.round(
    response.data.wind.speed
  )} mph</strong>`;
  humidityElement.innerHTML = `Humidity: <strong>${response.data.main.humidity}%`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function inputNewCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let newCity = cityInput.value;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", inputNewCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentWeather);

navigator.geolocation.getCurrentPosition(showCurrentWeather);
