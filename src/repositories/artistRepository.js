import { prisma } from '../../prisma/lib/prisma.js'

async function create(artistData) {
    const artist = await prisma.artist.create(
        { data: artistData }
    )

    return artist;
}

const artistRepository = {
    create
};

export default artistRepository;