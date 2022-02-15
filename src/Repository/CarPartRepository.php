<?php

namespace App\Repository;

use App\Entity\CarPart;
use App\Doctrine\CurrentUserExtension;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;

/**
 * @method CarPart|null find($id, $lockMode = null, $lockVersion = null)
 * @method CarPart|null findOneBy(array $criteria, array $orderBy = null)
 * @method CarPart[]    findAll()
 * @method CarPart[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CarPartRepository extends ServiceEntityRepository
{
    private CurrentUserExtension $currentUserExtension;
    public function __construct(ManagerRegistry $registry, CurrentUserExtension $currentUserExtension)
    {
        parent::__construct($registry, CarPart::class);

        $this->currentUserExtension = $currentUserExtension;
    }

    public function findByLastChangeAndUser($carId, $cost = null)
    {
        $qb = $this->createQueryBuilder("cp")
            ->join("cp.carPartMaintenances", "cpm")
            ->orderBy("cpm.dateLastChange")
            ->where("c.id = :id")
            ->setParameter("id", $carId);

        $this->currentUserExtension->addWhere($qb, CarPart::class);

        if ($cost) {
            $qb->andWhere("cp.carStandardPart IS NOT NULL");
        }

        $carParts = $qb->getQuery()->getResult();

        return $this->orderByTimeToChange($carParts); 
    }

    public function findAllWithTimeToChange()
    {
        $qb = $this->createQueryBuilder("cp")
        ->join("cp.carPartMaintenances", "cpm")
        ->orderBy("cpm.dateLastChange");

        $carParts = $qb->getQuery()->getResult();

        foreach ($carParts as $carPart) {
            $carPart->updateTimeToChangeInMonth();
        }

        return $carParts;
    }

    private function orderByTimeToChange($carParts){
        foreach ($carParts as $carPart) {
            $carPart->updateTimeToChangeInMonth();
        }

        usort($carParts, function ($a, $b) {
            return ($a->getTimeToChangeInMonth() < $b->getTimeToChangeInMonth()) ? -1 : 1;
        });

        return $carParts;
    }
}
