<?php

namespace App\Repository;

use App\Entity\CarStandardPart;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CarStandardPart|null find($id, $lockMode = null, $lockVersion = null)
 * @method CarStandardPart|null findOneBy(array $criteria, array $orderBy = null)
 * @method CarStandardPart[]    findAll()
 * @method CarStandardPart[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarStandardPartRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CarStandardPart::class);
    }
}
