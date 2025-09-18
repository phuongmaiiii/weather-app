import { useState, useEffect, use } from 'react';
export default function useGeolocation() {
    const [loading, setLoading ] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({});

    useEffect(() => {
        const onSuccess = (position) => {
            setLoading(false);
            setError(null);
            setData(position.coords);
        };
        const onError = (error) => {
            setLoading(false);
            setError(error);
        };
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
    return {loading, error, data};
}
