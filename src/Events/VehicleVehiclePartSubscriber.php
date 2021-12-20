<?php

namespace App\Events;

use App\Entity\Vehicle;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\VehiclePart;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class VehicleVehiclePartSubscriber implements EventSubscriberInterface
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['createVehiclePartList', EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * Add vehicle part list on Vehicle POST 
     *
     * @param ViewEvent $event - Event subscriber catch 
     * @return void
     */
    public function createVehiclePartList(ViewEvent $event)
    {
        $vehicle = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // On Vehicle POST create all vehicle part f° of VehicleTypePart
        if ($vehicle instanceof Vehicle && $method === "POST") {
            foreach ($vehicle->getVehicleType()->getVehicleTypePartList() as $vehicleTypePartItem) {
                $vehiclePart = new VehiclePart(); 
                $vehiclePart->setVehicleTypePart($vehicleTypePartItem);

                $this->em->persist($vehiclePart);
                $vehicle->addVehiclePartList($vehiclePart);
            }
        }
    }
}












