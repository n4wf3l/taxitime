import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  year: number;
  status: "active" | "inactive";
}

// Mock data - replace with actual API calls later
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plate: "ABC-123",
    model: "Toyota Camry",
    year: 2020,
    status: "active",
  },
  {
    id: "2",
    plate: "XYZ-456",
    model: "Honda Accord",
    year: 2019,
    status: "active",
  },
  {
    id: "3",
    plate: "LMN-789",
    model: "Ford Focus",
    year: 2018,
    status: "inactive",
  },
];

const Vehicules = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const { toast } = useToast();

  const handleAddVehicle = () => {
    // Logic to add a new vehicle
    toast({
      title: "Véhicule ajouté",
      description: "Le véhicule a été ajouté avec succès.",
    });
  };

  const handleEditVehicle = (id: string) => {
    // Logic to edit the vehicle
    toast({
      title: "Véhicule modifié",
      description: "Le véhicule a été modifié avec succès.",
    });
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    toast({
      title: "Véhicule supprimé",
      description: "Le véhicule a été supprimé avec succès.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-yellow-600">
          Gestion des Véhicules
        </h1>
        <Button
          onClick={handleAddVehicle}
          className="bg-yellow-600 hover:bg-yellow-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un Véhicule
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plaque</TableHead>
              <TableHead>Modèle</TableHead>
              <TableHead>Année</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.plate}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      vehicle.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {vehicle.status}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditVehicle(vehicle.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteVehicle(vehicle.id)}
                  >
                    <Trash className="h-4 w-4" />
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

export default Vehicules;
