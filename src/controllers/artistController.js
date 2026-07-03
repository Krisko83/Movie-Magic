import { Router } from "express";
import artistService from "../services/artistService";
 

const artistController = Router();

artistController.get('/create', (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
})

artistController.post('/create', async (req, res) => {
    const data = req.body;
   
   await artistService.create(data);

    res.redirect('/');
})

export default artistController;