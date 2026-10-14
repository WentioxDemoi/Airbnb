# React + TypeScript + Vite

## Réservations

Le site est hébergé sur GitHub Pages. Le calendrier lit uniquement les dates
occupées depuis un Cloudflare Worker ; l’URL iCal Airbnb reste dans un secret
Cloudflare et n’est jamais envoyée au navigateur. Les demandes sont envoyées
directement à Formspree.

### Déployer le calendrier iCal

1. Installer Wrangler ou utiliser `npx wrangler`, puis s’authentifier avec
   `npx wrangler login`.
2. Déployer séparément chaque Worker depuis son dossier, en utilisant le flux
   iCal correspondant à ce logement :

   ```sh
   cd airbnb-site/worker/nice
   npx wrangler secret put AIRBNB_ICAL_URL_NICE
   npx wrangler deploy

   cd ../roquefort
   npx wrangler secret put AIRBNB_ICAL_URL_ROQUEFORT
   npx wrangler deploy
   ```

   Coller le lien iCal uniquement dans l’invite interactive de Wrangler. Ne
   pas le mettre dans le code, dans une variable GitHub Actions, ni dans un
   fichier `.env` destiné au build du site.
3. Dans Formspree, créer un formulaire et configurer
   `nice.ruederussie@gmail.com` comme adresse destinataire des notifications.
   Copier l’identifiant du formulaire.
4. Dans les paramètres du dépôt GitHub, sous **Secrets and variables >
   Actions > Variables**, créer les variables suivantes :
   - `VITE_AVAILABILITYNICE_API_URL` : origine `workers.dev` du Worker, sans
     `/availability` à la fin.
   - `VITE_AVAILABILITYROQUEFORT_API_URL` : origine `workers.dev` du Worker
     Roquefort, sans `/availability` à la fin.
   - `VITE_FORMSPREE_FORM_ID` : identifiant du formulaire Formspree.
5. Relancer le déploiement GitHub Pages. À l’ouverture du calendrier, le site
   récupère les indisponibilités iCal ; les séjours sont envoyés à Formspree
   sans ouvrir l’application de messagerie. Une demande reste à confirmer par
   le propriétaire. Les disponibilités sont mises en cache 10 minutes côté
   Worker, en plus du délai de mise à jour éventuel d’Airbnb.

Pour tester localement, renseigner ces variables publiques dans `.env.local`.
Ne jamais y placer un lien iCal.

Les dates ajoutées manuellement dans `booking.blockedDates` de
`src/data/properties.ts` s’ajoutent aux dates du flux iCal. Si le flux ne peut
pas être lu, le calendrier refuse les demandes plutôt que d’afficher des
disponibilités potentiellement incorrectes. La villa de Roquefort impose
également un séjour minimum de 14 nuits, appliqué par le calendrier.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
