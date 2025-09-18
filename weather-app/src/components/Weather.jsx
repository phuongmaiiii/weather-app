import useGeolocation from "../hooks/useGeolocation"
import useFetchWeather from "../hooks/useFetchWeather"
export default function Weather() {
    const { loading, error, data: geoData } = useGeolocation();
    const {data, error: apiError, isLoading: apiLoading} = useFetchWeather(geoData);

    if (loading) {
        return <p className="text-blue-500 text-lg font-semibold">Loading...</p>
    }
   if (error) {
        return <p className="text-red-500 text-lg font-semibold">Error: {error.message}</p>
   }
   return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-600 shadow-lg rounded-lg p-6 mt-10 text-white">
        <h2 className="text-gray-800 mb-4 text-3xl font-bold">Weather Information</h2>
        
    </div>
   )
}