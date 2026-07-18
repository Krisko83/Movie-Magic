import movieRepository from "../repositories/movieRepository.js";

 
 function getAll(filter = {}) {
    filter.year = Number(filter.year);
    return movieRepository.getAll(filter);
}

function getMovieById(movieId) {
    return movieRepository.getMovieById(movieId)
}

async function create(movieData, userId) {    
    movieData.creatorId = userId; 
    
   return await movieRepository.create(movieData);
};

function attachArtist(movieId, artistId, userId ,character) {
    return movieRepository.attachArtist(movieId, artistId, userId, character);
}

async function remove(movieId, userId) {
    const movie = await movieRepository.getMovieById(movieId);

    if(!movie) {
        throw new Error('Movie not found');
    };

    if(movie.creatorId !== userId) {
        throw new Error('Unauthorized!')  //extra protection ,owner to be the current user
    }

    return await movieRepository.remove(movieId, userId);
}

async function update(movieData, movieId, userId) { 
    movieData.year = Number(movieData.year);
    movieData.rating = Number(movieData.rating);

    return await movieRepository.update(movieData, movieId, userId);
}

const movieService = {
    getAll,
    getMovieById,
    create,
    attachArtist,
    remove,
    update
}

export default movieService;