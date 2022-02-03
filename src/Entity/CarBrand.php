<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CarBrandRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *  collectionOperations={"GET"},
 *  itemOperations={"GET"},
 *  normalizationContext={
 *      "groups"={"carBrand_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=CarBrandRepository::class)
 */
class CarBrand
{
    /**
     * @Groups({"carBrand_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"carBrand_read"})
     * @Groups({"carList_read"})
     * @Groups({"userList_read"})
     * @ORM\Column(type="string", length=200)
     * @Assert\Length(
     *      min = 3,
     *      max = 200,
     *      minMessage = "Le nom de la marque doit être une chaine et doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "Le nom de la marque doit être une chaine et doit faire au maximum {{ limit }} caractères"
     * )
     * @Assert\NotBlank(message="Le nom de la marque ne peut pas être vide")
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Car::class, mappedBy="carBrand")
     */
    private $carList;

    public function __construct()
    {
        $this->carList = new ArrayCollection();
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
     * @return Collection|Car[]
     */
    public function getCarList(): Collection
    {
        return $this->carList;
    }

    public function addCarList(Car $carList): self
    {
        if (!$this->carList->contains($carList)) {
            $this->carList[] = $carList;
            $carList->setCarBrand($this);
        }

        return $this;
    }

    public function removeCarList(Car $carList): self
    {
        if ($this->carList->removeElement($carList)) {
            // set the owning side to null (unless already changed)
            if ($carList->getCarBrand() === $this) {
                $carList->setCarBrand(null);
            }
        }

        return $this;
    }
}
