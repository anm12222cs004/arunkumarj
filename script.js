async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const apiKey = 'd92fcc34c4b01f6c3c4cbd9705969e10'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found!');
        } else {
            displayWeather(data);
        }
    } catch (error) {
        alert('Error fetching weather data. Please try again later.');
    }
}

function displayWeather(data) {
    const weatherCard = document.getElementById('weatherCard');
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    // Format and inject the weather data into the card
    weatherCard.innerHTML = `
        <h2>${cityName}</h2>
        <div class="temp">${temperature}°C</div>
        <p class="description">${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;

    // Show the weather card
    weatherCard.style.display = 'block';
}
