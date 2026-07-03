import movieRepository from "../repositories/movieRepository.js";

 
 function getAll(filter = {}) {
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

const movieService = {
    getAll,
    getMovieById,
    create
}

export default movieService;