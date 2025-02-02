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
  const [showSplash, setShowSplash] = useState(true); // État du Splash
  const [fadeOut, setFadeOut] = useState(false); // Gérer l'effet de fondu
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

  // Splash Screen disparaît après 1 seconde avec un effet de fondu
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Active l'animation de fondu
      setTimeout(() => setShowSplash(false), 1000); // Cache le Splash après l'animation
    }, 1000); // Durée de 1 seconde

    return () => clearTimeout(timer);
  }, []);

  // Effet d'écriture progressive (typewriter effect)
  const fullText =
    "LLa plateforme dédiée aux chauffeurs pour gérer leurs courses en toute simplicité.";
  const [visibleText, setVisibleText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if (!showSplash) {
      const interval = setInterval(() => {
        if (indexRef.current < fullText.length) {
          setVisibleText((prev) => prev + fullText.charAt(indexRef.current));
          indexRef.current++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [showSplash]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black relative">
      {/* Splash Screen */}
      {showSplash && (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-900 z-50 ${
            fadeOut
              ? "opacity-0 transition-opacity duration-1000 ease-in-out"
              : "opacity-100"
          }`}
        >
          <img
            src="/taxitimelogo.png"
            alt="Taxi Time"
            className="h-40 animate-pulse"
          />
        </div>
      )}

      {/* Formulaire de connexion */}
      {!showSplash && (
        <div className="w-full max-w-2xl flex bg-gray-900 text-white rounded-lg overflow-hidden shadow-xl">
          <div className="w-1/2 p-8 flex flex-col justify-center">
            <img
              src="/taxitimelogo.png"
              alt="Taxi Time"
              className="h-10 mb-6 mx-auto"
            />
            <h2 className="text-2xl font-bold mb-4 text-center">
              Se connecter
            </h2>
            <div className="grid grid-cols-2 gap-2 mb-6"></div>
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
              href="/forget-password"
              className="text-yellow-400 text-sm mt-4 block text-center transition-colors duration-300 hover:text-yellow-500"
            >
              Mot de passe oublié?
            </a>
          </div>
          <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 to-black p-6">
            <a
              href="https://www.taxitime.be"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-lg font-bold transition-colors duration-300 hover:text-yellow-400"
            >
              Taxi Time.
            </a>

            <p className="text-sm mt-2">{visibleText}</p>
            <p className="text-xs mt-10 text-gray-400">
              Made with love in Brussels.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
