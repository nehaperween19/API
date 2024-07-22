document.addEventListener('DOMContentLoaded', () => {
    const indianCities = [
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", 
        "Chennai", "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow", 
        "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam",
        "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik",
        "Faridabad", "Meerut", "Rajkot", "Kalyan", "Vasai", "Varanasi"
    ];

    const citySuggestions = document.getElementById('citySuggestions');
    indianCities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        citySuggestions.appendChild(option);
    });

    document.getElementById('weatherForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('city').value;
        getWeather(city);
    });
});

async function getWeather(city) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const loader = document.getElementById('loader');
    const weatherDataDiv = document.getElementById('weatherData');
    loader.style.display = 'block';
    weatherDataDiv.style.display = 'none';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    } finally {
        loader.style.display = 'none';
    }
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDataDiv.innerHTML = `
        <p>City: ${data.name}</p>
        <p class="temp">Temperature: ${data.main.temp}°C</p>
        <p class="description">Weather: ${data.weather[0].description}</p>
        <img src="${icon}" alt="Weather icon" class="icon">
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherDataDiv.style.display = 'block';
}
