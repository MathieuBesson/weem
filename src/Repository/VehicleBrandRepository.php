<?php

namespace App\Repository;

use App\Entity\VehicleBrand;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method VehicleBrand|null find($id, $lockMode = null, $lockVersion = null)
 * @method VehicleBrand|null findOneBy(array $criteria, array $orderBy = null)
 * @method VehicleBrand[]    findAll()
 * @method VehicleBrand[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VehicleBrandRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VehicleBrand::class);
    }

    // /**
    //  * @return VehicleBrand[] Returns an array of VehicleBrand objects
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
    public function findOneBySomeField($value): ?VehicleBrand
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
