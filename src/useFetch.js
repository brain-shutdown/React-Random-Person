import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFetch = (url) => {
	const [loading, setLoading] = useState('Loading...');
	const [error, setError] = useState(null);
	const [data, setData] = useState(null);

	const fetchData = useCallback(async () => {
		const controller = new AbortController();
		setData(null);
		setLoading('Loading...');
		setError(null);
		try {
			const response = await axios.get(url, {
				signal: controller.signal,
			});
			response.data && setData(response.data);
			setLoading(false);
		} catch (error) {
			setError('API connection failed. Try again later...');
			setLoading(false);
		}
		return () => controller.abort();
	}, [url]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { loading, error, data, fetchData };
};

export default useFetch;
