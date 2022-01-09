<?php

namespace App\Repository;

use App\Entity\CarPartMaintenance;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CarPartMaintenance|null find($id, $lockMode = null, $lockVersion = null)
 * @method CarPartMaintenance|null findOneBy(array $criteria, array $orderBy = null)
 * @method CarPartMaintenance[]    findAll()
 * @method CarPartMaintenance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarPartMaintenanceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CarPartMaintenance::class);
    }
}
