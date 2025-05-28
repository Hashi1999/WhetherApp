document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const cityName = document.getElementById('city-name');
    const currentDate = document.getElementById('current-date');
    const temp = document.getElementById('temp');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const wind = document.getElementById('wind');
    const errorMessage = document.getElementById('error-message');

    // API Configuration
    const apiKey = 'apikey paste here';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
    // Fetch weather data
    async function fetchWeather(city) {
        try {
            const response = await fetch(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`);
            
            if (!response.ok) {
                throw new Error('City not found');
            }
            
            const data = await response.json();
            displayWeather(data);
            errorMessage.style.display = 'none';
        } catch (error) {
            if (error.message === 'City not found') {
                errorMessage.textContent = 'City not found';
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
                console.error('Error:', error);
            }
        }
    }
    
    // Display weather data
    function displayWeather(data) {
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        
        // Format current date
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDate.textContent = now.toLocaleDateString('en-US', options);
        
        temp.textContent = Math.round(data.main.temp);
        weatherDescription.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;
        
        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;
    }
    
    // Event listeners
    searchBtn.addEventListener('click', function() {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });
    
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = cityInput.value.trim();
            if (city) {
                fetchWeather(city);
            }
        }
    });
    
    // Fetch weather for default city on page load
    fetchWeather('Colombo');
});