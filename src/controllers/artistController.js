import e, { Router } from "express";
import artistService from "../services/artistService";
import { isAuth } from "../middlewares/authMiddleware";
import { ArtistCreateSchema } from "../schemas/artistSchema";
import { getErrorMessage } from "../utils/errorUitls";
import * as z from 'zod'

const artistController = Router();

artistController.get('/create', isAuth, (req, res) => {
    res.render('artists/create');
})

artistController.post('/create', isAuth, async (req, res) => {
    const data = req.body;

    try {
        const artist = ArtistCreateSchema.parse(data);
        await artistService.create(artist);

        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        const errors = z.flattenError(err).fieldErrors;
      
        res.status(400).render('artists/create', { artist: data, error, errors });
    };

});

export default artistController;