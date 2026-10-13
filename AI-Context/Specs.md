# Spécification — Site vitrine de biens immobiliers

Site web vitrine, sans back-end, hébergé sur GitHub Pages, pour présenter plusieurs biens immobiliers. Rendu soigné, animations légères mais fluides.

## Stack recommandée

- **Vite + React + TypeScript** : build statique simple, déploiement direct sur GitHub Pages. Le TypeScript est utile dès qu'on structure les données des biens.
- **Tailwind CSS** : rendu soigné et responsive rapidement, sans CSS à maintenir.
- **Framer Motion** (package `motion` aujourd'hui) : fade/slide à l'entrée, transitions de pages, parallax doux sur le hero, effets de hover sur les cartes.
- **React Router en `HashRouter`** (ou `BrowserRouter` + astuce `404.html`) : GitHub Pages ne gère pas les routes côté serveur. Penser à définir `base` dans `vite.config.ts` si le site est servi en `username.github.io/repo`.

## Structure du site

1. **Accueil** : hero plein écran avec photo d'un des biens (idéalement un carrousel/crossfade lent entre les biens), titre, bouton vers les biens.
2. **Liste des biens** : cartes avec photo, ville, capacité, points forts.
3. **Page détail d'un bien** : galerie photos, description, équipements, localisation, lien de réservation.
4. **Contact / À propos** : brève présentation de l'hôte.

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

- **Bibliothèque** : `react-i18next`, avec un fichier JSON par langue (`locales/fr.json`, etc.) chargé à la demande pour garder le site léger.
- **Détection** : langue du navigateur, repli sur l'anglais, choix mémorisé dans `localStorage`, sélecteur de langue visible dans l'en-tête.
- **URL** : préfixe de langue (`/fr/`, `/en/`, etc.).
- **Biens** : chaque texte de `properties.ts` existe par langue (`description: { fr, en, it, es, de }`) ; le typage TypeScript signale toute traduction manquante.
- **Formats** : dates, prix et nombres via l'API native `Intl`, jamais écrits à la main.
- **Mise en page** : prévoir des textes plus longs (l'allemand l'est souvent) avec des conteneurs flexibles.
- **Traduction** : première passe automatique, puis relecture des descriptions de biens, idéalement par un locuteur natif.
- **SEO** : les fragments `#` du `HashRouter` ne sont pas indexés par langue. Si le référencement par langue compte, préférer `BrowserRouter` avec l'astuce `404.html`, ou un pré-rendu statique, et ajouter les balises `hreflang`.

## Décisions techniques clés

- **Données des biens** dans un fichier `properties.ts` (ou JSON) : ajouter un bien = ajouter un objet, sans toucher au code.
- **Images** : WebP/AVIF en plusieurs tailles, `loading="lazy"`. C'est le premier levier de fluidité.
- **Réservation / contact sans back-end** : lien vers l'annonce Airbnb, `mailto:`, WhatsApp, ou service de formulaire type Formspree pour un vrai formulaire.
- **Accessibilité des animations** : respecter `prefers-reduced-motion`.
- **Déploiement** : GitHub Actions qui build et publie sur Pages à chaque push.
- **Optionnel** : SEO de base (balises meta, Open Graph).

## Question ouverte

Quel est l'objectif principal du site : **pousser à contacter directement l'hôte** pour réserver ? Cette réponse conditionne la page détail, le contact et le parcours global.
