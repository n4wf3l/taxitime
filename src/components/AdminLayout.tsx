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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState("#FF4500");
  const [tertiaryColor, setTertiaryColor] = useState("#008000");
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const storedSecondaryColor =
      localStorage.getItem("secondaryColor") || secondaryColor;
    setSecondaryColor(storedSecondaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      storedSecondaryColor
    );

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

  const navItems = [
    { path: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "feuilles-de-route", label: "Feuilles de route", icon: Map },
    { path: "chauffeurs", label: "Chauffeurs", icon: Users },
    { path: "vehicules", label: "Véhicules", icon: Car },
    { path: "planning", label: "Planning", icon: Calendar },
    { path: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: "var(--primary-color)" }}
    >
      {!isSidebarOpen && (
        <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-white" />
          </Button>
        </div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-${secondaryColor} transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: secondaryColor }}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-center">
            <img src="/taxitimelogo.png" alt="Taxi Time" className="h-8" />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✖️
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="w-full justify-start text-white hover:bg-yellow-600"
                onClick={() => {
                  navigate(`/admin/${item.path}`);
                  setIsSidebarOpen(false);
                }}
              >
                <item.icon
                  className="mr-2 h-4 w-4"
                  style={{ color: tertiaryColor }}
                />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-white hover:bg-red-800"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-10" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`flex-1 transition-all duration-200 ${
          isSidebarOpen ? "lg:ml-64" : ""
        }`}
      >
        <div className="container mx-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
