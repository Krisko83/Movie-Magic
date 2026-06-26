import movieRepository from "../repositories/movieRepository.js";

 
 function getAll() {
    return movieRepository.getAll();
}

function getMovieById(movieId) {
    return movieRepository.getMovieById(movieId)
}

function create(movieData) {
   return movieRepository.create(movieData);
};

const movieService = {
    getAll,
    getMovieById,
    create
}

export default movieService;