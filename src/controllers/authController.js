import { Router } from "express";
import authService from "../services/authService";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register')
});


authController.get('/login', (req, res) => {
    res.render('auth/login')
});

authController.get('/logout', (req, res) => {
    res.send('logout')
});

authController.post('/register', async (req, res) => {
    const { email, password, repeatPassword } = req.body;

    await authService.register({ email, password, repeatPassword });

    res.redirect('/')

})

authController.post('/login', async (req, res) => {
    const loginData = req.body;

    const token = await authService.login(loginData);

    res.cookie('auth', token, { httpOnly: true });
    res.redirect('/');
})

export default authController;