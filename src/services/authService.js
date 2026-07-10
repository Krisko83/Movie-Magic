import userRepository from "../repositories/userRepository";
import bcrypt from 'bcrypt';

async function register(userData){
    const hashPassword = await bcrypt.hash(userData.password, 10);
 
    return userRepository.create( {
        ...userData,
        password: hashPassword
    });
}

async function login(loginData){
    const user = await userRepository.getUser(loginData);

    if(!user) {
        throw new Error('No such user!')
    }

    const result = await bcrypt.compare(loginData.password, user.password);

    return result
}

function logout(userData){

}

const authService = {
    register,
    login,
    logout
}

export default authService;