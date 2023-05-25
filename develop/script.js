function getApi(city) {
  var apiKey = "ddb57c76a06132be7b16257a310c62d6";
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Create today's weather card
      var todayCard = createWeatherCard(data);
      document.getElementById("weatherCards").appendChild(todayCard);

      // Fetch 5-day forecast data
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
      return fetch(forecastUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // Create forecast weather cards
      for (var i = 0; i < 5; i++) {
        var forecastData = data.list[i * 8]; // Every 8th item represents a forecast for a specific day
        var forecastCard = createWeatherCard(forecastData);
        document.getElementById("weatherCards").appendChild(forecastCard);
      }
    });
}

function createWeatherCard(data) {
  var card = document.createElement("div");
  card.classList.add("col", "mb-4");

  var cardBody = document.createElement("div");
  cardBody.classList.add("card", "h-100");

  var cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");
  cardHeader.innerText = new Date(data.dt * 1000).toDateString();

  var cardBodyContent = document.createElement("div");
  cardBodyContent.classList.add("card-body");

  var emoji = document.createElement("p");
  emoji.innerText = "☀️"; // Add your logic to determine the emoji based on weather condition

  var temp = document.createElement("p");
  temp.innerText = data.main.temp + "°F";

  var wind = document.createElement("p");
  wind.innerText = "Wind: " + data.wind.speed + " mph";

  var humidity = document.createElement("p");
  humidity.innerText = "Humidity: " + data.main.humidity + "%";

  cardBodyContent.appendChild(emoji);
  cardBodyContent.appendChild(temp);
  cardBodyContent.appendChild(wind);
  cardBodyContent.appendChild(humidity);

  cardBody.appendChild(cardHeader);
  cardBody.appendChild(cardBodyContent);

  card.appendChild(cardBody);

  return card;
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.getElementById("cityInput").value;
    getApi(city);
  });
