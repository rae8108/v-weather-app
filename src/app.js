function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let key = "8b0d9fa4b250096d3e2803d0f00fa";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?query=New%20York&key=8b0d9fa4b250096d3e2803d0f00fatob&units=metric";

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);