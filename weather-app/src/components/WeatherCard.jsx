import { getFormattedDate } from "../utils";
import { weatherIconUrl } from "../services/api";

function WeatherCard({ name, sys, main, weather, wind }) {
    return (
        <div className="flex flex-col items-center text-center">
            <h2 className="text-lg font-bold">{name}, {sys.country}</h2>
            <h3 className="text-sm">
                {getFormattedDate()}
            </h3>

            <h3 className="mt-2 mb-4 font-semibold">Current Weather</h3>

            <div className="flex items-center justify-center mb-4">
                <img src={`${weatherIconUrl}${weather[0].icon}@2x.png`} alt={weather[0].description} />
                <span className="text-4xl font-bold pr-6">{Math.round(main.temp)}<sup>°C</sup></span>
                <div className="text-right">
                    <span className="block font-semibold">{weather[0].main}</span>
                    <span className="block text-sm">Feels like {Math.round(main.feels_like)}<sup>°C</sup></span>
                </div>
            </div>
            <div className="flex justify-between text-sm w-full max-w-md">
                <div className="text-center">
                    Wind <br/> {Math.round(wind.speed)} m/s
                </div>
                <div className="text-center">
                    Humidity <br/> {Math.round(main.humidity)}%
                </div>
                <div className="text-center">
                    Pressure <br/> {Math.round(main.pressure)}
                </div>
            </div>
         </div>
    )
}
export default WeatherCard;