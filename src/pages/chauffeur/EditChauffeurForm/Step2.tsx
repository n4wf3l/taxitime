import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle, Home, Globe, IdCard } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface Step2Props {
  form: UseFormReturn<any>; // Utilisez le type correct ici
}

const Step2: React.FC<Step2Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Détails Personnels</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="birthPlace"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Home className="inline mr-1" /> Lieu de Naissance
              </FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Calendar className="inline mr-1" /> Date de Naissance
              </FormLabel>
              <FormControl>
                <Input type="date" className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <CheckCircle className="inline mr-1" /> Mot de Passe
            </FormLabel>
            <FormControl>
              <Input type="password" className="text-black" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <Home className="inline mr-1" /> Adresse
            </FormLabel>
            <FormControl>
              <Input className="text-black" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Home className="inline mr-1" /> Ville
              </FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Home className="inline mr-1" /> Code Postal
              </FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Home className="inline mr-1" /> Pays
              </FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Globe className="inline mr-1" /> Nationalité
              </FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <IdCard className="inline mr-1" /> Numéro d'Identité Nationale
              </FormLabel>
              <FormControl>
                <Input className="text-black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step2;
