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
  booking: { blockedDates: string[]; minimumNights?: number };
  registration?: string;
  /** Le typage force les 5 langues : une traduction manquante ne compile pas. */
  content: Record<LangCode, PropertyText>;
}

export interface Property {
  id: string;
  name: string;
  localizedNames?: Partial<Record<LangCode, string>>;
  city: string;
  photos: string[];
  detail?: PropertyDetail;
}

export function getPropertyName(property: Property, language: LangCode) {
  return property.localizedNames?.[language] ?? property.name;
}

const photoFiles = (count: number) => Array.from({ length: count }, (_, i) => `${i + 1}.jpeg`);

export const properties: Property[] = [
  {
    id: "nice-centre",
    name: "Nice Centre",
    localizedNames: {
      fr: "Nice Centre",
      en: "Central Nice Apartment",
      it: "Appartamento nel centro di Nizza",
      es: "Apartamento en el centro de Niza",
      de: "Apartment im Zentrum von Nizza",
    },
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
  {
    id: "roquefort",
    name: "Villa familiale avec piscine",
    localizedNames: {
      fr: "Villa avec piscine",
      en: "Family Villa with Pool",
      it: "Villa familiare con piscina",
      es: "Villa familiar con piscina",
      de: "Familienvilla mit Pool",
    },
    city: "Roquefort-les-Pins",
    photos: photoFiles(25),
    detail: {
      facts: { guests: 8, bedrooms: 5, beds: 5, bathrooms: 2, areaM2: 160 },
      amenities: [
        "tv", "internet", "wireless_internet", "ac", "pool", "kitchen", "free_parking",
        "allows_pets", "fireplace", "heating", "family_friendly", "washer", "dryer",
        "smoke_detector", "carbon_monoxide_detector", "fire_extinguisher", "hangers",
        "hair_dryer", "iron", "laptop_friendly_workspace", "bathtub", "baby_bath",
        "high_chair", "stair_gates", "childrens_books_and_toys", "crib", "hot_water",
        "microwave", "coffee_maker", "refrigerator", "dishwasher", "dishes_and_silverware",
        "cooking_basics", "oven", "stove", "bbq_area", "patio_or_balcony",
        "garden_or_backyard", "hot_water_kettle", "alfresco_dining", "dining_table",
        "toaster", "outdoor_seating", "freezer", "piano", "books", "ping_pong_table",
        "portable_fans", "baking_sheet", "barbeque_utensils", "cleaning_products",
        "wine_glasses",
      ],
      location: { lat: 43.67, lng: 7.046 },
      bookingUrl: "https://www.airbnb.com/rooms/7259365",
      booking: { blockedDates: [], minimumNights: 13 },
      registration: "061052022017",
      content: {
        fr: {
          title: "Villa familiale avec piscine à Roquefort-les-Pins",
          summary:
            "Agréable villa provençale de 160 m² au calme, au cœur d’un jardin clos et paysagé de 1 400 m². Idéale pour des vacances en famille ou entre amis, elle accueille jusqu’à 8 personnes et dispose d’une piscine privée, de cinq chambres et de beaux espaces de vie ouverts sur la terrasse.",
          space: [
            "Le séjour, la cuisine et une chambre s’ouvrent sur la terrasse ensoleillée et la piscine privée de 8 × 4 m. La piscine est sécurisée par une alarme ; des transats et une pergola avec barbecue à gaz vous attendent pour profiter du jardin.",
            "La villa comprend cinq chambres : deux chambres avec lit double de 140 × 190 au rez-de-chaussée, puis à l’étage une chambre avec lit électrique de 160 × 200 et deux chambres avec lits simples. Un lit bébé de 60 × 120 peut être installé sur demande.",
            "Deux salles de bains complètent la maison : une salle de bains avec baignoire au rez-de-chaussée et une salle d’eau avec douche et toilettes à l’étage.",
            "La cuisine est équipée pour les séjours en famille. Vous disposez également d’une buanderie avec lave-linge et sèche-linge, de la climatisation aux deux niveaux, du Wi-Fi et d’un piano à queue.",
            "À l’arrière de la maison, un jardin ombragé avec table de ping-pong offre un coin de fraîcheur. Le terrain est clos et fermé par un portail électrique, avec stationnement à l’intérieur.",
          ],
          neighborhood:
            "La villa se situe dans un domaine résidentiel de standing, calme et verdoyant, à proximité des commerces et des commodités de Roquefort-les-Pins. La mer est à environ 10 km et l’accès à l’autoroute à une dizaine de minutes. Grasse, Saint-Paul-de-Vence, Mougins, Cannes et Nice permettent de découvrir les villages et villes de la Côte d’Azur.",
          notes: [
            "Séjour minimum de 14 nuits.",
            "Capacité maximale : 8 voyageurs. Les enfants et les animaux sont acceptés.",
            "La piscine privée est sécurisée par une alarme ; les enfants restent sous la surveillance d’un adulte.",
            "Un contrat de location saisonnière, une annexe, un état des lieux et une attestation d’assurance habitation sont fournis par le propriétaire.",
          ],
        },
        en: {
          title: "Family villa with pool in Roquefort-les-Pins",
          summary:
            "A welcoming 160 m² Provençal villa in a peaceful setting, surrounded by 1,400 m² of enclosed landscaped garden. Ideal for family holidays or a stay with friends, it sleeps up to 8 and features a private pool, five bedrooms and bright living spaces opening onto the terrace.",
          space: [
            "The living room, kitchen and one bedroom open onto the sunny terrace and private 8 × 4 m pool. The pool has an alarm, and sun loungers and a pergola with a gas barbecue make it easy to enjoy the garden.",
            "The villa has five bedrooms: two ground-floor rooms with 140 × 190 cm double beds, plus an upstairs room with a 160 × 200 cm electric bed and two rooms with single beds. A 60 × 120 cm cot is available on request.",
            "There are two bathrooms: one with a bathtub on the ground floor and an upstairs shower room with a toilet.",
            "The kitchen is equipped for family stays. There is also a utility room with a washer and dryer, air conditioning on both floors, Wi-Fi and a grand piano.",
            "At the back of the house, a shaded garden with a ping-pong table offers a cool place to relax. The grounds are enclosed behind an electric gate, with parking inside.",
          ],
          neighborhood:
            "The villa is in a peaceful, leafy residential estate in Roquefort-les-Pins, close to local shops and amenities. The sea is about 10 km away and the motorway can be reached in around 10 minutes. Grasse, Saint-Paul-de-Vence, Mougins, Cannes and Nice are all within reach for exploring the towns and villages of the French Riviera.",
          notes: [
            "Minimum stay: 14 nights.",
            "Maximum capacity: 8 guests. Children and pets are welcome.",
            "The private pool is protected by an alarm; children must be supervised by an adult.",
            "The owner provides a seasonal rental agreement, an appendix, a property condition report and proof of home insurance.",
          ],
        },
        it: {
          title: "Villa familiare con piscina a Roquefort-les-Pins",
          summary:
            "Accogliente villa provenzale di 160 m² in una zona tranquilla, circondata da un giardino recintato e curato di 1.400 m². Ideale per vacanze in famiglia o con amici, ospita fino a 8 persone e offre piscina privata, cinque camere da letto e luminosi spazi abitativi che si affacciano sulla terrazza.",
          space: [
            "Il soggiorno, la cucina e una camera si aprono sulla terrazza soleggiata e sulla piscina privata di 8 × 4 m. La piscina è protetta da un allarme; lettini e pergola con barbecue a gas invitano a godersi il giardino.",
            "La villa dispone di cinque camere: due al piano terra con letto matrimoniale da 140 × 190 cm, una al piano superiore con letto elettrico da 160 × 200 cm e due con letti singoli. Su richiesta è disponibile una culla da 60 × 120 cm.",
            "Ci sono due bagni: uno con vasca al piano terra e uno con doccia e WC al piano superiore.",
            "La cucina è attrezzata per soggiorni in famiglia. Sono inoltre disponibili una lavanderia con lavatrice e asciugatrice, aria condizionata su entrambi i piani, Wi-Fi e un pianoforte a coda.",
            "Sul retro, il giardino ombreggiato con tavolo da ping-pong offre un angolo fresco per rilassarsi. La proprietà è recintata, con cancello elettrico e parcheggio interno.",
          ],
          neighborhood:
            "La villa si trova in un tranquillo e verdeggiante complesso residenziale a Roquefort-les-Pins, vicino a negozi e servizi. Il mare dista circa 10 km e l’autostrada si raggiunge in una decina di minuti. Grasse, Saint-Paul-de-Vence, Mougins, Cannes e Nizza sono facilmente raggiungibili per esplorare la Costa Azzurra.",
          notes: [
            "Soggiorno minimo: 14 notti.",
            "Capienza massima: 8 ospiti. Bambini e animali sono i benvenuti.",
            "La piscina privata è dotata di allarme; i bambini devono essere sorvegliati da un adulto.",
            "Il proprietario fornisce contratto di locazione turistica, allegato, verbale sullo stato dell’immobile e attestazione di assicurazione casa.",
          ],
        },
        es: {
          title: "Villa familiar con piscina en Roquefort-les-Pins",
          summary:
            "Agradable villa provenzal de 160 m² en un entorno tranquilo, rodeada de un jardín cerrado y cuidado de 1.400 m². Ideal para vacaciones en familia o con amigos, tiene capacidad para 8 personas, piscina privada, cinco dormitorios y espacios luminosos que dan a la terraza.",
          space: [
            "El salón, la cocina y un dormitorio se abren a la terraza soleada y a la piscina privada de 8 × 4 m. La piscina cuenta con alarma; hay tumbonas y una pérgola con barbacoa de gas para disfrutar del jardín.",
            "La villa tiene cinco dormitorios: dos en la planta baja con camas dobles de 140 × 190 cm; arriba, uno con cama eléctrica de 160 × 200 cm y dos con camas individuales. Se ofrece una cuna de 60 × 120 cm bajo petición.",
            "Hay dos baños: uno con bañera en la planta baja y otro con ducha y aseo en la planta superior.",
            "La cocina está equipada para estancias familiares. También hay un cuarto de lavandería con lavadora y secadora, aire acondicionado en ambas plantas, Wi-Fi y un piano de cola.",
            "En la parte trasera, el jardín sombreado con mesa de ping-pong es ideal para descansar. La parcela está vallada, tiene puerta eléctrica y aparcamiento dentro.",
          ],
          neighborhood:
            "La villa está en una urbanización residencial tranquila y verde de Roquefort-les-Pins, cerca de tiendas y servicios. El mar está a unos 10 km y se llega a la autopista en unos 10 minutos. Grasse, Saint-Paul-de-Vence, Mougins, Cannes y Niza permiten descubrir los pueblos y ciudades de la Costa Azul.",
          notes: [
            "Estancia mínima: 14 noches.",
            "Capacidad máxima: 8 huéspedes. Se admiten niños y mascotas.",
            "La piscina privada cuenta con alarma; los niños deben estar bajo la supervisión de un adulto.",
            "El propietario proporciona contrato de alquiler vacacional, anexo, inventario del estado de la vivienda y justificante del seguro del hogar.",
          ],
        },
        de: {
          title: "Familienvilla mit Pool in Roquefort-les-Pins",
          summary:
            "Einladende provenzalische Villa mit 160 m² in ruhiger Lage, umgeben von einem 1.400 m² großen, umzäunten und gepflegten Garten. Ideal für Familien- oder Urlaub mit Freunden: Platz für bis zu 8 Personen, privater Pool, fünf Schlafzimmer und helle Wohnbereiche mit Zugang zur Terrasse.",
          space: [
            "Wohnzimmer, Küche und ein Schlafzimmer öffnen sich zur sonnigen Terrasse und zum privaten Pool (8 × 4 m). Der Pool ist mit einem Alarm gesichert; Liegestühle und eine Pergola mit Gasgrill laden zum Entspannen im Garten ein.",
            "Die Villa verfügt über fünf Schlafzimmer: zwei im Erdgeschoss mit Doppelbetten (140 × 190 cm), oben ein Zimmer mit elektrischem Bett (160 × 200 cm) und zwei Zimmer mit Einzelbetten. Ein Kinderbett (60 × 120 cm) ist auf Anfrage verfügbar.",
            "Es gibt zwei Bäder: eines mit Badewanne im Erdgeschoss sowie ein Duschbad mit WC im Obergeschoss.",
            "Die Küche ist für Familienaufenthalte ausgestattet. Außerdem gibt es einen Hauswirtschaftsraum mit Waschmaschine und Trockner, Klimaanlage auf beiden Etagen, WLAN und einen Konzertflügel.",
            "Hinter dem Haus lädt ein schattiger Garten mit Tischtennisplatte zum Verweilen ein. Das Grundstück ist umzäunt, durch ein elektrisches Tor gesichert und bietet Parkplätze auf dem Grundstück.",
          ],
          neighborhood:
            "Die Villa liegt in einer ruhigen, grünen Wohnanlage in Roquefort-les-Pins, in der Nähe von Geschäften und Versorgungseinrichtungen. Das Meer ist etwa 10 km entfernt, die Autobahn erreicht man in rund 10 Minuten. Grasse, Saint-Paul-de-Vence, Mougins, Cannes und Nizza eignen sich für Ausflüge an der Côte d’Azur.",
          notes: [
            "Mindestaufenthalt: 14 Nächte.",
            "Maximale Belegung: 8 Gäste. Kinder und Haustiere sind willkommen.",
            "Der private Pool ist mit einem Alarm gesichert; Kinder müssen von einem Erwachsenen beaufsichtigt werden.",
            "Der Eigentümer stellt einen Saisonmietvertrag, einen Anhang, ein Übergabeprotokoll und einen Nachweis der Hausratversicherung bereit.",
          ],
        },
      },
    },
  },
];
