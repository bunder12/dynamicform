/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `fields` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `field_name` VARCHAR(191) NOT NULL,
    `field_type` VARCHAR(191) NOT NULL,
    `field_label` VARCHAR(191) NOT NULL,
    `filed_option` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
