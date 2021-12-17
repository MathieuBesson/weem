<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VehicleBrandRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=VehicleBrandRepository::class)
 */
class VehicleBrand
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"vehicles_read"})
     * @Groups({"users_read"})
     * @ORM\Column(type="string", length=200)
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Vehicle::class, mappedBy="vehicleBrand")
     */
    private $vehicleList;

    public function __construct()
    {
        $this->vehicleList = new ArrayCollection();
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
     * @return Collection|Vehicle[]
     */
    public function getVehicleList(): Collection
    {
        return $this->vehicleList;
    }

    public function addVehicleList(Vehicle $vehicleList): self
    {
        if (!$this->vehicleList->contains($vehicleList)) {
            $this->vehicleList[] = $vehicleList;
            $vehicleList->setVehicleBrand($this);
        }

        return $this;
    }

    public function removeVehicleList(Vehicle $vehicleList): self
    {
        if ($this->vehicleList->removeElement($vehicleList)) {
            // set the owning side to null (unless already changed)
            if ($vehicleList->getVehicleBrand() === $this) {
                $vehicleList->setVehicleBrand(null);
            }
        }

        return $this;
    }
}
