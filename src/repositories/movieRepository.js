import fs from 'fs/promises'; 
import { prisma } from '../../prisma/lib/prisma.js'

 

 async function getAll(filter = {}) {    
    let movies = await prisma.movie.findMany();     
 
    // if(filter.search) {
    //    movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    // };

    // if(filter.genre) {
    //    movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    // };

    // if(filter.year) {
    //    movies = movies.filter(movie => movie.year === filter.year);
    // };

    return movies;
} 

async function getMovieById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: { id: movieId } 
    }); 
    
    if(!movie) {
        throw new Error('No movie found!')
    };
    
    return movie;
};
 
async function create(movieData) {
    await prisma.movie.createMany({
        data: movieData
    }); 

};

const movieRepository = {
    getAll,
    getMovieById,
    create
};

export default movieRepository;

