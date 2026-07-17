/*
  Warnings:

  - You are about to drop the column `nameInMovie` on the `artists` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "artists" DROP COLUMN "nameInMovie",
ADD COLUMN     "character" TEXT;
