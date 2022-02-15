<?php

namespace App\Controller;

use App\Utils\JwtUtil;
use App\Repository\CarRepository;

// Include the Response and ResponseHeaderBag
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use Dompdf\Dompdf;
use Dompdf\Options;

class DownloadController extends AbstractController
{
    private UserRepository $userRepository;
    private CarRepository $carRepository;

    public function __construct(UserRepository $userRepository, CarRepository $carRepository)
    {
        $this->userRepository = $userRepository;
        $this->carRepository = $carRepository;
    }

    /**
     * @Route("/download_recap", name="download_recap")
     */
    public function indexAction(Request $request)
    {
        // Configure Dompdf according to your needs
        $pdfOptions = new Options();
        $pdfOptions->set('defaultFont', 'Arial');

        // Instantiate Dompdf with our options
        $dompdf = new Dompdf($pdfOptions);

        // Retrieve the HTML generated in our twig file
        $html = $this->renderView('default/mypdf.html.twig', [
            'title' => "Welcome to our PDF Test"
        ]);

        // Load HTML to Dompdf
        $dompdf->loadHtml($html);

        // (Optional) Setup the paper size and orientation 'portrait' or 'portrait'
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser (inline view)
        $dompdf->stream("mypdf.pdf", [
            "Attachment" => false
        ]);






        $userData = JwtUtil::tokenDecode($request->query->get('token'));
        $user = $this->userRepository->findOneBy(["email" => $userData->username]);

        if (!$user) {
            throw new NotFoundHttpException();
        }

        $carId = (int) $request->query->get('carId');
        $car = $this->carRepository->findOneBy(["id" => $carId]);

        // if the car not does not belong to this user
        if ($car->getUser()->getId() !== $user->getId()) {
            throw new NotFoundHttpException();
        }

        // dd($car);

        // - On récupère toutes les infos d'un véhicule 
        // 	- véhicule 
        // 	- pièces 
        // 	- changements

        // - On créer un fichier pdf
        // - On l'enregistre dans un dossier 
        // - On le sert à l'utilisateur 


        // Provide a name for your file with extension
        $filename = 'TextFile.txt';

        // The dinamically created content of the file
        $fileContent = "<h1>Hello, this is the content of my File</h1>";

        // Return a response with a specific content
        $response = new Response($fileContent);

        // Create the disposition of the file
        $disposition = $response->headers->makeDisposition(
            ResponseHeaderBag::DISPOSITION_ATTACHMENT,
            $filename
        );

        // Set the content disposition
        $response->headers->set('Content-Disposition', $disposition);

        // Dispatch request
        return $response;

        // https://ourcodeworld.com/articles/read/799/how-to-create-a-pdf-from-html-in-symfony-4-using-dompdf
    }
}
