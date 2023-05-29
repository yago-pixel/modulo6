const apiKey = 'YOUR_API_KEY';
const location = 'New York'; // Replace with the desired location

async function getWeatherData() {
  try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching weather data:', error);
    throw error;
  }
}

function displayWeatherData(weatherData) {
  const weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = '';

  const locationName = weatherData.data[0].city_name;
  const temperature = weatherData.data[0].temp;
  const description = weatherData.data[0].weather.description;

  const locationElement = document.createElement('h2');
  locationElement.textContent = locationName;

  const temperatureElement = document.createElement('p');
  temperatureElement.textContent = `Temperature: ${temperature}°C`;

  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = `Description: ${description}`;

  weatherContainer.appendChild(locationElement);
  weatherContainer.appendChild(temperatureElement);
  weatherContainer.appendChild(descriptionElement);
}

getWeatherData()
  .then(displayWeatherData)
  .catch(error => console.log(error));