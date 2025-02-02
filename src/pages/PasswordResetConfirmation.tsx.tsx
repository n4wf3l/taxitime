import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PasswordResetConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl text-center max-w-md w-full">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-bold mb-2">Réinitialisation réussie !</h2>
        <p className="text-gray-400 mb-6">
          Votre mot de passe a été réinitialisé avec succès. Vous pouvez
          maintenant vous connecter avec votre nouveau mot de passe.
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="bg-yellow-600 hover:bg-yellow-500 w-full"
        >
          Retour à la connexion
        </Button>
      </div>
    </div>
  );
};

export default PasswordResetConfirmation;
