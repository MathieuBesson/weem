<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\User;
use App\Entity\Garage;
use App\Entity\Service;
use App\Entity\Vehicle;
use App\Entity\Appointment;
use App\Entity\VehiclePart;
use App\Entity\VehicleType;
use App\Entity\VehicleBrand;
use App\Entity\ServiceCategory;
use App\Entity\VehicleTypePart;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $userPasswordHasher;

    /**
     * Password encoder 
     *
     * @param UserPasswordHasherInterface $encoder
     */
    public function __construct(UserPasswordHasherInterface $userPasswordHasher)
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $data = [
            'brands' => ['Audi', 'BMW', 'Citroën', 'Mercedes', 'Peugeot', 'Renault'],
            'vehicule_type' => ['voiture'],
            'services' => [
                'pneumatique' => [
                    'pneus avants' => [
                        'pneus avants' => [
                            'importance' =>  VehicleTypePart::IMPORTANCE_ID['PRIMARY'],
                            'max_distance' => 6000,
                            'price_min' => 50,
                            'price_max' => 200
                        ],
                    ],
                    'pneus arrières' => [
                        'pneus arrières' => [
                            'importance' =>  VehicleTypePart::IMPORTANCE_ID['PRIMARY'],
                            'max_distance' => 4000,
                            'price_min' => 50,
                            'price_max' => 200
                        ],
                    ]
                ],
                'vidange et révision' => [
                    'vidange' => [
                        'vidange' => [
                            'importance' =>  VehicleTypePart::IMPORTANCE_ID['MAINTENANCE'],
                            'max_distance' => 9000,
                            'price_min' => 50,
                            'price_max' => 200
                        ],
                    ],
                    'revision' => [
                        'revision' => [
                            'importance' =>  VehicleTypePart::IMPORTANCE_ID['MAINTENANCE'],
                            'max_duration' => 1440,
                            'price_min' => 50,
                            'price_max' => 200
                        ]
                    ]
                ],
                'batterie' => [
                    'batterie' => []
                ],
                'climatisation' => [
                    'climatisation' => []
                ],
                'amortisseurs et liaisons au sol' => [
                    'amortisseurs' => [],
                    'liaisons au sol' => [],
                ],
                'echappement et dépollution' => [
                    'echappement' => [],
                    'dépollution' => []
                ],
            ],
            'garages' => [
                [
                    'name' => 'Chez Michel',
                    'type' => 'Indépendant',
                    'city' => 'Paris',
                    'adress' => '3 rue des Tulipes',
                    'phone' => '06 00 00 00 00',
                    'mail' => 'mail@mail.com',
                    'longitude' => '2.295028',
                    'latitude' => '2.295028',
                    'schedule' => '{
                        "lundi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mardi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mercredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "jeudi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "vendredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "samedi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {}},
                    }'
                ],
                [
                    'name' => 'Renault car Rennes',
                    'type' => 'Renault Concessions',
                    'city' => 'Rennes',
                    'adress' => '9 rue des Jonquilles',
                    'phone' => '06 01 01 01 01',
                    'mail' => 'mail@oloal.com',
                    'longitude' => '2.295028',
                    'latitude' => '2.295028',
                    'schedule' => '{
                        "lundi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mardi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mercredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "jeudi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "vendredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "samedi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {}},
                    }'
                ],
                [
                    'name' => 'Citroen car Rennes',
                    'type' => 'Citroen Concessions',
                    'city' => 'Marseille',
                    'adress' => '15 rue des Fraises',
                    'phone' => '06 02 02 02 02',
                    'mail' => 'mail@wcxvxc.com',
                    'longitude' => '2.295028',
                    'latitude' => '2.295028',
                    'schedule' => '{
                        "lundi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mardi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mercredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "jeudi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "vendredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "samedi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {}},
                    }'
                ],
                [
                    'name' => 'Porsche car Rennes',
                    'type' => 'Porsche Concessions',
                    'city' => 'Lens',
                    'adress' => '45 rue des Marmites',
                    'phone' => '06 03 03 03 03',
                    'mail' => 'jkh@gk.com',
                    'longitude' => '2.295028',
                    'latitude' => '2.295028',
                    'schedule' => '{
                        "lundi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mardi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "mercredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "jeudi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "vendredi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {"debut": "09:26:00", "fin": "12:15:00"}},
                        "samedi": {"matin": {"debut": "09:26:00","fin": "12:15:00"},"après-midi": {}},
                    }'
                ],
            ],
            'vehicles' => [
                [
                    'user' => [
                        'first_name' => 'Jean Claude',
                        'last_name' => 'Vandame',
                        'phone' => '06 00 00 00 11',
                        'mail' => 'jc.vd@mail.com',
                        'password' => '1234'
                    ],
                    'name' => 'Porsh carrera',
                    'fuel_type' => Vehicle::FUEL_TYPE_ID['DIESEL'],
                    'registration' => '455-SF-45',
                    'driving_style' => Vehicle::DRIVING_STYLE_ID['AGRESSIVE'],
                    'appointments' => [
                        [
                            'status' => Appointment::STATUS_ID['WAITING_GARAGE_REPONSE'],
                            'schedule' => new DateTime('+45 days')
                        ],
                        [
                            'status' => Appointment::STATUS_ID['VALIDATE'],
                            'schedule' => (new DateTime())->modify('+15 day')
                        ]
                    ]
                ],
                [
                    'user' => [
                        'first_name' => 'Le mec',
                        'last_name' => 'Sympa',
                        'phone' => '06 00 00 00 22',
                        'mail' => 'lemec.sympa@mail.com',
                        'password' => '1234'
                    ],
                    'name' => 'Citroen C3',
                    'fuel_type' => Vehicle::FUEL_TYPE_ID['ESCENCE'],
                    'registration' => '686-KJ-78',
                    'driving_style' => Vehicle::DRIVING_STYLE_ID['MODERATE'],
                    'appointments' => [
                        [
                            'status' => Appointment::STATUS_ID['WAITING_USER_REPONSE'],
                            'schedule' => new DateTime('+25 days')
                        ],
                        [
                            'status' => Appointment::STATUS_ID['WAITING_GARAGE_REPONSE'],
                            'schedule' => (new DateTime())->modify('+45 day')
                        ]
                    ]
                ],
                [
                    'user' => [
                        'first_name' => 'Le gars',
                        'last_name' => 'Vener',
                        'phone' => '06 00 00 00 77',
                        'mail' => 'legars.vener@mail.com',
                        'password' => '1234'
                    ],
                    'name' => 'Ford Couga',
                    'fuel_type' => Vehicle::FUEL_TYPE_ID['HYBRID'],
                    'registration' => '123-GM-98',
                    'driving_style' => Vehicle::DRIVING_STYLE_ID['SPORTIF'],
                    'appointments' => [
                        [
                            'status' => Appointment::STATUS_ID['VALIDATE'],
                            'schedule' => new DateTime('+12 days')
                        ],
                        [
                            'status' => Appointment::STATUS_ID['WAITING_USER_REPONSE'],
                            'schedule' => (new DateTime())->modify('+28 day')
                        ]
                    ]
                ],
                [
                    'user' => [
                        'first_name' => 'Usain',
                        'last_name' => 'Bolt',
                        'phone' => '06 00 00 00 55',
                        'mail' => 'usain.bolt@mail.com',
                        'password' => '1234'
                    ],
                    'name' => 'Renault Picaso',
                    'fuel_type' => Vehicle::FUEL_TYPE_ID['ESCENCE'],
                    'registration' => '654-ML-18',
                    'driving_style' => Vehicle::DRIVING_STYLE_ID['AGRESSIVE'],
                    'appointments' => []
                ]
            ]
        ];


        // Creation of all vehicle brands
        foreach ($data['brands'] as $brandName) {
            $vehicleBrand[$brandName] = new VehicleBrand();
            $vehicleBrand[$brandName]->setName($brandName);
            $manager->persist($vehicleBrand[$brandName]);
        }

        $vehicleType = [];
        // Creation of all vehicle types
        foreach ($data['vehicule_type'] as $vehicleTypeName) {
            $vehicleType[$vehicleTypeName] = new VehicleType();
            $vehicleType[$vehicleTypeName]->setName($vehicleTypeName);
            $manager->persist($vehicleType[$vehicleTypeName]);
        }


        $serviceList = [];
        // Creation of all categories services
        foreach ($data['services'] as $serviceCategoryName => $serviceData) {

            $serviceCategory = new ServiceCategory();
            $serviceCategory->setName($serviceCategoryName);

            // Creation of all services
            foreach ($serviceData as $serviceName => $vehicleTypePartList) {
                $service = new Service();
                $service->setName($serviceName);
                $manager->persist($service);

                // Creation of all vehicle type part
                foreach ($vehicleTypePartList as $vehicleTypeName => $vehicleTypeData) {
                    $vehicleTypePart = new VehicleTypePart();
                    $vehicleTypePart->setName($vehicleTypeName)
                        ->setImportance($vehicleTypeData['importance'])
                        ->setPriceMin($vehicleTypeData['price_min'])
                        ->setPriceMax($vehicleTypeData['price_max'])
                        ->addVehicleTypeList($vehicleType['voiture'])
                        ->setService($service);

                    if (isset($vehicleTypeData['max_distance'])) {
                        $vehicleTypePart->setCalculDurationChoice(VehicleTypePart::CALCUL_DURATION_CHOICE_ID['MILEAGE']);
                        $vehicleTypePart->setMaxDistance($vehicleTypeData['max_distance']);
                    } else if (isset($vehicleTypeData['max_duration'])) {
                        $vehicleTypePart->setCalculDurationChoice(VehicleTypePart::CALCUL_DURATION_CHOICE_ID['DURATION']);
                        $vehicleTypePart->setMaxDuration($vehicleTypeData['max_duration']);
                    }

                    $manager->persist($vehicleTypePart);
                }

                $serviceCategory->addServiceList($service);

                $serviceList[] = $service;
            }

            $manager->persist($serviceCategory);
        }


        // Garages + link to 2 services random  
        foreach ($data['garages'] as $garageData) {
            $garageList[$garageData['name']] = new Garage();
            $garageList[$garageData['name']]
                ->setName($garageData['name'])
                ->setType($garageData['type'])
                ->setSchedule($garageData['schedule'])
                ->setCity($garageData['city'])
                ->setAdress($garageData['adress'])
                ->setPhone($garageData['phone'])
                ->setMail($garageData['mail'])
                ->setLongitude($garageData['longitude'])
                ->setLatitude($garageData['latitude']);

            $randServiceId = [];
            for ($i = 0; $i < 2; $i++) {
                $randValue = mt_rand(0, count($serviceList) - 1);
                if (!in_array($randValue, $randServiceId)) {
                    $garageList[$garageData['name']]->addServiceList($serviceList[$randValue]);
                }
            }

            $manager->persist($garageList[$garageData['name']]);
        }

        // Vehicle + Vehicle Part (f° of vehicleType)
        foreach ($data['vehicles'] as $vehicleData) {
            $vehicle = new Vehicle();
            $vehicle->setName($vehicleData['name'])
                ->setDateReleased((new DateTime())->modify('-' . mt_rand(45, 650) . ' day'))
                ->setMileageGlobale(mt_rand(1000, 350000))
                ->setMileageMensual(mt_rand(50, 1000))
                ->setFuelType($vehicleData['fuel_type'])
                ->setRegistration($vehicleData['registration'])
                ->setDrivingStyle($vehicleData['driving_style'])
                ->setVehicleType($vehicleType['voiture'])
                ->setVehicleBrand($vehicleBrand[array_rand($vehicleBrand)]);

            $user = new User();
            $user
                ->setEmail($vehicleData['user']['mail'])
                ->setFirstName($vehicleData['user']['first_name'])
                ->setLastName($vehicleData['user']['last_name'])
                ->setPhone($vehicleData['user']['phone'])
                ->setPassword($this->userPasswordHasher->hashPassword($user, $vehicleData['user']['password']))
                ->addVehicleList($vehicle);

            $manager->persist($user);

            // Create all vehicle Part for this user 
            foreach ($vehicle->getVehicleType()->getVehicleTypePartList() as $vehicleTypePart) {
                $vehiclePart = new VehiclePart();
                $vehiclePart->setVehicleTypePart($vehicleTypePart);

                if ($vehicleTypePart->getCalculDurationChoice() === VehicleTypePart::CALCUL_DURATION_CHOICE_ID['MILEAGE']) {
                    $vehiclePart->setMileage(mt_rand(1000, 350000));
                } elseif ($vehicleTypePart->getCalculDurationChoice() === VehicleTypePart::CALCUL_DURATION_CHOICE_ID['DURATION']) {
                    $vehiclePart->setDateLastChange($this->randomDateInRange($vehicle->getDateReleased(), new DateTime));
                }

                $vehicle->addVehiclePartList($vehiclePart);
                $manager->persist($vehiclePart);
            }

            $manager->persist($vehicle);
            // Create all appointments for this vehicle 
            // Appointments + link to random garage + this services 
            foreach ($vehicleData['appointments'] as $appointmentData) {

                $garageChoose = $garageList[array_rand($garageList)];
                $appointment = new Appointment();
                $appointment
                    ->setStatus($appointmentData['status'])
                    ->setSchedule($appointmentData['schedule'])
                    ->setGarage($garageChoose)
                    ->setVehicle($vehicle);

                $serviceList = $garageChoose->getServiceList();
                $numberOfService = mt_rand(0, count($serviceList) - 1);

                // Add service for this appointment
                for ($i = 0; $i < $numberOfService; $i++) {
                    $appointment->addServiceList($serviceList[mt_rand(0, count($serviceList) - 1)]);
                }
                $manager->persist($appointment);
            }
        }

        // Save all entities
        $manager->flush();
    }

    private function randomDateInRange(DateTime $start, DateTime $end)
    {
        $randomTimestamp = mt_rand($start->getTimestamp(), $end->getTimestamp());
        $randomDate = new DateTime();
        $randomDate->setTimestamp($randomTimestamp);
        return $randomDate;
    }
}
