import fs from 'fs/promises';


async function readDb(colection) {
    const dbContent = await fs.readFile('./src/db.json', { encoding: 'utf8' });
    const db = JSON.parse(dbContent);

    if(colection && !db.hasOwnProperty(colection)) {
        throw new Error('No colection')
    }
    return colection ? db[colection] : db;
}
export async function getAllMovies() {    
    const movies = await readDb('movies'); 
    
    return movies;
} 

