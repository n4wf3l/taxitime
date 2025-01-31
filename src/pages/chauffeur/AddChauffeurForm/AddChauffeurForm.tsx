import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Define your form schema using Zod
const formSchema = z.object({
  // Define your schema here...
});

interface AddChauffeurFormProps {}

const AddChauffeurForm: React.FC<AddChauffeurFormProps> = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 7;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Default values...
    },
  });

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const onSubmit = async (values) => {
    if (currentStep === totalSteps - 1) {
      // Handle final submission
      console.log("Form values:", values);
      toast({
        title: "Succès",
        description: "Chauffeur ajouté avec succès",
      });
      navigate("/admin/chauffeurs");
    } else {
      handleNext();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight text-yellow-600">
        Ajouter un Chauffeur
      </h2>
      <p className="text-sm text-muted-foreground">
        Étape {currentStep + 1} sur {totalSteps}
      </p>

      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {currentStep === 0 && <Step1 form={form} />}
          {currentStep === 1 && <Step2 form={form} />}
          {currentStep === 2 && <Step3 form={form} />}
          {currentStep === 3 && <Step4 form={form} />}
          {currentStep === 4 && <Step5 form={form} />}
          {currentStep === 5 && <Step6 form={form} />}
          {currentStep === 6 && <Step7 form={form} />}

          <div className="flex justify-between mt-6">
            <Button
              className="bg-yellow-600 text-white hover:bg-yellow-500"
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Précédent
            </Button>
            <Button
              type="submit"
              className="bg-yellow-600 text-white hover:bg-yellow-500"
            >
              {currentStep === totalSteps - 1 ? "Soumettre" : "Suivant"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const StepIndicator: React.FC<{
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}> = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="flex justify-center space-x-4 mb-4 bg-gray-900 p-2 rounded-lg">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          onClick={() => onStepClick(index)}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200 border-2 ${
            currentStep === index
              ? "bg-yellow-600 border-white"
              : "bg-gray-900 border-gray-600"
          }`}
        >
          {index + 1}
        </div>
      ))}
    </div>
  );
};

export default AddChauffeurForm;
