/*
  Warnings:

  - You are about to drop the `_ClientToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ClientToMovie" DROP CONSTRAINT "_ClientToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_ClientToMovie" DROP CONSTRAINT "_ClientToMovie_B_fkey";

-- DropTable
DROP TABLE "_ClientToMovie";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "artists" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "born" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtistToMovie_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArtistToMovie_B_index" ON "_ArtistToMovie"("B");

-- AddForeignKey
ALTER TABLE "_ArtistToMovie" ADD CONSTRAINT "_ArtistToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToMovie" ADD CONSTRAINT "_ArtistToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
