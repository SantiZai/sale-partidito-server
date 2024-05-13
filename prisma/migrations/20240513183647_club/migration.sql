/*
  Warnings:

  - Added the required column `image` to the `Club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Club" ADD COLUMN     "image" VARCHAR(255) NOT NULL;
