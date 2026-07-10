import movieRepository from "../repositories/movieRepository.js";

 
 function getAll(filter = {}) {
    filter.year = Number(filter.year);
    return movieRepository.getAll(filter);
}

function getMovieById(movieId) {
    return movieRepository.getMovieById(movieId)
}

function create(movieData) {
    movieData.year = Number(movieData.year);
    movieData.rating = Number(movieData.rating);
    
   return movieRepository.create(movieData);
};

function attachArtist(movieId, artistId) {
    return movieRepository.attachArtist(movieId, artistId);
}

function remove(movieId) {
    return movieRepository.remove(movieId);
}

const movieService = {
    getAll,
    getMovieById,
    create,
    attachArtist,
    remove
}

export default movieService;