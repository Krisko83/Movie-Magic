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

authController.post('/register', (req, res) => {
    const userData = req.body;
 
    authService.register(userData);

    res.redirect('/')
    
})

export default authController;