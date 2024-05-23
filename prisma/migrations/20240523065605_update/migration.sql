/*
  Warnings:

  - You are about to drop the column `bio` on the `adminProfile` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `adminProfile` table. All the data in the column will be lost.
  - Added the required column `userId` to the `flats` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "User_Sattus" AS ENUM ('ACTIVE', 'DEACTIVE');

-- AlterTable
ALTER TABLE "adminProfile" DROP COLUMN "bio",
DROP COLUMN "profession",
ADD COLUMN     "contactNumber" TEXT;

-- AlterTable
ALTER TABLE "flats" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "status" "User_Sattus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "userProfile" ADD COLUMN     "contactNumber" TEXT;

-- AddForeignKey
ALTER TABLE "flats" ADD CONSTRAINT "flats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
