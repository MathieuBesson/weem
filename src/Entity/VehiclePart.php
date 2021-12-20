<?php

namespace App\Entity;

use App\Repository\VehiclePartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
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
     */
    private $mileage;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateLastChange;

    /**
     * @ORM\Column(type="string", length=200, nullable=true)
     */
    private $customName;

    /**
     * @ORM\ManyToOne(targetEntity=VehicleTypePart::class, inversedBy="vehiclePartList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $vehicleTypePart;

    /**
     * @ORM\ManyToOne(targetEntity=Vehicle::class, inversedBy="vehiclePartList")
     * @ORM\JoinColumn(nullable=false)
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

    public function setMileage(?float $mileage): self
    {
        $this->mileage = $mileage;

        return $this;
    }

    public function getDateLastChange(): ?\DateTimeInterface
    {
        return $this->dateLastChange;
    }

    public function setDateLastChange(?\DateTimeInterface $dateLastChange): self
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
