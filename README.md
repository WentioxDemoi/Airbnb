# Casa Azur

Site de présentation et de demandes de réservation pour deux locations sur la
Côte d’Azur : un appartement à Nice Centre et une villa à Roquefort-les-Pins.
Le site est multilingue (français, anglais, italien, espagnol et allemand),
affiche les activités de la région et permet d’envoyer une demande de séjour.

Les disponibilités du calendrier sont lues depuis les flux iCal Airbnb via
deux Cloudflare Workers, un par logement. Les demandes sont envoyées par
Formspree ; elles restent à confirmer par le propriétaire.

## Organisation

- [`airbnb-site/`](./airbnb-site/) : application React, TypeScript et Vite.
  `src/pages` contient les pages, `src/components` les composants, `src/data`
  les données des logements et activités, et `public` les images et traductions.
- [`airbnb-site/worker/`](./airbnb-site/worker/) : code partagé et configurations
  Cloudflare pour les Workers Nice et Roquefort.
- [`.github/workflows/`](./.github/workflows/) : automatisation du déploiement
  sur GitHub Pages.
- [`AI-Context/`](./AI-Context/) : contexte et documentation du projet.

## Développement

```sh
cd airbnb-site
npm ci
npm run dev
```

Vérifications et compilation :

```sh
npm run lint
npm run build
```

La configuration locale se fait dans `airbnb-site/.env.local`. Ne pas y mettre
les URL privées iCal Airbnb ni publier de secrets. Pour configurer ou déployer
les Workers, consulter le [guide Cloudflare](./airbnb-site/worker/README.md).
