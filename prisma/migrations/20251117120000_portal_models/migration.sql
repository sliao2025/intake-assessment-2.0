-- CreateTable
CREATE TABLE `Clinic` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `subdomain` VARCHAR(191) NOT NULL,
    `customDomain` VARCHAR(191) NULL,
    `logoUrl` VARCHAR(191) NULL,
    `primaryColor` VARCHAR(191) NULL DEFAULT '#3B82F6',
    `secondaryColor` VARCHAR(191) NULL DEFAULT '#10B981',
    `config` JSON NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Clinic_subdomain_key`(`subdomain`),
    UNIQUE INDEX `Clinic_customDomain_key`(`customDomain`),
    INDEX `Clinic_subdomain_idx`(`subdomain`),
    INDEX `Clinic_customDomain_idx`(`customDomain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AssessmentResponse` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(191) NOT NULL DEFAULT 'default-clinic',
    `assessmentType` VARCHAR(191) NOT NULL,
    `responses` JSON NOT NULL,
    `totalScore` INTEGER NULL,
    `severity` VARCHAR(191) NULL,
    `completedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `requestedBy` VARCHAR(191) NULL,

    INDEX `AssessmentResponse_clinicId_completedAt_idx`(`clinicId`, `completedAt`),
    INDEX `AssessmentResponse_clinicId_idx`(`clinicId`),
    INDEX `AssessmentResponse_userId_assessmentType_completedAt_idx`(`userId`, `assessmentType`, `completedAt`),
    INDEX `AssessmentResponse_userId_completedAt_idx`(`userId`, `completedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JournalEntry` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(191) NOT NULL DEFAULT 'default-clinic',
    `content` TEXT NOT NULL,
    `mood` INTEGER NOT NULL,
    `sentimentResult` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `JournalEntry_clinicId_createdAt_idx`(`clinicId`, `createdAt`),
    INDEX `JournalEntry_clinicId_idx`(`clinicId`),
    INDEX `JournalEntry_userId_createdAt_idx`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PsychoedModule` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `content` JSON NOT NULL,
    `totalSteps` INTEGER NOT NULL,
    `duration` INTEGER NULL,
    `ageGroup` VARCHAR(191) NOT NULL DEFAULT 'both',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `PsychoedModule_category_idx`(`category`),
    INDEX `PsychoedModule_isActive_idx`(`isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModuleProgress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `clinicId` VARCHAR(191) NOT NULL,
    `moduleId` VARCHAR(191) NOT NULL,
    `currentStep` INTEGER NOT NULL DEFAULT 0,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `completedAt` DATETIME(3) NULL,
    `startedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastAccessAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ModuleProgress_userId_moduleId_key`(`userId`, `moduleId`),
    INDEX `ModuleProgress_clinicId_idx`(`clinicId`),
    INDEX `ModuleProgress_moduleId_fkey`(`moduleId`),
    INDEX `ModuleProgress_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AlterTable
ALTER TABLE `User` DROP INDEX `User_email_key`;
ALTER TABLE `User` ADD COLUMN `clinicId` VARCHAR(191) NOT NULL,
    ADD INDEX `User_clinicId_idx`(`clinicId`),
    ADD UNIQUE INDEX `User_email_clinicId_key`(`email`, `clinicId`);

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `clinicId` VARCHAR(191) NOT NULL,
    ADD INDEX `Profile_clinicId_idx`(`clinicId`),
    ADD INDEX `Profile_clinicId_firstSubmittedAt_idx`(`clinicId`, `firstSubmittedAt`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResponse` ADD CONSTRAINT `AssessmentResponse_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssessmentResponse` ADD CONSTRAINT `AssessmentResponse_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `JournalEntry` ADD CONSTRAINT `JournalEntry_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModuleProgress` ADD CONSTRAINT `ModuleProgress_clinicId_fkey` FOREIGN KEY (`clinicId`) REFERENCES `Clinic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModuleProgress` ADD CONSTRAINT `ModuleProgress_moduleId_fkey` FOREIGN KEY (`moduleId`) REFERENCES `PsychoedModule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModuleProgress` ADD CONSTRAINT `ModuleProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
