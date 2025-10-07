-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `age` VARCHAR(191) NULL,
    ADD COLUMN `email` VARCHAR(191) NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `firstSubmittedAt` DATETIME(3) NULL,
    ADD COLUMN `genderIdentity` VARCHAR(191) NULL,
    ADD COLUMN `highestDegree` VARCHAR(191) NULL,
    ADD COLUMN `isEmployed` BOOLEAN NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `phoneNumber` VARCHAR(191) NULL,
    ADD COLUMN `race` VARCHAR(191) NULL,
    ADD COLUMN `sexualOrientation` VARCHAR(191) NULL;
