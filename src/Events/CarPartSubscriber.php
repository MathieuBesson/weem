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

class CarPartSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;
    private CarStandardPartRepository $carStandardPartRepository;
    private CarPartMaintenanceRepository $carPartMaintenanceRepository;

    public function __construct(
        EntityManagerInterface $em, 
        CarStandardPartRepository $carStandardPartRepository,
        CarPartMaintenanceRepository $carPartMaintenanceRepository
    ){
        $this->em = $em;
        $this->carStandardPartRepository = $carStandardPartRepository;
        $this->carPartMaintenanceRepository = $carPartMaintenanceRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['createCarPartList', EventPriorities::PRE_WRITE],
            KernelEvents::VIEW => ['calculateDurationBeforeChangeForCarPart', EventPriorities::PRE_WRITE],
        ];
    }

    /**
     * Add car part list on Car POST 
     *
     * @param ViewEvent $event - Event subscriber catch 
     * @return void
     */
    public function createCarPartList(ViewEvent $event)
    {
        $car = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // On Car POST create all car part
        if ($car instanceof Car && $method === "POST") {

            foreach ($this->carStandardPartRepository->findAll() as $carStandardPartItem) {
                $carPart = new CarPart();
                $carPart->setCarStandardPart($carStandardPartItem);

                $this->em->persist($carPart);
                $car->addCarPart($carPart);
            }
        }
    }

    /**
     * Calculate duration before change for carPart
     *
     * @param ViewEvent $event - Event subscriber catch 
     * @return void
     */
    public function calculateDurationBeforeChangeForCarPart(ViewEvent $event)
    {
        $carPartMaintenance = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // On carPartMaintenance update, actualize the future date change of the car part
        if ($carPartMaintenance instanceof CarPartMaintenance && in_array($method, ["POST", "PATCH", "PUT"])) {
            $carPart = $carPartMaintenance->getCarPart(); 
            $carPartId = $carPart->getId();
            $lastCarPartMaintenance = $this->carPartMaintenanceRepository->getLastByCarPart($carPartId);

            $dateBeforeFutureChangeInBdd = $carPart->getUpdateFutureChange($lastCarPartMaintenance);
            $dateBeforeFutureChangeComeIn = $carPart->getUpdateFutureChange($carPartMaintenance);

            // if new date is smaller than old
            if($dateBeforeFutureChangeComeIn > $dateBeforeFutureChangeInBdd){
                $carPart->setFutureChangeDate($dateBeforeFutureChangeComeIn);
                $this->em->persist($carPart);
                $this->em->flush();
            }
        }
    }
}
