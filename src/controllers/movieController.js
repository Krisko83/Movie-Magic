import { Router } from 'express';
import movieService from '../services/movieService.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create')
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
 
    const movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter })
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieById(movieId);
    const ratingValue = Math.floor(movie.rating);
    const rating = '&#x2605;'.repeat(ratingValue);

    res.render('movies/details', { movie, rating })
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.create(newMovie);
    res.redirect('/');

});



export default movieController;