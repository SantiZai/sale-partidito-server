/*
  Warnings:

  - Added the required column `coords` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "coords" VARCHAR(255) NOT NULL;
