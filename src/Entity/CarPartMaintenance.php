<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CarPartMaintenanceRepository;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Entity\CarPart;

/**
 * @ApiResource(
 *  collectionOperations={"GET","POST"},
 *  itemOperations={"GET","PATCH", "DELETE"},
 *  normalizationContext={
 *      "groups"={"carPartMaintenance_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true},
 *  attributes={"order"={"dateLastChange": "DESC"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"carPart.car.id": "exact", "carPart.id": "exact"})
 * @ORM\Entity(repositoryClass=CarPartMaintenanceRepository::class)
 */
class CarPartMaintenance
{
    /**
     * @Groups({"carPartMaintenance_read","carPart_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"carPartMaintenance_read","carPart_read"})
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Positive(message="Le kilometrage doit être un entier ou flottant supérieur à 0")
     */
    private $mileage;

    /**
     * @Groups({"carPartMaintenance_read","carPart_read"})
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="La date de dernier changement ne peux pas être null")
     */
    private $dateLastChange;

    /**
     * @Groups({"carPartMaintenance_read","carPart_read"})
     * @ORM\Column(type="text", nullable=true)
     */
    private $note;

    /**
     * @Groups({"carPartMaintenance_read"})
     * @ORM\ManyToOne(targetEntity=CarPart::class, inversedBy="carPartMaintenances")
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

    // public function getCarPart(): ?CarPart
    // {
    //     return $this->carPart;
    // }

    // public function setCarPart(?CarPart $carPart): self
    // {
    //     $this->carPart = $carPart;

    //     return $this;
    // }

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): self
    {
        $this->note = $note;

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
