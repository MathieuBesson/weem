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
 *  normalizationContext={
 *      "groups"={"userList_read"}
 *  },
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 * @UniqueEntity("email", message="Un utilisateur ayant cette adresse email existe déjà")
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const REGEX_PASSWORD = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/"; 
    const REGEX_PHONE_NUMBER = "/^\(0\)[0-9]*$/";

    /**
     * @Groups({"userList_read"})
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @Groups({"userList_read"})
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\Email(message="L'adresse email doit être une chaine au format valide")
     */
    private $email;

    /**
     * @Groups({"userList_read"})
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
     */
    private $password;

    /**
     * @Groups({"userList_read"})
     * @ORM\Column(type="string", length=300)
     * @Assert\Length(
     *      min = 3,
     *      max = 300,
     *      minMessage = "Votre prénom doit être une chaine et faire au minimum {{ limit }} caractères",
     *      maxMessage = "Votre nom doit être une chaine et faire au maximum {{ limit }} caractères"
     * )
     */
    private $firstName;

    /**
     * @Groups({"userList_read"})
     * @ORM\Column(type="string", length=300)
     * @Assert\Length(
     *      min = 3,
     *      max = 300,
     *      minMessage = "Votre prénom doit être une chaine et faire au minimum {{ limit }} caractères",
     *      maxMessage = "Votre nom doit être une chaine et faire au minimum {{ limit }} caractères"
     * )
     */
    private $lastName;

    /**
     * @Groups({"userList_read"})
     * @ORM\Column(type="string", length=100, nullable=true)
     * @Assert\Regex(
     *     pattern=User::REGEX_PHONE_NUMBER,
     *     match=true,
     *     message="Votre numéro de téléphone doit être une chaine au format valide"
     * )
     */
    private $phone;

    /**
     * @Groups({"userList_read"})
     * @ORM\OneToMany(targetEntity=Vehicle::class, mappedBy="user")
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

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

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
            $vehicleList->setUser($this);
        }

        return $this;
    }

    public function removeVehicleList(Vehicle $vehicleList): self
    {
        if ($this->vehicleList->removeElement($vehicleList)) {
            // set the owning side to null (unless already changed)
            if ($vehicleList->getUser() === $this) {
                $vehicleList->setUser(null);
            }
        }

        return $this;
    }
}
