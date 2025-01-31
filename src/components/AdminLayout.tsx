import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Users,
  Car,
  Calendar,
  Settings,
  LogOut,
  Menu,
  Map,
  LayoutDashboard,
  Clock,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const chauffeursEnRoute = [
  {
    id: 1,
    name: "Ahmed B.",
    plate: "1-ABC-123",
    startTime: "08:30",
    image: "/driverimg.jpg",
  },
  {
    id: 2,
    name: "Sophie L.",
    plate: "2-XYZ-456",
    startTime: "09:15",
    image: "/driverimg.jpg",
  },
  {
    id: 3,
    name: "Youssef K.",
    plate: "3-JKL-789",
    startTime: "10:00",
    image: "/driverimg.jpg",
  },
  {
    id: 4,
    name: "Fatima R.",
    plate: "4-MNO-654",
    startTime: "07:45",
    image: "/driverimg.jpg",
  },
  {
    id: 5,
    name: "Omar T.",
    plate: "5-QWE-987",
    startTime: "06:30",
    image: "/driverimg.jpg",
  },
  {
    id: 6,
    name: "Julie D.",
    plate: "6-RTY-321",
    startTime: "11:10",
    image: "/driverimg.jpg",
  },
  {
    id: 7,
    name: "Ali Z.",
    plate: "7-UOP-753",
    startTime: "12:45",
    image: "/driverimg.jpg",
  },
  {
    id: 8,
    name: "Nadia M.",
    plate: "8-ASD-147",
    startTime: "13:20",
    image: "/driverimg.jpg",
  },
  {
    id: 9,
    name: "Karim C.",
    plate: "9-FGH-258",
    startTime: "14:00",
    image: "/driverimg.jpg",
  },
  {
    id: 10,
    name: "Sarah V.",
    plate: "10-LOP-369",
    startTime: "15:30",
    image: "/driverimg.jpg",
  },
];

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [secondaryColor, setSecondaryColor] = useState("#FF4500"); // Default secondary color
  const [tertiaryColor, setTertiaryColor] = useState("#008000"); // Default tertiary color
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Load secondary color from localStorage
    const storedSecondaryColor =
      localStorage.getItem("secondaryColor") || secondaryColor;
    setSecondaryColor(storedSecondaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      storedSecondaryColor
    );

    // Load tertiary color from localStorage
    const storedTertiaryColor =
      localStorage.getItem("tertiaryColor") || tertiaryColor;
    setTertiaryColor(storedTertiaryColor);
    document.documentElement.style.setProperty(
      "--tertiary-color",
      storedTertiaryColor
    );
  }, []);

  const handleLogout = () => {
    navigate("/login");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden" style={{ backgroundColor: secondaryColor }}>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64`}
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center">
            <img src="/taxitimelogo.png" alt="Taxi Time" className="h-8 mr-2" />
            <h1 className="text-xl font-bold" style={{ color: tertiaryColor }}>
              Taxi Time
            </h1>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-yellow-600"
              onClick={() => navigate("/admin")}
            >
              <LayoutDashboard
                className="mr-2 h-4 w-4"
                style={{ color: tertiaryColor }}
              />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-yellow-600"
              onClick={() => navigate("/admin/feuilles-de-route")}
            >
              <Map className="mr-2 h-4 w-4" style={{ color: tertiaryColor }} />
              Feuilles de route
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-yellow-600"
              onClick={() => navigate("/admin/chauffeurs")}
            >
              <Users
                className="mr-2 h-4 w-4"
                style={{ color: tertiaryColor }}
              />
              Chauffeurs
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-yellow-600"
              onClick={() => navigate("/admin/vehicules")}
            >
              <Car className="mr-2 h-4 w-4" style={{ color: tertiaryColor }} />
              Véhicules
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-yellow-600"
              onClick={() => navigate("/admin/planning")}
            >
              <Calendar
                className="mr-2 h-4 w-4"
                style={{ color: tertiaryColor }}
              />
              Planning
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-white hover:bg-yellow-600"
              onClick={() => navigate("/admin/settings")}
            >
              <Settings
                className="mr-2 h-4 w-4"
                style={{ color: tertiaryColor }}
              />
              Paramètres
            </Button>
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-800"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-200 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="container mx-auto p-4">
          {location.pathname === "/admin" ? (
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h2
                className="text-2xl font-bold"
                style={{ color: tertiaryColor }}
                mb-6
              >
                <Clock
                  className="inline mr-2"
                  style={{ color: tertiaryColor }}
                />{" "}
                Chauffeurs en service actuellement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chauffeursEnRoute.map((chauffeur) => (
                  <div
                    key={chauffeur.id}
                    className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-yellow-500 relative"
                  >
                    <img
                      src={chauffeur.image}
                      alt={chauffeur.name}
                      className="w-16 h-16 rounded-full border-2 border-yellow-400"
                    />
                    <div>
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: tertiaryColor }}
                      >
                        {chauffeur.name}
                      </h3>
                      <p className="text-gray-400">
                        <Tag className="inline mr-1" /> {chauffeur.plate}
                      </p>
                      <p className="text-gray-400">
                        <Clock className="inline mr-1" /> Départ:{" "}
                        {chauffeur.startTime}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 p-2">
                      <img
                        src="/taxidrive.gif"
                        alt="En route"
                        className="w-14 h-14"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
