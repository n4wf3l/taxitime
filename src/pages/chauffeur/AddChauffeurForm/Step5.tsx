import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BookOpen, Globe, IdCard } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface Step5Props {
  form: UseFormReturn<any>; // Use the correct type here
}

const Step5: React.FC<Step5Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Éducation et Compétences</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="education"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <BookOpen className="inline mr-1" /> Éducation
              </FormLabel>
              <FormControl className="text-black">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Globe className="inline mr-1" /> Langues
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="text-black">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la langue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">Anglais</SelectItem>
                  <SelectItem value="ar">Arabe</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="driverLicenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <IdCard className="inline mr-1" /> Numéro de Permis de Conduire
              </FormLabel>
              <FormControl className="text-black">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="driverLicenseFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <IdCard className="inline mr-1" /> Permis de Conduire
                (Télécharger)
              </FormLabel>
              <FormControl>
                <Input type="file" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step5;
