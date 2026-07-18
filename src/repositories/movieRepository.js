import fs from 'fs/promises';
import { prisma } from '../../prisma/lib/prisma.js';

async function getAll(filter = {}) {     
    const movies = await prisma.movie.findMany({
        where: {
            year: filter.year || undefined,
            title: {
                contains: filter.search,
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
        where: { id: movieId },
        include: {
            artists: {
                include: {
                    artist: true
                }
            }
        }
    });

    if (!movie) {
        throw new Error('No movie found!')
    };

    return movie;
};

async function create(movieData) {     
    await prisma.movie.createMany({
        data: movieData
    });

};

async function attachArtist(movieId, artistId, userId, character) {
   const result = await prisma.movie.update({
        where: { 
            id: movieId,
            creatorId: userId
        },
        data: {
            artists: {
                create: { artistId ,character }
            }
        }
    });

    return result;
};

async function remove(movieId, userId) {
    console.log('from repo:',movieId, userId);

    const result = await prisma.movie.delete({
        where: {
            id: movieId,
            creatorId: userId
        }
    });    //The database checks if user-a is owner of the movie

 
    
    return result;
}
 
async function update(movieData, movieId, userId) {    
    const result = await prisma.movie.update({
        where: {
            id: movieId,
            creatorId: userId
        },
        data: movieData
    })

    return result;
}

const movieRepository = {
    getAll,
    getMovieById,
    create,
    attachArtist,
    remove,
    update
};

export default movieRepository;

