import type { LangCode } from "../i18n";

interface ExperienceCopy {
  title: string;
  location: string;
  category: string;
  duration: string;
  summary: string;
  details: string[];
}

interface Experience {
  id: string;
  image: string;
  imageCredit: {
    file: string;
  };
  imageAlt: Record<LangCode, string>;
  content: Record<LangCode, ExperienceCopy>;
}

export const experiences: Experience[] = [
  {
    id: "nice",
    image: "photos/experiences/nice-vieux-nice.jpg",
    imageCredit: {
      file: "View from Château de Nice across the old town and the Baie des Anges - panoramio (1).jpg",
    },
    imageAlt: {
      fr: "Plage ensoleillée sur la Côte d’Azur",
      en: "Sunny beach on the French Riviera",
      it: "Spiaggia soleggiata in Costa Azzurra",
      es: "Playa soleada en la Costa Azul",
      de: "Sonniger Strand an der Côte d’Azur",
    },
    content: {
      fr: {
        title: "Flâner dans le Vieux-Nice",
        location: "Nice",
        category: "Culture & balade",
        duration: "Une demi-journée",
        summary: "Ruelles colorées, façades anciennes et parfums du marché : le cœur historique de Nice se découvre à pied.",
        details: [
          "Commencez au cours Saleya, connu pour son marché aux fleurs et ses étals de produits locaux, puis perdez-vous dans les ruelles du quartier.",
          "Faites une pause pour goûter une socca ou une glace artisanale, avant de rejoindre le front de mer et la Promenade des Anglais.",
          "La colline du Château offre un beau panorama sur la baie. Prévoyez de bonnes chaussures pour les rues pavées et la montée.",
        ],
      },
      en: {
        title: "Wander through Old Nice",
        location: "Nice",
        category: "Culture & walking",
        duration: "Half a day",
        summary: "Colourful lanes, historic façades and market aromas: discover the heart of Nice on foot.",
        details: [
          "Start at Cours Saleya, known for its flower market and local produce, then explore the neighbourhood’s winding lanes.",
          "Stop for socca or artisan ice cream before heading to the seafront and the Promenade des Anglais.",
          "Castle Hill has lovely views over the bay. Wear comfortable shoes for the cobbled streets and uphill walk.",
        ],
      },
      it: {
        title: "Passeggiare nella Vecchia Nizza",
        location: "Nizza",
        category: "Cultura e passeggiate",
        duration: "Mezza giornata",
        summary: "Vicoli colorati, facciate storiche e profumi del mercato: il cuore antico di Nizza si scopre a piedi.",
        details: [
          "Iniziate dal Cours Saleya, famoso per il mercato dei fiori e i prodotti locali, poi esplorate i vicoli del quartiere.",
          "Fate una pausa per assaggiare la socca o un gelato artigianale, prima di raggiungere il lungomare e la Promenade des Anglais.",
          "La collina del Castello offre una bella vista sulla baia. Indossate scarpe comode per le strade acciottolate e la salita.",
        ],
      },
      es: {
        title: "Pasear por el casco antiguo de Niza",
        location: "Niza",
        category: "Cultura y paseo",
        duration: "Medio día",
        summary: "Calles coloridas, fachadas históricas y aromas de mercado: descubre a pie el corazón antiguo de Niza.",
        details: [
          "Empieza en el Cours Saleya, famoso por su mercado de flores y productos locales, y luego recorre las callejuelas del barrio.",
          "Haz una pausa para probar socca o un helado artesanal antes de llegar al paseo marítimo y la Promenade des Anglais.",
          "La colina del Castillo ofrece bonitas vistas de la bahía. Lleva calzado cómodo para las calles empedradas y la subida.",
        ],
      },
      de: {
        title: "Durch die Altstadt von Nizza schlendern",
        location: "Nizza",
        category: "Kultur & Spaziergang",
        duration: "Ein halber Tag",
        summary: "Bunte Gassen, historische Fassaden und der Duft des Marktes: Nizzas Altstadt lässt sich wunderbar zu Fuß entdecken.",
        details: [
          "Beginne am Cours Saleya, bekannt für seinen Blumenmarkt und regionale Produkte, und erkunde anschließend die verwinkelten Gassen.",
          "Probiere Socca oder hausgemachtes Eis, bevor du zur Promenade des Anglais am Meer weitergehst.",
          "Vom Schlosshügel hast du einen schönen Blick über die Bucht. Bequeme Schuhe sind für das Kopfsteinpflaster und den Aufstieg empfehlenswert.",
        ],
      },
    },
  },
  {
    id: "eze",
    image: "photos/experiences/eze-village.jpg",
    imageCredit: {
      file: "Èze und Cap Ferrat-Grande Corniche.jpg",
    },
    imageAlt: {
      fr: "Village méditerranéen accroché à la côte",
      en: "Mediterranean village perched on the coast",
      it: "Borgo mediterraneo arroccato sulla costa",
      es: "Pueblo mediterráneo en lo alto de la costa",
      de: "Mediterranes Dorf hoch über der Küste",
    },
    content: {
      fr: {
        title: "Découvrir le village perché d’Èze",
        location: "Èze",
        category: "Village & panorama",
        duration: "Une demi-journée",
        summary: "Un village médiéval perché au-dessus de la Méditerranée, avec des ruelles de pierre et des vues spectaculaires.",
        details: [
          "Parcourez les passages voûtés et les petites boutiques du village jusqu’au jardin exotique, aménagé au sommet des ruines du château.",
          "Le sentier Nietzsche relie Èze-sur-Mer au village perché. La montée est raide et prend généralement entre une heure et une heure trente ; choisissez des chaussures adaptées et vérifiez la météo.",
          "Vous pouvez aussi rejoindre le village en bus depuis Nice ou Monaco. Les horaires et l’accès peuvent varier selon la saison.",
        ],
      },
      en: {
        title: "Explore the hilltop village of Èze",
        location: "Èze",
        category: "Village & views",
        duration: "Half a day",
        summary: "A medieval village above the Mediterranean, with stone lanes and spectacular coastal views.",
        details: [
          "Follow the vaulted passages and little shops up to the exotic garden, set among the ruins of the old castle.",
          "The Nietzsche Path climbs from Èze-sur-Mer to the village. It is steep and usually takes around one to one and a half hours; wear suitable shoes and check the weather.",
          "You can also reach the village by bus from Nice or Monaco. Timetables and access can vary by season.",
        ],
      },
      it: {
        title: "Scoprire il borgo arroccato di Èze",
        location: "Èze",
        category: "Borgo e panorami",
        duration: "Mezza giornata",
        summary: "Un borgo medievale sopra il Mediterraneo, con vicoli in pietra e panorami spettacolari sulla costa.",
        details: [
          "Seguite i passaggi ad arco e le piccole botteghe fino al giardino esotico, tra le rovine dell’antico castello.",
          "Il sentiero Nietzsche sale da Èze-sur-Mer al borgo. È ripido e richiede in genere da un’ora a un’ora e mezza: servono scarpe adatte e conviene controllare il meteo.",
          "È possibile raggiungere il borgo anche in autobus da Nizza o Monaco. Orari e accessibilità possono variare secondo la stagione.",
        ],
      },
      es: {
        title: "Descubrir el pueblo de Èze",
        location: "Èze",
        category: "Pueblo y panorámicas",
        duration: "Medio día",
        summary: "Un pueblo medieval sobre el Mediterráneo, con callejuelas de piedra y espectaculares vistas de la costa.",
        details: [
          "Recorre los pasajes abovedados y las pequeñas tiendas hasta el jardín exótico, situado entre las ruinas del antiguo castillo.",
          "El sendero Nietzsche sube desde Èze-sur-Mer hasta el pueblo. Es empinado y suele llevar entre una hora y una hora y media; lleva calzado adecuado y consulta el tiempo.",
          "También se puede llegar en autobús desde Niza o Mónaco. Los horarios y el acceso pueden variar según la temporada.",
        ],
      },
      de: {
        title: "Das Bergdorf Èze entdecken",
        location: "Èze",
        category: "Dorf & Aussicht",
        duration: "Ein halber Tag",
        summary: "Ein mittelalterliches Dorf hoch über dem Mittelmeer mit steinernen Gassen und spektakulärem Küstenblick.",
        details: [
          "Schlendere durch die überwölbten Passagen und kleinen Geschäfte bis zum exotischen Garten in den Ruinen der alten Burg.",
          "Der Nietzsche-Weg führt von Èze-sur-Mer hinauf ins Dorf. Der Anstieg ist steil und dauert meist etwa eine bis anderthalb Stunden. Trage geeignetes Schuhwerk und prüfe das Wetter.",
          "Das Dorf ist auch mit dem Bus von Nizza oder Monaco erreichbar. Fahrpläne und Zugang können je nach Saison variieren.",
        ],
      },
    },
  },
  {
    id: "monaco",
    image: "photos/experiences/monaco-port-hercule.jpg",
    imageCredit: {
      file: "Port Hercule (50326976527).jpg",
    },
    imageAlt: {
      fr: "Vue sur une ville méditerranéenne et son port",
      en: "View over a Mediterranean city and its harbour",
      it: "Veduta di una città mediterranea e del suo porto",
      es: "Vista de una ciudad mediterránea y su puerto",
      de: "Blick auf eine Mittelmeerstadt und ihren Hafen",
    },
    content: {
      fr: {
        title: "Passer la journée à Monaco",
        location: "Monaco",
        category: "Ville & patrimoine",
        duration: "Une journée",
        summary: "Entre le Rocher, les jardins et le port, Monaco réunit patrimoine, architecture et ambiance méditerranéenne.",
        details: [
          "Sur le Rocher, découvrez les ruelles de la vieille ville, la place du Palais et la cathédrale. Consultez les horaires avant de prévoir la relève de la garde.",
          "Le musée océanographique et ses jardins surplombent la mer. Le quartier de Monte-Carlo permet aussi d’admirer les façades Belle Époque et la place du Casino.",
          "Le train depuis Nice est une option pratique ; la principauté se visite ensuite à pied, en bus ou avec les ascenseurs publics.",
        ],
      },
      en: {
        title: "Spend a day in Monaco",
        location: "Monaco",
        category: "City & heritage",
        duration: "A full day",
        summary: "From the Rock to the gardens and harbour, Monaco blends heritage, striking architecture and Mediterranean atmosphere.",
        details: [
          "On the Rock, explore the old-town lanes, Palace Square and the cathedral. Check the schedule if you hope to see the changing of the guard.",
          "The Oceanographic Museum and its gardens overlook the sea. Monte-Carlo is also worth a visit for its Belle Époque façades and Casino Square.",
          "The train from Nice is convenient; once there, explore on foot, by bus or using the public lifts.",
        ],
      },
      it: {
        title: "Trascorrere una giornata a Monaco",
        location: "Monaco",
        category: "Città e patrimonio",
        duration: "Una giornata",
        summary: "Dal Rocher ai giardini e al porto, Monaco unisce patrimonio, architettura e atmosfera mediterranea.",
        details: [
          "Sul Rocher esplorate i vicoli della città vecchia, la piazza del Palazzo e la cattedrale. Verificate gli orari per assistere al cambio della guardia.",
          "Il Museo Oceanografico e i suoi giardini si affacciano sul mare. Monte-Carlo merita una visita per le facciate Belle Époque e la piazza del Casinò.",
          "Il treno da Nizza è una soluzione comoda; sul posto ci si sposta a piedi, in autobus o con gli ascensori pubblici.",
        ],
      },
      es: {
        title: "Pasar un día en Mónaco",
        location: "Mónaco",
        category: "Ciudad y patrimonio",
        duration: "Un día",
        summary: "Entre el Peñón, los jardines y el puerto, Mónaco combina patrimonio, arquitectura y ambiente mediterráneo.",
        details: [
          "En el Peñón, recorre las calles del casco antiguo, la plaza del Palacio y la catedral. Consulta los horarios si quieres ver el cambio de guardia.",
          "El Museo Oceanográfico y sus jardines dominan el mar. Montecarlo también merece una visita por sus edificios Belle Époque y la plaza del Casino.",
          "El tren desde Niza es una opción cómoda; una vez allí, puedes moverte a pie, en autobús o en los ascensores públicos.",
        ],
      },
      de: {
        title: "Einen Tag in Monaco verbringen",
        location: "Monaco",
        category: "Stadt & Kultur",
        duration: "Ein ganzer Tag",
        summary: "Vom Felsen über die Gärten bis zum Hafen verbindet Monaco Kulturerbe, eindrucksvolle Architektur und mediterranes Flair.",
        details: [
          "Erkunde auf dem Felsen die Gassen der Altstadt, den Fürstenplatz und die Kathedrale. Informiere dich über die Zeiten des Wachwechsels.",
          "Das Ozeanografische Museum und seine Gärten liegen hoch über dem Meer. Monte-Carlo lockt mit Belle-Époque-Fassaden und dem Casino-Platz.",
          "Die Bahn von Nizza ist praktisch. Vor Ort kommst du zu Fuß, mit dem Bus oder über öffentliche Aufzüge weiter.",
        ],
      },
    },
  },
  {
    id: "antibes",
    image: "photos/experiences/antibes-port.jpg",
    imageCredit: {
      file: "Антиб. Вид на порт Вобан и старый город.jpg",
    },
    imageAlt: {
      fr: "Promenade au bord de la mer Méditerranée",
      en: "A walk beside the Mediterranean Sea",
      it: "Passeggiata lungo il Mar Mediterraneo",
      es: "Paseo junto al mar Mediterráneo",
      de: "Spaziergang am Mittelmeer",
    },
    content: {
      fr: {
        title: "Explorer Antibes et le cap",
        location: "Antibes",
        category: "Mer & culture",
        duration: "Une journée",
        summary: "Un port animé, des remparts chargés d’histoire, le musée Picasso et les sentiers côtiers du cap d’Antibes.",
        details: [
          "Promenez-vous dans le vieil Antibes, le marché provençal et le long des remparts. Le musée Picasso est installé dans le château Grimaldi ; vérifiez ses horaires d’ouverture.",
          "Le sentier du Tire-Poil longe une partie du cap d’Antibes et offre de belles vues sur la mer. Certains tronçons peuvent être fermés selon la météo ou l’état du sentier.",
          "Prévoyez de l’eau, une protection solaire et des chaussures adaptées pour la balade côtière.",
        ],
      },
      en: {
        title: "Explore Antibes and Cap d’Antibes",
        location: "Antibes",
        category: "Sea & culture",
        duration: "A full day",
        summary: "A lively harbour, historic ramparts, the Picasso Museum and coastal paths around Cap d’Antibes.",
        details: [
          "Wander through Old Antibes, visit the Provençal market and walk along the ramparts. The Picasso Museum is housed in Château Grimaldi; check opening times before you go.",
          "The Tire-Poil coastal path follows part of Cap d’Antibes and offers lovely sea views. Sections may close depending on weather or trail conditions.",
          "Bring water and sun protection, and wear suitable shoes for the coastal walk.",
        ],
      },
      it: {
        title: "Esplorare Antibes e Cap d’Antibes",
        location: "Antibes",
        category: "Mare e cultura",
        duration: "Una giornata",
        summary: "Un porto vivace, bastioni storici, il Museo Picasso e sentieri costieri lungo Cap d’Antibes.",
        details: [
          "Passeggiate nella città vecchia, visitate il mercato provenzale e percorrete i bastioni. Il Museo Picasso si trova nel castello Grimaldi: controllate gli orari di apertura.",
          "Il sentiero del Tire-Poil costeggia una parte di Cap d’Antibes e regala splendide viste sul mare. Alcuni tratti possono essere chiusi in base al meteo o alle condizioni del percorso.",
          "Portate acqua e protezione solare e indossate scarpe adatte alla passeggiata costiera.",
        ],
      },
      es: {
        title: "Explorar Antibes y el cabo de Antibes",
        location: "Antibes",
        category: "Mar y cultura",
        duration: "Un día",
        summary: "Un puerto animado, murallas históricas, el Museo Picasso y senderos costeros por el cabo de Antibes.",
        details: [
          "Pasea por el casco antiguo, visita el mercado provenzal y recorre las murallas. El Museo Picasso está en el castillo Grimaldi; consulta los horarios antes de ir.",
          "El sendero del Tire-Poil bordea parte del cabo de Antibes y ofrece bonitas vistas al mar. Algunos tramos pueden cerrarse según el tiempo o el estado del camino.",
          "Lleva agua, protección solar y calzado adecuado para el paseo costero.",
        ],
      },
      de: {
        title: "Antibes und das Cap d’Antibes erkunden",
        location: "Antibes",
        category: "Meer & Kultur",
        duration: "Ein ganzer Tag",
        summary: "Ein lebhafter Hafen, historische Stadtmauern, das Picasso-Museum und Küstenwege am Cap d’Antibes.",
        details: [
          "Schlendere durch die Altstadt, besuche den provenzalischen Markt und spaziere an der Stadtmauer entlang. Das Picasso-Museum befindet sich im Château Grimaldi; prüfe vorab die Öffnungszeiten.",
          "Der Küstenweg Tire-Poil verläuft entlang eines Teils des Cap d’Antibes und bietet schöne Meerblicke. Abschnitte können je nach Wetter und Wegzustand gesperrt sein.",
          "Nimm Wasser und Sonnenschutz mit und trage geeignetes Schuhwerk für den Küstenspaziergang.",
        ],
      },
    },
  },
  {
    id: "cannes",
    image: "photos/experiences/cannes-port.jpg",
    imageCredit: {
      file: "Vieux Port de Cannes (50519003602).jpg",
    },
    imageAlt: {
      fr: "Bateau naviguant sur la Méditerranée",
      en: "Boat sailing on the Mediterranean",
      it: "Barca in navigazione sul Mediterraneo",
      es: "Barco navegando por el Mediterráneo",
      de: "Boot auf dem Mittelmeer",
    },
    content: {
      fr: {
        title: "Voir Cannes depuis la mer",
        location: "Cannes & îles de Lérins",
        category: "Bateau & plages",
        duration: "Une journée",
        summary: "Promenade sur la Croisette puis traversée vers les îles de Lérins, pour changer de rythme et profiter du large.",
        details: [
          "À Cannes, suivez la Croisette, découvrez le quartier du Suquet et son marché, puis rejoignez le port pour embarquer vers les îles.",
          "L’île Sainte-Marguerite invite à la marche sous les pins et à la baignade dans les criques. L’île Saint-Honorat est connue pour son monastère et ses vignobles.",
          "Les navettes maritimes et leurs horaires varient selon la saison et la météo. Vérifiez les départs et prévoyez eau, chapeau et chaussures confortables.",
        ],
      },
      en: {
        title: "See Cannes from the sea",
        location: "Cannes & the Lérins Islands",
        category: "Boats & beaches",
        duration: "A full day",
        summary: "Stroll along the Croisette, then take a boat to the Lérins Islands for a slower pace and open-sea views.",
        details: [
          "In Cannes, walk the Croisette, explore the old Suquet district and its market, then head to the harbour for a boat to the islands.",
          "Sainte-Marguerite is ideal for walking beneath the pines and swimming in small coves. Saint-Honorat is known for its monastery and vineyards.",
          "Ferry schedules vary with the season and weather. Check departures and bring water, a hat and comfortable shoes.",
        ],
      },
      it: {
        title: "Scoprire Cannes dal mare",
        location: "Cannes e isole di Lérins",
        category: "Barche e spiagge",
        duration: "Una giornata",
        summary: "Passeggiata sulla Croisette e poi in barca verso le isole di Lérins, per godersi il mare con un ritmo più lento.",
        details: [
          "A Cannes percorrete la Croisette, scoprite il quartiere del Suquet e il suo mercato, poi raggiungete il porto per imbarcarvi verso le isole.",
          "L’isola Sainte-Marguerite è perfetta per passeggiare tra i pini e nuotare nelle calette. Saint-Honorat è nota per il monastero e i vigneti.",
          "Gli orari dei traghetti variano in base alla stagione e al meteo. Verificate le partenze e portate acqua, cappello e scarpe comode.",
        ],
      },
      es: {
        title: "Descubrir Cannes desde el mar",
        location: "Cannes e islas de Lérins",
        category: "Barcos y playas",
        duration: "Un día",
        summary: "Pasea por la Croisette y después navega hasta las islas de Lérins para disfrutar del mar a otro ritmo.",
        details: [
          "En Cannes, recorre la Croisette, descubre el barrio de Suquet y su mercado, y luego dirígete al puerto para embarcar hacia las islas.",
          "La isla Sainte-Marguerite invita a caminar entre pinos y bañarse en calas. Saint-Honorat es conocida por su monasterio y sus viñedos.",
          "Los horarios de los barcos varían según la temporada y el tiempo. Comprueba las salidas y lleva agua, gorra y calzado cómodo.",
        ],
      },
      de: {
        title: "Cannes vom Meer aus erleben",
        location: "Cannes & Lérins-Inseln",
        category: "Boot & Strand",
        duration: "Ein ganzer Tag",
        summary: "Erst über die Croisette schlendern, dann mit dem Boot zu den Lérins-Inseln übersetzen und das Meer genießen.",
        details: [
          "Spaziere in Cannes über die Croisette, entdecke das Viertel Le Suquet mit seinem Markt und gehe anschließend zum Hafen für die Überfahrt.",
          "Auf Sainte-Marguerite kannst du unter Pinien wandern und in kleinen Buchten baden. Saint-Honorat ist für sein Kloster und seine Weinberge bekannt.",
          "Die Fährzeiten hängen von Saison und Wetter ab. Prüfe die Abfahrten und bring Wasser, einen Hut und bequeme Schuhe mit.",
        ],
      },
    },
  },
  {
    id: "saint-paul",
    image: "photos/experiences/saint-paul-de-vence.jpg",
    imageCredit: {
      file: "Saint-Paul-de-Vence view.jpg",
    },
    imageAlt: {
      fr: "Village provençal en pierre dans les collines",
      en: "Stone-built Provençal village in the hills",
      it: "Borgo provenzale in pietra tra le colline",
      es: "Pueblo provenzal de piedra entre las colinas",
      de: "Steinernes provenzalisches Dorf in den Hügeln",
    },
    content: {
      fr: {
        title: "Visiter Saint-Paul-de-Vence",
        location: "Saint-Paul-de-Vence",
        category: "Art & village",
        duration: "Une demi-journée",
        summary: "Un village fortifié plein de galeries, d’ateliers et de vues sur les collines de l’arrière-pays.",
        details: [
          "Faites le tour des remparts, puis explorez les ruelles pavées, les galeries et les petites places du village.",
          "La Fondation Maeght, tout près, rassemble art moderne, sculptures et jardin. Consultez les expositions et horaires avant la visite.",
          "Le village est en pente et les rues sont pavées : prévoyez des chaussures confortables. En haute saison, venir tôt facilite la visite.",
        ],
      },
      en: {
        title: "Visit Saint-Paul-de-Vence",
        location: "Saint-Paul-de-Vence",
        category: "Art & village",
        duration: "Half a day",
        summary: "A walled village filled with galleries, studios and views over the inland hills.",
        details: [
          "Walk the ramparts, then explore the cobbled lanes, galleries and little squares.",
          "Nearby Fondation Maeght brings together modern art, sculpture and gardens. Check current exhibitions and opening times before visiting.",
          "The village is hilly and the streets are cobbled, so wear comfortable shoes. In high season, an early start makes for an easier visit.",
        ],
      },
      it: {
        title: "Visitare Saint-Paul-de-Vence",
        location: "Saint-Paul-de-Vence",
        category: "Arte e borgo",
        duration: "Mezza giornata",
        summary: "Un borgo fortificato ricco di gallerie, atelier e panorami sulle colline dell’entroterra.",
        details: [
          "Percorrete i bastioni e poi esplorate i vicoli acciottolati, le gallerie e le piccole piazze.",
          "La vicina Fondation Maeght riunisce arte moderna, sculture e giardini. Verificate le mostre e gli orari prima della visita.",
          "Il borgo è in pendenza e le strade sono acciottolate: scegliete scarpe comode. In alta stagione è meglio arrivare presto.",
        ],
      },
      es: {
        title: "Visitar Saint-Paul-de-Vence",
        location: "Saint-Paul-de-Vence",
        category: "Arte y pueblo",
        duration: "Medio día",
        summary: "Un pueblo amurallado lleno de galerías, talleres y vistas a las colinas del interior.",
        details: [
          "Recorre las murallas y después explora las calles empedradas, las galerías y las pequeñas plazas.",
          "La cercana Fundación Maeght reúne arte moderno, esculturas y jardines. Consulta las exposiciones y horarios antes de la visita.",
          "El pueblo tiene cuestas y calles empedradas: lleva calzado cómodo. En temporada alta, es mejor llegar temprano.",
        ],
      },
      de: {
        title: "Saint-Paul-de-Vence besuchen",
        location: "Saint-Paul-de-Vence",
        category: "Kunst & Dorf",
        duration: "Ein halber Tag",
        summary: "Ein befestigtes Dorf voller Galerien und Ateliers mit Ausblick auf die Hügel des Hinterlands.",
        details: [
          "Spaziere auf der Stadtmauer und erkunde anschließend die gepflasterten Gassen, Galerien und kleinen Plätze.",
          "Die nahe Fondation Maeght vereint moderne Kunst, Skulpturen und Gartenanlagen. Informiere dich vorab über Ausstellungen und Öffnungszeiten.",
          "Das Dorf ist hügelig und die Wege sind gepflastert. Bequeme Schuhe sind empfehlenswert; in der Hauptsaison lohnt sich ein früher Besuch.",
        ],
      },
    },
  },
  {
    id: "grasse",
    image: "photos/experiences/grasse-perfume-museum.jpg",
    imageCredit: {
      file: "France-002800 - Perfume Factory (15977938866).jpg",
    },
    imageAlt: {
      fr: "Flacon de parfum évoquant les parfumeries de Grasse",
      en: "Perfume bottle evoking the perfume houses of Grasse",
      it: "Flacone di profumo ispirato alle profumerie di Grasse",
      es: "Frasco de perfume que evoca las perfumerías de Grasse",
      de: "Parfümflakon als Symbol für die Parfümerien von Grasse",
    },
    content: {
      fr: {
        title: "Sentir les parfums de Grasse",
        location: "Grasse",
        category: "Savoir-faire & culture",
        duration: "Une demi-journée",
        summary: "Découvrez l’histoire du parfum dans la ville de Grasse, entre maisons historiques, ateliers et ruelles provençales.",
        details: [
          "Plusieurs maisons de parfum proposent des visites guidées de leurs ateliers et des expériences autour des matières premières. Les visites et réservations dépendent de chaque maison.",
          "Le musée international de la parfumerie retrace l’histoire de cette industrie et de ses savoir-faire.",
          "Complétez la visite par une promenade dans le centre ancien. Grasse est une ville en pente : prévoyez du temps pour les déplacements.",
        ],
      },
      en: {
        title: "Discover the scents of Grasse",
        location: "Grasse",
        category: "Craft & culture",
        duration: "Half a day",
        summary: "Explore the history of perfume in Grasse, with historic perfume houses, workshops and Provençal lanes.",
        details: [
          "Several perfume houses offer guided visits to their workshops and experiences with fragrance ingredients. Tours and bookings vary by house.",
          "The International Perfume Museum traces the history of the industry and its craft traditions.",
          "Round off your visit with a walk through the old town. Grasse is hilly, so allow time to get around.",
        ],
      },
      it: {
        title: "Scoprire i profumi di Grasse",
        location: "Grasse",
        category: "Artigianato e cultura",
        duration: "Mezza giornata",
        summary: "Scoprite la storia del profumo a Grasse, tra maison storiche, laboratori e vicoli provenzali.",
        details: [
          "Diverse maison di profumi propongono visite guidate ai laboratori ed esperienze sulle materie prime. Visite e prenotazioni dipendono da ciascuna maison.",
          "Il Museo Internazionale della Profumeria racconta la storia del settore e dei suoi mestieri.",
          "Completate la visita con una passeggiata nel centro storico. Grasse è collinare: considerate un po’ di tempo per gli spostamenti.",
        ],
      },
      es: {
        title: "Descubrir los perfumes de Grasse",
        location: "Grasse",
        category: "Artesanía y cultura",
        duration: "Medio día",
        summary: "Descubre la historia del perfume en Grasse, entre perfumerías históricas, talleres y calles provenzales.",
        details: [
          "Varias casas de perfume ofrecen visitas guiadas a sus talleres y experiencias con materias primas. Las visitas y reservas dependen de cada casa.",
          "El Museo Internacional de la Perfumería cuenta la historia de esta industria y de sus oficios.",
          "Completa la visita con un paseo por el casco antiguo. Grasse tiene cuestas, así que reserva tiempo para desplazarte.",
        ],
      },
      de: {
        title: "Die Düfte von Grasse entdecken",
        location: "Grasse",
        category: "Handwerk & Kultur",
        duration: "Ein halber Tag",
        summary: "Entdecke die Geschichte des Parfüms in Grasse – mit traditionsreichen Parfümerien, Werkstätten und provenzalischen Gassen.",
        details: [
          "Mehrere Parfümhäuser bieten Führungen durch ihre Werkstätten und Erlebnisse rund um Duftrohstoffe an. Besichtigungen und Buchungen sind je nach Haus unterschiedlich.",
          "Das Internationale Parfümmuseum erzählt die Geschichte der Branche und ihrer Handwerkskunst.",
          "Verbinde den Besuch mit einem Spaziergang durch die Altstadt. Grasse ist hügelig – plane genügend Zeit für Wege ein.",
        ],
      },
    },
  },
  {
    id: "verdon",
    image: "photos/experiences/verdon-lake.jpg",
    imageCredit: {
      file: "Aerial view of the Lake of Sainte-Croix 03.jpg",
    },
    imageAlt: {
      fr: "Paysage de montagne et lac dans le sud de la France",
      en: "Mountain and lake scenery in southern France",
      it: "Paesaggio montano e lago nel sud della Francia",
      es: "Paisaje de montaña y lago en el sur de Francia",
      de: "Berg- und Seenlandschaft in Südfrankreich",
    },
    content: {
      fr: {
        title: "S’évader dans les gorges du Verdon",
        location: "Parc naturel régional du Verdon",
        category: "Nature & plein air",
        duration: "Une journée ou plus",
        summary: "Pour une excursion plus longue, les gorges et le lac de Sainte-Croix offrent des paysages grandioses et des activités de plein air.",
        details: [
          "Les routes panoramiques permettent de découvrir les gorges depuis plusieurs belvédères. La voiture est généralement la solution la plus pratique pour explorer le secteur.",
          "Autour du lac de Sainte-Croix, selon la saison, vous pouvez louer un pédalo ou un kayak et profiter des plages. Réservez ou vérifiez les conditions à l’avance en période estivale.",
          "Le Verdon est plus éloigné que les autres idées de cette sélection. Prévoyez une journée complète, de l’eau, une protection solaire et vérifiez les conditions des routes et sentiers.",
        ],
      },
      en: {
        title: "Escape to the Verdon Gorge",
        location: "Verdon Regional Natural Park",
        category: "Nature & outdoors",
        duration: "A day or longer",
        summary: "For a longer day trip, the gorge and Lake Sainte-Croix offer dramatic scenery and outdoor activities.",
        details: [
          "Scenic roads and viewpoints reveal different views of the gorge. A car is generally the easiest way to explore the area.",
          "Around Lake Sainte-Croix, pedal boats and kayaks are available in season, along with lakeside swimming. Check conditions and availability ahead of a summer visit.",
          "The Verdon is farther away than the other suggestions here. Allow a full day, bring water and sun protection, and check road and trail conditions.",
        ],
      },
      it: {
        title: "Una fuga nelle gole del Verdon",
        location: "Parco naturale regionale del Verdon",
        category: "Natura e attività all’aperto",
        duration: "Una giornata o più",
        summary: "Per un’escursione più lunga, le gole e il lago di Sainte-Croix offrono paesaggi spettacolari e attività all’aperto.",
        details: [
          "Le strade panoramiche permettono di ammirare le gole da diversi punti. In genere l’auto è il mezzo più pratico per esplorare la zona.",
          "Intorno al lago di Sainte-Croix, in stagione, è possibile noleggiare pedalò o kayak e fare il bagno. In estate verificate disponibilità e condizioni in anticipo.",
          "Il Verdon è più lontano rispetto alle altre proposte. Prevedete una giornata intera, portate acqua e protezione solare e controllate le condizioni di strade e sentieri.",
        ],
      },
      es: {
        title: "Escaparse a las gargantas del Verdon",
        location: "Parque natural regional del Verdon",
        category: "Naturaleza y aire libre",
        duration: "Un día o más",
        summary: "Para una excursión más larga, las gargantas y el lago de Sainte-Croix ofrecen paisajes espectaculares y actividades al aire libre.",
        details: [
          "Las carreteras panorámicas permiten descubrir las gargantas desde varios miradores. Normalmente, el coche es la forma más práctica de recorrer la zona.",
          "En temporada, alrededor del lago de Sainte-Croix se pueden alquilar hidropedales o kayaks y disfrutar de sus playas. Consulta las condiciones con antelación en verano.",
          "El Verdon está más lejos que las demás propuestas. Reserva un día completo, lleva agua y protección solar y comprueba el estado de las carreteras y senderos.",
        ],
      },
      de: {
        title: "Einen Ausflug in die Verdonschlucht machen",
        location: "Regionaler Naturpark Verdon",
        category: "Natur & Aktivitäten",
        duration: "Ein Tag oder länger",
        summary: "Für einen längeren Ausflug bieten die Schlucht und der See von Sainte-Croix eindrucksvolle Landschaften und Aktivitäten im Freien.",
        details: [
          "Panoramastraßen und Aussichtspunkte eröffnen verschiedene Blicke auf die Schlucht. Mit dem Auto lässt sich die Gegend meist am einfachsten erkunden.",
          "Am See von Sainte-Croix kannst du in der Saison Tretboote oder Kajaks mieten und an den Ufern baden. Prüfe im Sommer Verfügbarkeit und Bedingungen vorab.",
          "Der Verdon liegt weiter entfernt als die anderen Vorschläge. Plane einen ganzen Tag ein, nimm Wasser und Sonnenschutz mit und prüfe Straßen- und Wegbedingungen.",
        ],
      },
    },
  },
];
