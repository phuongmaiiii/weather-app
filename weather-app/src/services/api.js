import axios from "axios";

const weatherAPI = 'https://api.openweathermap.org/data/2.5';
const currentWeatherUrl = `${weatherAPI}/weather`;
const forecastUrl = `${weatherAPI}/forecast`;

export const weatherIconUrl = 'https://openweathermap.org/img/wn/';

const apiKey = import.meta.env.VITE_API_KEY;

export const fetchWeatherByCoords = async (geoData) => {
    if(!geoData?.latitude || !geoData?.longitude) return;
    const params = {
        lat: geoData.latitude,
        lon: geoData.longitude,
        units: 'metric',
        appid: apiKey,
    };

    const [current, forecast] = await Promise.all([ 
        axios.get(currentWeatherUrl, { params }), 
        axios.get(forecastUrl, { params }) ]);
    
    console.log("Fetched weather data:", {current: current.data, forecast: forecast.data});

    return {current: current.data, forecast: forecast.data};
}

export const fetchWeatherByCity = async (search) => {
    if(!search) return;
    const params = {
        q: search,
        units: 'metric',
        appid: apiKey,
    };
    const [current, forecast] = await Promise.all([ 
        axios.get(currentWeatherUrl, { params }), 
        axios.get(forecastUrl, { params }) ]);
        
    console.log("Fetched weather data by city:", {current: current.data, forecast: forecast.data});

    return {current: current.data, forecast: forecast.data};
}