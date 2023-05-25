// Define the API endpoint and your API key
const apiKey = 'ddb57c76a06132be7b16257a310c62d6';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

// Function to fetch weather data from the API
async function getWeatherData(city) {
  try {
    const response = await fetch(`${apiUrl}/weather?q=${city}&appid=${apiKey}&units=imperial`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}

// Function to display current weather card
function displayCurrentWeather(data) {
  const currentWeatherContainer = document.getElementById('current-weather');

  // Create the card element
  const card = document.createElement('div');
  card.classList.add('card');

  // Add content to the card
  const cityName = document.createElement('h3');
  cityName.textContent = data.name;

  const temperature = document.createElement('p');
  temperature.textContent = `Temperature: ${data.main.temp}°F`;

  const wind = document.createElement('p');
  wind.textContent = `Wind: ${data.wind.speed} mph`;

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  // Append content to the card
  card.appendChild(cityName);
  card.appendChild(temperature);
  card.appendChild(wind);
  card.appendChild(humidity);

  // Clear previous content and append the card to the container
  currentWeatherContainer.innerHTML = '';
  currentWeatherContainer.appendChild(card);
}

// Function to display the 5-day forecast
function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast');
  forecastContainer.innerHTML = ''; // Clear previous forecast data

  // Iterate over the forecast data for the next 5 days
  for (let i = 1; i <= 5; i++) {
    const forecastData = data.daily[i];

    // Create a card for each day's forecast
    const card = document.createElement('div');
    card.classList.add('card');

    // Create a date element and format the date
    const date = new Date(forecastData.dt * 1000);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    // Create the forecast content
    const content = `
      <h4>${formattedDate}</h4>
      <p>${forecastData.weather[0].description}</p>
      <p>Temperature: ${forecastData.temp.day} &#8457;</p>
      <p>Wind: ${forecastData.wind_speed} mph</p>
      <p>Humidity: ${forecastData.humidity}%</p>
    `;

    // Set the content of the card
    card.innerHTML = content;

    // Append the card to the forecast container
    forecastContainer.appendChild(card);
  }
}
// Helper function to get weather icon based on weather condition
function getWeatherIcon(condition) {
  // You can customize this function to map weather conditions to icons
  // For simplicity, we'll return a text representation of the condition
  switch (condition) {
    case 'Clear':
      return '☀️';
    case 'Clouds':
      return '☁️';
    case 'Rain':
      return '🌧️';
    case 'Snow':
      return '❄️';
    default:
      return '';
  }
}

// Event listener for the search form submission
document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  // Fetch weather data for the entered city
  getWeatherData(city)
    .then(function (data) {
      // Display current weather and forecast
      displayCurrentWeather(data);
      displayForecast(data);
    })
    .catch(function (error) {
      console.log('Error:', error);
    });

  // Clear the input field
  cityInput.value = '';
});
