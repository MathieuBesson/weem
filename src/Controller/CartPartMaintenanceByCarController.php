<?php

namespace App\Controller;

use App\Repository\CarPartMaintenanceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CartPartMaintenanceByCarController extends AbstractController
{
    private CarPartMaintenanceRepository $carPartMaintenanceRepository; 
    public function __construct(CarPartMaintenanceRepository $carPartMaintenanceRepository)
    {
        $this->carPartMaintenanceRepository = $carPartMaintenanceRepository;
    }

    public function __invoke(int $id, ?int $count = null)
    {
        return $this->carPartMaintenanceRepository->findByCar($id, $count);
    }
}
