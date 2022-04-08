Dossier
    →Fichier.js (Nom de la page sur Figma)
        →Route: back
    →Sous Dossier
        →Fichier.js (Nom de la page sur Figma)
            -Route: back

Implentation:

→pages
    →authentication
        →SplashScreen.js (Spash screen)
            Route:
        →InscriptionChoice.js (Choix inscription/connexion)
            Route:
        →Login.js (Connexion)
            Route:
        →Register.js (Inscription)
            Route:
        →Onboarding.js (Onboarding)
            Route:

    →carsCreation
        →PartsPrincipalInformation.js (Renseignements de pièces)
            Route:
        →CarsInformation.js (Renseignement du véhicule)
            Route:

    →homeMaintenance
        →Home.js (Home)
            Route:
        →MaintenanceBook.js (Carnet d'entretien)
            Route:
        →MaintenanceUpcoming.js (Entretiens à venir)
            Route:

    →part
        →DetailPart.js (Pièce détail)
            Route:
        X →CreatePart.js === Updatepart (Création de la pièce / entretien)
            Route:
        X →Updatepart.js (Modifier un entretien)
            Route:

    →maintenance
        →CompleteHistory.js (Historique complet)
            Route:
        →ListMaintenanceParts.js (Ajouter un changement - liste)
            Route:
        →UpdateMaintenance.js (Modifications détail)
            Route:

    →car
        →Car.js (Véhicules)
            Route:

→components

    // Composants avec des écrans dédiés sur Figma
    →FlashMessage.js (Bandeau infos/confirmation)
    →CarPartCard.js (Card de rensignement des piece)
    →PartsDetailsPopUp.js (Pop-up infos pièces)
    →PartsExplanation.js (Pop-up infos pièces)
    →InfoMessage.js (Pop-up info -> Plus qu'une étape)
    →AddMaintenance.js (Ajouter un changement)
    →SwitchCars.js (Switch)
    →AddCars.js (Ajout nouvelle voiture)

    // Composants sans écrans dédiés sur Figma
    →ArticlePreview.js
    →BlogPreview.js
    →ButtonIcon.js
    →CarPartPreview.js
    →CarSwitcher.js
    →CostEstimationPart.js
    →HeaderGotToBack.js
    →InvoicePreview.js
    →InvoicePreviewItem.js
    →MaintenanceHistory.js
    →MaintenanceHistoryItem.js
    →MaintenanceUpcomingPreview.js
    →NavBar.js
    →SpecialistRecommendation.js
    →UpdateCar.js


A voir a la fin:
→Blog
→Documents