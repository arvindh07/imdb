import { X } from "lucide-react"
import { getImageURL } from "../utils/common";

const MovieOverlay = ({ selectedMovie, setOpenModal, setSelectedMovie }) => {
    if (!selectedMovie) return;

    return (
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80" />

            {/* Content */}
            <div className="relative h-full flex items-center justify-center">
                <div className="bg-white rounded-xl h-[80vh] p-6 w-2/4 flex flex-col">
                    <div className="flex justify-end items-center">
                        <button className="cursor-pointer" onClick={() => {
                            setOpenModal(false);
                            setSelectedMovie(null);
                        }}>
                            <X />
                        </button>
                    </div>

                    <div className="flex-1 mt-4 flex gap-x-4">
                        <div className="w-2/4">
                            <img src={getImageURL(selectedMovie.poster_path)} alt="" className="w-full h-full object-cover rounded-md" />
                        </div>
                        <div className="w-3/4">
                            <h1 className="text-4xl mb-6">{selectedMovie.title || selectedMovie.original_title}</h1>
                            <p>{selectedMovie.overview}</p>
                            <p className="mt-8 font-semibold"><i>Release Date:</i> {selectedMovie.release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieOverlay