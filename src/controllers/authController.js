import { Router } from "express";
import authService from "../services/authService";
import { isAuth, isGuest } from "../middlewares/authMiddleware";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register')
});


authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login')
});


authController.post('/register', isGuest, async (req, res) => {
    const userData = req.body;

    const token = await authService.register(userData);

    res.cookie('auth', token, { httpOnly: true })
    res.redirect('/')

})

authController.post('/login', isGuest, async (req, res) => {
    const loginData = req.body;

    const token = await authService.login(loginData);
    res.cookie('auth', token, { httpOnly: true });
    res.redirect('/');
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;