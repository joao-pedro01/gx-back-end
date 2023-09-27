/*
  Warnings:

  - You are about to drop the `equipamento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `peca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `movimento` DROP FOREIGN KEY `Movimento_idEquipamento_fkey`;

-- DropForeignKey
ALTER TABLE `movimento` DROP FOREIGN KEY `Movimento_idPeca_fkey`;

-- DropTable
DROP TABLE `equipamento`;

-- DropTable
DROP TABLE `peca`;
