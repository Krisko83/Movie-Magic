import movieRepository from "../repositories/movieRepository.js";

 
 function getAll() {
    return movieRepository.getAll();
}

function getMovieById(movieId) {
    return movieRepository.getMovieById(movieId)
}

const movieService = {
    getAll,
    getMovieById
}

export default movieService;