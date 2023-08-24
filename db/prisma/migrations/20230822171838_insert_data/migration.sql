/*
  Warnings:

  - Added the required column `criado` to the `Categoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Categoria` ADD COLUMN `alterado` DATETIME(3) NULL,
    ADD COLUMN `criado` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Especificacao` ADD COLUMN `alterado` DATETIME(3) NULL,
    ADD COLUMN `criado` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
