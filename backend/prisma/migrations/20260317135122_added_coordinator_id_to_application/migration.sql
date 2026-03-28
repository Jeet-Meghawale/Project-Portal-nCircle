/*
  Warnings:

  - You are about to drop the column `verifiedById` on the `ProjectApplication` table. All the data in the column will be lost.
  - Added the required column `coordinatorId` to the `ProjectApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectApplication" DROP CONSTRAINT "ProjectApplication_verifiedById_fkey";

-- AlterTable
ALTER TABLE "ProjectApplication" DROP COLUMN "verifiedById",
ADD COLUMN     "coordinatorId" TEXT NOT NULL,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "ProjectApplication" ADD CONSTRAINT "ProjectApplication_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
