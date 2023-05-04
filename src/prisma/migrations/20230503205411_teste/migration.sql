-- CreateTable
CREATE TABLE `Categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `marcaCat` VARCHAR(191) NULL,
    `atrib1Cat` VARCHAR(191) NULL,
    `atrib2Cat` VARCHAR(191) NULL,
    `atrib3Cat` VARCHAR(191) NULL,
    `atrib4Cat` VARCHAR(191) NULL,
    `modeloCat` VARCHAR(191) NULL,
    `atrib5Cat` VARCHAR(191) NULL,
    `atrib6Cat` VARCHAR(191) NULL,

    UNIQUE INDEX `Categoria_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Especificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `saldo` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `marca` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NOT NULL,
    `atrib1` VARCHAR(191) NOT NULL,
    `atrib2` VARCHAR(191) NOT NULL,
    `atrib3` VARCHAR(191) NOT NULL,
    `atrib4` VARCHAR(191) NOT NULL,
    `atrib5` VARCHAR(191) NOT NULL,
    `atrib6` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NULL,
    `fkCategoriasId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idPeca` INTEGER NULL,
    `idEquipamento` INTEGER NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `valor` VARCHAR(191) NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `criado` DATETIME(3) NOT NULL,
    `alterado` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Peca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NULL,
    `marca` VARCHAR(191) NULL,
    `atrib1` VARCHAR(191) NULL,
    `atrib2` VARCHAR(191) NULL,
    `atrib3` VARCHAR(191) NULL,
    `atrib4` VARCHAR(191) NULL,
    `atrib5` VARCHAR(191) NULL,
    `atrib6` VARCHAR(191) NULL,
    `sku` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Equipamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `modelo` VARCHAR(191) NULL,
    `marca` VARCHAR(191) NULL,
    `atrib1` VARCHAR(191) NULL,
    `atrib2` VARCHAR(191) NULL,
    `atrib3` VARCHAR(191) NULL,
    `atrib4` VARCHAR(191) NULL,
    `atrib5` VARCHAR(191) NULL,
    `atrib6` VARCHAR(191) NULL,
    `sku` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Especificacao` ADD CONSTRAINT `Especificacao_fkCategoriasId_fkey` FOREIGN KEY (`fkCategoriasId`) REFERENCES `Categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimento` ADD CONSTRAINT `Movimento_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimento` ADD CONSTRAINT `Movimento_idPeca_fkey` FOREIGN KEY (`idPeca`) REFERENCES `Peca`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Movimento` ADD CONSTRAINT `Movimento_idEquipamento_fkey` FOREIGN KEY (`idEquipamento`) REFERENCES `Equipamento`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
