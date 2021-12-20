<?php

namespace App\Events;

use App\Entity\Vehicle;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class VehicleSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForVehicle', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setUserForVehicle(ViewEvent $event)
    {
        $vehicle = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // On Vehicle post link his user 
        if ($vehicle instanceof Vehicle && $method === "POST") {
            $vehicle->setUser($this->security->getUser());
        }
    }
}
