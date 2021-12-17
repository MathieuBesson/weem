<?php

namespace App\Repository;

use App\Entity\VehiclePart;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method VehiclePart|null find($id, $lockMode = null, $lockVersion = null)
 * @method VehiclePart|null findOneBy(array $criteria, array $orderBy = null)
 * @method VehiclePart[]    findAll()
 * @method VehiclePart[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VehiclePartRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VehiclePart::class);
    }

    // /**
    //  * @return VehiclePart[] Returns an array of VehiclePart objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('v.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?VehiclePart
    {
        return $this->createQueryBuilder('v')
            ->andWhere('v.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
