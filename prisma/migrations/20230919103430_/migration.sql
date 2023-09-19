/*
  Warnings:

  - Added the required column `check_in` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `check_out` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "check_in" TEXT NOT NULL,
ADD COLUMN     "check_out" TEXT NOT NULL,
ADD COLUMN     "guests" INTEGER NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
