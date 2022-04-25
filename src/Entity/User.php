<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 *  itemOperations={"GET"},
 *  collectionOperations={"GET", "POST"},
 *  normalizationContext={
 *      "groups"={"users_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @UniqueEntity("email", message="Un utilisateur ayant cette adresse email existe déjà")
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    // eight characters, at least one letter and one number
    const REGEX_PASSWORD = "/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/"; 
    const REGEX_PHONE_NUMBER = "/^((\+)33|0)[1-9](\d{2}){4}$/";

    /**
     * @Groups({"users_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"users_read"})
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email(message="L'adresse email doit être une chaine au format valide")
     * @Assert\NotBlank(message="L'email ne peux pas être vide")
     */
    private $email;

    /**
     * @Groups({"users_read"})
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     * @Assert\Regex(
     *     pattern=User::REGEX_PASSWORD,
     *     match=true,
     *     message="Le mot de passe doit être une chaine au format valide"
     * )
     * @Assert\NotBlank(message="Le mot de passe ne peux pas être vide")
     */
    private $password;

    /**
     * @Groups({"users_read"})
     * @ORM\Column(type="string", length=300)
     * @Assert\Length(
     *      min = 3,
     *      max = 300,
     *      minMessage = "Votre nom doit être une chaine et faire au minimum {{ limit }} caractères",
     *      maxMessage = "Votre nom doit être une chaine et faire au maximum {{ limit }} caractères"
     * )
     * @Assert\NotBlank(message="Le nom ne peux pas être vide")
     */
    private $name;

    /**
     * @Groups({"users_read"})
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Assert\Regex(
     *     pattern=User::REGEX_PHONE_NUMBER,
     *     match=true,
     *     message="Votre numéro de téléphone doit être une chaine au format valide"
     * )
     */
    private $phone;

    /**
     * @Groups({"users_read"})
     * @ORM\Column(type="boolean", nullable=true)
     * @Assert\Choice({true, false})
     */
    private $notification;

    /**
     * @Groups({"users_read"})
     * @ORM\OneToMany(targetEntity=Car::class, mappedBy="user")
     */
    private $cars;

    /**
     * @ORM\Column(type="boolean")
     */
    private $darkTheme = false;

    public function __construct()
    {
        $this->cars = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getNotification(): bool
    {
        return $this->notification;
    }

    public function setNotification(bool $notification): self
    {
        $this->notification = $notification;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * @return Collection|Car[]
     */
    public function getCars(): Collection
    {
        return $this->cars;
    }

    public function addCar(Car $cars): self
    {
        if (!$this->cars->contains($cars)) {
            $this->cars[] = $cars;
            $cars->setUser($this);
        }

        return $this;
    }

    public function removeCar(Car $cars): self
    {
        if ($this->cars->removeElement($cars)) {
            // set the owning side to null (unless already changed)
            if ($cars->getUser() === $this) {
                $cars->setUser(null);
            }
        }

        return $this;
    }

    public function getDarkTheme(): ?bool
    {
        return $this->darkTheme;
    }

    public function setDarkTheme(bool $darkTheme): self
    {
        $this->darkTheme = $darkTheme;

        return $this;
    }
}
