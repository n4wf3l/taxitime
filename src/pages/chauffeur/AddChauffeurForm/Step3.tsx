import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface Step3Props {
  form: UseFormReturn<any>; // Ensure the correct type is used here
}

const Step3: React.FC<Step3Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Informations Familiales</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="civilStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Users className="inline mr-1" /> Statut Civil
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="text-black">
                    <SelectValue placeholder="Sélectionner le statut civil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Célibataire</SelectItem>
                    <SelectItem value="married">Marié</SelectItem>
                    <SelectItem value="divorced">Divorcé</SelectItem>
                    <SelectItem value="widowed">Veuf</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dependents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Users className="inline mr-1" /> Nombre de Dépendants
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  min="0"
                  className="text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="spouseName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <Users className="inline mr-1" /> Nom du Conjoint
            </FormLabel>
            <FormControl>
              <Input {...field} className="text-black" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="childrenCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <Users className="inline mr-1" /> Nombre d'Enfants
            </FormLabel>
            <FormControl>
              <Input type="number" {...field} min="0" className="text-black" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step3;
