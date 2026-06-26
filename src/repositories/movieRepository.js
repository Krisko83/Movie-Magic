import fs from 'fs/promises';


async function readDb(colection) {
    const dbContent = await fs.readFile('./src/db.json', { encoding: 'utf8' });
    const db = JSON.parse(dbContent);

    if(colection && !db.hasOwnProperty(colection)) {
        throw new Error('No colection')
    }
    return colection ? db[colection] : db;
}
 async function getAll() {    
    const movies = await readDb('movies');     
    return movies;
} 

async function getMovieById(movieId) {
    const movies = await getAll();
    const movie = movies.find(m => m.id === movieId);
    
    return movie;
}

const movieRepository = {
    getAll,
    getMovieById
};

export default movieRepository;

