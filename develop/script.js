function getApi(city) {
  var apiKey = "ddb57c76a06132be7b16257a310c62d6";
  var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var todayCard = createWeatherCard(data, city);
      document.getElementById("currentWeatherCard").innerHTML = "";
      document.getElementById("currentWeatherCard").appendChild(todayCard);

      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
      return fetch(forecastUrl);
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var forecastCardsContainer = document.getElementById("forecastCards");
      forecastCardsContainer.innerHTML = "";

      for (var i = 0; i < 5; i++) {
        var forecastData = data.list[i * 8];
        var forecastCard = createWeatherCard(forecastData);
        forecastCardsContainer.appendChild(forecastCard);
      }
    });
}

function createWeatherCard(data, city) {
  var card = document.createElement("div");
  card.classList.add("col", "mb-4");

  var cardBody = document.createElement("div");
  cardBody.classList.add("card", "h-100");

  var cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header");

  if (city) {
    cardHeader.innerText = city; // Display the city name for current weather
  } else {
    cardHeader.innerText = new Date(data.dt * 1000).toDateString(); // Display the date for forecast
  }

  var cardBodyContent = document.createElement("div");
  cardBodyContent.classList.add("card-body");

  var emoji = document.createElement("p");
  emoji.innerText = getWeatherEmoji(data.weather[0].main);

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

function getWeatherEmoji(weather) {
  switch (weather) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Drizzle":
      return "🌦️";
    case "Thunderstorm":
      return "⛈️";
    case "Snow":
      return "❄️";
    default:
      return "❓";
  }
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.getElementById("cityInput").value;
    getApi(city);
  });

// ...

function createHistoryButton(city) {
  var button = document.createElement("button");
  button.classList.add("btn", "btn-primary", "mr-2");
  button.innerText = city;

  button.addEventListener("click", function () {
    getApi(city);
  });

  return button;
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.getElementById("cityInput").value;
    getApi(city);

    var historyList = document.getElementById("historyList");
    var historyButton = createHistoryButton(city);
    historyList.appendChild(historyButton);
  });

document.getElementById("del-history").addEventListener("click", function () {
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "";
});


