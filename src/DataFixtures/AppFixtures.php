<?php

namespace App\DataFixtures;

use DateTime;
use App\Entity\Car;
use App\Entity\User;
use App\Entity\CarBrand;
use App\Entity\CarStandardPart;
use App\Entity\AbstractCarStandardPart;
use App\Entity\CarPart;
use App\Entity\CarPartMaintenance;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use App\Repository\CarStandardPartRepository;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $userPasswordHasher;
    private CarStandardPartRepository $carStandardPartRepository;

    /**
     * Password encoder 
     *
     * @param UserPasswordHasherInterface $encoder
     */
    public function __construct(UserPasswordHasherInterface $userPasswordHasher, CarStandardPartRepository $carStandardPartRepository)
    {
        $this->userPasswordHasher = $userPasswordHasher;
        $this->carStandardPartRepository = $carStandardPartRepository;
    }

    public function load(ObjectManager $manager): void
    {

        //max_duration
        $data = [
            'brandList' => ['Audi', 'BMW', 'Citroën', 'Mercedes', 'Peugeot', 'Renault'],
            'carStandardPart' => [
                // OK 
                'pneus avants' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['PRIMARY'],
                    'max_distance' => 50000,
                    'max_duration' => 3650,
                    'price_min' => 120,
                    'price_max' => 200
                ],
                // OK
                'pneus arrières' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['PRIMARY'],
                    'max_distance' => 50000,
                    'max_duration' => 3650,
                    'price_min' => 120,
                    'price_max' => 200
                ],
                // OK
                'freins' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['PRIMARY'],
                    'max_distance' => 70000,
                    'price_min' => 150,
                    'price_max' => 200
                ],
                // OK
                'courroie de distribution' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['PRIMARY'],
                    'max_distance' => 100000,
                    'max_duration' => 1825,
                    'price_min' => 400,
                    'price_max' => 600
                ],
                // OK
                'filtre à air' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['SECONDARY'],
                    'max_distance' => 20000,
                    'max_duration' => 360,
                    'price_min' => 20,
                    'price_max' => 40
                ],
                // OK
                'filtre à carburant' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['SECONDARY'],
                    'max_distance' => 30000,
                    'price_min' => 30,
                    'price_max' => 60
                ],
                // OK
                'filtre à huile' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['SECONDARY'],
                    'max_distance' => 20000,
                    'max_duration' => 360,
                    'price_min' => 20,
                    'price_max' => 40
                ],
                // OK
                'filtre déshydratant' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['SECONDARY'],
                    'max_duration' => 720,
                    'price_min' => 30,
                    'price_max' => 70
                ],
                // OK 
                'vidange' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['MAINTENANCE'],
                    'max_distance' => 20000,
                    'max_duration' => 365,
                    'price_min' => 50,
                    'price_max' => 150
                ],
                // OK 
                'controle technique' => [
                    'importance' =>  AbstractCarStandardPart::IMPORTANCE_ID['MAINTENANCE'],
                    'max_duration' => 730,
                    'price_min' => 70,
                    'price_max' => 80
                ],
            ],
            // 'vehicles' => [
            //     [
            //         'user' => [
            //             'name' => 'Jean Claude',
            //             'phone' => '06 00 00 00 11',
            //             'mail' => 'jc.vd@mail.com',
            //             'password' => '1234'
            //         ],
            //         'name' => 'Porsh carrera',
            //         'fuel_type' => Car::FUEL_TYPE_ID['DIESEL'],
            //         'registration' => '455-SF-45',
            //         'driving_style' => Car::DRIVING_STYLE_ID['SPORTIVE'],
            //     ],
            //     [
            //         'user' => [
            //             'name' => 'Le mec',
            //             'phone' => '06 00 00 00 22',
            //             'mail' => 'lemec.sympa@mail.com',
            //             'password' => '1234'
            //         ],
            //         'name' => 'Citroen C3',
            //         'fuel_type' => Car::FUEL_TYPE_ID['ESCENCE'],
            //         'registration' => '686-KJ-78',
            //         'driving_style' => Car::DRIVING_STYLE_ID['NEUTRAL'],
            //     ],
            //     [
            //         'user' => [
            //             'name' => 'Le gars',
            //             'phone' => '06 00 00 00 77',
            //             'mail' => 'legars.vener@mail.com',
            //             'password' => '1234'
            //         ],
            //         'name' => 'Ford Couga',
            //         'fuel_type' => Car::FUEL_TYPE_ID['HYBRID'],
            //         'registration' => '123-GM-98',
            //         'driving_style' => Car::DRIVING_STYLE_ID['SPORTIVE'],
            //     ],
            //     [
            //         'user' => [
            //             'name' => 'Usain',
            //             'phone' => '06 00 00 00 55',
            //             'mail' => 'usain.bolt@mail.com',
            //             'password' => '1234'
            //         ],
            //         'name' => 'Renault Picaso',
            //         'fuel_type' => Car::FUEL_TYPE_ID['ESCENCE'],
            //         'registration' => '654-ML-18',
            //         'driving_style' => Car::DRIVING_STYLE_ID['SPORTIVE'],
            //     ]
            // ]
        ];

        // Creation of all vehicle brands
        $carBrand = [];
        foreach ($data['brandList'] as $brandName) {
            $carBrand[$brandName] = new CarBrand();
            $carBrand[$brandName]->setName($brandName);
            $manager->persist($carBrand[$brandName]);
        }


        // Creation of all vehicle type part
        foreach ($data['carStandardPart'] as $carStandardPartName => $carStandardPartData) {
            $carStandardPartList[$carStandardPartName] = new CarStandardPart();
            $carStandardPartList[$carStandardPartName]
                ->setName($carStandardPartName)
                ->setImportance($carStandardPartData['importance'])
                ->setPriceMin($carStandardPartData['price_min'])
                ->setPriceMax($carStandardPartData['price_min']);

            if (isset($carStandardPartData['max_distance'])) {
                $carStandardPartList[$carStandardPartName]->setCalculDurationChoice(AbstractCarStandardPart::CALCUL_DURATION_CHOICE_ID['MILEAGE']);
                $carStandardPartList[$carStandardPartName]->setMaxDistance($carStandardPartData['max_distance']);
            } else if (isset($carStandardPartData['max_duration'])) {
                $carStandardPartList[$carStandardPartName]->setCalculDurationChoice(AbstractCarStandardPart::CALCUL_DURATION_CHOICE_ID['DURATION']);
                $carStandardPartList[$carStandardPartName]->setMaxDuration($carStandardPartData['max_duration']);
            }
            $manager->persist($carStandardPartList[$carStandardPartName]);
        }


        // // Vehicle + Vehicle Part (f° of vehicleType)
        // foreach ($data['vehicles'] as $carData) {
        //     $car = new Car();
        //     $car->setName($carData['name'])
        //         ->setDateReleased((new DateTime())->modify('-' . mt_rand(45, 650) . ' day'))
        //         ->setMileageGlobale(mt_rand(1000, 350000))
        //         ->setMileageMensual(mt_rand(50, 1000))
        //         ->setFuelType($carData['fuel_type'])
        //         ->setRegistration($carData['registration'])
        //         ->setDrivingStyle($carData['driving_style'])
        //         ->setCarBrand($carBrand[array_rand($carBrand)])
        //         ->setColorId(['#1b51cf', '#cf753e', '#9c4489'][array_rand(['#1b51cf', '#cf753e', '#9c4489'])])
        //         ->setModelType(Car::MODEL_TYPE_ID[array_rand(Car::MODEL_TYPE_ID)]);

        //     $user = new User();
        //     $user
        //         ->setEmail($carData['user']['mail'])
        //         ->setName($carData['user']['name'])
        //         ->setPhone($carData['user']['phone'])
        //         ->setPassword($this->userPasswordHasher->hashPassword($user, $carData['user']['password']))
        //         ->setNotification((bool)rand(0, 1))
        //         ->addCar($car);

        //     $manager->persist($user);

        //     // Create all vehicle Part for this user 
        //     foreach ($carStandardPartList as $carStandardPart) {
        //         $carPart = new CarPart();
        //         $carPart->setCarStandardPart($carStandardPart);
        //         $carPart->setName($carStandardPart->getName());
        //         $carPart->setImportance($carStandardPart->getImportance());
        //         $carPart->setMaxDuration($carStandardPart->getMaxDuration());
        //         $carPart->setMaxDistance($carStandardPart->getMaxDistance());
        //         $carPart->setCalculDurationChoice($carStandardPart->getCalculDurationChoice());
        //         $carPart->setNotification(true);
        //         $car->addCarPart($carPart);

        //         for ($i = 0; $i <= mt_rand(0, 3); $i++) {

        //             $carPartMaintenance = new CarPartMaintenance();
        //             $carPartMaintenance->setCarPart($carPart);
        //             if ($carStandardPart->getCalculDurationChoice() === AbstractCarStandardPart::CALCUL_DURATION_CHOICE_ID['MILEAGE']) {
        //                 $carPartMaintenance->setMileage(mt_rand(1000, 350000));
        //             }
        //             $carPartMaintenance->setDateLastChange($this->randomDateInRange($car->getDateReleased(), new DateTime));

        //             $minDateOfFutureChange = null;
        //             $currentDateOfFutureChange = $carPart->getUpdateFutureChange($carPartMaintenance);
        //             if (is_null($minDateOfFutureChange) || $currentDateOfFutureChange < $minDateOfFutureChange) {
        //                 $minDateOfFutureChange = $currentDateOfFutureChange;
        //             }

        //             $manager->persist($carPartMaintenance);
        //         }

        //         $carPart->setFutureChangeDate($minDateOfFutureChange);

        //         $manager->persist($carPart);
        //     }
        //     $manager->persist($car);
        // }

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
