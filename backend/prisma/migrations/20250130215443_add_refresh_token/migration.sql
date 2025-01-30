/*
  Warnings:

  - You are about to drop the column `hashed_refresh_token` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashed_refresh_token",
ADD COLUMN     "hashedRefreshToken" TEXT;
