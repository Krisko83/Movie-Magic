import { Router } from 'express';
import movieService from '../services/movieService.js';
 

const homeController = Router();


homeController.get('/', async (req, res) => {   
    const movies = await movieService.getAll();
    
    res.render('home', { movies })
});

homeController.get('/about', (req, res) => {
    res.render('about')
});

homeController.get('/search', (req, res) => {
    res.render('search')
});


homeController.get('/create', (req, res) => {
    res.render('create')
});

homeController.get('/details/:id', async (req, res) => {
    const movieId = req.params.id;  
    
    const movie = await movieService.getMovieById(movieId);
    const ratingValue = Math.floor(movie.rating);
    const rating = '&#x2605;'.repeat(ratingValue);

    res.render('details', { movie , rating })
})

homeController.get('*url', (req, res) => {
    res.render('404')
});

export default homeController;