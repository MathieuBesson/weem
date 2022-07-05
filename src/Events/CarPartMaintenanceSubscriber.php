<?php

namespace App\Events;

use App\Entity\Car;
use App\Entity\CarPart;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\CarPartMaintenance;
use App\Repository\CarPartMaintenanceRepository;
use App\Repository\CarStandardPartRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CarPartMaintenanceSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;
    private CarPartMaintenanceRepository $carPartMaintenanceRepository;

    public function __construct(
        EntityManagerInterface $em,
        CarPartMaintenanceRepository $carPartMaintenanceRepository
    ) {
        $this->em = $em;
        $this->carPartMaintenanceRepository = $carPartMaintenanceRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['calculateDurationBeforeChangeForCarPart', EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * Calculate duration before change for carPart
     *
     * @param ViewEvent $event - Event subscriber catch 
     * @return void
     */
    public function calculateDurationBeforeChangeForCarPart(ViewEvent $event)
    {
        // dd();
        $carPartMaintenance = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // On carPartMaintenance update, actualize the future date change of the car part
        if ($carPartMaintenance instanceof CarPartMaintenance) {

            $carPart = $carPartMaintenance->getCarPart();
            $carPartId = $carPart->getId();
            $lastCarPartMaintenance = $this->carPartMaintenanceRepository->getLastByCarPart($carPartId);

            if (in_array($method, ["POST", "PATCH", "PUT"])) {
                $dateBeforeFutureChangeInBdd = $carPart->getUpdateFutureChange($lastCarPartMaintenance);
                $dateBeforeFutureChangeComeIn = $carPart->getUpdateFutureChange($carPartMaintenance);

                // if new date is smaller than old
                if ($dateBeforeFutureChangeComeIn >= $dateBeforeFutureChangeInBdd) {
                    $carPart->setFutureChangeDate($dateBeforeFutureChangeComeIn);
                    $this->em->persist($carPart);
                    $this->em->flush();
                }
            }

            if (in_array($method, ["DELETE"])) {
                $carPart->setFutureChangeDate(
                    $carPart->getUpdateFutureChange(
                        $lastCarPartMaintenance->getId() !== $carPartMaintenance->getId()
                            ? $lastCarPartMaintenance
                            : null
                    )
                );
                $this->em->persist($carPart);
                $this->em->flush();
            }
        }
    }
}
