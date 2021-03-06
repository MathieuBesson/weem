<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *  itemOperations={},
 *  collectionOperations={
 *    "all_constants"={
 *       "method"="get", 
 *       "path"="/constantes", 
 *       "controller"="App\Controller\ConstanteController", 
 *       "normalization_context"={"groups"={"constante_read"}},
 *       "defaults"={"identifiedBy"="id"},
 *       "read"=false
 *    }
 * }
 * )
 */
class Constante
{
    /**
     * @Groups({"constante_read"})
     * @ApiProperty(identifier=true)
     */
    public $id;
}