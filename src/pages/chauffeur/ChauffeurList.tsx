import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

// Mock data - replace with actual API calls later
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
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234 567 891",
    status: "active",
    joinDate: "2024-02-01",
    shiftsCompleted: 32,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    phone: "+1 234 567 892",
    status: "archived",
    joinDate: "2023-11-20",
    shiftsCompleted: 128,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "+1 234 567 893",
    status: "active",
    joinDate: "2024-03-10",
    shiftsCompleted: 50,
  },
  {
    id: "5",
    name: "Bob White",
    email: "bob.white@example.com",
    phone: "+1 234 567 894",
    status: "active",
    joinDate: "2024-04-05",
    shiftsCompleted: 20,
  },
  {
    id: "6",
    name: "Charlie Green",
    email: "charlie.green@example.com",
    phone: "+1 234 567 895",
    status: "archived",
    joinDate: "2023-12-15",
    shiftsCompleted: 75,
  },
  {
    id: "7",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "+1 234 567 896",
    status: "active",
    joinDate: "2024-05-01",
    shiftsCompleted: 90,
  },
  {
    id: "8",
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    phone: "+1 234 567 897",
    status: "active",
    joinDate: "2024-06-12",
    shiftsCompleted: 60,
  },
  {
    id: "9",
    name: "Fiona Apple",
    email: "fiona.apple@example.com",
    phone: "+1 234 567 898",
    status: "archived",
    joinDate: "2023-10-10",
    shiftsCompleted: 30,
  },
  {
    id: "10",
    name: "George Clooney",
    email: "george.clooney@example.com",
    phone: "+1 234 567 899",
    status: "active",
    joinDate: "2024-07-20",
    shiftsCompleted: 110,
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
    // Implement PDF export functionality here
    toast({
      title: "Export Started",
      description: "Your data is being prepared for download.",
    });
  };

  const handleArchive = (id: string) => {
    toast({
      title: "Chauffeur Archived",
      description: "The chauffeur has been archived successfully.",
    });
  };

  // Filter chauffeurs based on search term and filters
  const filteredChauffeurs = chauffeurs.filter((chauffeur) => {
    const matchesSearch =
      chauffeur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chauffeur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chauffeur.phone.includes(searchTerm);

    const matchesStatus =
      filterStatus === "all" || chauffeur.status === filterStatus;

    const matchesShifts =
      filterShifts === null || chauffeur.shiftsCompleted >= (filterShifts || 0);

    return matchesSearch && matchesStatus && matchesShifts;
  });

  // Sort chauffeurs based on shifts completed
  const sortedChauffeurs = filteredChauffeurs.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.shiftsCompleted - b.shiftsCompleted;
    } else {
      return b.shiftsCompleted - a.shiftsCompleted;
    }
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
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button
            onClick={() => navigate("/admin/chauffeurs/add")}
            className="bg-yellow-600 hover:bg-yellow-500"
          >
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un Chauffeur
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
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
                <TableCell className="font-medium">{chauffeur.name}</TableCell>
                <TableCell>{chauffeur.email}</TableCell>
                <TableCell>{chauffeur.phone}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      chauffeur.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {chauffeur.status}
                  </span>
                </TableCell>
                <TableCell>{chauffeur.joinDate}</TableCell>
                <TableCell>{chauffeur.shiftsCompleted}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon">
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
