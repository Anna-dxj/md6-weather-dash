const submitBtn = document.querySelector('#submit-btn');
const cityNameDateEl = document.querySelector('#city-display');
const warningCard = document.querySelector('#warning-card');
const errorCard = document.querySelector('#error-card');
const weatherDiv = document.querySelector('#weather-card');
const prevSearchDiv = document.querySelector("#prev-search");
const formDiv = document.querySelector('#form-div');
const formContainer = document.querySelector('f')

const nowIconEl = document.querySelector('#now-icon');
const nowWeather = document.querySelector('#now-weather');
const nowTempEl = document.querySelector('#now-temp');
const nowWindEl = document.querySelector('#now-wind');
const nowHumidEl = document.querySelector('#now-humidity');
const nowFeelsEl = document.querySelector('#now-feels');

const apiKey = 'a6e22ff5fd306121b7107074ca75c22a';
let lattitude = '';
let longitude = '';
const now = dayjs().format('D MMM YYYY HH:m');

const fetchGeoEncoding = async (cityName) => {
    try {
        const geocodingApiURl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
        const response = await fetch(geocodingApiURl);
        if (!response.ok) {
            console.error(`Geocoding error:`, response.status)
        };
        const data = await response.json();
        const { name, lat, lon } = data[0];
        if (data) {
            fetchWeatherNow(lat, lon);
            fetchPredictWeather(lat, lon);
            storeCity(name, lat, lon);
            warningCard.setAttribute('class', 'hidden');
            warningCard.setAttribute('class', 'hidden');
        } else {
            errorCard.setAttribute('warning-card card container-fluid px-3 py-2 my-2');
        };
    } catch (err) {
        console.error('Geocoding fetchErr', err)
    };
};

const fetchWeatherNow = async (lat, lon) => {
    try {
        const weatherNowApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
        const response = await fetch(weatherNowApiUrl);
        if (!response.ok) {
            console.error(`Get now error:`, response.status);
            return;
        };
        const data = await response.json();
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;


        cityNameDateEl.textContent = `${name} at ${now}`;
        nowIconEl.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
        nowIconEl.setAttribute('alt', description);
        nowWeather.textContent=description;
        nowTempEl.innerHTML = `<p><span class="key">Temp</span>: ${temp}°F </p>`;
        nowHumidEl.innerHTML = `<p><span class="key">Humidity</span>: ${humidity}% </p>`;
        nowFeelsEl.innerHTML = `<p><span class="key">Feels like</span>: ${feels_like}°F </p>`;
        nowWindEl.innerHTML = `<p><span class="key">Wind speed</span>: ${speed} mi/hr </p>`;

        weatherDiv.setAttribute('class', '')

    } catch (err) {
        console.error(`WeatherNow fetchErr`, err)
    }
};

const fetchPredictWeather = async (lat, lon) => {
    try {
        const predictWeatherApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`

        const response = await fetch(predictWeatherApiUrl);
        if (!response.ok) {
            console.error(`Get prediction error:`, response.status);
            return;
        }
        const {list} = await response.json();
        const filteredList = list.filter((item) => {
            return item.dt_txt.includes('00:00:00');
        })
        for (let i = 0; i < filteredList.length; i++) {
            const {icon, description} = filteredList[i].weather[0];
            const {speed} = filteredList[i].wind;
            const {humidity, temp_max, temp_min} = filteredList[i].main;
            const {dt} = filteredList[i]
            const futureDate = dayjs(dt*1000).format('D MMM YYYY')

            document.querySelector(`#d${i+1}-date`).textContent = futureDate;
            document.querySelector(`#d${i+1}-icon`).setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`)
            document.querySelector(`#d${i+1}-icon`).setAttribute('alt', description)
            document.querySelector(`#d${i+1}-weather`).textContent=description;
            document.querySelector(`#d${i+1}-min`).innerHTML = `<p><span class="key">Min</span>: ${temp_min} °F</p>`
            document.querySelector(`#d${i+1}-max`).innerHTML = `<p><span class="key">Max</span>: ${temp_max} °F</p>`
            document.querySelector(`#d${i+1}-wind`).innerHTML = `<p><span class="key">Wind speed</span>: ${speed} mi/hr</p>`
            document.querySelector(`#d${i+1}-humid`).innerHTML = `<p><span class="key">Humidity</span>: ${humidity}%</p>`
        }
    } catch (err) {
        console.error('Predict fetchErr', err);

    }
}

const storeCity = (name, lat, lon) => {
    const cityData = {
        name,
        lat,
        lon
    }
    let storedData = [];
    const storedCityData = localStorage.getItem('cityData')
    if (storedCityData) {
        storedData = JSON.parse(storedCityData);
    }
    const filteredStoredData = storedData.filter((data) => {
        return !(data.lat === lat && data.lon === lon)
    })
    filteredStoredData.push(cityData);
    const updatedStoredData = JSON.stringify(filteredStoredData);
    
    localStorage.setItem('cityData', updatedStoredData);

    renderNewBtn(name, lat, lon);
}

const renderNewBtn = (name, lat, lon) => {
    const searchBtn = document.createElement('button');
    
    searchBtn.innerHTML = name;
    searchBtn.setAttribute('class', 'container-fluid text-center history-btn');
    searchBtn.addEventListener('click', () => {
        fetchWeatherNow(lat, lon);
        fetchPredictWeather(lat, lon);
    })
    prevSearchDiv.appendChild(searchBtn);
}

const renderBtns = () => {
    const storedCityData = localStorage.getItem('cityData');
    if (!storedCityData) {
        return;
    }
    const cityData = JSON.parse(storedCityData);
    const filteredCityData = cityData.filter((item, index, arr) => {
        return arr.findIndex((obj) => obj.lat === item.lat && obj.lon === item.lon) === index
    })

    const clearBtn = document.createElement('button');
    
    clearBtn.innerHTML = 'Clear History'
    clearBtn.setAttribute('class', 'container-fluid text-center history-btn')
    clearBtn.addEventListener('click', () => {
        localStorage.clear();
        while (prevSearchDiv.firstChild) {
            prevSearchDiv.firstChild.remove()
        }
    })
    prevSearchDiv.appendChild(clearBtn)
    filteredCityData.forEach(({name, lat, lon}) => {
        renderNewBtn(name, lat, lon);
    });
    


}

const handleCitySearch = async (event) => {
    event.preventDefault();
    const cityName = document.querySelector('#city-name').value.trim().toLowerCase();
    if (!cityName) {
        warningCard.setAttribute('class', 'warning-card card container-fluid px-3 py-2 my-2')
    }
    try {
        await fetchGeoEncoding(cityName)
    } catch (err) {
        console.error('citySearch err', err)
    }

    document.querySelector('#city-name').value = ''
}

renderBtns();

submitBtn.addEventListener('click', handleCitySearch);