-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(64) NOT NULL,
    `age` INTEGER NOT NULL,
    `profile_picture` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other') NOT NULL,
    `hobbies` VARCHAR(191) NOT NULL,
    `subscription` ENUM('Basic', 'Premium') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
