import userRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateAuthToken } from "../utils/tokenUtils";

async function register(userData) {
    const hashPassword = await bcrypt.hash(userData.password, 10);

    await userRepository.create({
        ...userData,
        password: hashPassword
    });

    const user = await userRepository.getUser(userData.email);

    const token = generateAuthToken(user);

    return token;
}

async function login(loginData) {
    const user = await userRepository.getUser(loginData.email);

    if (!user) {
        throw new Error('Invalid username or password!')
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid username or password!');
    }

    const token = generateAuthToken(user);

    return token;
}

const authService = {
    register,
    login
}

export default authService;