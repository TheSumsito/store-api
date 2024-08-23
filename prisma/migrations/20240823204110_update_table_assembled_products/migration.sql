/*
  Warnings:

  - You are about to drop the `sl_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `sl_products` DROP FOREIGN KEY `sl_products_assembled_id_fkey`;

-- DropForeignKey
ALTER TABLE `sl_products` DROP FOREIGN KEY `sl_products_product_id_fkey`;

-- DropTable
DROP TABLE `sl_products`;

-- CreateTable
CREATE TABLE `assembled_products` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `assembled_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `assembled_products` ADD CONSTRAINT `assembled_products_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assembled_products` ADD CONSTRAINT `assembled_products_assembled_id_fkey` FOREIGN KEY (`assembled_id`) REFERENCES `assembled_computers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
