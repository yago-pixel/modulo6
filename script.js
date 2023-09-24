var searchHistory = $('.search-history');
var submitButton = $('form');
var cityInput = $('#citySearch');
var myApiKey = 'f49ee689d4dabda3b9e19b6dac6d6729';
var currentWeatherDiv = $('.current-weather');
var forecastHeading = $('.forecast-heading');
var fiveDayForecastDiv = $('.five-day-forecast');

// Saves searched cities in the localstorage
function saveCities(event) { 
    event.preventDefault();
    var cityValue = cityInput.val().trim();


    if(cityValue.trim() === "") {
        window.alert("Please provide a valid cityname!");
    } else {
        // use JSON to store citys in the storesCities
        var storedCities = JSON.parse(localStorage.getItem('cities')) || [];
        storedCities.push(cityValue);
        localStorage.setItem('cities', JSON.stringify(storedCities));



        // renderSearchHistory and fetch current and future weather
        renderSearchHistory();
        fetchWeatherForecast(cityValue);
        fiveDayForecast(cityValue);
        // clear cityInput field
        cityInput.val('');
    };
};

    // fetch current weather 
    function fetchWeatherForecast(city){
    // construct URL with given parameters and cityInput
    var geoCodeUrl ='https://api.openweathermap.org/geo/1.0/direct';
    var geoCodeApi = geoCodeUrl+'?q='+city+'&limit=1&appid='+myApiKey;
        fetch(geoCodeApi)
            .then(function (response) {
            return response.json();
            })
            .then(function (data){
            // get latitude and longtitude from the geocodingAPI response
            var latitude = data[0].lat;
            var longtitude = data[0].lon;

            // use that data for the forecastApi to get the data based on the city input
            var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
            var forecastApi = forecastUrl+'?lat='+latitude+'&lon='+longtitude+'&appid='+myApiKey;

            fetch(forecastApi)
                .then(function (response) {
                return response.json(); 
                })
                .then(function (data) {
                    // display current date
                    var date = dayjs().format('M/D/YYYY');
                    // just current weather, which is why we take the first data from the datalist array
                    var forecast = data.list[0];
               
                        // get pieces of data, that I want for my weather dashboard 
                        var name = data.city.name; 

                        var temperature = forecast.main.temp;
                        var windspeed = forecast.wind.speed;
                        var humidity = forecast.main.humidity;
                        var weatherCondition = forecast.weather[0].icon;
                        var weatherIconUrl = 'https://openweathermap.org/img/w/' + weatherCondition + '.png';

                        // converts kelvin into celsius
                        var celsius = Math.round(temperature - 273.15);

                        console.log(data);

                        // clear current weather and five day forecast
                        currentWeatherDiv.empty();
                        fiveDayForecastDiv.empty();

                        // construct HTML with the fetched data for the current weather and append it to the current weatherDiv
                        var currentWeatherHTML = $('<h2>'+ name + ' ' + '(' + date + ')' + '<img src="' + weatherIconUrl + '" alt="Weather Icon">' + '</h2>' + '<br>' +
                        '<p>Temp: '+ celsius + '°C</p>' + '<br>' +
                        '<p>Wind: '+ windspeed + ' MPH</p>' + '<br>' + 
                        '<p>Humidity: '+ humidity + ' %</p>');
                        currentWeatherDiv.addClass('current-weather-style');
                        currentWeatherDiv.append(currentWeatherHTML);

                        forecastHeading.text("5-Day Forecast:");
                    });
                })
                
                // catch, in case of error and display error in the console
                .catch(function(error){
                    window.alert('Error:', error);
                });
        };


        // nearly the same functionality as current weather forecast
        function fiveDayForecast(city) {
            var geoCodeUrl ='https://api.openweathermap.org/geo/1.0/direct';
            var geoCodeApi = geoCodeUrl+'?q='+city+'&limit=1&appid='+myApiKey;
                fetch(geoCodeApi)
                    .then(function (response) {
                    return response.json();
                    })
                    .then(function (data){
                    // get latitude and longtitude from the geocodingAPI response
                    var latitude = data[0].lat;
                    var longtitude = data[0].lon;

                    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
                    var forecastApi = forecastUrl+'?lat='+latitude+'&lon='+longtitude+'&appid='+myApiKey;

                    fetch(forecastApi)
                        .then(function (response) {
                        return response.json(); 
                        })
                        .then(function (data) {
                            
                            var forecastList= data.list;
                      
                            // for loop to iterate through the forecastList
                            for (var i = 1; i < forecastList.length; i++) {
                                // condition that the dt_txt time equals 12 pm
                                if(forecastList[i].dt_txt.slice(11,13) == 12) {
                                    // dt_txt date should be displayed on each forecastListItem
                                    var date = dayjs(forecastList[i].dt_txt).format('M/D/YYYY');
                                    var temperature = forecastList[i].main.temp;
                                    var windspeed = forecastList[i].wind.speed;
                                    var humidity = forecastList[i].main.humidity;
                                    var weatherCondition = forecastList[i].weather[0].icon;
                                    var weatherIconUrl = 'https://openweathermap.org/img/w/' + weatherCondition + '.png';
    
                                    var celsius = Math.round(temperature - 273.15);
    
                                    console.log(forecastList[i]);
    
                                    // construct the forecastItemHtml, add style and append it to the fiveDayForecastDiv
                                    var forecastItemHtml = $('<div>' + '<h3>'+ ' ' + date +  '</h3>' + '<br>' +
                                    '<img src="' + weatherIconUrl + '" alt="Weather Icon">' + '<br>' +
                                    '<p>Temp: '+ celsius + '°C</p>' + '<br>' +
                                    '<p>Wind: '+ windspeed + ' MPH</p>' + '<br>' + 
                                    '<p>Humidity: '+ humidity + ' %</p>' + '</div>');
                                    forecastItemHtml.addClass('forecast-style');
                                    fiveDayForecastDiv.append(forecastItemHtml);  
                                }
                                   
                            };
                              
                            
                        })

                        .catch(function(error){
                            window.alert('Error:', error);
                        });
                    });
        };
        

       
    



        // renders the Search-history in form of buttons under the form
        function renderSearchHistory() {
            // empty, so it won't double the elements from the localStorage
            searchHistory.empty();
            var storedCities = JSON.parse(localStorage.getItem('cities')) || [];
            // iterate through each element in the localStorage and display it as a button inside a ul
            storedCities.forEach(function(city) {
                var savedCity = $('<li>');
                var savedCityButton = $('<button>');
            
                // append the cityInput text and style 
                savedCityButton.text(city);
                savedCityButton.addClass('btn btn-secondary');

                // function that listens to click on Buttons in the SearchHistory
                savedCityButton.on('click', function() {
                    fetchWeatherForecast(city);
                    fiveDayForecast(city);
                })
            
                // append the buttons in the searchHistory
                savedCity.append(savedCityButton);
                searchHistory.append(savedCity);

            });
        
        };


// submit eventListener that saves cities and executes the rest of the functions with the saveCities function
submitButton.on("submit", saveCities);
// when document loaded it renders the searchHistory
$(document).ready(renderSearchHistory);