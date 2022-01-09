<?php

namespace App\Events;

use App\Entity\Car;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CarSubscriber implements EventSubscriberInterface
{
    private $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setUserForCar', EventPriorities::PRE_VALIDATE]
        ];
    }

    /**
     * Set user current account to car POST
     *
     * @param ViewEvent $event - Event subscriber catch 
     * @return void
     */
    public function setUserForCar(ViewEvent $event)
    {
        $car = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        // On Car POST link his user 
        if ($car instanceof Car && $method === "POST") {
            $car->setUser($this->security->getUser());
        }
    }
}
