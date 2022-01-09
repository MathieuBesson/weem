<?php

namespace App\Doctrine;

use App\Entity\User;
use App\Entity\Car;
use App\Entity\CarPart;
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

    /**
     * On each doctrine request add where condition to get only linked entities with current user 
     *
     * @param  QueryBuilder $queryBuilder  - Query builder linked  
     * @param  string $resourceClass       - Name of the entity class used by query builder 
     * @return void
     */
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        // Get current user data
        $user = $this->security->getUser();

        // Get entity directly linked with User 
        if (
            (
                $resourceClass === Car::class ||
                $resourceClass === CarPart::class
            )
            && !$this->auth->isGranted('ROLE_ADMIN')
            && $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            // Get only entities linked with current user 
            switch ($resourceClass) {
                case CarPart::class:
                    $queryBuilder
                        ->join("$rootAlias.car", "v")
                        ->andWhere("v.user = :user");
                    break;
                case Car::class:
                    $queryBuilder->andWhere("$rootAlias.user = :user");
                    break;
            }
            $queryBuilder->setParameter("user", $user);
        }
    }

    /**
     * Apply modification on get collection
     *
     * @param QueryBuilder $queryBuilder - Query builder linked  
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass - Name of the entity class used by query builder 
     * @param string|null $operationName
     * @return void
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        string $operationName = null
    ) {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    /**
     * Apply modification on get item
     *
     * @param QueryBuilder $queryBuilder - Query builder linked  
     * @param QueryNameGeneratorInterface $queryNameGenerator
     * @param string $resourceClass - Name of the entity class used by query builder 
     * @param array $identifiers
     * @param string|null $operationName
     * @param array $context
     * @return void
     */
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
