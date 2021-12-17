<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VehicleTypeRepository;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=VehicleTypeRepository::class)
 */
class VehicleType
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
     * @ORM\OneToMany(targetEntity=Vehicle::class, mappedBy="vehicleType")
     */
    private $vehicleList;

    /**
     * @ORM\ManyToMany(targetEntity=VehicleTypePart::class, inversedBy="vehicleTypeList")
     */
    private $vehicleTypePartList;

    public function __construct()
    {
        $this->vehicles = new ArrayCollection();
        $this->vehicleList = new ArrayCollection();
        $this->vehicleTypePartList = new ArrayCollection();
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
            $vehicleList->setVehicleType($this);
        }

        return $this;
    }

    public function removeVehicleList(Vehicle $vehicleList): self
    {
        if ($this->vehicleList->removeElement($vehicleList)) {
            // set the owning side to null (unless already changed)
            if ($vehicleList->getVehicleType() === $this) {
                $vehicleList->setVehicleType(null);
            }
        }

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
        }

        return $this;
    }

    public function removeVehicleTypePartList(VehicleTypePart $vehicleTypePartList): self
    {
        $this->vehicleTypePartList->removeElement($vehicleTypePartList);

        return $this;
    }
}
