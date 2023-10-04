function formatDate(timestamp) {
  let now = new Date();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
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
    "December",
  ];
  let dayOfWeek = daysOfWeek[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  return `${dayOfWeek} ${now.getDate()} ${month} ${year} ${hours}:${minutes}`;
}

let h2 = document.querySelector("h2");
h2.textContent = formatDate(Date.now());

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class= "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
                <div class ="weather-forecast-date"> 
               ${formatDay(forecastDay.time)}
               </div>
                <img src="${forecastDay.condition.icon_url}" 
                alt="" 
                width="35">
            <div class="weather-forecast-temperature"> 
              <span class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span>
               <span class="weather-forecast-temperature-min">${Math.round(
                 forecastDay.temperature.minimum
               )}°</span>
             </div>
              </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let key = "8b0d9fa4b250096d3e2803d0f00fatob";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;
  temperatureElement.textContent = Math.round(celsiusTemperature);
  cityElement.textContent = response.data.city;
  descriptionElement.textContent = response.data.condition.description;
  humidityElement.textContent = Math.round(response.data.temperature.humidity);
  windElement.textContent = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function search(value) {
  let key = "8b0d9fa4b250096d3e2803d0f00fatob";
  let query = `${value}`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("New York");
