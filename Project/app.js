// API key for OpenWeatherMap
const API_KEY = 'bc674e85decc4f3ea8a35535240911 ';

function getWeather() {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => {
                document.getElementById('weather-info').innerHTML = "<p>City not found. Please try again.</p>";
                console.error("Error fetching weather data:", error);
            });
    } else {
        alert("Please enter a city name");
    }
}

function displayWeather(data) {
    if (data.cod === 200) {
        // Get icon code and create the image URL
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Generate weather information with the icon
        const weatherInfo = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="${iconUrl}" alt="${data.weather[0].description}">
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weather-info').innerHTML = weatherInfo;
    } else {
        document.getElementById('weather-info').innerHTML = "<p>City not found. Please try again.</p>";
    }
}
