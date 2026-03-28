-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "WorkspaceMember" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;
