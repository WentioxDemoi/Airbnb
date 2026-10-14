import type { LangCode } from "../i18n";

// Ajouter un bien = ajouter un objet ici, puis déposer ses photos dans
// public/photos/<id>/ (1.jpg, 2.jpg, 3.jpg…).
// Sans `detail`, la fiche affiche « bientôt disponible ».

export interface PropertyText {
  title: string;
  summary: string;
  space: string[]; // un paragraphe par entrée
  neighborhood: string;
  notes: string[]; // « bon à savoir »
}

export interface PropertyDetail {
  facts: { guests: number; bedrooms: number; beds: number; bathrooms: number; areaM2?: number };
  /** Identifiants traduits via la clé amenities.<id> des fichiers de traduction. */
  amenities: string[];
  /** Coordonnées volontairement arrondies : la carte n'indique que le quartier. */
  location: { lat: number; lng: number };
  bookingUrl: string;
  /** Indisponibilités complémentaires au flux iCal, au format YYYY-MM-DD. */
  booking: { blockedDates: string[] };
  registration?: string;
  /** Le typage force les 5 langues : une traduction manquante ne compile pas. */
  content: Record<LangCode, PropertyText>;
}

export interface Property {
  id: string;
  name: string;
  city: string;
  photos: string[];
  detail?: PropertyDetail;
}

const photoFiles = (count: number) => Array.from({ length: count }, (_, i) => `${i + 1}.jpeg`);

