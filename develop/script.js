// Function to create a city button
function createCityButton(city) {
  var button = document.createElement('button');
  button.classList.add('btn', 'btn-secondary', 'mr-2', 'mb-2');
  button.innerText = city;

  // Add event listener to the city button
  button.addEventListener('click', function () {
    getApi(city);
  });

  return button;
}

// Function to save searched city to local storage
function saveCity(city) {
  var cities = localStorage.getItem('cities') || '[]';
  cities = JSON.parse(cities);
  cities.push(city);
  localStorage.setItem('cities', JSON.stringify(cities));
}

// Function to load and display saved cities from local storage
function loadCities() {
  var cities = localStorage.getItem('cities') || '[]';
  cities = JSON.parse(cities);

  var cityButtonsDiv = document.getElementById('cityButtons');
  cityButtonsDiv.innerHTML = '';

  for (var i = 0; i < cities.length; i++) {
    var cityButton = createCityButton(cities[i]);
    cityButtonsDiv.appendChild(cityButton);
  }
}

// Function to create a weather card
function createWeatherCard(data, isCurrentWeather) {
  var card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  if (isCurrentWeather) {
    card.classList.add('col-12');
  } else {
    card.classList.add('col-2');
  }

  var cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  // Create and append the rows for the weather information
  var weatherRows = [
    { label: 'Date', value: new Date(data.dt * 1000).toLocaleDateString() },
    { label: 'Weather', value: data.weather[0].main },
    { label: 'Temperature', value: data.main.temp + ' °F' },
    { label: 'Wind', value: data.wind.speed + ' m/s' },
    { label: 'Humidity', value: data.main.humidity + '%' },
  ];

  weatherRows.forEach(function (row) {
    var rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    var labelDiv = document.createElement('div');
    labelDiv.classList.add('col');
    labelDiv.innerText = row.label;

    var valueDiv = document.createElement('div');
    valueDiv.classList.add('col');
    valueDiv.innerText = row.value;

    rowDiv.appendChild(labelDiv);
    rowDiv.appendChild(valueDiv);

    cardBody.appendChild(rowDiv);
  });

  card.appendChild(cardBody);

  return card;
}

function getApi(city) {
  var apiKey = 'ddb57c76a06132be7b16257a310c62d6';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Clear previous weather cards
      var weatherCardsDiv = document.getElementById('weatherCards');
      weatherCardsDiv.innerHTML = '';

      // Create and append current weather card
      var currentWeatherCard = createWeatherCard(data, true);
      weatherCardsDiv.appendChild(currentWeatherCard);

      // Fetch and append 5-day forecast cards
      var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      fetch(forecastUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          var forecastWeatherRow = document.createElement('div');
          forecastWeatherRow.classList.add('row');

          for (var i = 1; i < 6; i++) {
            var forecastWeatherCard = createWeatherCard(data.list[i * 8], false);
            forecastWeatherRow.appendChild(forecastWeatherCard);
          }

          weatherCardsDiv.appendChild(forecastWeatherRow);
        });
    });

  // Create and save city button
  var cityButton = createCityButton(city);
  document.getElementById('cityButtons').appendChild(cityButton);
  saveCity(city);
}

document.getElementById('searchForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var city = document.getElementById('cityInput').value;
  getApi(city);
});

// Load and display saved cities on page load
loadCities();
