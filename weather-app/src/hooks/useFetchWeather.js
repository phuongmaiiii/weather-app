import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCoords } from "../services/api";
import { fetchWeatherByCity } from "../services/api";

export default function useFetchWeather(geoData, search) {
    const enabled = search ? Boolean(search) : Boolean(geoData?.latitude && geoData?.longitude);

    const { data, error, isLoading } = useQuery({
        queryKey: search ? ["weather", { type: "city", q: search }] : ["weather", { type: "geo", coords: geoData }],
        queryFn: async () => search ? fetchWeatherByCity(search) : fetchWeatherByCoords(geoData),
        enabled,
        staleTime: 60 * 60 * 1000, // 60 minutes
        cacheTime:  60 * 60 * 1000, // 1 hours
    })

    return { data, error, isLoading };
}
