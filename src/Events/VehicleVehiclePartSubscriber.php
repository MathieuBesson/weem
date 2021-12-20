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
    private $security;
    private $em;

    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['createVehiclePartList', EventPriorities::PRE_WRITE]
        ];
    }

    public function createVehiclePartList(ViewEvent $event)
    {
        $vehicle = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

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












