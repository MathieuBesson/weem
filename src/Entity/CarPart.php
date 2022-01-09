<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CarPartRepository;
use App\Entity\CarStandardPart;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"carPart_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=CarPartRepository::class)
 */
class CarPart extends AbstractCarStandardPart
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200, nullable=true)
     * @Assert\Length(
     *      min = 3,
     *      max = 200,
     *      minMessage = "Le nom du type de pièce de véhicule doit être une chaine et doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "Le nom du type de pièce de véhicule doit être une chaine et doit faire au maximum {{ limit }} caractères"
     * )
     */
    private $name;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Choice(choices=AbstractCarStandardPart::IMPORTANCE_ID, message="Choisissez une importance valide")
     */
    private $importance;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Positive(message="La durée maximum doit être un entier ou flottant supérieur à 0")
     */
    private $maxDuration;

    /**
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Positive(message="La distance maximum doit être un entier ou flottant supérieur à 0")
     */
    private $maxDistance;

    /**
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Choice(choices=AbstractCarStandardPart::CALCUL_DURATION_CHOICE_ID, message="Choisissez un choix du type de calcul valide")
     */
    private $calculDurationChoice;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     * @Assert\Choice({true, false})
     */
    private $notification;

    /**
     * @ORM\ManyToOne(targetEntity=CarStandardPart::class, inversedBy="carPartList")
     */
    private $carStandardPart;

    /**
     * @ORM\OneToMany(targetEntity=CarPartMaintenance::class, mappedBy="carPart")
     */
    private $carPartMaintenanceList;

    /**
     * @ORM\ManyToOne(targetEntity=Car::class, inversedBy="carPartList")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="La pièce doit être lié à un voiture")
     */
    private $car;

    public function __construct()
    {
        $this->carPartMaintenances = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImportance(): ?int
    {
        return $this->importance;
    }

    public function setImportance(?int $importance): self
    {
        $this->importance = $importance;

        return $this;
    }

    public function getMaxDuration(): ?int
    {
        return $this->maxDuration;
    }

    public function setMaxDuration(?int $maxDuration): self
    {
        $this->maxDuration = $maxDuration;

        return $this;
    }

    public function getMaxDistance(): ?float
    {
        return $this->maxDistance;
    }

    public function setMaxDistance(?float $maxDistance): self
    {
        $this->maxDistance = $maxDistance;

        return $this;
    }

    public function getCalculDurationChoice(): ?int
    {
        return $this->calculDurationChoice;
    }

    public function setCalculDurationChoice(?int $calculDurationChoice): self
    {
        $this->calculDurationChoice = $calculDurationChoice;

        return $this;
    }

    public function getNotification(): ?bool
    {
        return $this->notification;
    }

    public function setNotification(?bool $notification): self
    {
        $this->notification = $notification;

        return $this;
    }

    public function getCarStandardPart(): ?CarStandardPart
    {
        return $this->carStandardPart;
    }

    public function setCarStandardPart(?CarStandardPart $carStandardPart): self
    {
        $this->carStandardPart = $carStandardPart;

        return $this;
    }

    /**
     * @return Collection|CarPartMaintenance[]
     */
    public function getCarPartMaintenances(): Collection
    {
        return $this->carPartMaintenanceList;
    }

    public function addCarPartMaintenance(CarPartMaintenance $carPartMaintenance): self
    {
        if (!$this->carPartMaintenanceList->contains($carPartMaintenance)) {
            $this->carPartMaintenanceList[] = $carPartMaintenance;
            $carPartMaintenance->setCarPart($this);
        }

        return $this;
    }

    public function removeCarPartMaintenance(CarPartMaintenance $carPartMaintenance): self
    {
        if ($this->carPartMaintenanceList->removeElement($carPartMaintenance)) {
            // set the owning side to null (unless already changed)
            if ($carPartMaintenance->getCarPart() === $this) {
                $carPartMaintenance->setCarPart(null);
            }
        }

        return $this;
    }

    public function getCar(): ?Car
    {
        return $this->car;
    }

    public function setCar(?Car $car): self
    {
        $this->car = $car;

        return $this;
    }
}
