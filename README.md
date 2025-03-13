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

## Routes

Pour les routes ayant un impact sur la base de données, la gestion des codes erreur est faite via le fichier *src/core/utils.js*

### POST /api/v1/user/register
Permet de créer un utilisateur.
Données à envoyer en format x-www-form-urlencoded:
- email
- password
- firstname
- lastname


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

### POST /api/v1/ingredient
Permet de créer un ingrédient.
Nécessite un token dans le header Authorization.

Filtres optionnels en query params: 
- name
- type
- limit (défaut: 10)
- page (défaut: 1)

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