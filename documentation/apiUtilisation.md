# Documentation de l'API Weem 

## Introduction 

Toutes les constantes sont disponible sur la route /api/constantes

Ne pas oublier de remplir dans les headers : 
- Le Bearer Token (token de l'utilisateur), sauf sur la route de login_check (qui permet de le récupérer)
- Le Content-Type application/json pour avoir un retour json

Chaque récupération de donnée correspond aux données de l'utilisateur en cours 
Pour récupérer des pièces, changements (maintenance) il faut préciser la voiture sur laquel tu veux faire l'action (mise à jours, récupération, ajout...)

## Les routes de l'API (en fonction des écrans): 

### AU LANCEMENT DE L'APP : 

- [X] Route de récupération des constantes
	- GET /api/constantes
- [X] Si l'user connecté -> récupération des infos du premier véhicule 
	- GET /api/cars?count=1

### SE CONNECTER : 

- [X] Route de check_user -> username, password
	- POST /api/login_check
		- Body :

```json
{
	"username": "lemec.sympa@mail.com",
	"password": "1234"
}
```

### S'INSCRIRE : 

- [X] Route de création d'un utilisateur 
	- POST /api/users
		- Body : 
	
```json 
{
	"email": "sdfgsdfsdfsdf@mail.com",
	"password": "sDGS%5sssss",
	"name": "sdsdgsdsdsd",
	"phone": "+33602658475"
}
```

### CRÉATION D'UN VÉHICULE :

- [X] Récuperer la liste des marques
	- GET /api/car_brands
- [X] Route de création d'un véhicule : 
	- POST /api/cars
		- Nom du modèle
		- Date de mise en circualtion
		- Id du type de carburant 
		- Immatriculation
		- Id du style de conduite
		- Kilometrage globale
		- Kilometrage moyen mensuel
		- Id de la marque

```json
{
	"name": "C3 Model X",
	"dateReleased": "2021-10-27 15:19:25",
	"fuelType": 3,
	"registration": "455-SF-45",
	"drivingStyle": 3,
	"mileageGlobale": 130000,
	"mileageMensual": 481,
	"carBrand": "/api/car_brands/1"
}
```

- Les champs suivants sont optionnels et ne sont pas à renseigner sur cette écran
	- color
	- modelType 

### RENSEIGNEMENT D'UNE PIECE 

- [X] Récuperer la liste des pièces du client
	- GET /api/cart_part
- [X] Route d'ajout de changement de la pièce (Date de dernier changement ou kilometrage de la voiture)
	- POST /api/car_part_maintenances
```json
{
	"mileage": 150000,
	"carPart": "/api/car_parts/6"
}
```
   - Le champs suivant peut être utilisé à la place de **mileage** en fonction du choix de **calcul de durabilité** (km ou temps)
		- **dateLastChange**

- [X] Route de MAJ de la pièce -> La pièce est neuve 
	- PATCH /api/car_parts/{id}
```json
{
  "unused": true
}
```

### HOME

- [X] Récupération des infos de l'user
	- GET /api/users?count=1

- [X] Changement pour dark theme ou light theme 
	- PUT /api/users/{id}
```json
{
  "dark_theme": true
}
```
- [X] Récupération des 3 derniers entretiens à venir
	- GET /api/car_parts?car.id=2&count=3

- [ ] Récupération du dernier article de blog => Pour le moment données fictives (en dure)
- [ ] Récupération des 3 premiers entretiens sans factures => Pour le moment données fictives (en dure)


### CARNET D'ENTRETIEN 

- [X] Récupération des 4 derniers pièces à changer
	- GET /api/car_parts?car.id=2&count=3
- [X] Récupération des coûts à venir sur 1 an (entretiens à faire sur un an)
	- GET /api/car_parts?car.id=2&count=3
- [X] Récupération des 5 derniers changements sur le véhicule
	- GET /api/car_part_maintenances?carPart.car.id=2&count=5
- [X] Récupération du lien de dl du récap du carnet d'entretien -> Plus tard
	- Redirection vers /maintenance_summary/{carId} (avec les bon headers authorization avec le bearer token)

### HISTORIQUE COMPLET 

- [X] Récupération de l'historique complet des changements sur un véhicule
	-  GET /api/car_part_maintenances?carPart.car.id=2


### ENTRETIENS A VENIR

- [X] Récupération de la liste des pièces (trié par date de futur changement) + date de futur changement
	- GET /api/car_parts?car.id=2

### PIÈCE DETAIL

- [X] Récupération des infos sur une pièce + changements
	-GET /api/car_parts/{id} 

### MODIFICATION CHANGEMENT DÉTAIL

- [X] Récuprer les détails sur un changement
	- GET /api/car_part_maintenances/{id}
- [X] MAJ changement :
	   - date ou kilometrage sur le changement
	   - PATCH /api/car_part_maintenances/{id}
	   - Ne pas oublier le header content-type: application/merge-patch+json
	  
```json 
{
	"dateLastChange": "2021-12-22T20:00:42+00:00",
	"mileage": 152,
	"note": "Changement sans problèmes"
}
```
- [ ] Supprimer un document pour le changement -> Plus tard 
- [ ] Ajouter un document pour le changement -> Plus tard


### AJOUTER UN CHANGEMENT LISTE

- [X] Récuperer la liste des nom des pièce du véhicule 
	- GET /api/car_parts/

### CRÉER UNE PIÈCE PERSONNALISÉ

- [X] Création d'une pièce
	 - POST /api/car_parts

```json
{
	"name": "Nouvelle pièce",
	"maxDistance": 15,
	"calculDurationChoice": 2,
	"car": "/api/cars/6"
}
```
En fonction du choix fait sur calculDurationChoice il faut envoyer soit maxDistance (en km) soit maxDuration (en jours)

### MODIFIER UNE PIÈCE

- [X] Récupération des infos sur un pièce
	- GET  /api/car_parts/{id}
- [X] MAJ des infos sur une pièce
	- PATCH  /api/car_parts/{id}
```json
{
	"name": "Nouvelle pièce",
	"maxDistance": 15,
	"calculDurationChoice": 2,
}
```
En fonction du choix fait sur calculDurationChoice il faut envoyer soit maxDistance (en km) soit maxDuration (en jours)

### AJOUTER UN CHANGEMENT

- [X] Création d'un changement sur une pièce
	- POST /api/car_part_maintenances
 ```json
{
	"mileage": 2000,
	"dateLastChange": "2021-12-22T20:00:42+00:00",
	"carPart": "/api/car_parts/21",
	"note": "Changement sans problèmes"
}
```
En fonction du choix fait sur calculDurationChoice de la pièce il faut envoyer soit mileage (en km) ou non, le dateLastChange est lui obligatoire
		
		
### GESTION D'UN VÉHICULE

- [X] MAJ véhicule 
	- PATCH /api/cars/{id}
	- Ne pas oublier le header content-type: application/merge-patch+json
	  
```json
{
	"name": "Wtf la caisse de fou",
	"modelType": 1,
	"color": "#555555",
	"registration": "000-000-000",
	"dateReleased": "2022-02-09T18:08:26.751Z",
	"mileageGlobale": 150000,
	"mileageMensual": 1000,
	"fuelType": 1,
	"drivingStyle": 1,
	"carBrand": "/api/car_brands/1"
}
```
- [X] Récupération des données sur un véhicule
	- GET /api/cars/{id}
- [X] Récupération de la liste des véhicules de l'user
	- GET /api/cars 