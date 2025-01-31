import { useState } from "react";
import {
  Calendar,
  FileText,
  DollarSign,
  MapPin,
  Clock,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FeuillesDeRoute = () => {
  const [search, setSearch] = useState("");
  const [plate, setPlate] = useState("");
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFeuille, setSelectedFeuille] = useState(null);
  const itemsPerPage = 9;

  const feuillesDeRoute = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    chauffeur: [
      "Thomas Dupont",
      "Sophia Martin",
      "Lucas Bernard",
      "Emma Dubois",
      "Oliver Moreau",
      "Amelia Lambert",
      "William Lefevre",
      "Charlotte Fontaine",
      "James Rousseau",
      "Benjamin Girard",
    ][i],
    plate: `TXXX${100 + i}`,
    date: `2024-02-${String(i + 1).padStart(2, "0")}`,
    details: "Détails du trajet",
    recette: `${150 + i * 10}€`,
    km: `${250 + i * 20}km`,
    startShift: "08:00",
    endShift: "18:00",
    note: i % 3 === 0 ? "Attention, retard possible sur le trajet." : "", // Exemple : seulement 1 chauffeur sur 3 a une note
  }));

  const totalPages = Math.ceil(feuillesDeRoute.length / itemsPerPage);
  const paginatedFeuilles = feuillesDeRoute.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div
      className="min-h-screen text-white p-6"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
        Feuilles de route
      </h1>

      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <Input
          type="text"
          placeholder="Rechercher un chauffeur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
        <Input
          type="text"
          placeholder="TXXX111"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
        />
        <div className="flex items-center gap-2">
          <Calendar className="text-yellow-400" />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedFeuilles.map((feuille) => (
          <Card
            key={feuille.id}
            className="bg-gray-800 border border-gray-700 text-white p-4 rounded-lg relative transform transition-transform hover:scale-105 cursor-pointer"
            onClick={() => setSelectedFeuille(feuille)}
          >
            <span className="absolute top-2 right-2 bg-yellow-500 text-gray-900 px-2 py-1 text-xs font-bold rounded">
              Feuille récente
            </span>
            <CardHeader>
              <CardTitle className="text-yellow-400">
                {feuille.chauffeur}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">Date: {feuille.date}</p>
              <p className="text-gray-300">Plaque: {feuille.plate}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedFeuille && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={() => setSelectedFeuille(null)}
        >
          <div
            className="bg-gray-800 p-8 rounded-lg shadow-lg text-white max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              {selectedFeuille.chauffeur} - {selectedFeuille.plate}
            </h2>
            <div className="space-y-2">
              <p>
                <FileText className="text-yellow-400 inline-block" /> Plaque :{" "}
                {selectedFeuille.plate}
              </p>
              <p>
                <DollarSign className="text-yellow-400 inline-block" /> Recette
                : {selectedFeuille.recette}
              </p>
              <p>
                <FileText className="text-yellow-400 inline-block" /> Km
                parcourus : {selectedFeuille.km}
              </p>

              {/* Nouvelle mise en forme pour le shift */}
              <p>
                <Clock className="text-yellow-400 inline-block" /> Début de
                shift :{" "}
                {new Date(
                  selectedFeuille.date + "T" + selectedFeuille.startShift
                )
                  .toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", " à")}
              </p>

              <p>
                <Clock className="text-yellow-400 inline-block" /> Fin de shift
                :{" "}
                {new Date(
                  new Date(selectedFeuille.date).setDate(
                    new Date(selectedFeuille.date).getDate() + 1
                  )
                )
                  .toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", " à")}
              </p>

              {/* Affichage de la note si elle existe */}
              {selectedFeuille.note && selectedFeuille.note.trim() !== "" && (
                <p>
                  <FileText className="text-yellow-400 inline-block" />{" "}
                  <strong>Note :</strong> {selectedFeuille.note}
                </p>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-black flex items-center gap-2"
                onClick={() => generatePDF(selectedFeuille)}
              >
                <Download className="h-4 w-4" /> Enregistrer en PDF
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6 gap-2">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          <ChevronLeft /> Précédent
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
          p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1) ? (
            <Button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-md ${
                page === p
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              {p}
            </Button>
          ) : p === page + 2 || p === page - 2 ? (
            <span key={p} className="px-2 py-2 text-gray-500">
              ...
            </span>
          ) : null
        )}
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Suivant <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

const generatePDF = (feuille) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Feuille de route - Ritblad", 20, 20);

  // Ajout des informations principales
  doc.setFontSize(12);
  doc.text(`Nom du chauffeur: ${feuille.chauffeur}`, 20, 35);
  doc.text(`Plaque: ${feuille.plate}`, 20, 45);
  doc.text(`Date: ${feuille.date}`, 20, 55);
  doc.text(`Recette: ${feuille.recette}`, 20, 65);
  doc.text(`Km parcourus: ${feuille.km}`, 20, 75);
  doc.text(`Début shift: ${feuille.startShift}`, 20, 85);
  doc.text(`Fin shift: ${feuille.endShift}`, 20, 95);

  // Exemple de tableau des trajets
  const columns = [
    "Index",
    "Lieu - Plats",
    "Heure de début",
    "Heure de fin",
    "Km",
  ];
  const data = [
    [1, "Gare Centrale", "09:00", "09:15", "10 km"],
    [2, "Place de la Bourse", "10:00", "10:30", "15 km"],
    [3, "Aéroport Zaventem", "11:00", "11:45", "30 km"],
  ];

  (doc as any).autoTable({
    startY: 110,
    head: [columns],
    body: data,
    theme: "grid",
  });

  doc.save(`Feuille_de_route_${feuille.plate}.pdf`);
};

export default FeuillesDeRoute;
