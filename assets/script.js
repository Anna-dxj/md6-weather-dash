var submitBtn = document.querySelector('#submit-btn'); 
var cityNameDateEl = document.querySelector('#city-display');
var forecastDivEl = document.querySelector('#future-forecast');
var nowIconEl = document.querySelector('#now-icon');
var nowTempEl = document.querySelector('#now-temp')
var nowWindEl = document.querySelector('#now-wind')
var nowHumidEl = document.querySelector('#now-humidity')
var nowFeelsEl = document.querySelector('#now-feels')
var prevSearch = document.querySelector("#prev-search")

var apiKey = 'a6e22ff5fd306121b7107074ca75c22a'
var lattitude = '';
var longitude = '';
var now = dayjs().format('D MMM YYYY HH:m');

function searchCity (event) {
    event.preventDefault();
    var cityName = document.querySelector("#city-name").value; 
    var geocodingApiURl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + apiKey;
    var pastSearch = JSON.parse(localStorage.getItem("city-search"))
    fetch (geocodingApiURl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        lattitude = data[0].lat; 
        longitude = data[0].lon;
        var weatherNowUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid='+apiKey;
        var predictWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid='+apiKey;
        fetch(weatherNowUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            pastSearch.push({
                city: data.name
            })
            localStorage.setItem("city-scores", JSON.stringify(pastSearch))
            for (var i = 0; i < pastSearch.length; i++){
                prevSearch.innerHTML += `<li id="city-old-${i}" class="container-fluid text-center custom-li">${pastSearch[i].city}</li>`
                var previousCityBtn = document.querySelector('#city-old-'+i);
                previousCityBtn.addEventListener('click', searchHistory);
            }
            
            cityNameDateEl.textContent = data.name + ' at ' + now;
            nowIconEl.setAttribute('src', 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png')
            nowIconEl.setAttribute('alt', data.weather[0].description)
            nowTempEl.textContent = 'Temp: ' + data.main.temp + '°F';
            nowWindEl.textContent = 'Wind speed: ' + data.wind.speed + ' mi/hr';
            nowHumidEl.textContent = 'Humidity: ' + data.main.humidity + '%'; 
            nowFeelsEl.textContent = 'Feels like: ' + data.main.feels_like + '°F';
        })
        fetch(predictWeatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            for (var i = 1; i < 6; i++) {
                var futureDate = document.querySelector('#d'+i+'-date');
                futureDate.textContent = dayjs().add(i, 'days').format('MMM D');
            }
            for (var j = 0; j < data.list.length; j++){
                var nowUnix = dayjs().unix();
                if (nowUnix + 64800 < data.list[j+1].dt && nowUnix + 64800 > data.list[j].dt){
                    console.log(j);
                    document.querySelector('#d1-temp').textContent = 'Temp: ' + data.list[j].main.temp + '°F';
                    document.querySelector('#d1-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j].weather[0].icon+'.png')
                    document.querySelector('#d1-icon').setAttribute('alt', data.list[j].weather[0].description)
                    document.querySelector('#d1-wind').textContent = 'Wind speed: ' + data.list[j].wind.speed + ' mi/hr';
                    document.querySelector('#d1-humid').textContent = 'Humidity: ' + data.list[j].main.humidity + '%';
                    document.querySelector('#d1-feels').textContent = 'Feels like: ' + data.list[j].main.feels_like + '°F'; 
                    
                    document.querySelector('#d2-temp').textContent = 'Temp: ' + data.list[j+8].main.temp+ '°F';
                    document.querySelector('#d2-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d2-icon').setAttribute('alt', data.list[j+8].weather[0].description)
                    document.querySelector('#d2-wind').textContent = 'Wind speed: ' + data.list[j+8].wind.speed + ' mi/hr';
                    document.querySelector('#d2-humid').textContent = 'Humidity: ' + data.list[j+8].main.humidity + '%';
                    document.querySelector('#d2-feels').textContent = 'Feels like: ' + data.list[j+8].main.feels_like + '°F';
                    
                    document.querySelector('#d3-temp').textContent = 'Temp: ' + data.list[j+16].main.temp+ '°F';
                    document.querySelector('#d3-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d3-icon').setAttribute('alt', data.list[j+16].weather[0].description)
                    document.querySelector('#d3-wind').textContent = 'Wind speed: ' + data.list[j+16].wind.speed + ' mi/hr';
                    document.querySelector('#d3-humid').textContent = 'Humidity: ' + data.list[j+16].main.humidity + '%';
                    document.querySelector('#d3-feels').textContent = 'Feels like: ' + data.list[j+16].main.feels_like + '°F';
                    
                    document.querySelector('#d4-temp').textContent = 'Temp: ' + data.list[j+24].main.temp+ '°F';
                    document.querySelector('#d4-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d4-icon').setAttribute('alt', data.list[j+24].weather[0].description)
                    document.querySelector('#d4-wind').textContent = 'Wind speed: ' + data.list[j+24].wind.speed + ' mi/hr';
                    document.querySelector('#d4-humid').textContent = 'Humidity: ' + data.list[j+24].main.humidity + '%';
                    document.querySelector('#d4-feels').textContent = 'Feels like: ' + data.list[j+24].main.feels_like + '°F';
                    
                    document.querySelector('#d5-temp').textContent = 'Temp: ' + data.list[j+32].main.temp+ '°F';
                    document.querySelector('#d5-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d5-icon').setAttribute('alt', data.list[j+32].weather[0].description)
                    document.querySelector('#d5-wind').textContent = 'Wind speed: ' + data.list[j+32].wind.speed + ' mi/hr';
                    document.querySelector('#d5-humid').textContent = 'Humidity: ' + data.list[j+32].main.humidity + '%';
                    document.querySelector('#d5-feels').textContent = 'Feels like: ' + data.list[j+32].main.feels_like + '°F';
                }
            }
        })
        document.querySelector("#city-name").value = '';
    });
}
function createStorage(){
    if(!localStorage.getItem("city-search")){
        localStorage.setItem("city-search", JSON.stringify([]))
    }
}

