<?php

// src/Command/CreateUserCommand.php
namespace App\Command;

use App\Repository\CarPartRepository;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SendMercureNotification extends Command
{
    protected static $defaultName = 'app:send-mercure-notification';

    private CarPartRepository $carPartRepository;

    public function __construct(
        CarPartRepository $carPartRepository
    ) {
        parent::__construct();
        $this->carPartRepository = $carPartRepository;
    }

    protected function configure(): void
    {
        $this->setDescription("Send notification of piece maintenance at all users");
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $carParts = $this->carPartRepository->findAllWithTimeToChange();

        dd($carParts);

        // Si la date de changement dans 1 mois dans 20 jours 10 jours

        // On fait un tableau de pièces à changer pour chaque user que l'on scan user_id => [carPartName, durée]

        // On scan le tableau et sur chaque topic de chaque user on push 
        // => Rapport de vos pièces à changer : pneu avant droit (2 mois)... (limite 160caractères)

        // 

        return Command::SUCCESS;
    }
}
