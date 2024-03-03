CREATE TABLE `Admin`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL
);
CREATE TABLE `Jornada de Trabalho`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_funcionário` INT NOT NULL,
    `hora_de_inicio` DATETIME NOT NULL,
    `hora_de_termino` DATETIME NOT NULL
);
ALTER TABLE
    `Jornada de Trabalho` ADD INDEX `jornada de trabalho_id_funcionário_index`(`id_funcionário`);
CREATE TABLE `Funcionários`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nome` VARCHAR(255) NOT NULL,
    `cargo` BIGINT NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `tempo_almoço` DATETIME NOT NULL,
    `tempo_jornada` DATETIME NOT NULL
);
ALTER TABLE
    `Jornada de Trabalho` ADD CONSTRAINT `jornada de trabalho_id_funcionário_foreign` FOREIGN KEY(`id_funcionário`) REFERENCES `Funcionários`(`cargo`);
ALTER TABLE
    `Admin` ADD CONSTRAINT `admin_nome_foreign` FOREIGN KEY(`nome`) REFERENCES `Funcionários`(`nome`);