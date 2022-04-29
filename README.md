# Readme image generator

![header](https://codiscovery-readme-header.herokuapp.com/api/actions/generate-image?titleColor=random&iconName=images&title=README%20Header%20Image&subtitleLine1=This%20image%20will%20be%20regenerated%20on%20every%20refresh.%20Try%20it%20!&subtitleLine2=Cette%20image%20sera%20regénérée%20à%20chaque%20chargement.%20Essaye%20!&technologies=Fastify,Canvas&fontName=random)

Pour présenter vos projets Github, utiliser un lien qui génère une image dans votre README

## Exemples

## Utilisation

## Installation

### Variables d'environnements

- `NODE_ENV`
- `PORT`
- `CLOUDINARY_APP_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Roadmap

- [ ] Create tests
- [ ] Delete images that have been uploaded for the past n days (to let some space)
- [ ] Create TS type for config params
- [ ] Auto layout center text including icon
- [ ] Add flag to show (or not) brand name
- [ ] Fixed layout sizes
- [ ] Fix: Random font only at startup. Try registering all fonts then randomize `ctx.font` call

## Changelog

### 0.1.0

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