export const properties: Property[] = [
  {
    id: "nice-centre",
    name: "Nice Centre",
    city: "Nice",
    photos: photoFiles(9),
    detail: {
      facts: { guests: 2, bedrooms: 1, beds: 1, bathrooms: 1, areaM2: 30 },
      amenities: [
        "ac", "kitchen", "heating", "washer", "smoke_detector", "essentials", "hangers", "iron",
        "laptop_friendly_workspace", "self_checkin", "lockbox", "hot_water", "body_soap", "bed_linens",
        "extra_pillows_and_blankets", "microwave", "coffee_maker", "refrigerator", "dishwasher",
        "dishes_and_silverware", "cooking_basics", "oven", "hot_water_kettle", "dining_table",
        "baking_sheet", "cleaning_products", "clothes_drying_rack", "wardrobe_or_closet", "wine_glasses",
        "beach_access",
      ],
      location: { lat: 43.702, lng: 7.266 },
      bookingUrl: "https://www.airbnb.com/rooms/54009581",
      booking: {
        // Ajouter ici les indisponibilités qui ne figurent pas dans le flux Airbnb.
        blockedDates: [],
      },
      registration: "06088017225MX",
      content: {
        fr: {
          title: "Cocon de 30 m² à Nice centre, Jean Médecin",
          summary:
            "Bel appartement de 30 m², moderne et entièrement rénové, à 50 m de l'avenue Jean Médecin et de Nice Étoile, près des tramways 1 et 2 et de la gare de Nice. Emplacement idéal pour rayonner et profiter pleinement de votre séjour sur la Côte d'Azur. Arrivée et départ en toute autonomie grâce à la boîte à clés.",
          space: [
            "Appartement ensoleillé dans un bel immeuble niçois, au 4ᵉ étage avec ascenseur, sur cour intérieure, entièrement rénové.",
            "Une chambre de 13 m² avec belle hauteur sous plafond et parquet ancien : lit de 140 × 190, bureau et placard.",
            "Une belle pièce de vie avec verrières d'atelier : cuisine moderne équipée (réfrigérateur, lave-linge, lave-vaisselle, four combiné micro-ondes, cafetière expresso), coin repas avec table extensible, et salle de bain moderne avec douche à l'italienne, lavabo et toilettes.",
            "Les plus : climatisation réversible chaud/froid.",
          ],
          neighborhood:
            "À 50 m de l'avenue Jean Médecin, en plein centre de Nice : tramways 1 et 2 (arrêt « Jean Médecin ») et gare Nice-Ville tout près. Nice Étoile, les nombreux commerces et les restaurants de l'avenue sont à proximité ; la place Masséna et les plages sont à quelques pas. En voiture, le parking de Nice Étoile est à 100 m.",
          notes: [
            "Pas de Wi-Fi dans le logement.",
            "Quelques dosettes de café de bienvenue sont fournies pour les premiers jours ; pour un long séjour, prévoyez les produits nécessaires.",
            "Une grande et une petite serviette par personne sont fournies pour la salle de douche.",
            "Pensez à emporter votre serviette de plage.",
          ],
        },
        en: {
          title: "30 m² cocoon in central Nice, Jean Médecin",
          summary:
            "Lovely 30 m² apartment, modern and fully renovated, 50 m from Avenue Jean Médecin and Nice Étoile, close to tram lines 1 and 2 and Nice train station. An ideal base to explore and make the most of your stay on the French Riviera. Check in and out on your own with the key lockbox.",
          space: [
            "Sunny apartment in a handsome Nice building, on the 4th floor with a lift, overlooking the inner courtyard, fully renovated.",
            "One 13 m² bedroom with high ceilings and original parquet floors: a 140 × 190 bed, a desk and a wardrobe.",
            "A bright living area with workshop-style glazed partitions: a modern equipped kitchen (fridge, washing machine, dishwasher, combination oven/microwave, espresso machine), a dining corner with an extendable table, and a modern bathroom with walk-in shower, washbasin and toilet.",
            "Bonus: reversible hot/cold air conditioning.",
          ],
          neighborhood:
            "50 m from Avenue Jean Médecin in the heart of Nice, with tram lines 1 and 2 (“Jean Médecin” stop) and Nice-Ville station close by. Nice Étoile and the avenue's many shops and restaurants are nearby, and Place Masséna and the beaches are a few steps away. If you come by car, the Nice Étoile car park is 100 m from the apartment.",
          notes: [
            "No Wi-Fi in the apartment.",
            "A few welcome coffee pods are provided for the first days; for a long stay, bring what you need.",
            "One large and one small towel per person are provided for the bathroom.",
            "Remember to bring your own beach towel.",
          ],
        },
        it: {
          title: "Nido di 30 m² nel centro di Nizza, Jean Médecin",
          summary:
            "Bell'appartamento di 30 m², moderno e completamente ristrutturato, a 50 m da Avenue Jean Médecin e da Nice Étoile, vicino alle linee tranviarie 1 e 2 e alla stazione di Nizza. Posizione ideale per esplorare la zona e godersi appieno il soggiorno in Costa Azzurra. Arrivo e partenza in totale autonomia grazie alla cassetta delle chiavi.",
          space: [
            "Appartamento luminoso in un bel palazzo nizzardo, al 4º piano con ascensore, sul cortile interno, completamente ristrutturato.",
            "Una camera da letto di 13 m² con soffitti alti e parquet d'epoca: letto da 140 × 190, scrivania e armadio.",
            "Un bellissimo ambiente con vetrate in stile atelier: cucina moderna attrezzata (frigorifero, lavatrice, lavastoviglie, forno combinato con microonde, macchina per caffè espresso), angolo pranzo con tavolo allungabile e bagno moderno con doccia a filo pavimento, lavabo e WC.",
            "Il tocco in più: aria condizionata reversibile caldo/freddo.",
          ],
          neighborhood:
            "A 50 m da Avenue Jean Médecin, nel pieno centro di Nizza: tram 1 e 2 (fermata «Jean Médecin») e stazione di Nice-Ville a due passi. Nice Étoile e i tanti negozi e ristoranti dell'avenue sono vicini; Place Masséna e le spiagge sono a pochi passi. Se arrivi in auto, il parcheggio di Nice Étoile è a 100 m.",
          notes: [
            "Nell'appartamento non c'è Wi-Fi.",
            "Per i primi giorni troverai qualche cialda di caffè di benvenuto; per i soggiorni lunghi, porta ciò che ti serve.",
            "Sono forniti un telo grande e uno piccolo a persona per il bagno.",
            "Ricordati di portare il tuo telo mare.",
          ],
        },
        es: {
          title: "Apartamento acogedor de 30 m² en el centro de Niza, Jean Médecin",
          summary:
            "Bonito apartamento de 30 m², moderno y totalmente reformado, a 50 m de la avenida Jean Médecin y de Nice Étoile, cerca de las líneas de tranvía 1 y 2 y de la estación de Niza. Ubicación ideal para moverte y disfrutar al máximo de tu estancia en la Costa Azul. Llegada y salida totalmente autónomas gracias a la caja de llaves.",
          space: [
            "Apartamento soleado en un bonito edificio niceno, en la 4.ª planta con ascensor, con vistas al patio interior, totalmente reformado.",
            "Un dormitorio de 13 m² con techos altos y parqué antiguo: cama de 140 × 190, escritorio y armario.",
            "Un bonito espacio con cristaleras de estilo taller: cocina moderna equipada (nevera, lavadora, lavavajillas, horno combinado con microondas, cafetera espresso), zona de comedor con mesa extensible y baño moderno con ducha a ras de suelo, lavabo e inodoro.",
            "Extra: aire acondicionado reversible frío/calor.",
          ],
          neighborhood:
            "A 50 m de la avenida Jean Médecin, en pleno centro de Niza: tranvías 1 y 2 (parada «Jean Médecin») y estación de Nice-Ville muy cerca. Nice Étoile y los numerosos comercios y restaurantes de la avenida están a un paso, y la plaza Masséna y las playas, a pocos pasos. Si vienes en coche, el aparcamiento de Nice Étoile está a 100 m.",
          notes: [
            "El apartamento no tiene wifi.",
            "Se facilitan unas cápsulas de café de bienvenida para los primeros días; para estancias largas, trae lo necesario.",
            "Se proporciona una toalla grande y una pequeña por persona para el baño.",
            "Recuerda traer tu toalla de playa.",
          ],
        },
        de: {
          title: "Gemütliches 30-m²-Apartment im Zentrum von Nizza, Jean Médecin",
          summary:
            "Schönes, modernes und komplett renoviertes 30-m²-Apartment, 50 m von der Avenue Jean Médecin und Nice Étoile entfernt, in der Nähe der Straßenbahnlinien 1 und 2 und des Bahnhofs von Nizza. Ideale Lage, um die Umgebung zu erkunden und den Aufenthalt an der Côte d'Azur in vollen Zügen zu genießen. Ein- und Auschecken völlig selbstständig dank Schlüsselbox.",
          space: [
            "Sonniges, komplett renoviertes Apartment in einem schönen Nizzaer Haus, im 4. Stock mit Aufzug, zum Innenhof gelegen.",
            "Ein 13 m² großes Schlafzimmer mit hohen Decken und altem Parkett: Bett 140 × 190, Schreibtisch und Schrank.",
            "Ein schöner Wohnbereich mit Atelier-Glaswänden: moderne, ausgestattete Küche (Kühlschrank, Waschmaschine, Geschirrspüler, Backofen mit Mikrowelle, Espressomaschine), Essbereich mit ausziehbarem Tisch sowie ein modernes Bad mit bodengleicher Dusche, Waschbecken und WC.",
            "Extra: umschaltbare Klimaanlage (Heizen/Kühlen).",
          ],
          neighborhood:
            "50 m von der Avenue Jean Médecin entfernt, mitten im Zentrum von Nizza: Straßenbahnlinien 1 und 2 (Haltestelle „Jean Médecin“) und der Bahnhof Nice-Ville sind ganz in der Nähe. Nice Étoile sowie die vielen Geschäfte und Restaurants der Avenue liegen um die Ecke, der Place Masséna und die Strände sind nur wenige Schritte entfernt. Wer mit dem Auto kommt: Das Parkhaus Nice Étoile ist 100 m vom Apartment entfernt.",
          notes: [
            "Im Apartment gibt es kein WLAN.",
            "Für die ersten Tage liegen ein paar Kaffeekapseln zur Begrüßung bereit; bei längeren Aufenthalten bring bitte das Nötige mit.",
            "Pro Person werden ein großes und ein kleines Handtuch für das Bad gestellt.",
            "Denk an dein eigenes Strandtuch.",
          ],
        },
      },
    },
  },
  { id: "bien-2", name: "Bien 2", city: "Côte d'Azur", photos: photoFiles(3) },
  { id: "bien-3", name: "Bien 3", city: "Côte d'Azur", photos: photoFiles(3) },
];
