import { Router } from "express";

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
export default authController;