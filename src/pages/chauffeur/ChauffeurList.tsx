import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Download, Archive, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Chauffeur {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "archived";
  joinDate: string;
  shiftsCompleted: number;
}

const mockChauffeurs: Chauffeur[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    status: "active",
    joinDate: "2024-01-15",
    shiftsCompleted: 45,
  },
];

const ChauffeurList = () => {
  const [chauffeurs, setChauffeurs] = useState<Chauffeur[]>(mockChauffeurs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "active" | "archived" | "all"
  >("all");
  const [filterShifts, setFilterShifts] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleExport = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["Nom", "Email", "Téléphone", "Statut", "Date d'adhésion", "Shifts"],
      ],
      body: chauffeurs.map((c) => [
        c.name,
        c.email,
        c.phone,
        c.status,
        c.joinDate,
        c.shiftsCompleted,
      ]),
    });
    doc.save("chauffeurs.pdf");
  };

  const handleArchive = (id: string) => {
    toast({
      title: "Chauffeur Archived",
      description: "The chauffeur has been archived successfully.",
    });
  };

  const filteredChauffeurs = chauffeurs.filter((chauffeur) => {
    const matchesSearch =
      chauffeur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chauffeur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chauffeur.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" || chauffeur.status === filterStatus;

    const matchesShifts =
      filterShifts === null || chauffeur.shiftsCompleted >= filterShifts;

    return matchesSearch && matchesStatus && matchesShifts;
  });

  const sortedChauffeurs = filteredChauffeurs.sort((a, b) => {
    return sortOrder === "asc"
      ? a.shiftsCompleted - b.shiftsCompleted
      : b.shiftsCompleted - a.shiftsCompleted;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-yellow-600">
          Gestion des Chauffeurs
        </h1>
        <div className="space-x-2">
          <Button
            onClick={handleExport}
            className="bg-yellow-600 hover:bg-yellow-500"
          >
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
          <Button
            onClick={() => navigate("/admin/chauffeurs/add")}
            className="bg-yellow-600 hover:bg-yellow-500"
          >
            <Plus className="mr-2 h-4 w-4" /> Ajouter un Chauffeur
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Rechercher par nom, email ou téléphone"
          className="p-2 rounded border border-gray-300 text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 rounded border border-gray-300 text-black"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(e.target.value as "active" | "archived" | "all")
          }
        >
          <option value="all">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="archived">Archivé</option>
        </select>

        <input
          type="number"
          placeholder="Filtrer par shifts"
          className="p-2 rounded border border-gray-300 text-black"
          value={filterShifts ?? ""}
          onChange={(e) =>
            setFilterShifts(e.target.value ? parseInt(e.target.value) : null)
          }
        />

        <select
          className="p-2 rounded border border-gray-300 text-black"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">Shifts: Moins à Plus</option>
          <option value="desc">Shifts: Plus à Moins</option>
        </select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'adhésion</TableHead>
              <TableHead>Shifts</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedChauffeurs.map((chauffeur) => (
              <TableRow key={chauffeur.id}>
                <TableCell>{chauffeur.name}</TableCell>
                <TableCell>{chauffeur.email}</TableCell>
                <TableCell>{chauffeur.phone}</TableCell>
                <TableCell>{chauffeur.status}</TableCell>
                <TableCell>{chauffeur.joinDate}</TableCell>
                <TableCell>{chauffeur.shiftsCompleted}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate("/admin/chauffeurs/edit")}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleArchive(chauffeur.id)}
                  >
                    <Archive className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ChauffeurList;
