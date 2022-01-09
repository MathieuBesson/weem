<?php

namespace App\Repository;

use App\Entity\CarPart;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method CarPart|null find($id, $lockMode = null, $lockVersion = null)
 * @method CarPart|null findOneBy(array $criteria, array $orderBy = null)
 * @method CarPart[]    findAll()
 * @method CarPart[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarPartRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CarPart::class);
    }
}
