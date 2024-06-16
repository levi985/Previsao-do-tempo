const apiKey = '559d1270faaa8a98ca3e0a6f6c9ade18';

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Não foi possível obter os dados do tempo.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados do tempo:', error);
        return null;
    }
}

function displayWeather(weather) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (!weather) {
        weatherInfo.innerHTML = '<p>Erro ao buscar dados do tempo.</p>';
        return;
    }

    const { name, main, weather: weatherDesc } = weather;
    const temperature = main.temp;
    const description = weatherDesc[0].description;

    weatherInfo.innerHTML = `
        <h2>Previsão do Tempo para ${name}</h2>
        <p><strong>Temperatura:</strong> ${temperature}°C</p>
        <p><strong>Descrição:</strong> ${description}</p>
    `;
}

function searchWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();

    if (city) {
        getWeather(city)
            .then(weatherData => displayWeather(weatherData))
            .catch(err => console.error('Erro ao buscar dados do tempo:', err));
    } else {
        alert('Por favor, digite o nome da cidade.');
    }
}
