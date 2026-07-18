import { Router } from "express";
import authService from "../services/authService";
import { isAuth, isGuest } from "../middlewares/authMiddleware";
import { UserCreateSchema, UserLoginSchema } from "../Schemas/userSchema";
import * as z from 'zod';
import { getErrorMessage } from "../utils/errorUitls";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register')
});


authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});


authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    try {
        const user = await UserCreateSchema.parseAsync(userData)
        const token = await authService.register(user);

        res.cookie('auth', token, { httpOnly: true })
        res.redirect('/')
    } catch (err) {
        const error = getErrorMessage(err);
        const errors = z.flattenError(err).fieldErrors;
        res.render('auth/register', { ...userData, error, errors });
    };

});

authController.post('/login', isGuest, async (req, res) => {
    const loginData = req.body;

    try {
        const user = await UserLoginSchema.parseAsync(loginData)
        const token = await authService.login(user);

        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);     

        res.render('auth/login', { loginData, error });
    }
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;