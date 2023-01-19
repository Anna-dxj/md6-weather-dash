var submitBtn = document.querySelector('#submit-btn'); 
var cityInput = document.querySelector('#city-search');

var weatherMapApiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&long='+long+'&appid='+apiKey;
var geocodingApiURl = 'http://api.openweathermap.org/geo/1.0/direct?q='+cityName+'&appid='+apiKey;

var apiKey = 'c4204ca60f5195a0a505821e9aa7a5de'
var lat = '';
var long = '';
var cityName = cityInput.value().toLowerCase().trim();

function fetchLatLong (){}
function fetchCityInfo () {}
function searchCity (event) {
    event.preventDefault();
}
function storeCity () {}
function retrieveCity () {}
