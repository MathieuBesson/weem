<?php

namespace App\Entity;

use App\Repository\AppointmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=AppointmentRepository::class)
 */
class Appointment
{
    const STATUS_ID = [
        'WAITING_GARAGE_REPONSE' => 1,
        'WAITING_USER_REPONSE' => 2,
        'VALIDATE' => 3
    ];

    const FUEL_TYPE = [
        self::STATUS_ID['WAITING_GARAGE_REPONSE'] => [
            'LABEL' => 'en attente du garagiste'
        ],
        self::STATUS_ID['WAITING_USER_REPONSE'] => [
            'LABEL' => 'en attente de votre réponse'
        ],
        self::STATUS_ID['VALIDATE'] => [
            'LABEL' => 'validé'
        ]
    ]; 

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $costEstimate;

    /**
     * @ORM\Column(type="integer")
     */
    private $status;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $results;

    /**
     * @ORM\ManyToMany(targetEntity=Service::class, mappedBy="appointmentList")
     */
    private $serviceList;

    /**
     * @ORM\ManyToOne(targetEntity=Garage::class, inversedBy="appointmentList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $garage;

    /**
     * @ORM\ManyToOne(targetEntity=Vehicle::class, inversedBy="appointmentList")
     * @ORM\JoinColumn(nullable=false)
     */
    private $vehicle;

    /**
     * @ORM\Column(type="datetime")
     */
    private $schedule;

    public function __construct()
    {
        $this->vehiclePartList = new ArrayCollection();
        $this->serviceList = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCostEstimate(): ?float
    {
        return $this->costEstimate;
    }

    public function setCostEstimate(?float $costEstimate): self
    {
        $this->costEstimate = $costEstimate;

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getResults(): ?string
    {
        return $this->results;
    }

    public function setResults(?string $results): self
    {
        $this->results = $results;

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
            $serviceList->addAppointmentList($this);
        }

        return $this;
    }

    public function removeServiceList(Service $serviceList): self
    {
        if ($this->serviceList->removeElement($serviceList)) {
            $serviceList->removeAppointmentList($this);
        }

        return $this;
    }

    public function getGarage(): ?Garage
    {
        return $this->garage;
    }

    public function setGarage(?Garage $garage): self
    {
        $this->garage = $garage;

        return $this;
    }

    public function getVehicle(): ?Vehicle
    {
        return $this->vehicle;
    }

    public function setVehicle(?Vehicle $vehicle): self
    {
        $this->vehicle = $vehicle;

        return $this;
    }

    public function getSchedule(): ?\DateTimeInterface
    {
        return $this->schedule;
    }

    public function setSchedule(\DateTimeInterface $schedule): self
    {
        $this->schedule = $schedule;

        return $this;
    }
}
