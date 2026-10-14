# Spécification — Casa Azur

Casa Azur est un site multilingue hébergé sur GitHub Pages qui présente deux
locations de la Côte d’Azur : un appartement à Nice Centre et une villa à
Roquefort-les-Pins. Il propose leurs fiches détaillées, des activités à
découvrir dans la région et un calendrier pour envoyer une demande de séjour.
Une demande n’est pas une réservation confirmée : le propriétaire doit
reprendre contact avec le voyageur.

## Stack actuelle

- **Vite, React et TypeScript** : application statique, compilée dans `airbnb-site/`.
- **Tailwind CSS 4** : styles et mise en page responsive.
- **Motion** : animations, avec respect de `prefers-reduced-motion`.
- **React Router `HashRouter`** : routes compatibles avec GitHub Pages.
- **react-i18next** : français, anglais, italien, espagnol et allemand ; traductions dans `airbnb-site/public/locales/<lang>/translation.json`.
- Le déploiement GitHub Pages est automatisé par `.github/workflows/deploy.yml`.

## Fonctionnalités et organisation actuelles

- `airbnb-site/src/pages/` : accueil et pages de détail des logements.
- `airbnb-site/src/components/` : composants partagés, dont les cartes et le calendrier de réservation.
- `airbnb-site/src/data/properties.ts` : données et textes traduits des deux logements.
- `airbnb-site/src/data/experiences.ts` : activités de la Côte d’Azur.
- `airbnb-site/public/` : photos, traductions et autres ressources statiques.
- `airbnb-site/worker/` : deux configurations Cloudflare Worker, une pour chaque calendrier Airbnb ; elles partagent le code `worker/index.js`.
- Le calendrier combine les dates bloquées par iCal et les dates ajoutées manuellement aux données du logement. Les flux iCal privés sont stockés en secrets Cloudflare, jamais dans le site.
- Formspree reçoit les demandes de séjour depuis le site. Le formulaire ne confirme pas la réservation.
- La villa de Roquefort-les-Pins accueille jusqu'à 8 voyageurs ; elle a cinq chambres et impose un séjour minimum de 14 nuits. Une chambre à l'étage a un lit de 160 × 200 cm.
- Les variables de build des Workers et de Formspree sont configurées dans les variables GitHub Actions ; voir le README racine et `airbnb-site/worker/README.md`.

## Évolutions UI

Conserver une présentation soignée, des animations légères et une conception
mobile-first. Les principes ci-dessous restent des critères de conception et
de validation.

## Responsive et usage mobile

Le site sera ouvert surtout depuis un téléphone, via un QR code : la conception part donc du mobile (« mobile-first »), puis s'élargit vers la tablette et l'ordinateur.

- **Approche** : styles de base pour petit écran avec Tailwind, puis adaptation aux paliers `sm` (640 px), `md` (768 px), `lg` (1024 px) et `xl` (1280 px) uniquement quand la mise en page le demande.
- **Hero plein écran** : hauteur en `100svh` (ou `100dvh`) plutôt qu'en `100vh`, pour ne pas être coupé par les barres du navigateur mobile.
- **Navigation** : menu replié (« burger ») sur mobile, avec le sélecteur de langue toujours accessible dans l'en-tête.
- **Galerie photos** : défilement au doigt (swipe), images en pleine largeur, pas de survol requis pour voir une photo ou une information.
- **Zones tactiles** : boutons et liens d'au moins 44 × 44 px, notamment le lien de réservation et le contact.
- **Animations** : les effets de survol des cartes ont un équivalent tactile ; le parallax du hero est allégé ou désactivé sur mobile, en plus du respect de `prefers-reduced-motion`.
- **Performances sur réseau mobile** : images en plusieurs tailles (`srcset`/`sizes`) pour ne pas charger une photo d'ordinateur sur un téléphone, chargement différé hors du premier écran.
- **Balise viewport** : `<meta name="viewport" content="width=device-width, initial-scale=1">` dans `index.html`.
- **Textes** : tailles lisibles sans zoom (16 px minimum pour le corps de texte), conteneurs flexibles pour les langues aux textes plus longs.
- **Tests** : vérification sur un vrai téléphone en plus de l'émulation du navigateur, en scannant le QR code final.

À propos du QR code :

- Il encode l'adresse du site (HTTPS) ; elle doit rester stable, car un QR code imprimé ne se corrige pas.
- Pointer vers la racine du site laisse la détection de langue du navigateur choisir la bonne langue pour chaque voyageur.
- À décider : un seul QR code vers l'accueil, ou un QR code par bien vers sa page détail.

## Internationalisation

Le site est publié en cinq langues au lancement : français, anglais, italien, espagnol et allemand. Ces langues suffisent pour démarrer ; en ajouter une plus tard ne demande qu'un fichier de traduction, à condition de prévoir le mécanisme dès le début.

| Langue | Code | Statut |
| --- | --- | --- |
| Français | `fr` | Lancement, langue source |
| Anglais | `en` | Lancement, langue de repli |
| Italien | `it` | Lancement |
| Espagnol | `es` | Lancement |
| Allemand | `de` | Lancement |
| Néerlandais, portugais | `nl`, `pt` | Candidates, à décider selon le pays d'origine des voyageurs |
| Autres (russe, chinois, japonais, arabe) |  | Hors lancement ; l'arabe imposerait en plus un affichage de droite à gauche |

Pour choisir les langues suivantes, le plus fiable est de regarder les pays d'origine de tes voyageurs dans les statistiques Airbnb, plutôt que de traduire à l'aveugle : chaque langue ajoutée est du texte à relire et à maintenir.

Choix techniques :

- **Bibliothèque** : `react-i18next`, avec un fichier JSON par langue dans `public/locales/<lang>/translation.json`, chargé à la demande.
- **Détection** : langue du navigateur, repli sur l'anglais, choix mémorisé dans `localStorage`, sélecteur de langue visible dans l'en-tête.
- **URL** : routes `HashRouter` (pas de préfixe de langue) ; la langue est sélectionnée via le détecteur et le sélecteur de langue.
- **Biens** : chaque texte de `properties.ts` existe par langue (`description: { fr, en, it, es, de }`) ; le typage TypeScript signale toute traduction manquante.
- **Formats** : dates, prix et nombres via l'API native `Intl`, jamais écrits à la main.
- **Mise en page** : prévoir des textes plus longs (l'allemand l'est souvent) avec des conteneurs flexibles.
- **Traduction** : première passe automatique, puis relecture des descriptions de biens, idéalement par un locuteur natif.
- **SEO** : les fragments `#` du `HashRouter` ne sont pas indexés par langue. Si le référencement par langue compte, préférer `BrowserRouter` avec l'astuce `404.html`, ou un pré-rendu statique, et ajouter les balises `hreflang`.

## Décisions techniques clés

- **Données des biens** dans un fichier `properties.ts` (ou JSON) : ajouter un bien = ajouter un objet, sans toucher au code.
- **Images** : WebP/AVIF en plusieurs tailles, `loading="lazy"`. C'est le premier levier de fluidité.
- **Disponibilités** : les URL iCal Airbnb sont des secrets Cloudflare, lus par deux Workers distincts ; les API Worker renvoient uniquement les dates bloquées.
- **Demandes de séjour** : formulaire Formspree. Ce sont des demandes à valider manuellement, pas une réservation instantanée.
- **Accessibilité des animations** : respecter `prefers-reduced-motion`.
- **Déploiement** : GitHub Actions qui build et publie sur Pages à chaque push.
- **Optionnel** : SEO de base (balises meta, Open Graph).
