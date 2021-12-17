<?php

namespace App\Entity;

use App\Repository\VehicleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=VehicleRepository::class)
 */
class Vehicle
{
    const FUEL_TYPE_ID = [
        'ELECTRIC' => 1,
        'ESCENCE' => 2,
        'DIESEL' => 3,
        'HYBRID' => 4
    ];

    const FUEL_TYPE = [
        self::FUEL_TYPE_ID['ELECTRIC'] => [
            'LABEL' => 'électrique'
        ],
        self::FUEL_TYPE_ID['ESCENCE'] => [
            'LABEL' => 'essence'
        ],
        self::FUEL_TYPE_ID['DIESEL'] => [
            'LABEL' => 'diesel'
        ],
        self::FUEL_TYPE_ID['HYBRID'] => [
            'LABEL' => 'hybride'
        ],
    ]; 

    const DRIVING_STYLE_ID = [
        'MODERATE' => 1,
        'SPORTIF' => 2,
        'AGRESSIVE' => 3
    ];

    const DRIVING_STYLE = [
        self::DRIVING_STYLE_ID['MODERATE'] => [
            'LABEL' => 'modéré',
            'DAMAGE_PERCENTAGE' => 1
        ],
        self::DRIVING_STYLE_ID['SPORTIF'] => [
            'LABEL' => 'sportif',
            'DAMAGE_PERCENTAGE' => 1.2
        ],
        self::DRIVING_STYLE_ID['AGRESSIVE'] => [
            'LABEL' => 'agressif',
            'DAMAGE_PERCENTAGE' => 1.4
        ]
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
     * @ORM\Column(type="datetime")
     */
    private $dateReleased;

    /**
     * @ORM\Column(type="float")
     */
    private $mileageGlobale;

    /**
     * @ORM\Column(type="float")
     */
    private $mileageMensual;

    /**
     * @ORM\Column(type="integer")
     */
    private $fuelType;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $registration;

    /**
     * @ORM\Column(type="integer")
     */
    private $drivingStyle;

    /**
     * @ORM\ManyToOne(targetEntity=VehicleType::class, inversedBy="vehicleList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $vehicleType;

    /**
     * @ORM\OneToMany(targetEntity=VehiclePart::class, mappedBy="vehicle")
     */
    private $vehiclePartList;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="vehicle")
     */
    private $appointmentList;

    /**
     * @ORM\ManyToOne(targetEntity=VehicleBrand::class, inversedBy="vehicleList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $vehicleBrand;

    public function __construct()
    {
        $this->vehiclePartList = new ArrayCollection();
        $this->appointmentList = new ArrayCollection();
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

    public function getDateReleased(): ?\DateTimeInterface
    {
        return $this->dateReleased;
    }

    public function setDateReleased(\DateTimeInterface $dateReleased): self
    {
        $this->dateReleased = $dateReleased;

        return $this;
    }

    public function getMileageGlobale(): ?float
    {
        return $this->mileageGlobale;
    }

    public function setMileageGlobale(float $mileageGlobale): self
    {
        $this->mileageGlobale = $mileageGlobale;

        return $this;
    }

    public function getMileageMensual(): ?float
    {
        return $this->mileageMensual;
    }

    public function setMileageMensual(float $mileageMensual): self
    {
        $this->mileageMensual = $mileageMensual;

        return $this;
    }

    public function getFuelType(): ?int
    {
        return $this->fuelType;
    }

    public function setFuelType(int $fuelType): self
    {
        $this->fuelType = $fuelType;

        return $this;
    }

    public function getRegistration(): ?string
    {
        return $this->registration;
    }

    public function setRegistration(string $registration): self
    {
        $this->registration = $registration;

        return $this;
    }

    public function getDrivingStyle(): ?int
    {
        return $this->drivingStyle;
    }

    public function setDrivingStyle(int $drivingStyle): self
    {
        $this->drivingStyle = $drivingStyle;

        return $this;
    }

    public function getVehicleType(): ?VehicleType
    {
        return $this->vehicleType;
    }

    public function setVehicleType(?VehicleType $vehicleType): self
    {
        $this->vehicleType = $vehicleType;

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
            $vehiclePartList->setVehicle($this);
        }

        return $this;
    }

    public function removeVehiclePartList(VehiclePart $vehiclePartList): self
    {
        if ($this->vehiclePartList->removeElement($vehiclePartList)) {
            // set the owning side to null (unless already changed)
            if ($vehiclePartList->getVehicle() === $this) {
                $vehiclePartList->setVehicle(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Appointment[]
     */
    public function getAppointmentList(): Collection
    {
        return $this->appointmentList;
    }

    public function addAppointmentList(Appointment $appointmentList): self
    {
        if (!$this->appointmentList->contains($appointmentList)) {
            $this->appointmentList[] = $appointmentList;
            $appointmentList->setVehicle($this);
        }

        return $this;
    }

    public function removeAppointmentList(Appointment $appointmentList): self
    {
        if ($this->appointmentList->removeElement($appointmentList)) {
            // set the owning side to null (unless already changed)
            if ($appointmentList->getVehicle() === $this) {
                $appointmentList->setVehicle(null);
            }
        }

        return $this;
    }

    public function getVehicleBrand(): ?VehicleBrand
    {
        return $this->vehicleBrand;
    }

    public function setVehicleBrand(?VehicleBrand $vehicleBrand): self
    {
        $this->vehicleBrand = $vehicleBrand;

        return $this;
    }
}