function searchHistory (event) {
    event.preventDefault(); 
    var prevSearch = document.querySelectorAll('.custom-li').value; 
    var geocodingApiURl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + prevSearch + '&appid=' + apiKey;
    fetch (geocodingApiURl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        lattitude = data[0].lat; 
        longitude = data[0].lon;
        var weatherNowUrl = 'https://api.openweathermap.org/data/2.5/weather?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid='+apiKey;
        var predictWeatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lattitude+'&lon='+longitude+'&units=imperial&appid='+apiKey;
        fetch(weatherNowUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            cityNameDateEl.textContent = data.name + ' at ' + now;
            nowIconEl.setAttribute('src', 'http://openweathermap.org/img/w/'+data.weather[0].icon+'.png')
            nowIconEl.setAttribute('alt', data.weather[0].description)
            nowTempEl.textContent = 'Temp: ' + data.main.temp + '°F';
            nowWindEl.textContent = 'Wind speed: ' + data.wind.speed + ' mi/hr';
            nowHumidEl.textContent = 'Humidity: ' + data.main.humidity + '%'; 
            nowFeelsEl.textContent = 'Feels like: ' + data.main.feels_like + '°F';
        })
        fetch(predictWeatherUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            for (var i = 1; i < 6; i++) {
                var futureDate = document.querySelector('#d'+i+'-date');
                futureDate.textContent = dayjs().add(i, 'days').format('MMM D');
            }
            for (var j = 0; j < data.list.length; j++){
                var nowUnix = dayjs().unix();
                if (nowUnix + 64800 < data.list[j+1].dt && nowUnix + 64800 > data.list[j].dt){
                    console.log(j);
                    document.querySelector('#d1-temp').textContent = 'Temp: ' + data.list[j].main.temp + '°F';
                    document.querySelector('#d1-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j].weather[0].icon+'.png')
                    document.querySelector('#d1-icon').setAttribute('alt', data.list[j].weather[0].description)
                    document.querySelector('#d1-wind').textContent = 'Wind speed: ' + data.list[j].wind.speed + ' mi/hr';
                    document.querySelector('#d1-humid').textContent = 'Humidity: ' + data.list[j].main.humidity + '%';
                    document.querySelector('#d1-feels').textContent = 'Feels like: ' + data.list[j].main.feels_like + '°F'; 
                    
                    document.querySelector('#d2-temp').textContent = 'Temp: ' + data.list[j+8].main.temp+ '°F';
                    document.querySelector('#d2-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d2-icon').setAttribute('alt', data.list[j+8].weather[0].description)
                    document.querySelector('#d2-wind').textContent = 'Wind speed: ' + data.list[j+8].wind.speed + ' mi/hr';
                    document.querySelector('#d2-humid').textContent = 'Humidity: ' + data.list[j+8].main.humidity + '%';
                    document.querySelector('#d2-feels').textContent = 'Feels like: ' + data.list[j+8].main.feels_like + '°F';
                    
                    document.querySelector('#d3-temp').textContent = 'Temp: ' + data.list[j+16].main.temp+ '°F';
                    document.querySelector('#d3-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d3-icon').setAttribute('alt', data.list[j+16].weather[0].description)
                    document.querySelector('#d3-wind').textContent = 'Wind speed: ' + data.list[j+16].wind.speed + ' mi/hr';
                    document.querySelector('#d3-humid').textContent = 'Humidity: ' + data.list[j+16].main.humidity + '%';
                    document.querySelector('#d3-feels').textContent = 'Feels like: ' + data.list[j+16].main.feels_like + '°F';

                    document.querySelector('#d4-temp').textContent = 'Temp: ' + data.list[j+24].main.temp+ '°F';
                    document.querySelector('#d4-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d4-icon').setAttribute('alt', data.list[j+24].weather[0].description)
                    document.querySelector('#d4-wind').textContent = 'Wind speed: ' + data.list[j+24].wind.speed + ' mi/hr';
                    document.querySelector('#d4-humid').textContent = 'Humidity: ' + data.list[j+24].main.humidity + '%';
                    document.querySelector('#d4-feels').textContent = 'Feels like: ' + data.list[j+24].main.feels_like + '°F';
                    
                    document.querySelector('#d5-temp').textContent = 'Temp: ' + data.list[j+32].main.temp+ '°F';
                    document.querySelector('#d5-icon').setAttribute('src', 'http://openweathermap.org/img/w/'+data.list[j+8].weather[0].icon+'.png')
                    document.querySelector('#d5-icon').setAttribute('alt', data.list[j+32].weather[0].description)
                    document.querySelector('#d5-wind').textContent = 'Wind speed: ' + data.list[j+32].wind.speed + ' mi/hr';
                    document.querySelector('#d5-humid').textContent = 'Humidity: ' + data.list[j+32].main.humidity + '%';
                    document.querySelector('#d5-feels').textContent = 'Feels like: ' + data.list[j+32].main.feels_like + '°F';
                }
            }
        })
    });
}

createStorage();

submitBtn.addEventListener('click', searchCity);