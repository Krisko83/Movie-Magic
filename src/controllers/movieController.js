import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie' })
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    await movieService.create(newMovie);

    res.redirect('/');
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter, pageTitle: 'Search Movies' })
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const rating = '&#x2605;'.repeat(Math.floor(movie.rating));

    res.render('movies/details', { movie, rating, pageTitle: 'Movie Details' })
});

movieController.get('/:movieId/attach',isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) });

    res.render('movies/attach', { movie, artists, pageTitle: 'Attach Artist' })
});

movieController.post('/:movieId/attach',isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

   await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/edit', async (req, res) => {
    const movieid = req.params.movieId;

    const movie = await movieService.getMovieById(movieid);

    res.render('movies/edit', { movie })
})  

movieController.get('/:movieId/delete', (req, res) => {
    
})




export default movieController;