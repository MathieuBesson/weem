<?php

namespace App\Controller;

use App\Entity\Car;
use ReflectionClass;
use App\Entity\CarPart;
use App\Repository\CarPartRepository;
use HaydenPierce\ClassFinder\ClassFinder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CartPartByTimeToChangeController extends AbstractController
{
    private CarPartRepository $carPartRepository; 

    public function __construct(CarPartRepository $carPartRepository)
    {
        $this->carPartRepository = $carPartRepository;
    }

    public function __invoke($id, int $cost)
    {
        return $this->carPartRepository->findByLastChangeAndUser($id, (bool) $cost);
    }
}
