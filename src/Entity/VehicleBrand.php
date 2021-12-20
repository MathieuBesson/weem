<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\VehicleBrandRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *  normalizationContext={
 *      "groups"={"vehicleBrand_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=VehicleBrandRepository::class)
 */
class VehicleBrand
{
    /**
     * @Groups({"vehicleBrand_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"vehicleBrand_read"})
     * @Groups({"vehicleList_read"})
     * @Groups({"userList_read"})
     * @ORM\Column(type="string", length=200)
     * @Assert\Length(
     *      min = 3,
     *      max = 200,
     *      minMessage = "Le nom de la marque doit être une chaine et doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "Le nom du véhicule doit être une chaine et doit faire au maximum {{ limit }} caractères"
     * )
     * @Assert\NotBlank(message="Le nom de la marque ne peut pas être vide")
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
