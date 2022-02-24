# Weem 🚘 

<p align="center">
Weem est une carnet d'entretien de vehicule en ligne pour les automobilistes ne s'y connaissant pas en mécanique. L'application Weem permet d'avoir un carnet d'entretien numérique et de prendre rendez-vous avec des garagistes directement dans l'application. Weem permet de regrouper sur une même plateforme l'état actuel de votre véhicule et la prise de rendez-vous avec un professionel dans une seule application qui se veut être l'écosystème lié à votre voiture au sein de votre téléphone.
</p>

## Stack technique

 - [PHP >= 7.4.2](https://www.php.net/)
 - [Apache >= 2.4.4](https://httpd.apache.org/docs/2.4/fr/)
 - [Composer >= 2.1.14](https://getcomposer.org/doc/)
 - [MariaDb >= 10.3.32](https://mariadb.com/kb/fr/documentation-de-mariadb/)
 - [Node >= 17.2.0](https://nodejs.org/en/docs/)
 - [Npm >= 8.1.4](https://nodejs.org/en/docs/)
 - [ReactJs](https://fr.reactjs.org/)
 - [Cordova](https://cordova.apache.org/)

## Présentation technique 

Le projet d'organise en 2 niveaux : 

- La partie backend composé de : 
    - D'une API créée avec le framework [Symfony](https://symfony.com/) ([PHP](https://www.php.net/)) associé au bundle [API Platform](https://api-platform.com/)
    - Et d'une BDD [MariaDb](https://mariadb.com/kb/fr/documentation-de-mariadb/) 

- La partie frontend composé de : 
    - Du framework ReactJS (https://fr.reactjs.org/)
    - 

- La partie mobile composé de : 
    - Du framework Capacitor (https://capacitorjs.com/)

## Lancement de la partie API Backend (2 choix possibles)

### 1. Avec le Makefile (en 1 commande)

Si vous n'avez pas make d'installé sur votre machine, vous pouvez le [télécharger ici](http://gnuwin32.sourceforge.net/packages/make.htm)

```shell
make start
```

### 2. En lancant les scripts à la main

- Ajout de toutes les dépendances du projet 
```bash
composer install 
```

- Création de la BDD 
```bash
php bin/console d:d:c 
## OU 
php bin/console doctrine:database:create
```

- Création des tables en BDD grâce aux migrations 
```bash
php bin/console d:m:m
## OU 
php bin/console doctrine:migration:migrate
```

- Création des données fictives ou fixtures 
```bash
php bin/console d:f:l
## OU 
php bin/console doctrine:fixtures:load
```


### Lancement du serveur de dev
- Démarrer le serveur sous windows : 
```bash
sudo php -S 0.0.0.0:80
## OU 
sudo php -S 0.0.0.0:80
```
- Ainsi l'API est disponible sur [localhost:8000](localhost:8000)

- Il est aussi possible de lancer un VirtualHost sous linux avec cette configuration : 

```apache
<VirtualHost *:80>
    ServerName weem.com
    ServerAlias www.weem.com

    DocumentRoot /var/www/sites/weem/public
    DirectoryIndex /index.php
    
    SetEnvIf Authorization "(.*)" HTTP_AUTHORIZATION=$1

    <Directory /var/www/sites/weem/public>
        AllowOverride None
        Order Allow,Deny
        Allow from All

        FallbackResource /index.php
    </Directory>

    <Directory var/www/sites/weem/public/bundles>
        DirectoryIndex disabled
        FallbackResource disabled
    </Directory>
    ErrorLog /var/log/apache2/project_error.log
    CustomLog /var/log/apache2/project_access.log combined
</VirtualHost>
```

- Il vous faudra modifier le fichier hosts de votre post en ajoutant : 

```bash
127.0.0.1 weem.com
```

- Ainsi l'API est disponible sur [weem.com/api](weem.com/api)  

## Makers 

- 💻 Developpeurs : 
    - [Jeff Labillois](https://github.com/Valknu-t)
    - [Mathieu Besson](https://github.com/MathieuBesson)
- 🔬🖌 UX/UI Designer : 
    - [Alexandre Kling](https://www.linkedin.com/in/alexandre-kling-964577187/)
- 📈 Marketing : 
    - [Lucas Recrosio](https://www.linkedin.com/in/lucas-recrosio-7b27bb1a2/)
    - [Thibault Bénard](https://www.linkedin.com/in/thibault-b%C3%A9nard-738842222/)