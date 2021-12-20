<?php

namespace App\Entity;

use App\Repository\VehicleTypePartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=VehicleTypePartRepository::class)
 */
class VehicleTypePart
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

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $importance;

    /**
     * @ORM\Column(type="float")
     */
    private $priceMin;

    /**
     * @ORM\Column(type="float")
     */
    private $priceMax;

    /**
     * @ORM\ManyToMany(targetEntity=VehicleType::class, mappedBy="vehicleTypePartList")
     */
    private $vehicleTypeList;

    /**
     * @ORM\OneToMany(targetEntity=VehiclePart::class, mappedBy="vehicleTypePart")
     */
    private $vehiclePartList;

    /**
     * @ORM\ManyToOne(targetEntity=Service::class, inversedBy="vehicleTypePartList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $service;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $maxDuration;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $maxDistance;

    /**
     * @ORM\Column(type="integer")
     */
    private $calculDurationChoice;

    public function __construct()
    {
        $this->vehicleTypeList = new ArrayCollection();
        $this->vehiclePartList = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImportance(): ?int
    {
        return $this->importance;
    }

    public function setImportance(int $importance): self
    {
        $this->importance = $importance;

        return $this;
    }

    public function getPriceMin(): ?float
    {
        return $this->priceMin;
    }

    public function setPriceMin(float $priceMin): self
    {
        $this->priceMin = $priceMin;

        return $this;
    }

    public function getPriceMax(): ?float
    {
        return $this->priceMax;
    }

    public function setPriceMax(float $priceMax): self
    {
        $this->priceMax = $priceMax;

        return $this;
    }

    /**
     * @return Collection|VehicleType[]
     */
    public function getVehicleTypeList(): Collection
    {
        return $this->vehicleTypeList;
    }

    public function addVehicleTypeList(VehicleType $vehicleTypeList): self
    {
        if (!$this->vehicleTypeList->contains($vehicleTypeList)) {
            $this->vehicleTypeList[] = $vehicleTypeList;
            $vehicleTypeList->addVehicleTypePartList($this);
        }

        return $this;
    }

    public function removeVehicleTypeList(VehicleType $vehicleTypeList): self
    {
        if ($this->vehicleTypeList->removeElement($vehicleTypeList)) {
            $vehicleTypeList->removeVehicleTypePartList($this);
        }

        return $this;
    }

    /**
     * @return Collection|VehiclePart[]
     */
    public function getVehiclePartList(): Collection
    {
        return $this->vehiclePartList;
    }

    public function addVehiclePartList(VehiclePart $vehiclePartList): self
    {
        if (!$this->vehiclePartList->contains($vehiclePartList)) {
            $this->vehiclePartList[] = $vehiclePartList;
            $vehiclePartList->setVehicleTypePart($this);
        }

        return $this;
    }

    public function removeVehiclePartList(VehiclePart $vehiclePartList): self
    {
        if ($this->vehiclePartList->removeElement($vehiclePartList)) {
            // set the owning side to null (unless already changed)
            if ($vehiclePartList->getVehicleTypePart() === $this) {
                $vehiclePartList->setVehicleTypePart(null);
            }
        }

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

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

    public function setCalculDurationChoice(int $calculDurationChoice): self
    {
        $this->calculDurationChoice = $calculDurationChoice;

        return $this;
    }
}
