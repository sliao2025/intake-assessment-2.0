-- AlterTable
ALTER TABLE `AssessmentResponse` ADD COLUMN `assignedAt` DATETIME(3) NULL,
    MODIFY `completedAt` DATETIME(3) NULL,
    DROP COLUMN `severity`;

