<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VehiclePartRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"vehiclePart_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=VehiclePartRepository::class)
 */
class VehiclePart
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
     * @ORM\Column(type="string", length=200, nullable=true)
     * @Assert\Length(
     *      min = 3,
     *      max = 200,
     *      minMessage = "Le nom personnalisé de la piece doit être une chaine et doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "Le nom personnalisé de la piecedoit être une chaine et doit faire au maximum {{ limit }} caractères"
     * )
     */
    private $customName;

    /**
     * @ORM\ManyToOne(targetEntity=VehicleTypePart::class, inversedBy="vehiclePartList")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Le type de pièce ne peut pas être vide")
     */
    private $vehicleTypePart;

    /**
     * @ORM\ManyToOne(targetEntity=Vehicle::class, inversedBy="vehiclePartList")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="Le vehicule ne peut pas être vide")
     */
    private $vehicle;

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

    public function getCustomName(): ?string
    {
        return $this->customName;
    }

    public function setCustomName(?string $customName): self
    {
        $this->customName = $customName;

        return $this;
    }

    public function getVehicleTypePart(): ?VehicleTypePart
    {
        return $this->vehicleTypePart;
    }

    public function setVehicleTypePart(?VehicleTypePart $vehicleTypePart): self
    {
        $this->vehicleTypePart = $vehicleTypePart;

        return $this;
    }

    public function getVehicle(): ?Vehicle
    {
        return $this->vehicle;
    }

    public function setVehicle(?Vehicle $vehicle): self
    {
        $this->vehicle = $vehicle;

        return $this;
    }
}
