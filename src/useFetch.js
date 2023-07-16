import { useEffect, useState } from "react";

const useFetch = (url, options) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        if (options) {
            options.signal = abortController.signal
        }

        fetch(url, options || {signal: abortController.signal})
            .then(response => {
                if (!response.ok) {
                    throw Error('Unable to fetch data from ' + url);
                }
                return response.json();
            })
            .then(_data => {
                setIsPending(false);
                setError(null);
                setData(_data);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch of ' + url + ' aborted.')
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });

        return () => abortController.abort()

    }, [url, options]);

    return { data, isPending, error };
}

export default useFetch;