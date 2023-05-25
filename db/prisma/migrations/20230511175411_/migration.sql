/*
  Warnings:

  - You are about to drop the column `isActive` on the `Peca` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Peca` DROP COLUMN `isActive`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Usuario` DROP COLUMN `isActive`,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;
