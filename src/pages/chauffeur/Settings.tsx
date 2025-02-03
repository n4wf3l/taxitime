import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChevronDown, ChevronUp } from "lucide-react";

const Settings = () => {
  const [primaryColor, setPrimaryColor] = useState("#FFD700");
  const [secondaryColor, setSecondaryColor] = useState("#FF4500");
  const [tertiaryColor, setTertiaryColor] = useState("#008000");
  const [activeSection, setActiveSection] = useState(null);
  const { toast } = useToast();

  const [accountInfo, setAccountInfo] = useState({
    dateCreated: "2022-01-15",
    email: "admin@example.com",
    firstName: "John",
    lastName: "Doe",
    company: "Taxi Time",
    password: "********",
  });

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

  const handleSave = () => {
    localStorage.setItem("primaryColor", primaryColor);
    localStorage.setItem("secondaryColor", secondaryColor);
    localStorage.setItem("tertiaryColor", tertiaryColor);

    toast({
      title: "Paramètres enregistrés",
      description: "Vos paramètres ont été mis à jour avec succès.",
    });
    window.location.reload();
  };

  const handleAccountUpdate = () => {
    toast({
      title: "Mise à jour réussie",
      description: "Vos informations ont été mises à jour.",
    });
    setActiveSection(null);
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6" style={{ color: tertiaryColor }}>
        Paramètres
      </h1>
      <div className="space-y-4">
        <Button
          className="w-full bg-gray-800 hover:bg-gray-700 flex justify-between items-center"
          onClick={() =>
            setActiveSection(activeSection === "account" ? null : "account")
          }
        >
          Informations du Compte{" "}
          {activeSection === "account" ? <ChevronUp /> : <ChevronDown />}
        </Button>
        {activeSection === "account" && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: tertiaryColor }}
            >
              Informations du Compte
            </h2>
            <p>Date de création : {accountInfo.dateCreated}</p>
            <p>Email : {accountInfo.email}</p>
            <p>Société : {accountInfo.company}</p>
            <label>Prénom</label>
            <Input
              placeholder="Prénom"
              value={accountInfo.firstName}
              onChange={(e) =>
                setAccountInfo({ ...accountInfo, firstName: e.target.value })
              }
              className="mb-2 bg-gray-500"
            />
            <label>Nom de famille</label>
            <Input
              placeholder="Nom de famille"
              value={accountInfo.lastName}
              onChange={(e) =>
                setAccountInfo({ ...accountInfo, lastName: e.target.value })
              }
              className="mb-2 bg-gray-500"
            />
            <label>Nouveau mot de passe</label>
            <Input
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={(e) =>
                setAccountInfo({ ...accountInfo, password: e.target.value })
              }
              className="mb-4 bg-gray-500"
            />
            <Button
              className="w-full"
              style={{ backgroundColor: tertiaryColor }}
              onClick={handleAccountUpdate}
            >
              Enregistrer
            </Button>
          </div>
        )}

        <Button
          className="w-full bg-gray-800 hover:bg-gray-700 flex justify-between items-center"
          onClick={() =>
            setActiveSection(activeSection === "admin" ? null : "admin")
          }
        >
          Créer un Deuxième Admin{" "}
          {activeSection === "admin" ? <ChevronUp /> : <ChevronDown />}
        </Button>
        {activeSection === "admin" && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: tertiaryColor }}
            >
              Créer un Deuxième Admin
            </h2>
            <label>Email</label>
            <Input placeholder="Email" className="mb-2 bg-gray-500" />
            <label>Prénom</label>
            <Input placeholder="Prénom" className="mb-2 bg-gray-500" />
            <label>Nom de famille</label>
            <Input placeholder="Nom de famille" className="mb-2 bg-gray-500" />
            <label>Société</label>
            <Input placeholder="Société" className="mb-2 bg-gray-500" />
            <label>Mot de passe</label>
            <Input
              type="password"
              placeholder="Mot de passe"
              className="mb-4 bg-gray-500"
            />
            <Button
              className="w-full"
              style={{ backgroundColor: tertiaryColor }}
              onClick={() => setActiveSection(null)}
            >
              Créer Admin
            </Button>
          </div>
        )}

        <Button
          className="w-full bg-gray-800 hover:bg-gray-700 flex justify-between items-center"
          onClick={() =>
            setActiveSection(activeSection === "colors" ? null : "colors")
          }
        >
          Personnaliser les Couleurs{" "}
          {activeSection === "colors" ? <ChevronUp /> : <ChevronDown />}
        </Button>
        {activeSection === "colors" && (
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: tertiaryColor }}
            >
              Personnaliser les Couleurs
            </h2>
            <div className="flex space-x-2">
              <div
                className="w-8 h-8 rounded cursor-pointer"
                style={{ backgroundColor: primaryColor }}
                onClick={() => document.getElementById("primaryColor").click()}
              ></div>
              <input
                id="primaryColor"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="hidden"
              />
              <div
                className="w-8 h-8 rounded cursor-pointer"
                style={{ backgroundColor: secondaryColor }}
                onClick={() =>
                  document.getElementById("secondaryColor").click()
                }
              ></div>
              <input
                id="secondaryColor"
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="hidden"
              />
              <div
                className="w-8 h-8 rounded cursor-pointer"
                style={{ backgroundColor: tertiaryColor }}
                onClick={() => document.getElementById("tertiaryColor").click()}
              ></div>
              <input
                id="tertiaryColor"
                type="color"
                value={tertiaryColor}
                onChange={(e) => setTertiaryColor(e.target.value)}
                className="hidden"
              />
            </div>
            <Button
              className="w-full mt-4"
              style={{ backgroundColor: tertiaryColor }}
              onClick={handleSave}
            >
              Enregistrer les modifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
