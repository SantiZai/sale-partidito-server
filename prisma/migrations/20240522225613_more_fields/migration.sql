/*
  Warnings:

  - Added the required column `isLarge` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SERVICES" AS ENUM ('buffet', 'showers', 'parking', 'grills', 'security');

-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "services" "SERVICES"[];

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "isLarge" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phonenumber" VARCHAR(50);
