import fs from 'fs/promises'; 
import { prisma } from '../../prisma/lib/prisma.js'

 

 async function getAll(filter = {}) {    
    filter.year = Number(filter.year);

    let movies = await prisma.movie.findMany({
        where: {
            year: filter.year || undefined,
            title: {
                contains: filter.search || undefined,
                mode: 'insensitive'
            },
            genre: {
                equals: filter.genre || undefined,
                mode: 'insensitive'
            }
        }
    });     

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

