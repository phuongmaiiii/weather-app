import { getShortDate } from "../utils";
import { weatherIconUrl } from "../services/api";

function Forecast({ list }) {
    if (!list) return null;
    return (
        <>
            <h2 className="text-lg font-bold mb-4">Forecast</h2>
            <div className="flex flex-wrap gap-2">
                {list.filter((_, index) => index % 8 === 0).map((forecastItem, index) =>
                    <div key={index} className="p-2 w-32 rounded-lg shadow-md">
                        <p className="font-semibold">{getShortDate(forecastItem.dt)}</p>
                        <div className="flex justify-center mb-1">
                            <img src={`${weatherIconUrl}${forecastItem.weather[0].icon}.png`} alt={forecastItem.weather[0].description} />
                        </div>
                        <p className="text-xl font-bold">{Math.round(forecastItem.main.temp)}&deg;C</p>
                        <p className="font-semibold">{forecastItem.weather[0].main}</p>
                        <div>{Math.round(forecastItem.wind.speed)} m/s</div>
                    </div>)}
            </div>

        </>
    )
}
export default Forecast;