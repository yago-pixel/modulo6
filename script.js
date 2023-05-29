// Replace 'YOUR_API_KEY' with your actual API key
const apiKey = 'YOUR_API_KEY';

// Function to fetch weather data from the API
async function getWeatherData() {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=New York`);
  const data = await response.json();
  return data;
}

// Function to display weather data on the dashboard
function displayWeatherData(weatherData) {
  const weatherContainer = document.getElementById('weather-container');

  const location = weatherData.location.name;
  const temperature = weatherData.current.temp_c;
  const condition = weatherData.current.condition.text;

  const weatherHTML = `
    <h2>${location}</h2>
    <p>Temperature: ${temperature}°C</p>
    <p>Condition: ${condition}</p>
  `;

  weatherContainer.innerHTML = weatherHTML;
}

// Fetch weather data and display it
getWeatherData()
  .then(displayWeatherData)
  .catch(error => console.log(error));