/*
  Warnings:

  - Made the column `tipo` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `marcaCat` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atrib1Cat` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atrib2Cat` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atrib3Cat` on table `Categoria` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sku` on table `Especificacao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Categoria` MODIFY `tipo` VARCHAR(191) NOT NULL,
    MODIFY `marcaCat` VARCHAR(191) NOT NULL DEFAULT 'Marca',
    MODIFY `atrib1Cat` VARCHAR(191) NOT NULL,
    MODIFY `atrib2Cat` VARCHAR(191) NOT NULL,
    MODIFY `atrib3Cat` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Especificacao` MODIFY `atrib4` VARCHAR(191) NULL,
    MODIFY `atrib5` VARCHAR(191) NULL,
    MODIFY `atrib6` VARCHAR(191) NULL,
    MODIFY `sku` VARCHAR(191) NOT NULL;
