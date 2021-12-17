<?php

namespace App\Entity;

use App\Repository\ServiceRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ServiceRepository::class)
 */
class Service
{
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
     * @ORM\OneToMany(targetEntity=VehicleTypePart::class, mappedBy="service")
     */
    private $vehicleTypePartList;

    /**
     * @ORM\ManyToOne(targetEntity=ServiceCategory::class, inversedBy="serviceList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $serviceCategory;

    /**
     * @ORM\ManyToMany(targetEntity=Appointment::class, inversedBy="serviceList")
     */
    private $appointmentList;

    /**
     * @ORM\ManyToMany(targetEntity=Garage::class, inversedBy="serviceList")
     */
    private $garageList;

    public function __construct()
    {
        $this->vehicleTypePartList = new ArrayCollection();
        $this->appointmentList = new ArrayCollection();
        $this->garageList = new ArrayCollection();
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

    /**
     * @return Collection|VehicleTypePart[]
     */
    public function getVehicleTypePartList(): Collection
    {
        return $this->vehicleTypePartList;
    }

    public function addVehicleTypePartList(VehicleTypePart $vehicleTypePartList): self
    {
        if (!$this->vehicleTypePartList->contains($vehicleTypePartList)) {
            $this->vehicleTypePartList[] = $vehicleTypePartList;
            $vehicleTypePartList->setService($this);
        }

        return $this;
    }

    public function removeVehicleTypePartList(VehicleTypePart $vehicleTypePartList): self
    {
        if ($this->vehicleTypePartList->removeElement($vehicleTypePartList)) {
            // set the owning side to null (unless already changed)
            if ($vehicleTypePartList->getService() === $this) {
                $vehicleTypePartList->setService(null);
            }
        }

        return $this;
    }

    public function getServiceCategory(): ?ServiceCategory
    {
        return $this->serviceCategory;
    }

    public function setServiceCategory(?ServiceCategory $serviceCategory): self
    {
        $this->serviceCategory = $serviceCategory;

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
        }

        return $this;
    }

    public function removeAppointmentList(Appointment $appointmentList): self
    {
        $this->appointmentList->removeElement($appointmentList);

        return $this;
    }

    /**
     * @return Collection|Garage[]
     */
    public function getGarageList(): Collection
    {
        return $this->garageList;
    }

    public function addGarageList(Garage $garageList): self
    {
        if (!$this->garageList->contains($garageList)) {
            $this->garageList[] = $garageList;
        }

        return $this;
    }

    public function removeGarageList(Garage $garageList): self
    {
        $this->garageList->removeElement($garageList);

        return $this;
    }
}
