import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, { ...options, signal });
                if (!res.ok) {
                    throw new Error(`Error: ${res.status}`);
                }
                const json = await res.json();
                setData(json);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort(); // limpia si el componente se desmonta
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
