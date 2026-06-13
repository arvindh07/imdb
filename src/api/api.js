import axiosInstance from "./axios"

export const fetchData = async (url, query) => {
    let response = {
        data: null,
        error: null
    }
    try {
        const localUrl = query ? url + `?api_key=${import.meta.env.VITE_TMDB_API_KEY}` + query : url + `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`;
        const res = await axiosInstance.get(localUrl);
        if (!res.data) {
            throw new Error("No data found")
        }
        response.data = res.data;
    } catch (error) {
        response.error = error.message;
    } finally {
        return response;
    }
}