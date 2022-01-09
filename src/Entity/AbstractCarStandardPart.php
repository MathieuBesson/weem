<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\MappedSuperclass
 */
abstract class AbstractCarStandardPart
{
    const IMPORTANCE_ID = [
        'PRIMARY' => 1,
        'SECONDARY' => 2,
        'MAINTENANCE' => 3,
    ]; 

    const IMPORTANCE = [
        self::IMPORTANCE_ID['PRIMARY'] => [
            'LABEL' => 'principale'
        ],
        self::IMPORTANCE_ID['SECONDARY'] => [
            'LABEL' => 'secondaire'
        ],
        self::IMPORTANCE_ID['MAINTENANCE'] => [
            'LABEL' => 'entretien'
        ],
    ]; 

    const CALCUL_DURATION_CHOICE_ID = [
        'MILEAGE' => 1,
        'DURATION' => 2
    ];

    const CALCUL_DURATION_CHOICE = [
        self::CALCUL_DURATION_CHOICE_ID['MILEAGE'] => [
            'LABEL' => 'kilometrage'
        ],
        self::CALCUL_DURATION_CHOICE_ID['DURATION'] => [
            'LABEL' => 'durée'
        ],
    ];
}
