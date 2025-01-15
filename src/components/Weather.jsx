
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const Apikey = "6dcb60675386aa9bf78ce14f5166b486";

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (city) {
                setLoading(true);
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}`
                    );
                    setWeatherData(response.data);
                    setError(null);
                } catch (error) {
                    if (error.response && error.response.status === 404) {
                        setError('City not found. Please enter a valid city name.');
                    } else {
                        setError('Error fetching weather data. Please try again.');
                    }
                    setWeatherData(null);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchWeatherData();
    }, [city]);

    return (
        <div>
            {loading && <p>Loading weather data...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherData && !loading && (
                <div>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
