import React, { useState } from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Camera, User, Mail, Phone, Briefcase } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface Step1Props {
  form: UseFormReturn<any>; // Utilisez le type correct ici
}

const Step1: React.FC<Step1Props> = ({ form }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Informations du Compte</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Camera className="inline mr-1" /> Photo
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleImageChange(e);
                    field.onChange(e); // Appeler l'onChange original pour mettre à jour l'état du formulaire
                  }}
                />
              </FormControl>
              <FormMessage />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="mt-2 w-24 h-24 object-cover rounded border border-gray-300"
                />
              )}
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <User className="inline mr-1" /> Nom
              </FormLabel>
              <FormControl>
                <Input className="text-black" placeholder="Dupont" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <User className="inline mr-1" /> Prénom
              </FormLabel>
              <FormControl>
                <Input className="text-black" placeholder="Jean" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Mail className="inline mr-1" /> E-mail
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="jean@exemple.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Phone className="inline mr-1" /> Numéro de Téléphone
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="+33 1 23 45 67 89"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Briefcase className="inline mr-1" /> Rôle
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Chauffeur"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="employer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Briefcase className="inline mr-1" /> Employeur
              </FormLabel>
              <FormControl>
                <Input
                  className="text-black"
                  placeholder="Nom de l'entreprise"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step1;
