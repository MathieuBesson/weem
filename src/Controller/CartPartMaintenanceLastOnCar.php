<?php

namespace App\Controller;

use App\Entity\Car;
use App\Repository\CarPartRepository;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CartPartMaintenanceLastOnCar extends AbstractController
{
    public function __construct(CarPartRepository $carPartRepository)
    {
        $this->carPartRepository = $carPartRepository;
    }

    public function __invoke(Car $data)
    {
        dd($data);
    }
}
