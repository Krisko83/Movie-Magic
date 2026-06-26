import { Router } from 'express';
 

const homeController = Router();


homeController.get('/', (req, res) => {   
    res.render('home')
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


homeController.get('*url', (req, res) => {
    res.render('404')
});

export default homeController;