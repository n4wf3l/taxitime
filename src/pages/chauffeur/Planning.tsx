import React, { useState } from "react";

// Jours et shifts
const jours = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];
const shifts = ["Journée", "Nuitée"];

// Liste de vrais noms de chauffeurs
const chauffeursMatin = [
  "Ahmed Ben Salah",
  "Karim El Haddadi",
  "Yassine Boumediene",
  "Ismael Chouaib",
  "Rachid Azzouzi",
  "Nabil El Fakir",
  "Mohamed Belkacem",
  "Hassan Outaleb",
  "Anis Messaoud",
  "Tariq Alami",
];

const chauffeursSoir = [
  "Omar Benmansour",
  "Fouad Dahmani",
  "Hicham El Idrissi",
  "Sofiane Larbi",
  "Khalid Bennani",
  "Adil Meziane",
  "Walid Bensaid",
  "Samir Harkati",
  "Amine Fadili",
  "Bilal Gharbi",
];

// Générer des chauffeurs pour chaque jour
const generateChauffeurs = (shift) =>
  shift === "Journée" ? chauffeursMatin : chauffeursSoir;

// État initial avec des chauffeurs répartis sur toute la semaine
const initialChauffeurs = jours.reduce((acc, jour) => {
  acc[jour] = {
    Journée: [...chauffeursMatin], // Clonage pour éviter la mutation de l'original
    Nuitée: [...chauffeursSoir],
  };
  return acc;
}, {});

const PlanningTable = () => {
  const [chauffeurs, setChauffeurs] = useState(initialChauffeurs);

  // Fonction pour ajouter un nouveau chauffeur
  const ajouterChauffeur = (jour, shift) => {
    const nomNouveauChauffeur = prompt(
      `Entrez le nom du chauffeur pour ${shift} - ${jour}`
    );
    if (nomNouveauChauffeur) {
      setChauffeurs((prevChauffeurs) => ({
        ...prevChauffeurs,
        [jour]: {
          ...prevChauffeurs[jour],
          [shift]: [...prevChauffeurs[jour][shift], nomNouveauChauffeur], // Ajoute le chauffeur
        },
      }));
    }
  };

  return (
    <div className="overflow-x-auto p-4 min-h-screen flex flex-col items-center">
      <h2 className="text-2xl font-bold text-yellow-600 mb-4">
        🚕 Planning des chauffeurs
      </h2>
      <table className="min-w-full border-collapse border border-yellow-600 rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="bg-yellow-600 text-black p-3 border border-yellow-500 rounded-tl-lg">
              Période
            </th>
            {jours.map((jour, index) => (
              <th
                key={jour}
                className={`bg-yellow-600 text-black p-3 border border-yellow-500 ${
                  index === jours.length - 1 ? "rounded-tr-lg" : ""
                }`}
              >
                {jour} 📅
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <React.Fragment key={shift}>
              <tr>
                <td
                  className={`border border-yellow-500 font-bold text-center text-white p-3 ${
                    shift === "Journée" ? "bg-gray-800" : "bg-black"
                  } rounded-bl-lg`}
                >
                  {shift}
                </td>
                {jours.map((jour) => (
                  <td
                    key={`${jour}-${shift}`}
                    className="border border-yellow-500 p-3"
                  >
                    <div className="flex flex-col gap-2">
                      {chauffeurs[jour][shift].map((chauffeur, index) => (
                        <div
                          key={`${jour}-${shift}-${index}`}
                          className="bg-white text-black p-2 rounded-lg shadow-md text-center"
                        >
                          {chauffeur}
                        </div>
                      ))}
                      {/* Bouton d'ajout toujours visible */}
                      <button
                        onClick={() => ajouterChauffeur(jour, shift)}
                        className="w-full p-2 bg-yellow-600 text-black font-bold rounded-lg shadow-md hover:bg-yellow-700"
                      >
                        + Ajouter
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanningTable;
