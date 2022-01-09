<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220109150719 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE car (id INT AUTO_INCREMENT NOT NULL, car_brand_id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(200) NOT NULL, date_released DATETIME NOT NULL, mileage_globale DOUBLE PRECISION NOT NULL, mileage_mensual DOUBLE PRECISION NOT NULL, fuel_type INT NOT NULL, registration VARCHAR(50) NOT NULL, driving_style INT NOT NULL, model_type INT DEFAULT NULL, color VARCHAR(255) DEFAULT NULL, INDEX IDX_773DE69DCBC3E50C (car_brand_id), INDEX IDX_773DE69DA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car_brand (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car_part (id INT AUTO_INCREMENT NOT NULL, car_standard_part_id INT DEFAULT NULL, car_id INT NOT NULL, name VARCHAR(200) DEFAULT NULL, importance INT DEFAULT NULL, max_duration INT DEFAULT NULL, max_distance DOUBLE PRECISION DEFAULT NULL, calcul_duration_choice INT DEFAULT NULL, notification TINYINT(1) DEFAULT NULL, INDEX IDX_8265646AF8C2E246 (car_standard_part_id), INDEX IDX_8265646AC3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car_part_maintenance (id INT AUTO_INCREMENT NOT NULL, car_part_id INT NOT NULL, mileage DOUBLE PRECISION DEFAULT NULL, date_last_change DATETIME DEFAULT NULL, INDEX IDX_2C3CCC391F48B030 (car_part_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car_standard_part (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, importance INT NOT NULL, max_duration INT DEFAULT NULL, max_distance DOUBLE PRECISION DEFAULT NULL, calcul_duration_choice INT NOT NULL, price_min DOUBLE PRECISION NOT NULL, price_max DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, name VARCHAR(300) NOT NULL, phone VARCHAR(100) DEFAULT NULL, notification TINYINT(1) DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69DCBC3E50C FOREIGN KEY (car_brand_id) REFERENCES car_brand (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE car_part ADD CONSTRAINT FK_8265646AF8C2E246 FOREIGN KEY (car_standard_part_id) REFERENCES car_standard_part (id)');
        $this->addSql('ALTER TABLE car_part ADD CONSTRAINT FK_8265646AC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE car_part_maintenance ADD CONSTRAINT FK_2C3CCC391F48B030 FOREIGN KEY (car_part_id) REFERENCES car_part (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE car_part DROP FOREIGN KEY FK_8265646AC3C6F69F');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69DCBC3E50C');
        $this->addSql('ALTER TABLE car_part_maintenance DROP FOREIGN KEY FK_2C3CCC391F48B030');
        $this->addSql('ALTER TABLE car_part DROP FOREIGN KEY FK_8265646AF8C2E246');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69DA76ED395');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE car_brand');
        $this->addSql('DROP TABLE car_part');
        $this->addSql('DROP TABLE car_part_maintenance');
        $this->addSql('DROP TABLE car_standard_part');
        $this->addSql('DROP TABLE user');
    }
}
