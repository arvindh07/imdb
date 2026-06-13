import { useEffect, useState } from "react"
import { fetchData } from "../api/api"
import { urls } from "../api/urls"
import { getGenreName, getImageURL } from "../utils/common";

const MovieList = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [genres, setGenres] = useState([]);

    const fetchTrendingMovies = async () => {
        const response = await fetchData(urls.TRENDING_MOVIES);

        if (!response.error) {
            setTrendingMovies(response.data?.results || []);
        }
    }

    const fetchGenres = async () => {
        const response = await fetchData(urls.GET_GENRES);

        if (!response.error) {
            setGenres(response.data?.genres || []);
        }
    }

    useEffect(() => {
        fetchTrendingMovies();
        fetchGenres();
    }, [])

    return (
        <div className="m-2 mt-10 mb-20">
            <h2 className="mb-6 ml-30 text-2xl font-bold underline decoration-amber-500 underline-offset-8">Trending Movies</h2>
            <div className="flex flex-wrap gap-x-6 gap-y-6 mx-auto justify-center">
                {trendingMovies?.map((movie) => {
                    return (
                        <div
                            key={movie.id}
                            className="rounded-xl cursor-pointer hover:bg-yellow-200 w-1/5 transition-all duration-300 hover:scale-105"
                            style={{
                                boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
                            }}>
                            <div>
                                <img src={getImageURL(movie.poster_path)} alt="" className="w-full h-96 object-cover rounded-t-xl" />
                            </div>
                            <div className="p-3">
                                <h1 className="mb-3 text-xl font-bold">{movie.title}</h1>
                                {movie.genre_ids.map((id, idx) => {
                                    return (
                                        <span key={id + idx}>{getGenreName(id, genres)}{idx !== movie.genre_ids.length - 1 ? " • " : ""}</span>
                                    )
                                })}
                                <p><i>Language:</i> {movie.original_language}</p>
                                <p><i>Release Date:</i> {movie.release_date}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieList