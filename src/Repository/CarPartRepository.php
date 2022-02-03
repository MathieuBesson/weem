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

    public function findByLastChangeAndUser()
    {
        $qb = $this->createQueryBuilder("cp")
            ->join("cp.carPartMaintenanceList", "cpm")
            ->orderBy("cpm.dateLastChange");

        $this->currentUserExtension->addWhere($qb, CarPart::class);

        return $qb->getQuery()->getResult();
    }
}
