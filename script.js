const apikey = "1cf59d1cd3625781b5164be61898e9d9";
const button = document.getElementById("search");

window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lon = position.coords.longitude;
            let lat = position.coords.latitude;
            const url = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1cf59d1cd3625781b5164be61898e9d9`;


            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                console.log(new Date().getTime())
                var dat = new Date(data.dt)
                console.log(dat.toLocaleString(undefined, 'Asia/Kolkata'))
                console.log(new Date().getMinutes())
                weatherReport(data);
            })
        })
    }
})


var lat;
var lon;

function searchByCity() {
    var place = document.getElementById('input').value;
    // var data = fetchCoordinates(place);
    // console.log(data);
    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=1cf59d1cd3625781b5164be61898e9d9`;
    fetch(apiURL).then(function(res){
        
        return res.json();
    }).then(function (data){
        console.log(data);
         lat = data[0].lat;
         lon = data[0].lon
        var urlsearch = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apikey}`;
        fetch(urlsearch).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            //weatherReport(data);
        })
    //document.getElementById('input').value = '';
    })
}

function weatherReport(data) {

    var urlcast = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=1cf59d1cd3625781b5164be61898e9d9`;

    fetch(urlcast).then((res) => {
        return res.json();
    }).then((forecast) => {
        console.log(forecast.city);
        hourForecast(forecast);
        dayForecast(forecast)

        console.log(data);
        document.getElementById('city').innerText = data.name + ', ' + data.sys.country;
        console.log(data.name, data.sys.country);

        console.log(Math.floor(data.main.temp - 273));
        document.getElementById('temperature').innerText = Math.floor(data.main.temp - 273) + ' °C';

        document.getElementById('clouds').innerText = data.weather[0].description;
        console.log(data.weather[0].description)

        let icon1 = data.weather[0].icon;
        let iconurl = "http://api.openweathermap.org/img/w/" + icon1 + ".png";
        document.getElementById('img').src = iconurl
    })

}

function hourForecast(forecast) {
    document.querySelector('.templist').innerHTML = ''
    for (let i = 0; i < 5; i++) {

        var date = new Date(forecast.list[i].dt * 1000)
        console.log((date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', ''))

        let hourR = document.createElement('div');
        hourR.setAttribute('class', 'next');

        let div = document.createElement('div');
        let time = document.createElement('p');
        time.setAttribute('class', 'time')
        time.innerText = (date.toLocaleTimeString(undefined, 'Asia/Kolkata')).replace(':00', '');

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';

        div.appendChild(time)
        div.appendChild(temp)

        let desc = document.createElement('p');
        desc.setAttribute('class', 'desc')
        desc.innerText = forecast.list[i].weather[0].description;

        hourR.appendChild(div);
        hourR.appendChild(desc)
        document.querySelector('.templist').appendChild(hourR);
    }
}

function dayForecast(forecast) {
    document.querySelector('.weekF').innerHTML = ''
    for (let i = 8; i < forecast.list.length; i += 8) {
        console.log(forecast.list[i]);
        let div = document.createElement('div');
        div.setAttribute('class', 'dayF');

        let day = document.createElement('p');
        day.setAttribute('class', 'date')
        day.innerText = new Date(forecast.list[i].dt * 1000).toDateString(undefined, 'Asia/Kolkata');
        div.appendChild(day);

        let temp = document.createElement('p');
        temp.innerText = Math.floor((forecast.list[i].main.temp_max - 273)) + ' °C' + ' / ' + Math.floor((forecast.list[i].main.temp_min - 273)) + ' °C';
        div.appendChild(temp)

        let description = document.createElement('p');
        description.setAttribute('class', 'desc')
        description.innerText = forecast.list[i].weather[0].description;
        div.appendChild(description);

        document.querySelector('.weekF').appendChild(div)
    }
} 

button.addEventListener("click", searchByCity);
