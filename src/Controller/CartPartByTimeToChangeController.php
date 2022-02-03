<?php

namespace App\Controller;

use ReflectionClass;
use App\Repository\CarPartRepository;
use HaydenPierce\ClassFinder\ClassFinder;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CartPartByTimeToChangeController extends AbstractController
{
    public function __construct(CarPartRepository $carPartRepository)
    {
        $this->carPartRepository = $carPartRepository;
    }

    public function __invoke()
    {
        $carPartList = $this->carPartRepository->findByLastChangeAndUser(); 

        foreach ($carPartList as $carPart) {
            $carPart->updateTimeToChangeInMonth();
        }

        usort($carPartList, function ($a, $b) {
            return ($a->getTimeToChangeInMonth() < $b->getTimeToChangeInMonth()) ? -1 : 1;
        });

        return $carPartList;
    }
}
