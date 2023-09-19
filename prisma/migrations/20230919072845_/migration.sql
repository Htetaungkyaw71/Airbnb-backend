/*
  Warnings:

  - You are about to drop the column `pirce` on the `Home` table. All the data in the column will be lost.
  - Added the required column `price` to the `Home` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Home" DROP COLUMN "pirce",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;
