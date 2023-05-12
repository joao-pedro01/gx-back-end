/*
  Warnings:

  - You are about to drop the column `atrib1Cat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `atrib2Cat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `atrib3Cat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `atrib4Cat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `atrib5Cat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `atrib6Cat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `marcaCat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `modeloCat` on the `Categoria` table. All the data in the column will be lost.
  - You are about to drop the column `fkCategoriasId` on the `Especificacao` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Especificacao` table. All the data in the column will be lost.
  - Added the required column `atrib1_cat` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atrib2_cat` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atrib3_cat` to the `Categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fk_categorias_id` to the `Especificacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Especificacao` DROP FOREIGN KEY `Especificacao_fkCategoriasId_fkey`;

-- AlterTable
ALTER TABLE `Categoria` DROP COLUMN `atrib1Cat`,
    DROP COLUMN `atrib2Cat`,
    DROP COLUMN `atrib3Cat`,
    DROP COLUMN `atrib4Cat`,
    DROP COLUMN `atrib5Cat`,
    DROP COLUMN `atrib6Cat`,
    DROP COLUMN `isActive`,
    DROP COLUMN `marcaCat`,
    DROP COLUMN `modeloCat`,
    ADD COLUMN `atrib1_cat` VARCHAR(191) NOT NULL,
    ADD COLUMN `atrib2_cat` VARCHAR(191) NOT NULL,
    ADD COLUMN `atrib3_cat` VARCHAR(191) NOT NULL,
    ADD COLUMN `atrib4_cat` VARCHAR(191) NULL,
    ADD COLUMN `atrib5_cat` VARCHAR(191) NULL,
    ADD COLUMN `atrib6_cat` VARCHAR(191) NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `marca_cat` VARCHAR(191) NOT NULL DEFAULT 'Marca',
    ADD COLUMN `modelo_cat` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Especificacao` DROP COLUMN `fkCategoriasId`,
    DROP COLUMN `isActive`,
    ADD COLUMN `fk_categorias_id` INTEGER NOT NULL,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE `Especificacao` ADD CONSTRAINT `Especificacao_fk_categorias_id_fkey` FOREIGN KEY (`fk_categorias_id`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
