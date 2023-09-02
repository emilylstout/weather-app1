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
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours > 12) {
    hours = hours - 12;
    return `${day} ${hours}:${minutes} pm`;
  } else {
    return `${day} ${hours}:${minutes} am`;
  }
}

function showWeather(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#current-city");
  let timeElement = document.querySelector("#date-time");
  let currentTempElement = document.querySelector("#current-temp");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(response.data.time * 1000);
  currentTempElement.innerHTML = `${Math.round(
    response.data.temperature.current
  )}`;
  feelsLikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = response.data.temperature.humidity;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
}

function showCurrentWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  let apiKey = "56203a1146fb1d1e095940bod3ea0ft6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

function inputNewCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let newCity = cityInput.value;
  let apiKey = "56203a1146fb1d1e095940bod3ea0ft6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${newCity}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showWeather);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", inputNewCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentWeather);

navigator.geolocation.getCurrentPosition(showCurrentWeather);
