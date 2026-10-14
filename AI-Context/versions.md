# Versions — Casa Azur

Versions relevées le 13 octobre 2026 (registre npm, dépôts GitHub Actions, calendrier officiel Node.js), puis complétées avec la sortie du terminal après l'initialisation du projet.

## État du projet

| Élément | Constat |
| --- | --- |
| Application | `airbnb-site`, React + TypeScript + Vite, Tailwind CSS 4 et ESLint |
| Routes | React Router avec `HashRouter`, compatible avec GitHub Pages |
| Langues | Français, anglais, italien, espagnol et allemand |
| Calendriers | Deux Cloudflare Workers (Nice et Roquefort) partagent `worker/index.js` ; les URL iCal sont des secrets Cloudflare |
| Demandes | Formspree ; une soumission est une demande à confirmer, pas une réservation instantanée |
| Déploiement | GitHub Actions, Node 24, publication sur GitHub Pages |

Historique : le projet a d'abord été installé sous Node `v23.7.0` (npm `10.9.2`), ce qui produisait des avertissements `EBADENGINE` sur ESLint 10 (`eslint@10.12.0`, `@eslint/js@10.0.1`, etc.), qui exigent Node `^20.19.0 || ^22.13.0 || >=24`. Le passage sur Node 24 les a supprimés.

Les versions précises de dépendances sont celles du `package-lock.json` ; ce
document conserve un relevé technique effectué lors de l'initialisation et ne
remplace pas ce fichier.

## Environnement

| Outil | Version | Remarque |
| --- | --- | --- |
| Node.js | **24.x (LTS « Krypton »)**, installé : `24.21.0` | Aligné sur le calendrier de support. |
| npm | `11.19.0` | Fourni avec Node 24, pas besoin de le fixer. |
| nvm | `0.40.3` | Gestionnaire de versions Node. |
| Git | récent | Rien de spécifique. |

Notes Node.js :

- Node 24 est supporté jusqu'en avril 2028. Node 26 passe en LTS le 28 octobre 2026 : candidate plus tard, sans urgence.
- Node 22 reste utilisable (maintenance jusqu'en avril 2027), mais autant partir sur la 24.
- Vite 8 exige Node `^20.19.0 || >=22.12.0` ; Node 24 convient.
- Fixer la version dans le dépôt : fichier `.nvmrc` contenant `24`, et `"engines": { "node": ">=24" }` dans `package.json`.

## Dépendances (d'après le `package.json` du projet)

Les plages ci-dessous sont celles écrites dans `package.json` ; le `^` autorise les versions plus récentes de la même majeure, et la version exacte installée est dans `package-lock.json`.

### Exécution (`dependencies`)

| Paquet | Plage | Rôle |
| --- | --- | --- |
| `react` | `^19.2.8` | UI |
| `react-dom` | `^19.2.8` | Rendu navigateur |
| `react-router-dom` | `^7.18.4` | Routage (`HashRouter`). La v8 existe (`react-router`, Node ≥ 22.22) ; v7 retenue par prudence, migration possible plus tard. |
| `motion` | `^14.1.0` | Animations (ex-Framer Motion). Import : `import { motion } from "motion/react"` |
| `i18next` | `^26.4.4` | Moteur d'internationalisation |
| `react-i18next` | `^17.0.16` | Intégration React (requiert `i18next >= 26.2.0`) |
| `i18next-browser-languagedetector` | `^8.2.1` | Détection de la langue du navigateur |
| `i18next-http-backend` | `^4.0.2` | Chargement à la demande des fichiers de traduction JSON |

### Build et développement (`devDependencies`)

| Paquet | Plage | Rôle |
| --- | --- | --- |
| `vite` | `^8.3.0` | Build et serveur de dev |
| `@vitejs/plugin-react` | `^6.1.1` | Support React pour Vite 8 |
| `typescript` | `~6.0.2` | Typage |
| `@types/react` | `^19.2.18` | Types React |
| `@types/react-dom` | `^19.2.7` | Types React DOM |
| `@types/node` | `^24.13.3` | Types alignés sur Node 24 |
| `tailwindcss` | `^4.3.3` | Styles utilitaires |
| `@tailwindcss/vite` | `^4.3.3` | Plugin Vite de Tailwind |
| `eslint` | `^10.10.0` | Lint |
| `@eslint/js` | `^10.0.1` | Règles ESLint de base |
| `typescript-eslint` | `^8.69.0` | Lint TypeScript |
| `eslint-plugin-react-hooks` | `^7.1.1` | Règles des hooks React |
| `eslint-plugin-react-refresh` | `^0.5.6` | Règles du rechargement à chaud React |
| `globals` | `^17.12.0` | Variables globales connues d'ESLint |

### Scripts

| Script | Commande |
| --- | --- |
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `lint` | `eslint .` |
| `preview` | `vite preview` |

### Point d'attention : TypeScript 6 plutôt que 7

La dernière version de TypeScript est la 7.0.2, mais `typescript-eslint` 8.x déclare accepter TypeScript `>=4.8.4 <6.1.0`. Le gabarit a retenu `~6.0.2`, ce qui reste compatible : à conserver tant que le lint est utilisé. La 7.0.x ne serait envisageable qu'en supprimant ESLint ou quand `typescript-eslint` la supportera.

### Point d'attention : Tailwind 4

Tailwind 4 n'utilise plus ni `tailwind.config.js` ni PostCSS dans la configuration par défaut : on ajoute le plugin `@tailwindcss/vite` dans `vite.config.ts` et une seule ligne dans le CSS d'entrée :

```css
@import "tailwindcss";
```

La configuration est en place : `vite.config.ts` utilise `@tailwindcss/vite`
et le CSS d'entrée importe Tailwind.

### Point d'attention : version de Node non fixée dans le projet

Le `package.json` ne contient pas de champ `engines`. Ajouter :

```json
"engines": { "node": ">=24" }
```

et créer un fichier `.nvmrc` contenant `24`.

## Déploiement (GitHub Actions)

| Action | Version |
| --- | --- |
| `actions/checkout` | `v7` |
| `actions/setup-node` | `v7` (avec `node-version: 24`) |
| `actions/configure-pages` | `v6` |
| `actions/upload-pages-artifact` | `v5` |
| `actions/deploy-pages` | `v5` |

## Initialisation du projet

Déjà fait :

```bash
npm create vite@latest airbnb-site -- --template react-ts
```

Également fait, dans `airbnb-site/` :

```bash
npm install react-router-dom motion i18next react-i18next i18next-browser-languagedetector i18next-http-backend
npm install -D tailwindcss @tailwindcss/vite
```

L'application et son déploiement sont opérationnels. Pour les commandes de
développement, lancer les scripts depuis `airbnb-site/`. Le fonctionnement et
le déploiement des Workers sont décrits dans `airbnb-site/worker/README.md`.

## Règles de gestion des versions

- Fixer les versions par le fichier `package-lock.json`, à versionner, et installer en CI avec `npm ci`.
- Mettre à jour les dépendances volontairement (par exemple une fois par trimestre), pas à chaque build.
- Revérifier ce document à chaque changement de version majeure d'un outil (Node 26 LTS en octobre 2026, TypeScript 7 côté lint, React Router 8).
