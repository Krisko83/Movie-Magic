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
 

homeController.get('/movies/:id/details', async (req, res) => {
    const movieId = req.params.id;  
    
    const movie = await movieService.getMovieById(movieId);
    const ratingValue = Math.floor(movie.rating);
    const rating = '&#x2605;'.repeat(ratingValue);

    res.render('details', { movie , rating })
}); 

 
export default homeController;