<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\CarRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(
 *  collectionOperations={"GET", "POST"},
 *  itemOperations={"GET","PATCH"},
 *  normalizationContext={
 *      "groups"={"cars_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @ORM\Entity(repositoryClass=CarRepository::class)
 */
class Car
{
    const REGEX_COLOR_HEXA = "/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/";

    const FUEL_TYPE_ID = [
        'ELECTRIC' => 1,
        'ESCENCE' => 2,
        'DIESEL' => 3,
        'HYBRID' => 4,
        'OTHER' => 5,
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
        self::FUEL_TYPE_ID['OTHER'] => [
            'LABEL' => 'autre'
        ],
    ];

    const DRIVING_STYLE_ID = [
        'SOFT' => 1,
        'NEUTRAL' => 2,
        'SPORTIVE' => 3,
    ];

    const DRIVING_STYLE = [
        self::DRIVING_STYLE_ID['SOFT'] => [
            'LABEL' => 'souple',
            'DAMAGE_PERCENTAGE' => 1
        ],
        self::DRIVING_STYLE_ID['NEUTRAL'] => [
            'LABEL' => 'neutre',
            'DAMAGE_PERCENTAGE' => 1.2
        ],
        self::DRIVING_STYLE_ID['SPORTIVE'] => [
            'LABEL' => 'sportive',
            'DAMAGE_PERCENTAGE' => 1.4
        ]
    ];


    const MODEL_TYPE_ID = [
        'COUPE' => 1,
        'BERLINE' => 2,
        'SUV' => 3,
        'CITADINE' => 4,
    ];

    const MODEL_TYPE = [
        self::MODEL_TYPE_ID['COUPE'] => [
            'LABEL' => 'coupé',
        ],
        self::MODEL_TYPE_ID['BERLINE'] => [
            'LABEL' => 'berline',
        ],
        self::MODEL_TYPE_ID['SUV'] => [
            'LABEL' => 'SUV',
        ],
        self::MODEL_TYPE_ID['CITADINE'] => [
            'LABEL' => 'citadine',
        ]
    ];

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="string", length=200)
     * @Assert\NotBlank(message="Le nom ne peut pas être vide")
     * @Assert\Length(
     *      min = 3,
     *      max = 300,
     *      minMessage = "Le nom du véhicule doit être une chaine et doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "Le nom du véhicule doit être une chaine et doit faire au maximum {{ limit }} caractères"
     * )
     */
    private $name;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="datetime")
     * @Assert\NotBlank(message="La date de création ne peut pas être vide")
     */
    private $dateReleased;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="float")
     * @Assert\NotBlank(message="Le kilometrage globale ne peut pas être vide")
     * @Assert\Positive(message="Le kilometrage globale doit être un entier ou flottant supérieur à 0")
     */
    private $mileageGlobale;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="float")
     * @Assert\NotBlank(message="Le kilometrage mensuel ne peut pas être vide")
     * @Assert\Positive(message="Le kilometrage mensuel doit être un entier ou flottant supérieur à 0")
     */
    private $mileageMensual;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="Le type de carburant ne peut pas être vide")
     * @Assert\Choice(choices=Car::FUEL_TYPE_ID, message="Choisissez un type de carburant valide")
     */
    private $fuelType;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="string", length=50)
     * @Assert\NotBlank(message="L'immatriculation ne peut pas être vide")
     * @Assert\Length(
     *      min = 2,
     *      max = 50,
     *      minMessage = "L'immatriculation doit faire au minimum {{ limit }} caractères",
     *      maxMessage = "L'immatriculation doit faire au maximum {{ limit }} caractères"
     * )
     */
    private $registration;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="integer")
     * @Assert\NotBlank(message="Le type de conduite ne peux pas être vide")
     * @Assert\Choice(choices=Car::DRIVING_STYLE_ID, message="Choisissez un type de conduite valide")
     */
    private $drivingStyle;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="integer", nullable=true)
     */
    private $modelType;

    /**
     * @Groups({"cars_read"})
     * @ORM\Column(type="string", nullable=true)
     * @Assert\Regex(
     *     pattern=Car::REGEX_COLOR_HEXA,
     *     match=true,
     *     message="La couleur doit être au format hexadecimal"
     * )
     */
    private $color;

    /**
     * @Groups({"cars_read"})
     * @ORM\ManyToOne(targetEntity=CarBrand::class, inversedBy="cars")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="La marque du véhicule ne peux pas être vide")
     */
    private $carBrand;

    /**
     * @Groups({"cars_read"})
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="cars")
     * @Assert\NotBlank(message="L'utilisateur ne peux pas être vide")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=CarPart::class, mappedBy="car")
     */
    private $carParts;

    public function __construct()
    {
        $this->carParts = new ArrayCollection();
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

    public function setDateReleased($dateReleased): self
    {
        $this->dateReleased = $dateReleased;

        return $this;
    }

    public function getMileageGlobale(): ?float
    {
        return $this->mileageGlobale;
    }

    public function setMileageGlobale($mileageGlobale): self
    {
        $this->mileageGlobale = $mileageGlobale;

        return $this;
    }

    public function getMileageMensual(): ?float
    {
        return $this->mileageMensual;
    }

    public function setMileageMensual($mileageMensual): self
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

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getModelType(): ?int
    {
        return $this->modelType;
    }

    public function setModelType(string $modelType): self
    {
        $this->modelType = $modelType;

        return $this;
    }

    public function getCarBrand(): ?CarBrand
    {
        return $this->carBrand;
    }

    public function setCarBrand(?CarBrand $carBrand): self
    {
        $this->carBrand = $carBrand;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|CarPart[]
     */
    public function getCarParts(): Collection
    {
        return $this->carParts;
    }

    public function addCarPart(CarPart $carPart): self
    {
        if (!$this->carParts->contains($carPart)) {
            $this->carParts[] = $carPart;
            $carPart->setCar($this);
        }

        return $this;
    }

    public function removeCarPart(CarPart $carPart): self
    {
        if ($this->carParts->removeElement($carPart)) {
            // set the owning side to null (unless already changed)
            if ($carPart->getCar() === $this) {
                $carPart->setCar(null);
            }
        }

        return $this;
    }
}
