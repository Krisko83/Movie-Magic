import { prisma } from "../../prisma/lib/prisma.js";

async function create(userData) {
    const result = await prisma.user.create({
        data: {
            email: userData.email,
            password: userData.password
        }
    });

    return result;
}

async function getUser(loginData) {
    const user = await prisma.user.findUnique({
        where: { email: loginData.email }
    });

    return user;
}

const userRepository = {
    create,
    getUser
};

export default userRepository;