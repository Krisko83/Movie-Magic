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
    const userId = req.user.id;

    await movieService.create(newMovie, userId);

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

    const userId = req.user?.id;
    const isOwner = movie.creatorId && movie.creatorId === userId;

    res.render('movies/details', { movie, rating, isOwner, pageTitle: 'Movie Details' })
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) });

    res.render('movies/attach', { movie, artists, pageTitle: 'Attach Artist' })
});

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieid = req.params.movieId;

    const movie = await movieService.getMovieById(movieid);

    res.render('movies/edit', { movie, pageTitle: 'Edit Page' })
})

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    await movieService.remove(movieId, userId);

    res.redirect('/');
})




export default movieController;