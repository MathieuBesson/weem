<?php

namespace App\Events;

use App\Entity\Car;
use App\Entity\CarPart;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use App\Repository\CarStandardPartRepository;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CarPartSubscriber implements EventSubscriberInterface
{
    private EntityManagerInterface $em;
    private CarStandardPartRepository $carStandardPartRepository;

    public function __construct(EntityManagerInterface $em, CarStandardPartRepository $carStandardPartRepository)
    {
        $this->em = $em;
        $this->carStandardPartRepository = $carStandardPartRepository;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['createCarPartList', EventPriorities::PRE_WRITE]
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
}
