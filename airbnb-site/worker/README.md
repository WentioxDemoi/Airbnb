# Workers Cloudflare — calendrier iCal

Le site utilise deux Cloudflare Workers distincts, un par logement :

| Logement | Configuration | Worker Cloudflare | Secret iCal |
|---|---|---|---|
| Nice Centre | `nice/wrangler.toml` | `casa-azur-availability-nice` | `AIRBNB_ICAL_URL_NICE` |
| Roquefort-les-Pins | `roquefort/wrangler.toml` | `casa-azur-availability-roquefort` | `AIRBNB_ICAL_URL_ROQUEFORT` |

Les deux Workers exécutent le même code (`index.js`). Chaque configuration
indique le nom du secret à lire. Le Worker récupère le calendrier Airbnb,
extrait les dates occupées et les renvoie au site au format JSON. Le lien iCal
reste stocké comme secret Cloudflare ; il ne doit jamais être ajouté au code ou
aux variables GitHub Actions.

## Les deux commandes à connaître

À exécuter depuis la racine du dépôt `airbnb-site/`. La première commande
enregistre le lien iCal comme secret sur le Worker concerné ; Wrangler demande
ensuite de coller le lien dans une invite masquée. La deuxième publie le Worker.

### Nice Centre

```sh
npx wrangler secret put AIRBNB_ICAL_URL_NICE --config worker/nice/wrangler.toml
npx wrangler deploy --config worker/nice/wrangler.toml
```

### Roquefort-les-Pins

```sh
npx wrangler secret put AIRBNB_ICAL_URL_ROQUEFORT --config worker/roquefort/wrangler.toml
npx wrangler deploy --config worker/roquefort/wrangler.toml
```

Pour la première utilisation de Wrangler, s’authentifier une fois avec :

```sh
npx wrangler login
```

**Important :** après `secret put`, coller l’URL iCal Airbnb lorsque Wrangler
le demande. Le nom du secret est le texte placé après `secret put` ; ce n’est
pas l’URL. Ne pas saisir l’URL comme nom de secret et ne pas l’inscrire dans une
commande, un fichier `.env`, GitHub ou ce README.

## Vérifier le Worker

Wrangler affiche l’URL `workers.dev` après le déploiement. L’API de
disponibilités est à cette adresse suivie de `/availability`, par exemple :

```text
https://casa-azur-availability-nice.<sous-domaine>.workers.dev/availability
```

L’URL racine du Worker (`/`) répond « Not found » : c’est normal, seul le chemin
`/availability` est prévu.

Une réponse valide contient les dates bloquées sous la forme
`{"blockedDates":["AAAA-MM-JJ", ...]}`. Une erreur indiquant que le flux n’est
pas configuré signifie que le secret du Worker correspondant manque ou porte
un mauvais nom. Une erreur de rafraîchissement signifie que le Worker n’a pas
pu récupérer ou analyser le flux iCal.

## Relier le site aux Workers

Dans les variables GitHub Actions du dépôt, renseigner l’origine de chaque
Worker (sans `/availability`) :

- `VITE_AVAILABILITYNICE_API_URL` : URL `workers.dev` de Nice Centre.
- `VITE_AVAILABILITYROQUEFORT_API_URL` : URL `workers.dev` de Roquefort-les-Pins.

Relancer ensuite le déploiement du site GitHub Pages pour prendre en compte ces
variables. Les URL des Workers sont publiques ; les URL privées iCal, elles,
restent exclusivement dans les secrets Cloudflare.
