import userRepository from "../repositories/userRepository";

function register(userData){
    return userRepository.register(userData);
}

function login(userData){

}

function logout(userData){

}

const authService = {
    register,
    login,
    logout
}

export default authService;