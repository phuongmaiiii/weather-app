import { useState, useEffect } from "react";
import useGeolocation from "../hooks/useGeolocation"
import useFetchWeather from "../hooks/useFetchWeather"
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";

export default function Weather() {
    const { loading, error, data: geoData } = useGeolocation();

    const [city, setCity] = useState("");
    const [search, setSearch] = useState("");

    const {data, error: apiError, isLoading: apiLoading} = useFetchWeather(geoData, search);
  
    const { current, forecast } = data || {};

    useEffect(() => {
        if (geoData?.latitude && geoData?.longitude && !search) 
            setSearch(""); // Trigger fetch by geo location only if no search term
    }, [geoData]);

   const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
        console.log("Searching for city:", city);
        setSearch(city.trim());
        console.log("Search state updated to:", search);
    }
   }
   return (
    <div className="mt-6">
        {/* Error geolocation */}
        {error && <p className="text-blue-600 text-lg font-semibold text-center mb-2">{error.message}</p>}
        {/* Error API */}
        {apiError && <p className="text-blue-600 text-lg font-semibold text-center mb-2">{apiError.message}</p>}
        <div className="bg-white shadow-md p-2 rounded-lg mb-2 w-full">
        <form className="flex items-center space-x-2" onSubmit={handleSearch}>
            <input 
            type="text" 
                placeholder="Enter city name" 
                className="border-gray-300 border p-2 rounded flex-1"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit" className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
        </form>
        </div>
        {/* Loading API */}
        {apiLoading && <p className="text-blue-500 text-lg font-semibold">Loading weather...</p>}
        {current && <div className="bg-white shadow-md p-6 rounded-lg mb-4 w-full"><WeatherCard {...current} /></div>}
        {forecast && <div className="bg-white shadow-md p-6 rounded-lg mb-4 w-full"><Forecast {...forecast} /></div>}
    </div>
   )
}