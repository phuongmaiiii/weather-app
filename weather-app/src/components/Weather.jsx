import { useState } from "react";
import useGeolocation from "../hooks/useGeolocation"
import useFetchWeather from "../hooks/useFetchWeather"
import WeatherCard from "./WeatherCard";
import Forecast from "./Forecast";

export default function Weather() {
    const { loading, error, data: geoData } = useGeolocation();

    const [city, setCity] = useState("");
    const [search, setSearch] = useState("");

    const {data, error: apiError, isLoading: apiLoading} = useFetchWeather(geoData, search);
    
    

    if (loading) {
        return <p className="text-blue-500 text-lg font-semibold">Loading...</p>
    }
   if (error) {
        return <p className="text-red-500 text-lg font-semibold">Error: {error.message}</p>
   }

   const { current, forecast } = data || {};

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
        {error && <p className="text-red-500 text-lg font-semibold">{error.message}</p>}
        {error && <p className="text-red-500 text-lg font-semibold">{apiError.message}</p>}
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
        {current && <div className="bg-white shadow-md p-6 rounded-lg mb-4 w-full"><WeatherCard {...current} /></div>}
        {forecast && <div className="bg-white shadow-md p-6 rounded-lg mb-4 w-full"><Forecast {...forecast} /></div>}
    </div>
   )
}