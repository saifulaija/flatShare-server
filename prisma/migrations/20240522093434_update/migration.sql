/*
  Warnings:

  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `userName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `userProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `userProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `userProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "name",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "userProfile" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "role" "UserRole" NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL,
ALTER COLUMN "bio" DROP NOT NULL,
ALTER COLUMN "profession" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
