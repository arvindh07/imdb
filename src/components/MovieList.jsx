import { useEffect, useState } from "react"
import { fetchData } from "../api/api"
import { urls } from "../api/urls"
import { getGenreName, getImageURL } from "../utils/common";
import { Plus } from "lucide-react";

const MovieList = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(2);
    const [watchList, setWatchList] = useState([]);

    const fetchTrendingMovies = async () => {
        const response = await fetchData(urls.TRENDING_MOVIES, `&page=${page}`);

        if (!response.error) {
            setTrendingMovies(response.data?.results || []);
            setTotalPages(response.data?.total_pages || 1);
        }
    }

    const fetchGenres = async () => {
        const response = await fetchData(urls.GET_GENRES);

        if (!response.error) {
            setGenres(response.data?.genres || []);
        }
    }

    const handleAddToWatchList = (movie) => {
        setWatchList((prev) => [...prev, movie]);
    }

    const handleRemoveToWatchList = (movieId) => {
        const newList = watchList.filter((movie) => movie.id !== movieId);
        setWatchList(newList);
    }

    const checkIfPresentInWatchlist = (movieId) => {
        return Boolean(watchList.find((movie) => movie.id === movieId));
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
                    const isAlreadyPresent = checkIfPresentInWatchlist(movie.id);
                    return (
                        <div
                            key={movie.id}
                            className="rounded-xl w-1/5 transition-all duration-300"
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
                                <p><i>Release Date:</i> {movie.release_date}</p>

                                {!isAlreadyPresent ? <button
                                    onClick={() => handleAddToWatchList(movie)}
                                    className="flex justify-center items-center gap-x-2 cursor-pointer w-full p-2 border-gray-400 rounded-4xl mt-4 mb-2 bg-gray-300 hover:bg-yellow-600/40">
                                    <Plus />
                                    Watchlist
                                </button> : <button
                                    onClick={() => handleRemoveToWatchList(movie.id)}
                                    className="flex justify-center items-center gap-x-2 cursor-pointer w-full p-2 border-gray-400 rounded-4xl mt-4 mb-2 bg-red-300 hover:bg-red-600/40">
                                    Remove from Watchlist
                                </button>}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MovieList