# Readme image generator

![Problème temporaire, veuillez recharger la page pour voir l'image](https://codiscovery-readme-header.herokuapp.com/api/actions/generate-image?titleColor=fydji&iconName=images&title=README%20Header%20Image&subtitleLine1=Générer%20une%20image%20à%20partir%20d'une%20URL&subtitleLine2=URL%20que%20vous%20pouvez%20mettre%20à%20jour%20directement%20dans%20ce%20README&technologies=Fastify,Canvas)

Pour présenter vos projets Github, utiliser un lien qui génère une image dans votre README

## Exemple

1 - Voici l'URL qui génère l'image ci-dessus :
`https://codiscovery-readme-header.herokuapp.com/api/actions/generate-image?titleColor=fydji&iconName=images&title=README%20Header%20Image&subtitleLine1=Générer%20une%20image%20à%20partir%20d'une%20URL&subtitleLine2=URL%20que%20vous%20pouvez%20mettre%20à%20jour%20directement%20dans%20ce%20README&technologies=Fastify,Canvas`

2 - Pour afficher une image dans le README il faut mettre : `![nom](URL)`

3 - On mixe l'URL et l'affichage de l'image : `![header](https://codiscovery-readme-header.herokuapp.com/api/actions/generate-image?titleColor=fydji&iconName=images&title=README%20Header%20Image&subtitleLine1=Générer%20une%20image%20à%20partir%20d'une%20URL&subtitleLine2=URL%20que%20vous%20pouvez%20mettre%20à%20jour%20directement%20dans%20ce%20README&technologies=Fastify,Canvas)`

## Utilisation

### API - GET

- Base URL : `https://codiscovery-readme-header.herokuapp.com`
- Route : `/api/actions/generate-image`

Paramètres d'URL (valeurs obligatoires) :

| Clé           |  Valeur                                                                                                                                                           | Possibilités                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| title         | Votre titre au format [d'URL encodée](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)                                    | `README%20Header%20Image`       |
| iconName      | [Nom de l'icône de Font awesome](https://fontawesome.com/search?m=free)                                                                                           | `dog` ou `cat`                  |
| titleColor    | Couleurs HTML séparés par des virgules sans espaces                                                                                                               | `red,orange`, `#FF0000,#FFA500` |
| technologies  | Chaînes de caractères séparés par des virgules au format [d'URL encodée](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/encodeURI) | `JavaScript`, `JavaScript,PHP`  |
| subtitleLine1 | Votre 1ère ligne de sous-titre au format [d'URL encodée](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)                 | `JavaScript`, `JavaScript,PHP`  |
| subtitleLine2 | Votre 2ème ligne de sous-titre au format [d'URL encodée](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)                 | `JavaScript`, `JavaScript,PHP`  |

## Installation

### Variables d'environnements

- `NODE_ENV`
- `PORT`
- `CLOUDINARY_APP_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `CLOUDINARY_BASE_URL`
- `IMAGE_WIDTH`
- `IMAGE_HEIGHT`

## Roadmap

- [ ] Add flag to show (or not) brand name

- [ ] Create tests
- [ ] Delete images that have been uploaded for the past n days (to let some space)
- [ ] Auto layout center text including icon
- [ ] Fixed layout sizes
- [ ] Fix: Random font only at startup. Try registering all fonts then randomize `ctx.font` call

## Changelog

### 0.1.0

- [x] Create TS type for config params
- [x] Upload image to Cloudinary

### 0.0.5

- [x] Caching
  - [x] Generate hash from parameters
  - [x] Save image name as hash (so it will reload it from cache)

### 0.0.4

- [x] Scale up for smooth render
- [x] Random gradient possibility (for demo purpose)
- [x] Random icon possibility (for demo purpose)
- [x] Configurable font name
- [x] Random font possibility

- [x] Fix: On heroku, custom font is not loaded

### 0.0.3

- [x] Generate icon from URL

### 0.0.2

- [x] Generate icon from Font Awesome
- [x] Add gradient to icon
- [x] Add gradient to title
- [x] Generate base layout (technology + title + subtitle)
- [x] Add rounded corner
- [x] Add custom font

### 0.0.1

- [x] Heroku set up
- [x] Generate base image with title

## Inspirations

Ce [tweet](https://twitter.com/ospfranco/status/1516658032784166912)
