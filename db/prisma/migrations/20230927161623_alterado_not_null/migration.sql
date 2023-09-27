/*
  Warnings:

  - Made the column `alterado` on table `categoria` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `categoria` MODIFY `alterado` DATETIME(3) NOT NULL;
