-- DropForeignKey
ALTER TABLE "movie_artist" DROP CONSTRAINT "movie_artist_artistId_fkey";

-- DropForeignKey
ALTER TABLE "movie_artist" DROP CONSTRAINT "movie_artist_movieId_fkey";

-- AddForeignKey
ALTER TABLE "movie_artist" ADD CONSTRAINT "movie_artist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_artist" ADD CONSTRAINT "movie_artist_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
