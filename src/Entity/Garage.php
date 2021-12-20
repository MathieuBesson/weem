<?php

namespace App\Entity;

use App\Repository\GarageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=GarageRepository::class)
 */
class Garage
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
     * @ORM\Column(type="string", length=300)
     */
    private $type;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $city;

    /**
     * @ORM\Column(type="string", length=300)
     */
    private $adress;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=200)
     */
    private $mail;

    /**
     * @ORM\Column(type="text")
     */
    private $schedule;

    /**
     * @ORM\Column(type="string", length=200, nullable=true)
     */
    private $longitude;

    /**
     * @ORM\Column(type="string", length=200, nullable=true)
     */
    private $latitude;

    /**
     * @ORM\ManyToMany(targetEntity=Service::class, mappedBy="garageList")
     */
    private $serviceList;

    /**
     * @ORM\OneToMany(targetEntity=Appointment::class, mappedBy="garage")
     */
    private $appointmentList;

    public function __construct()
    {
        $this->serviceList = new ArrayCollection();
        $this->appointmentList = new ArrayCollection();
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

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getAdress(): ?string
    {
        return $this->adress;
    }

    public function setAdress(string $adress): self
    {
        $this->adress = $adress;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(string $phone): self
    {
        $this->phone = $phone;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getSchedule(): ?string
    {
        return $this->schedule;
    }

    public function setSchedule(string $schedule): self
    {
        $this->schedule = $schedule;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(?string $longitude): self
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(?string $latitude): self
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * @return Collection|Service[]
     */
    public function getServiceList(): Collection
    {
        return $this->serviceList;
    }

    public function addServiceList(Service $serviceList): self
    {
        if (!$this->serviceList->contains($serviceList)) {
            $this->serviceList[] = $serviceList;
            $serviceList->addGarageList($this);
        }

        return $this;
    }

    public function removeServiceList(Service $serviceList): self
    {
        if ($this->serviceList->removeElement($serviceList)) {
            $serviceList->removeGarageList($this);
        }

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
            $appointmentList->setGarage($this);
        }

        return $this;
    }

    public function removeAppointmentList(Appointment $appointmentList): self
    {
        if ($this->appointmentList->removeElement($appointmentList)) {
            // set the owning side to null (unless already changed)
            if ($appointmentList->getGarage() === $this) {
                $appointmentList->setGarage(null);
            }
        }

        return $this;
    }
}
