# Readme image generator

![header](https://codiscovery-readme-header.herokuapp.com/api/actions/generate-image?titleColor=random&iconName=random&title=README%20Header%20Image&subtitleLine1=This%20image%20will%20be%20regenerated%20on%20every%20refresh.%20Try%20it%20!&subtitleLine2=Cette%20image%20sera%20regénérée%20à%20chaque%20chargement.%20Essaye%20!&technologies=Fastify,Canvas)

Pour présenter vos projets Github, utiliser un lien qui génère une image dans votre README

## Exemples

## Utilisation

## Roadmap

### 0.0.6

- [ ] Upload image to Cloudinary

### 0.0.5

- [ ] Caching
  - [ ] Generate hash from parameters
  - [ ] Save image name as hash (so it will reload it from cache)
- [ ] Auto layout center text including icon

### 0.0.4

- [x] Scale up for smooth render
- [x] Random gradient possibility (for demo purpose)
- [x] Random icon possibility (for demo purpose)
- [ ] Fix : On heroku, font is not loaded
- [x] Configurable font name
- [x] Random font possibility
- [ ] Add flag to show (or not) brand name (Codiscovery)
- [ ] Fixed layout sizes

## Changelog

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
