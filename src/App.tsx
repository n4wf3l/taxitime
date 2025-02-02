import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword";
import PasswordResetConfirmation from "./pages/PasswordResetConfirmation.tsx";
import AdminLayout from "./components/AdminLayout";
import NotFound from "./pages/NotFound";
import ChauffeurList from "./pages/chauffeur/ChauffeurList";
import AddChauffeurForm from "./pages/chauffeur/AddChauffeurForm/AddChauffeurForm";
import FeuillesDeRoute from "./pages/chauffeur/FeuillesDeRoute";
import Planning from "./pages/chauffeur/Planning";
import Settings from "./pages/chauffeur/Settings";
import Vehicules from "./pages/chauffeur/Vehicules";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Load colors from localStorage
    const storedPrimaryColor =
      localStorage.getItem("primaryColor") || "#FFD700"; // Default yellow
    const storedSecondaryColor =
      localStorage.getItem("secondaryColor") || "#FF4500"; // Default orange
    const storedTertiaryColor =
      localStorage.getItem("tertiaryColor") || "#008000"; // Default green

    // Set CSS variables
    document.documentElement.style.setProperty(
      "--primary-color",
      storedPrimaryColor
    );
    document.documentElement.style.setProperty(
      "--secondary-color",
      storedSecondaryColor
    );
    document.documentElement.style.setProperty(
      "--tertiary-color",
      storedTertiaryColor
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route
              path="/password-reset-confirmation"
              element={<PasswordResetConfirmation />}
            />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<div>Dashboard Content</div>} />
              <Route path="chauffeurs" element={<ChauffeurList />} />
              <Route path="chauffeurs/add" element={<AddChauffeurForm />} />
              <Route path="vehicles" element={<div>Vehicles Management</div>} />
              <Route path="planning" element={<Planning />} />
              <Route path="reports" element={<div>Reports Generator</div>} />
              <Route path="feuilles-de-route" element={<FeuillesDeRoute />} />
              <Route path="vehicules" element={<Vehicules />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
