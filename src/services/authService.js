import userRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function register(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    return userRepository.create({
        ...userData,
        password: hashPassword
    });
}

async function login(loginData) {
    const user = await userRepository.getUser(loginData.email);

    if (!user) {
        throw new Error('Invalid username or password!')
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

    if(!isPasswordValid) {
        throw new Error('Invalid username or password!');
    }

    const payload = { id: user.id, email: user.email};
    const token = jwt.sign(payload, "JWTSECRET", { expiresIn: '1h'});
  
    return token;
}

function logout(userData) {

}

const authService = {
    register,
    login,
    logout
}

export default authService;