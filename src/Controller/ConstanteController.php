<?php

namespace App\Controller;

use ReflectionClass;
use HaydenPierce\ClassFinder\ClassFinder;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class ConstanteController extends AbstractController
{
    public function __invoke()
    {
        $constantListByEntity = [];

        // Get all classNames of the namespace given 
        foreach (ClassFinder::getClassesInNamespace('App\Entity') as $classEntityItem) {
            [
                'className' => $className,
                'constantList' => $constantList
            ] = $this->getConstants($classEntityItem);

            // Check if he had const and add to array
            if (!empty($constantList)) {
                $constantListByEntity[$className] = $constantList;
            }
        }

        // Return all const in new json 
        return new JsonResponse($constantListByEntity);
    }

    private function getConstants($entityName)
    {
        $reflexionClass = new ReflectionClass($entityName);
        return [
            'className' => $reflexionClass->getShortName(),
            'constantList' => $reflexionClass->getConstants()
        ];
    }
}
