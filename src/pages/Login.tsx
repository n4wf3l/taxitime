import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"admin" | "chauffeur">("admin");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      if (userType === "admin") {
        navigate("/admin");
      } else {
        navigate("/chauffeur/dashboard");
      }
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${email}!`,
      });
    }
  };

  // Effet d'écriture progressive (typewriter effect)
  const fullText =
    "Laa plateforme dédiée aux chauffeurs pour gérer leurs courses en toute simplicité.";
  const [visibleText, setVisibleText] = useState("");
  const indexRef = useRef(0); // Garde la trace de l'index sans redéclencher le rendu

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexRef.current < fullText.length) {
        setVisibleText((prev) => prev + fullText.charAt(indexRef.current));
        indexRef.current++; // Incrémente l'index sans redéclencher de rendu inutile
      } else {
        clearInterval(interval);
      }
    }, 50); // Vitesse d'écriture

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-2xl flex bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <img
            src="/taxitimelogo.png"
            alt="Taxi Time"
            className="h-10 mb-6 mx-auto"
          />
          <h2 className="text-2xl font-bold mb-4 text-center">Se connecter</h2>
          <div className="grid grid-cols-2 gap-2 mb-6">
            <Button
              onClick={() => setUserType("chauffeur")}
              className={`w-full bg-black hover:bg-gray-800 text-white ${
                userType === "chauffeur" ? "border-2 border-white" : ""
              }`}
            >
              Chauffeur
            </Button>
            <Button
              onClick={() => setUserType("admin")}
              className={`w-full bg-yellow-600 hover:bg-yellow-500 text-white ${
                userType === "admin" ? "border-2 border-white" : ""
              }`}
            >
              Admin
            </Button>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                className="text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-gray-800 hover:bg-yellow-800 w-full"
            >
              <LogIn className="mr-2 h-4 w-4" /> Se connecter
            </Button>
          </form>
          <a
            href="#"
            className="text-yellow-400 text-sm mt-4 block text-center"
          >
            Mot de passe oublié?
          </a>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6">
          <h2 className="text-lg font-bold">Taxi Time.</h2>
          <p className="text-sm mt-2">{visibleText}</p>
          <p className="text-xs mt-10 text-gray-400">
            Made with love in Brussels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
