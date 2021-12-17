<?php

namespace App\Entity;

use App\Repository\ServiceCategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ServiceCategoryRepository::class)
 */
class ServiceCategory
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
     * @ORM\OneToMany(targetEntity=Service::class, mappedBy="serviceCategory")
     */
    private $serviceList;

    public function __construct()
    {
        $this->serviceList = new ArrayCollection();
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
            $serviceList->setServiceCategory($this);
        }

        return $this;
    }

    public function removeServiceList(Service $serviceList): self
    {
        if ($this->serviceList->removeElement($serviceList)) {
            // set the owning side to null (unless already changed)
            if ($serviceList->getServiceCategory() === $this) {
                $serviceList->setServiceCategory(null);
            }
        }

        return $this;
    }
}
