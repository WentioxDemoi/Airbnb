// Ajouter un bien = ajouter un objet ici, puis déposer ses photos dans
// public/photos/<id>/ (1.jpg, 2.jpg, 3.jpg…).
export interface Property {
  id: string;
  name: string;
  city: string;
  photos: string[];
}

export const properties: Property[] = [
  { id: "nice-centre", name: "Nice Centre", city: "Nice", photos: ["1.jpg", "2.jpg", "3.jpg"] },
  { id: "bien-2", name: "Bien 2", city: "Côte d'Azur", photos: ["1.jpg", "2.jpg", "3.jpg"] },
  { id: "bien-3", name: "Bien 3", city: "Côte d'Azur", photos: ["1.jpg", "2.jpg", "3.jpg"] },
];
