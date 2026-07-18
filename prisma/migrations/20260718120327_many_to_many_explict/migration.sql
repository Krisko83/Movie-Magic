/*
  Warnings:

  - You are about to drop the `_ArtistToMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArtistToMovie" DROP CONSTRAINT "_ArtistToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToMovie" DROP CONSTRAINT "_ArtistToMovie_B_fkey";

-- DropTable
DROP TABLE "_ArtistToMovie";

-- CreateTable
CREATE TABLE "movie_artist" (
    "movieId" TEXT NOT NULL,
    "artistId" TEXT NOT NULL,
    "character" TEXT NOT NULL,

    CONSTRAINT "movie_artist_pkey" PRIMARY KEY ("movieId","artistId")
);

-- AddForeignKey
ALTER TABLE "movie_artist" ADD CONSTRAINT "movie_artist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_artist" ADD CONSTRAINT "movie_artist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
