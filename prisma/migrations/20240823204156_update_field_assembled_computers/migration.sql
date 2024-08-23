/*
  Warnings:

  - You are about to drop the column `descriptions` on the `assembled_computers` table. All the data in the column will be lost.
  - Added the required column `description` to the `assembled_computers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `assembled_computers` DROP COLUMN `descriptions`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
