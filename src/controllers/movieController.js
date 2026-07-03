import { Router } from 'express';
import movieService from '../services/movieService.js';
import artistService from '../services/artistService.js';

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('movies/create', { pageTitle: 'Create Movie' })
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    console.log(filter);

    const movies = await movieService.getAll(filter);

    res.render('movies/search', { movies, filter, pageTitle: 'Search Movies' })
});

movieController.get('/:movieId', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieById(movieId);
    const rating = '&#x2605;'.repeat(Math.floor(movie.rating));

    res.render('movies/details', { movie, rating, pageTitle: 'Movie Details' })
});

movieController.get('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getMovieById(movieId);
    const artists = await artistService.getAll({ exclude: movie.artists.map(artist => artist.id) });

    res.render('movies/attach', { movie, artists, pageTitle: 'Attach Artist' })
});

movieController.post('/:movieId/attach', async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}`);
});


movieController.post('/create', async (req, res) => {
    const newMovie = req.body;

    await movieService.create(newMovie);
    res.redirect('/');

});



export default movieController;