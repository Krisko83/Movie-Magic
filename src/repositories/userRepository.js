import { prisma } from "../../prisma/lib/prisma.js";

async function register(userData) {
    const user = await prisma.user.create({ data: {email: userData.email , password: userData.password}});

    return user;
}

const userRepository = {
    register
};

export default userRepository;