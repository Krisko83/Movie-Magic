import { Router } from "express";
import artistService from "../services/artistService";
import { isAuth } from "../middlewares/authMiddleware";


const artistController = Router();

artistController.get('/create', isAuth, (req, res) => {
    res.render('artists/create', { pageTitle: 'Create Artist' });
})

artistController.post('/create', isAuth, async (req, res) => {
    const data = req.body;

    await artistService.create(data);

    res.redirect('/');
})

export default artistController;