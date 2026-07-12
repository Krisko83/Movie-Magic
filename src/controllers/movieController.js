import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { prepareCategoryViewData } from '../utils/viewUtils,js';

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

movieController.get('/details/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const rating = '&#x2605;'.repeat(Math.floor(movie.rating));

    const userId = req.user?.id;
    const isOwner = movie.creatorId && movie.creatorId === userId;

    res.render('movies/details', { movie, rating, isOwner, pageTitle: 'Movie Details' })
});

movieController.get('/details/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getMovieById(movieId);
    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) });

    res.render('movies/attach', { movie, artists, pageTitle: 'Attach Artist' })
});

movieController.post('/details/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;
    const userId = req.user.id;

    await movieService.attachArtist(movieId, artistId, userId);

    res.redirect(`/movies/details/${movieId}`);
});
 
movieController.get('/details/:movieId/edit', isAuth, async (req, res) => {
    const movieid = req.params.movieId;
    const userId = req.user.id;

    const movie = await movieService.getMovieById(movieid, userId);

    if (movie.creatorId !== userId) {
        return res.status(401).send('Unauthorized')
    }
 
    const categoryOptions = prepareCategoryViewData(movie); 

    res.render('movies/edit', { movie, categoryOptions, pageTitle: 'Edit Movie' })
})

movieController.get('/details/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    await movieService.remove(movieId, userId);

    res.redirect('/');
})

movieController.post('/details/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;
    const updatedData = req.body;

    await movieService.update(updatedData, movieId, userId)

    res.redirect(`/movies/details/${movieId}`)
})


export default movieController;