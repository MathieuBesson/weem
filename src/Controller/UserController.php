<?php

namespace App\Controller;

use ReflectionClass;
use HaydenPierce\ClassFinder\ClassFinder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;

class UserController extends AbstractController
{

    /**
     * @var Security
     */
    private $security;

    public function __construct(Security $security)
    {
       $this->security = $security;
    }

    public function __invoke()
    {
        return $this->security->getUser();
    }
}
