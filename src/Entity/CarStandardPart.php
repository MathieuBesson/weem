<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\CarStandardPartRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=CarStandardPartRepository::class)
 */
class CarStandardPart extends AbstractCarStandardPart
{
    
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=200)
     * @Assert\Length(
     *      min = 3,
     *      max = 200,
     *      minMessage = "Le nom du type de pièce de véhicule doit être une chaine et doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "Le nom du type de pièce de véhicule doit être une chaine et doit faire au maximum {{ limit }} caractères"
     * )
     * @Assert\NotBlank(message="Le nom du type de pièce de véhicule ne peut pas être vide")
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="L'importance ne peut pas être vide")
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
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="Le choix du type de calcul ne peut pas être vide")
     * @Assert\Choice(choices=AbstractCarStandardPart::CALCUL_DURATION_CHOICE_ID, message="Choisissez un choix du type de calcul valide")
     */
    private $calculDurationChoice;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="float")
     * @Assert\NotBlank(message="Le prix minimum ne peut pas être vide")
     * @Assert\Positive(message="Le prix minimum doit être un entier ou flottant supérieur à 0")
     */
    private $priceMin;

    /**
     * @Groups({"carPart_read"})
     * @ORM\Column(type="float")
     * @Assert\NotBlank(message="Le prix maximum ne peut pas être vide")
     * @Assert\Positive(message="Le prix maximum doit être un entier ou flottant supérieur à 0")
     */
    private $priceMax;

    /**
     * @ORM\OneToMany(targetEntity=CarPart::class, mappedBy="carStandardPart")
     */
    private $carPartList;

    public function __construct()
    {
        $this->carPartList = new ArrayCollection();
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

    public function getImportance(): ?int
    {
        return $this->importance;
    }

    public function setImportance(int $importance): self
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

    public function setCalculDurationChoice(int $calculDurationChoice): self
    {
        $this->calculDurationChoice = $calculDurationChoice;

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
     * @return Collection|CarPart[]
     */
    public function getCarPartList(): Collection
    {
        return $this->carPartList;
    }

    public function addCarPartList(CarPart $carPartList): self
    {
        if (!$this->carPartList->contains($carPartList)) {
            $this->carPartList[] = $carPartList;
            $carPartList->setCarStandardPart($this);
        }

        return $this;
    }

    public function removeCarPartList(CarPart $carPartList): self
    {
        if ($this->carPartList->removeElement($carPartList)) {
            // set the owning side to null (unless already changed)
            if ($carPartList->getCarStandardPart() === $this) {
                $carPartList->setCarStandardPart(null);
            }
        }

        return $this;
    }
}
