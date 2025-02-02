import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  // **State variables**
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [username, setUsername] = useState("admin@example.com"); // Example logged-in user
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secondAdminEmail, setSecondAdminEmail] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#FFD700"); // Default yellow
  const [secondaryColor, setSecondaryColor] = useState("#FF4500"); // Default orange
  const [tertiaryColor, setTertiaryColor] = useState("#008000"); // Default green
  const { toast } = useToast();

  // **Load colors from localStorage on component mount**
  useEffect(() => {
    const storedPrimaryColor =
      localStorage.getItem("primaryColor") || primaryColor;
    const storedSecondaryColor =
      localStorage.getItem("secondaryColor") || secondaryColor;
    const storedTertiaryColor =
      localStorage.getItem("tertiaryColor") || tertiaryColor;

    setPrimaryColor(storedPrimaryColor);
    setSecondaryColor(storedSecondaryColor);
    setTertiaryColor(storedTertiaryColor);

    // **Set CSS variables**
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

  // **Save settings and colors to localStorage**
  const handleSave = () => {
    localStorage.setItem("primaryColor", primaryColor);
    localStorage.setItem("secondaryColor", secondaryColor);
    localStorage.setItem("tertiaryColor", tertiaryColor);

    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres ont été mis à jour avec succès.",
    });

    // **Reload the page to apply changes**
    window.location.reload();
  };

  // **Create a second admin**
  const handleCreateAdmin = () => {
    toast({
      title: "Admin créé",
      description: "Le deuxième admin a été créé avec succès.",
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h1
          className="text-2xl font-bold tracking-tight"
          style={{ color: primaryColor }}
        >
          Paramètres
        </h1>

        {/* **Account Information Section** */}
        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold" style={{ color: primaryColor }}>
            Informations du Compte
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Nom d'utilisateur
              </label>
              <Input type="text" value={username} readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium">Nouvel Email</label>
              <Input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Entrez votre nouvel email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Nouveau Mot de Passe
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Entrez votre nouveau mot de passe"
              />
            </div>
          </div>
        </div>

        {/* **Create Second Admin Section** */}
        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold" style={{ color: primaryColor }}>
            Créer un Deuxième Admin
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Email du Deuxième Admin
              </label>
              <Input
                type="email"
                value={secondAdminEmail}
                onChange={(e) => setSecondAdminEmail(e.target.value)}
                placeholder="Entrez l'email du deuxième admin"
              />
            </div>
            <Button
              onClick={handleCreateAdmin}
              className="bg-yellow-600 hover:bg-yellow-500"
              style={{ backgroundColor: primaryColor }}
            >
              Créer Admin
            </Button>
          </div>
        </div>

        {/* **Customize Colors Section** */}
        <div className="rounded-md border p-4">
          <h2 className="text-lg font-semibold" style={{ color: primaryColor }}>
            Personnaliser les Couleurs
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Couleur Primaire
              </label>
              <Input
                type="color"
                value={primaryColor}
                onChange={(e) => {
                  setPrimaryColor(e.target.value);
                  document.documentElement.style.setProperty(
                    "--primary-color",
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Couleur Secondaire
              </label>
              <Input
                type="color"
                value={secondaryColor}
                onChange={(e) => {
                  setSecondaryColor(e.target.value);
                  document.documentElement.style.setProperty(
                    "--secondary-color",
                    e.target.value
                  );
                }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Couleur Tertiaire
              </label>
              <Input
                type="color"
                value={tertiaryColor}
                onChange={(e) => {
                  setTertiaryColor(e.target.value);
                  document.documentElement.style.setProperty(
                    "--tertiary-color",
                    e.target.value
                  );
                }}
              />
            </div>
          </div>
        </div>

        {/* **Save Button** */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-yellow-600 hover:bg-yellow-500"
          >
            Enregistrer les modifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
