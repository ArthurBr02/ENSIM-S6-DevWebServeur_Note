# ENSIM-S6-DevWebServeur_Note
### Projet de développement web serveur pour l'ENSIM en S6
### Arthur BRATIGNY

URL de l'énoncé du TP: https://umtice.univ-lemans.fr/mod/page/view.php?id=325836

Pour démarrer le serveur, faire:
```bash
npm install
npm start
```

Pour démarrer le serveur en mode développement, faire:
```bash
npm install
npm run dev
```

Pour démarrer les tests, faire:
```bash
npm install
npm test
```

Copier le .env.exemple en .env
Dans le fichier .env configurer les différentes variables d'environnement.

## Dépendances
Le projet utilise les dépendances suivantes :

### Dépendances de production 
- axios : ^1.8.3
- bcrypt : ^5.1.1
- body-parser : ^1.20.3
- cors : ^2.8.5
- debug : ^4.4.0
- dotenv : ^16.4.7
- express : ^4.21.2
- jsonwebtoken : ^9.0.2
- mongoose : ^8.9.5
- nodemon : ^3.1.9
- swagger-ui-express : ^5.0.1

### Dépendances de développement
- autoprefixer : ^10.4.21
- cross-env : ^7.0.3
- jest : ^29.7.0
- supertest : ^7.0.0
- tailwindcss : ^3.4.17

## Tests
Des tests d'API on été effectués sur les routes des API user, rhum et ingredient.

Pour les lancer, exécuter:
```bash
npm test
```

## Déploiement
URL pour tester l'API déployée: http://146.59.150.89:3000/api-docs/#/

Pour procéder au déploiement, il faut:
- Installer Node.js
- Cloner le projet
- Installer les dépendances avec la commande `npm install`
- Lancer le serveur avec la commande `npm start` (je l'ai lancé dans un screen pour qu'il fonctionne en arrière plan)
- Ouvrir le port 3000 sur le serveur pour que l'API soit accessible

## Routes

Pour les routes ayant un impact sur la base de données, la gestion des codes erreur est faite via le fichier *src/core/utils.js*

### Swagger
Le swagger est accessible sur la route suivante: /api-docs

### POST /api/v1/user/register
Permet de créer un utilisateur.

À l'aide des données de localisation, on va récupérer la latitude et la longitude de l'adresse de l'utilisateur.

Données à envoyer en format x-www-form-urlencoded:
- email
- password
- firstname
- lastname
- street
- city
- postalCode


### POST /api/v1/user/login
Permet de connecter un utilisateur.

Retourne un objet contenant un token.

Données à envoyer en format x-www-form-urlencoded:
- email
- password

### GET /api/v1/user/me
Permet de récupérer les informations de l'utilisateur connecté.

Nécessite un token dans le header Authorization.

### GET /api/v1/ingredient
Permet de récupérer la liste des ingrédients.

Nécessite un token dans le header Authorization.

Filtres optionnels en query params:
- name
- type
- limit (défaut: 10)
- page (défaut: 1)

### GET /api/v1/ingredient/around
Permet de récupérer la liste des ingrédients autour de l'utilisateur connecté.

Si pas de données de localisation pour l'utilisateur, on renvoie tous les ingrédients.

Nécessite un token dans le header Authorization.

Filtres optionnels en query params:
- name
- type

### POST /api/v1/ingredient
Permet de créer un ingrédient.

Nécessite un token dans le header Authorization.

À l'aide des données de localisation, on va récupérer la latitude et la longitude de l'adresse de l'ingrédient.

Données à envoyer en format x-www-form-urlencoded:
- name
- type
- price
- street
- city
- postalCode

### GET /api/v1/rhum
Permet de récupérer la liste des rhums.

Nécessite un token dans le header Authorization.

Filtres optionnels en query params:
- name
- type
- pays
- volume
- degre
- distillerie
- categories
- embouteilleur
- limit (défaut: 10)
- page (défaut: 1)

### POST /api/v1/recette
Permet de créer une recette.

Nécessite un token dans le header Authorization.

Contenu du DTO à envoyer en format x-www-form-urlencoded:
- id du rhum à ajouter
- une liste d'id d'ingrédients
- un nom de recette
- un champ d'instructions
- un booléen pour indiquer si la recette est privée ou publique

### GET /api/v1/recette
Permet de récupérer la liste des recettes publiques.

Nécessite un token dans le header Authorization.

Filtres optionnels en query params:
- name
- limit (défaut: 10)
- page (défaut: 1)

### GET /api/v1/recette/me
Permet de récupérer la liste des recettes de l'utilisateur connecté.

Nécessite un token dans le header Authorization.

Filtres optionnels en query params:
- name
- limit (défaut: 10)
- page (défaut: 1)

### PUT /api/v1/recette/:id
Permet de modifier une recette.

Nécessite un token dans le header Authorization.

Contenu du DTO à envoyer en format x-www-form-urlencoded:
- id du rhum à ajouter
- une liste d'id d'ingrédients
- un nom de recette
- un champ d'instructions
- un booléen pour indiquer si la recette est privée ou publique

### GET /api/v1/global/search
Permet de rechercher des ingrédients, rhums et recettes par nom avec autocomplétion.

Nécessite un token dans le header Authorization.

Paramètre en query params:
- name