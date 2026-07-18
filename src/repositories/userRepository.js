import { prisma } from "../../prisma/lib/prisma.js";

async function create(userData) {
    const result = await prisma.user.create({
        data: userData
    });

    return result;
}

async function getUser(email) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    return user;
}

const userRepository = {
    create,
    getUser
};

export default userRepository;