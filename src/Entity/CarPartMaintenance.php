<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"cartPartChange_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=CarPartMaintenanceRepository::class)
 */
class CarPartMaintenance
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Positive(message="Le kilometrage doit être un entier ou flottant supérieur à 0")
     */
    private $mileage;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Assert\DateTime(message="La date de dernier changement doit être un datetime valide")
     */
    private $dateLastChange;

    /**
     * @ORM\ManyToOne(targetEntity=CarPart::class, inversedBy="carPartMaintenanceList")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="L'entretien doit être lié à une voiture")
     */
    private $carPart;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMileage(): ?float
    {
        return $this->mileage;
    }

    public function setMileage($mileage): self
    {
        $this->mileage = $mileage;

        return $this;
    }

    public function getDateLastChange(): ?\DateTimeInterface
    {
        return $this->dateLastChange;
    }

    public function setDateLastChange($dateLastChange): self
    {
        $this->dateLastChange = $dateLastChange;

        return $this;
    }

    public function getCarPart(): ?CarPart
    {
        return $this->carPart;
    }

    public function setCarPart(?CarPart $carPart): self
    {
        $this->carPart = $carPart;

        return $this;
    }
}
