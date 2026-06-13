export const getImageURL = (path) => `https://image.tmdb.org/t/p/w500/${path}.jpg`;

export const getGenreName = (movieGenreId, genres) => {
    const findGenre = genres.find((g) => parseInt(g.id) === parseInt(movieGenreId));
    return findGenre ? findGenre.name : "";
}