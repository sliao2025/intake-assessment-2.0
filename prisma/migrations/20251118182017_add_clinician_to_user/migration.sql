/*
  Warnings:

  - Added the required column `clinician` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Add column with default value first
ALTER TABLE `User` ADD COLUMN `clinician` VARCHAR(191) NOT NULL DEFAULT '';
