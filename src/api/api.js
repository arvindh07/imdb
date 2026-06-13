import axiosInstance from "./axios"

export const fetchData = async (url) => {
    let response = {
        data: null,
        error: null
    }
    try {
        const res = await axiosInstance.get(url + `?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
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