import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure Checkbox is imported
import { UseFormReturn } from "react-hook-form";

interface Step7Props {
  form: UseFormReturn<any>; // Use the correct type here
}

const Step7: React.FC<Step7Props> = ({ form }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Méthodes de Paiement</h3>

      {/* Bank Card */}
      <div className="space-y-2">
        <h4 className="font-medium">Carte Bancaire</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="bankCard.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Activer</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankCard.showOnRoute"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Afficher sur l'Itinéraire</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Paper Checks */}
      <div className="space-y-2">
        <h4 className="font-medium">Chèques Papier</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="paperChecks.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Activer</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paperChecks.showOnRoute"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Afficher sur l'Itinéraire</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Invoiced Rides */}
      <div className="space-y-2">
        <h4 className="font-medium">Courses Facturées</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="invoicedRides.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Activer</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoicedRides.showOnRoute"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Afficher sur l'Itinéraire</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Heetch */}
      <div className="space-y-2">
        <h4 className="font-medium">Heetch</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="heetch.enabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Activer</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="heetch.showOnRoute"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Afficher sur l'Itinéraire</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Step7;
