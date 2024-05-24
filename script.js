const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "150c348bb4e2fa1d250361c6b272aae6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    try {
        const response = await fetch(url);
        const weather_data = await response.json();

        if (weather_data.cod === '404') {
            location_not_found.style.display = "flex";
            weather_body.style.display = "none";
            console.log("Location not found");
            return;
        }

        console.log("Weather data received");
        location_not_found.style.display = "none";
        weather_body.style.display = "flex";
        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch(weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "/photo/cloud.png";
                break;
            case 'Clear':
                weather_img.src = "/photo/clear.png";
                break;
            case 'Rain':
                weather_img.src = "/photo/rain.png";
                break;
            case 'Mist':
                weather_img.src = "/photo/mist.png";
                break;
            case 'Snow':
                weather_img.src = "/photo/snow.png";
                break;
            default:
                weather_img.src = "/photo/default.png";
                break;
        }

        console.log(weather_data);
    } catch (error) {
        console.error("Error fetching the weather data: ", error);
    }
}

searchBtn.addEventListener('click', () => {
    const city = inputBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
