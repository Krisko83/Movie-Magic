import { Router } from 'express';
import movieService from '../services/movieService.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create')
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.create(newMovie);
    res.redirect('/');

});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;  
    
    const movie = await movieService.getMovieById(movieId);
    const ratingValue = Math.floor(movie.rating);
    const rating = '&#x2605;'.repeat(ratingValue);

    res.render('movies/details', { movie , rating })
}); 


export default movieController;