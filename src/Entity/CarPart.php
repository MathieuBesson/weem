<?php

namespace App\Entity;

use DateTime;
use App\Entity\CarStandardPart;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\CarPartRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use DateTimeInterface;

/**
 * @ApiResource(
 *  collectionOperations={"GET"={"normalization_context"={"groups"={"carPart_read"}}}, "POST"},
 *  itemOperations={"GET","PATCH"},
 *  normalizationContext={
 *      "groups"={"carPart_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true},
 *  attributes={"order"={"futureChangeDate"}}
 * )
 * @ApiFilter(SearchFilter::class, properties={"car.id": "exact"})
 * @ORM\Entity(repositoryClass=CarPartRepository::class)
 */
class CarPart extends AbstractCarStandardPart
{
    /**
     * @Groups({"carPart_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"carPart_read"})
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
     * @Groups({"carPart_read"})
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Choice(choices=AbstractCarStandardPart::IMPORTANCE_ID, message="Choisissez une importance valide")
     */
    private $importance;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Positive(message="La durée maximum doit être un entier ou flottant supérieur à 0")
     */
    private $maxDuration;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="float", nullable=true)
     * @Assert\Positive(message="La distance maximum doit être un entier ou flottant supérieur à 0")
     */
    private $maxDistance;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="integer", nullable=true)
     * @Assert\Choice(choices=AbstractCarStandardPart::CALCUL_DURATION_CHOICE_ID, message="Choisissez un choix du type de calcul valide")
     */
    private $calculDurationChoice;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="boolean", nullable=true)
     * @Assert\Choice({true, false})
     */
    private $notification;

    /**
     * @Groups({"carPart_read"})
     * @ORM\ManyToOne(targetEntity=CarStandardPart::class, inversedBy="carParts")
     */
    private $carStandardPart;

    /**
     * @Groups({"carPart_read"})
     * @ORM\OneToMany(targetEntity=CarPartMaintenance::class, mappedBy="carPart")
     */
    private $carPartMaintenances;

    /**
     * @Groups({"carPart_read"})
     * @ORM\ManyToOne(targetEntity=Car::class, inversedBy="carParts")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="La pièce doit être lié à un voiture")
     */
    private $car;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $unused;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="datetime")
     */
    private $futureChangeDate;

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
        return $this->carPartMaintenances;
    }

    public function addCarPartMaintenance(CarPartMaintenance $carPartMaintenance): self
    {
        if (!$this->carPartMaintenances->contains($carPartMaintenance)) {
            $this->carPartMaintenances[] = $carPartMaintenance;
            $carPartMaintenance->setCarPart($this);
        }

        return $this;
    }

    public function removeCarPartMaintenance(CarPartMaintenance $carPartMaintenance): self
    {
        if ($this->carPartMaintenances->removeElement($carPartMaintenance)) {
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

    public function getUnused(): ?bool
    {
        return $this->unused;
    }

    public function setUnused(?bool $unused): self
    {
        $this->unused = $unused;

        return $this;
    }

    /**
     * Calcul date of future mainteance function of duration choice 
     *
     * @param null|DateTimeInterface $dateReference
     * @return DateTimeInterface
     */
    private function calculDateOfFutureMaintenance(DateTimeInterface $dateReference = null): DateTimeInterface
    {
        if (!$dateReference) {
            $dateReference = clone $this->getCar()->getDateReleased();
        }

        $timeToChange = null;
        switch ($this->calculDurationChoice) {
            case CarPart::CALCUL_DURATION_CHOICE_ID['MILEAGE']:
                $timeToChange = $dateReference->modify('+' . (int) ($this->maxDistance * 30 / $this->getCar()->getMileageMensual()) . ' days');
                break;
            case CarPart::CALCUL_DURATION_CHOICE_ID['DURATION']:
                $timeToChange = $dateReference->modify('+' . $this->maxDuration . ' days');
                break;
            case CarPart::CALCUL_DURATION_CHOICE_ID['BOTH']:
                $date1 = clone $dateReference;
                $date2 = clone $dateReference;

                $timeToChangeFromMileage = $date1->modify('+' . (int) ($this->maxDistance * 30 / $this->getCar()->getMileageMensual()) . ' days');

                $timeToChangeFromDuration = $date2->modify('+' . $this->maxDuration . ' days');

                $timeToChange = $timeToChangeFromMileage < $timeToChangeFromDuration ?
                    $timeToChangeFromMileage : $timeToChangeFromDuration;

                break;
        }

        return $timeToChange;
    }

    /**
     * Get date of last future change of the carPart
     *
     * @param CarPartMaintenance $lastCarPartMaintenance
     * @return DateTimeInterface
     */
    public function getUpdateFutureChange(CarPartMaintenance $lastCarPartMaintenance): DateTimeInterface
    {
        $timeToChange = null;

        switch (true) {
            case $this->unused && $lastCarPartMaintenance:
                $timeToChange = $this->calculDateOfFutureMaintenance();
                break;
            case $lastCarPartMaintenance:
                $timeToChange = $this->calculDateOfFutureMaintenance(clone $lastCarPartMaintenance->getDateLastChange());
                break;
            default:
                $timeToChange = null;
                break;
        }

        return $timeToChange;
    }

    public function getFutureChangeDate(): ?\DateTimeInterface
    {
        return $this->futureChangeDate;
    }

    public function setFutureChangeDate(\DateTimeInterface $futureChangeDate): self
    {
        $this->futureChangeDate = $futureChangeDate;

        return $this;
    }

    /**
     * @Groups({"carPart_read"})
     */
    public function getDaysBeforeFutureChange(): int
    {
        return (int) (new DateTime)->diff($this->futureChangeDate)->format("%m");
    }
}
