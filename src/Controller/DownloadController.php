<?php

namespace App\Controller;

use Dompdf\Dompdf;
use Dompdf\Options;

// Include the Response and ResponseHeaderBag
use App\Utils\JwtUtil;
use Spipu\Html2Pdf\Html2Pdf;
use App\Repository\CarRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Repository\CarPartMaintenanceRepository;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class DownloadController extends AbstractController
{
    private UserRepository $userRepository;
    private CarRepository $carRepository;

    public function __construct(
        UserRepository $userRepository,
        CarRepository $carRepository,
        CarPartMaintenanceRepository $carPartMaintenanceRepository
    ) {
        $this->userRepository = $userRepository;
        $this->carRepository = $carRepository;
        $this->carPartMaintenanceRepository = $carPartMaintenanceRepository;
    }

    /**
     * @Route("/maintenance_summary/{carId}", name="maintenance_summary")
     */
    public function maintenanceSummary(Request $request, int $carId)
    {
        $userData = JwtUtil::tokenDecode($request->query->get('token'));

        if (!$userData) {
            throw new NotFoundHttpException();
        }

        $user = $this->userRepository->findOneBy(["email" => $userData->username]);
        if (!$user) {
            throw new NotFoundHttpException();
        }

        $car = $this->carRepository->findOneBy(["id" => $carId]);

        // if the car not does not belong to this user
        if ($car && $car->getUser()->getId() !== $user->getId()) {
            throw new NotFoundHttpException();
        }

        $carMaintenances = $this->carPartMaintenanceRepository->findByCar($carId);

        // Generate HTML recap
        $html = $this->renderView('default/maintenance_summary.html.twig', [
            'car' => $car,
            'carMaintenances' => $carMaintenances
        ]);

        // Setup PDF
        $dompdf = new Dompdf();
        $options = $dompdf->getOptions();
        $options->setDefaultFont('Sans serif');
        $dompdf->setOptions($options);
        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();
        $dompdf->stream("export-" . $car->getName() . ".pdf", ["Attachment" => false]);
    }
}
