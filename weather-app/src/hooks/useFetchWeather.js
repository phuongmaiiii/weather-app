import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCoords } from "../services/api";

export default function useFetchWeather(geoData) {
    const { data, error, isLoading } = useQuery({
        queryKey: ["weather", geoData],
        queryFn: async () => fetchWeatherByCoords(geoData),
        enabled: !!geoData?.latitude && !!geoData?.longitude, 
    })

    return { data, error, isLoading };
}