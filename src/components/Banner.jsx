import { useEffect, useState } from "react"
import { fetchData } from "../api/api"
import { urls } from "../api/urls"
import { getImageOriginalURL } from "../utils/common";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Banner = () => {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentIdx, setCurrentIdx] = useState(0);

    const fetchTrendingMovies = async () => {
        setLoading(true);
        const response = await fetchData(urls.TRENDING_MOVIES);

        if (!response.error) {
            setTrendingMovies(response.data?.results?.slice(0, 5) || []);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchTrendingMovies();
    }, [])

    const handleNext = () => {
        setCurrentIdx((prev) => ((prev + 1) % trendingMovies.length));
    }

    const handlePrev = () => {
        const pr = currentIdx === 0 ? trendingMovies.length - 1 : currentIdx - 1;
        setCurrentIdx(pr);
    }

    if (loading) return <h1>Loading...</h1>

    return (
        <div className="h-[80vh]">
            <div className="relative h-full w-full overflow-hidden">
                {trendingMovies.map((movie, idx) => (
                    <div
                        key={movie.id + "trend"}
                        className={`absolute h-full inset-0 bg-cover bg-center transition-opacity duration-700 ${currentIdx === idx ? "opacity-100" : "opacity-0"}`}
                        style={{
                            backgroundImage: `url(${getImageOriginalURL(movie.backdrop_path)})`,
                        }}
                    >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute left-0 top-0 h-full w-24 bg-linear-to-r from-black/80 to-transparent pointer-events-none" />
                        <div className="absolute right-0 top-0 h-full w-24 bg-linear-to-l from-black/80 to-transparent pointer-events-none" />

                        {/* Content */}
                        <div className="absolute bottom-8 left-0 z-10 p-8 md:p-12 max-w-3xl">
                            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
                                {trendingMovies?.[currentIdx].title}
                            </h1>
                        </div>

                        {/* prev, next btns */}
                        <div onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg transition-all duration-300 hover:scale-125">
                            <ChevronLeft color="white" size={50} />
                        </div>
                        <div onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-lg transition-all duration-300 hover:scale-125">
                            <ChevronRight color="white" size={50} />
                        </div>

                        {/* dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2">
                            {trendingMovies.map((_, idx) => {
                                return (
                                    <div key={idx} className={`transition-all duration-300 ease-in-out ${currentIdx === idx ? "w-6 h-2 rounded-lg bg-white" : "w-2 h-2 rounded-full bg-white/30"}`}></div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Banner