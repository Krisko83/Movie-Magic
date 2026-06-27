import { read } from 'fs';
import fs from 'fs/promises';
import { v4 as uuid } from 'uuid'

async function readDb(colection) {
    const dbContent = await fs.readFile('./src/db.json', { encoding: 'utf8' });
    const db = JSON.parse(dbContent);

    if(colection && !db.hasOwnProperty(colection)) {
        throw new Error('No colection')
    };

    return colection ? db[colection] : db;
};

 async function getAll(filter= {}) {    
    let movies = await readDb('movies');     
    console.log(filter);
    
    if(filter.search) {
       movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
    };

    if(filter.genre) {
       movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
    };

    if(filter.year) {
       movies = movies.filter(movie => movie.year === filter.year);
    };

    return movies;
} 

async function getMovieById(movieId) {
    const movies = await getAll();
    const movie = movies.find(m => m.id === movieId);
    
    if(!movie) {
        throw new Error('No movie found!')
    };
    
    return movie;
};


async function writeDb(db) {
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', content, { encoding: 'utf-8'});
};


async function create(movieData) {
    const db = await readDb();
    movieData.id = uuid();

    db.movies.push(movieData);

    await writeDb(db)
};

const movieRepository = {
    getAll,
    getMovieById,
    create
};

export default movieRepository;

