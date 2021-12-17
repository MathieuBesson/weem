<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211217103836 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE appointment (id INT AUTO_INCREMENT NOT NULL, garage_id INT NOT NULL, vehicle_id INT NOT NULL, cost_estimate DOUBLE PRECISION DEFAULT NULL, status INT NOT NULL, description LONGTEXT DEFAULT NULL, results LONGTEXT DEFAULT NULL, schedule DATETIME NOT NULL, INDEX IDX_FE38F844C4FFF555 (garage_id), INDEX IDX_FE38F844545317D1 (vehicle_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE garage (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, type VARCHAR(300) NOT NULL, city VARCHAR(200) NOT NULL, adress VARCHAR(300) NOT NULL, phone VARCHAR(50) NOT NULL, mail VARCHAR(200) NOT NULL, schedule LONGTEXT NOT NULL, longitude VARCHAR(200) DEFAULT NULL, latitude VARCHAR(200) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, service_category_id INT NOT NULL, name VARCHAR(200) NOT NULL, INDEX IDX_E19D9AD2DEDCBB4E (service_category_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service_appointment (service_id INT NOT NULL, appointment_id INT NOT NULL, INDEX IDX_32A2DEE8ED5CA9E6 (service_id), INDEX IDX_32A2DEE8E5B533F9 (appointment_id), PRIMARY KEY(service_id, appointment_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service_garage (service_id INT NOT NULL, garage_id INT NOT NULL, INDEX IDX_A1E1643DED5CA9E6 (service_id), INDEX IDX_A1E1643DC4FFF555 (garage_id), PRIMARY KEY(service_id, garage_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service_category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle (id INT AUTO_INCREMENT NOT NULL, vehicle_type_id INT NOT NULL, vehicle_brand_id INT NOT NULL, name VARCHAR(200) NOT NULL, date_released DATETIME NOT NULL, mileage_globale DOUBLE PRECISION NOT NULL, mileage_mensual DOUBLE PRECISION NOT NULL, fuel_type INT NOT NULL, registration VARCHAR(50) NOT NULL, driving_style INT NOT NULL, INDEX IDX_1B80E486DA3FD1FC (vehicle_type_id), INDEX IDX_1B80E48699E7DF9C (vehicle_brand_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_brand (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_part (id INT AUTO_INCREMENT NOT NULL, vehicle_type_part_id INT NOT NULL, vehicle_id INT NOT NULL, mileage DOUBLE PRECISION DEFAULT NULL, date_last_change DATETIME DEFAULT NULL, custom_name VARCHAR(200) DEFAULT NULL, INDEX IDX_3B92439ADD2ACB6D (vehicle_type_part_id), INDEX IDX_3B92439A545317D1 (vehicle_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(200) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_type_vehicle_type_part (vehicle_type_id INT NOT NULL, vehicle_type_part_id INT NOT NULL, INDEX IDX_2A7BB378DA3FD1FC (vehicle_type_id), INDEX IDX_2A7BB378DD2ACB6D (vehicle_type_part_id), PRIMARY KEY(vehicle_type_id, vehicle_type_part_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE vehicle_type_part (id INT AUTO_INCREMENT NOT NULL, service_id INT NOT NULL, name VARCHAR(200) NOT NULL, importance INT NOT NULL, price_min DOUBLE PRECISION NOT NULL, price_max DOUBLE PRECISION NOT NULL, max_duration INT DEFAULT NULL, max_distance DOUBLE PRECISION DEFAULT NULL, calcul_duration_choice INT NOT NULL, INDEX IDX_69BFF09CED5CA9E6 (service_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844C4FFF555 FOREIGN KEY (garage_id) REFERENCES garage (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id)');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD2DEDCBB4E FOREIGN KEY (service_category_id) REFERENCES service_category (id)');
        $this->addSql('ALTER TABLE service_appointment ADD CONSTRAINT FK_32A2DEE8ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_appointment ADD CONSTRAINT FK_32A2DEE8E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_garage ADD CONSTRAINT FK_A1E1643DED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE service_garage ADD CONSTRAINT FK_A1E1643DC4FFF555 FOREIGN KEY (garage_id) REFERENCES garage (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E486DA3FD1FC FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_type (id)');
        $this->addSql('ALTER TABLE vehicle ADD CONSTRAINT FK_1B80E48699E7DF9C FOREIGN KEY (vehicle_brand_id) REFERENCES vehicle_brand (id)');
        $this->addSql('ALTER TABLE vehicle_part ADD CONSTRAINT FK_3B92439ADD2ACB6D FOREIGN KEY (vehicle_type_part_id) REFERENCES vehicle_type_part (id)');
        $this->addSql('ALTER TABLE vehicle_part ADD CONSTRAINT FK_3B92439A545317D1 FOREIGN KEY (vehicle_id) REFERENCES vehicle (id)');
        $this->addSql('ALTER TABLE vehicle_type_vehicle_type_part ADD CONSTRAINT FK_2A7BB378DA3FD1FC FOREIGN KEY (vehicle_type_id) REFERENCES vehicle_type (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vehicle_type_vehicle_type_part ADD CONSTRAINT FK_2A7BB378DD2ACB6D FOREIGN KEY (vehicle_type_part_id) REFERENCES vehicle_type_part (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vehicle_type_part ADD CONSTRAINT FK_69BFF09CED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE service_appointment DROP FOREIGN KEY FK_32A2DEE8E5B533F9');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844C4FFF555');
        $this->addSql('ALTER TABLE service_garage DROP FOREIGN KEY FK_A1E1643DC4FFF555');
        $this->addSql('ALTER TABLE service_appointment DROP FOREIGN KEY FK_32A2DEE8ED5CA9E6');
        $this->addSql('ALTER TABLE service_garage DROP FOREIGN KEY FK_A1E1643DED5CA9E6');
        $this->addSql('ALTER TABLE vehicle_type_part DROP FOREIGN KEY FK_69BFF09CED5CA9E6');
        $this->addSql('ALTER TABLE service DROP FOREIGN KEY FK_E19D9AD2DEDCBB4E');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844545317D1');
        $this->addSql('ALTER TABLE vehicle_part DROP FOREIGN KEY FK_3B92439A545317D1');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E48699E7DF9C');
        $this->addSql('ALTER TABLE vehicle DROP FOREIGN KEY FK_1B80E486DA3FD1FC');
        $this->addSql('ALTER TABLE vehicle_type_vehicle_type_part DROP FOREIGN KEY FK_2A7BB378DA3FD1FC');
        $this->addSql('ALTER TABLE vehicle_part DROP FOREIGN KEY FK_3B92439ADD2ACB6D');
        $this->addSql('ALTER TABLE vehicle_type_vehicle_type_part DROP FOREIGN KEY FK_2A7BB378DD2ACB6D');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE garage');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE service_appointment');
        $this->addSql('DROP TABLE service_garage');
        $this->addSql('DROP TABLE service_category');
        $this->addSql('DROP TABLE vehicle');
        $this->addSql('DROP TABLE vehicle_brand');
        $this->addSql('DROP TABLE vehicle_part');
        $this->addSql('DROP TABLE vehicle_type');
        $this->addSql('DROP TABLE vehicle_type_vehicle_type_part');
        $this->addSql('DROP TABLE vehicle_type_part');
    }
}
