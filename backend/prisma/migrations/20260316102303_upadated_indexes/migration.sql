/*
  Warnings:

  - A unique constraint covering the columns `[projectId,leaderId]` on the table `ProjectApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Group_coordinatorId_idx" ON "Group"("coordinatorId");

-- CreateIndex
CREATE INDEX "ProjectApplication_status_idx" ON "ProjectApplication"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectApplication_projectId_leaderId_key" ON "ProjectApplication"("projectId", "leaderId");

-- CreateIndex
CREATE INDEX "WorkspaceMember_userId_idx" ON "WorkspaceMember"("userId");
