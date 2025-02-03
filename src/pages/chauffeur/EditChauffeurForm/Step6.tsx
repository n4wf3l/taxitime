import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle, Car } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

interface Step6Props {
  form: UseFormReturn<any>; // Utilisez le type correct ici
}

const Step6: React.FC<Step6Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Horaires et Véhicule</h3>

      <FormField
        control={form.control}
        name="formula"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <CheckCircle className="inline mr-1" /> Formule
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl className="text-black">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner la formule" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="fulltime">Temps Plein</SelectItem>
                <SelectItem value="parttime">Temps Partiel</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="period"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <CheckCircle className="inline mr-1" /> Période
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
          name="vehicle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Car className="inline mr-1" /> Véhicule
              </FormLabel>
              <FormControl className="text-black">
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="paidTimeOff"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <CheckCircle className="inline mr-1" /> Congés Payés
            </FormLabel>
            <FormControl className="text-black">
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default Step6;
