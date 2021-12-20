<?php

namespace App\Doctrine;

use App\Entity\User;
use App\Entity\Vehicle;
use App\Entity\Appointment;
use App\Entity\VehiclePart;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private Security $security;
    private AuthorizationCheckerInterface $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->auth = $checker;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        // Get current user data
        $user = $this->security->getUser();

        // Get entity directly linked with User 
        if (
            (
                $resourceClass === Vehicle::class ||
                $resourceClass === VehiclePart::class ||
                $resourceClass === Appointment::class
            )
            && !$this->auth->isGranted('ROLE_ADMIN')
            && $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            // Get only entities linked with current user 
            switch ($resourceClass) {
                case Appointment::class:
                case VehiclePart::class:
                    $queryBuilder
                        ->join("$rootAlias.vehicle", "v")
                        ->andWhere("v.user = :user");
                    break;
                case Vehicle::class:
                    $queryBuilder->andWhere("$rootAlias.user = :user");
                    break;
            }
            $queryBuilder->setParameter("user", $user);
        }
    }

    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        string $operationName = null,
        array $context = []
    ) {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}
