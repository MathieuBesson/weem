<?php

namespace App\Repository;

use DateTime;
use App\Entity\CarPartMaintenance;
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
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CarPartMaintenance::class);
    }

    public function findByCar($carId)
    {
        return $this->createQueryBuilder("cpm")
            ->join("cpm.carPart", "carPart")
            ->join("carPart.car", "car")
            ->where("car.id = :id")
            ->setParameter("id", $carId)
            ->orderBy("cpm.dateLastChange")
            ->getQuery()->getResult();
    }

    public function getLastByCarPart($carPartId)
    {
        return $this->createQueryBuilder("cpm")
            ->join("cpm.carPart", "cp")
            ->where("cp.id = :car_part_id")
            ->setParameter("car_part_id", $carPartId)
            ->orderBy("cpm.dateLastChange", "DESC")
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }


    public function findAllWithTimeToChange()
    {
        // Récupération de toutes les maintenances datant de - de 1 mois 
        $datePlusOnMonth = (new DateTime)->modify("+ 1 month"); 

        $qb = $this->createQueryBuilder("cpm")
            ->join("cpm.carPart", "cp")
            ->join("cp.car", "c")
            ->join("c.user", "u")
            ->where("cp.futureChangeDate BETWEEN :date_now AND :date_plus_one_month")
            ->setParameter("date_now", new DateTime)
            ->setParameter("date_plus_one_month", $datePlusOnMonth)
            ->orderBy("cpm.dateLastChange");

        $carParts = $qb->getQuery()->getResult();

        return $carParts;
    }
}
