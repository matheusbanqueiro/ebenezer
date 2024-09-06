import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ReportFormSchemaProps, ReportSchema } from "@/validations/report-validations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlert } from 'lucide-react';
import { ValidateInput } from "./ui/validate-input";
import { Textarea } from "./ui/text-area";
import { useReport } from "@/contexts/useReport";

const ReportForm: React.FC = () => {
  const { sendReportDiscord } = useReport();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReportFormSchemaProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(ReportSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  const handleSendReport = async (data: ReportFormSchemaProps) => {
    await sendReportDiscord(data)
    reset();
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger><OctagonAlert className="text-red-600 hover:text-red-600/30 md:" /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Encontrou algo?</AlertDialogTitle>
            <AlertDialogDescription>
              Nos diga o que aconteceu
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-3">
            <ValidateInput
              {...register("name")}
              errorMessage={errors.name?.message}
              placeholder="Seu nome completo"
              className=""
            />
            <Textarea
              {...register("message")}
              errorMessage={errors.message?.message}
              placeholder="Escreva aqui o que aconteceu..." />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSubmit(handleSendReport)()} className="bg-red-600 hover:bg-red-600/80 font-semibold text-white">Enviar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ReportForm;
