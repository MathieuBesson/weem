<?php

namespace App\Repository;

use App\Entity\CarPartMaintenance;
use App\Doctrine\CurrentUserExtension;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method CarPartMaintenance|null find($id, $lockMode = null, $lockVersion = null)
 * @method CarPartMaintenance|null findOneBy(array $criteria, array $orderBy = null)
 * @method CarPartMaintenance[]    findAll()
 * @method CarPartMaintenance[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarPartMaintenanceRepository extends ServiceEntityRepository
{
    private CurrentUserExtension $currentUserExtension;
    public function __construct(ManagerRegistry $registry, CurrentUserExtension $currentUserExtension)
    {
        parent::__construct($registry, CarPartMaintenance::class);

        $this->currentUserExtension = $currentUserExtension;
    }

    public function findByCar($carId, $count){
        $qb = $this->createQueryBuilder("cpm")
        ->join("cpm.carPart", "carPart")
        ->join("carPart.car", "car")
        ->where("car.id = :id")
        ->setParameter("id", $carId)
        ->orderBy("cpm.dateLastChange")
        ->setMaxResults($count);

        $this->currentUserExtension->addWhere($qb, CarPartMaintenance::class);

        return $qb->getQuery()->getResult();
    }
}
