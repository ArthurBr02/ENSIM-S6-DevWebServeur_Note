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

## Tests
Des tests d'API on été effectués sur les routes des API user, rhum et ingredient.

Pour les lancer, exécuter:
```bash
npm test
```

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