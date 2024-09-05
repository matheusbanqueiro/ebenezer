"use client";

import Loading from "@/components/loading";
import type { ReportInterface } from "@/interfaces/report";
import { useToast } from "@/lib/use-toast";
import type { ReportFormSchemaProps } from "@/validations/report-validations";
import axios from "axios";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

interface ReportContextProps {
  sendReportDiscord: (payload: ReportFormSchemaProps) => Promise<ReportInterface | undefined>;
}

type ReportProps = {
  children: ReactNode;
};

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

const ReportProvider = ({ children }: ReportProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK;

  const sendReportDiscord = useCallback(
    async (payload: ReportFormSchemaProps): Promise<ReportInterface | undefined> => {
      if (!webhookUrl) {
        toast({
          title: "Falha no webhook",
          description: "O URL do webhook do Discord não está definido.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const messageContent = `🚨 Chegou um reporte chegou! 🚨\n\n👤 nome: ${payload.name}\n\n💬 message: ${payload.message}`;

        const response = await axios.post(webhookUrl, {
          content: messageContent,
        });

        toast({
          title: "Enviar Reporte",
          description: "Problema reportado com sucesso!",
        });

        return response.data as ReportInterface;
      } catch (error) {
        toast({
          title: "Enviar Reporte",
          description: "Falha ao enviar problema!",
          variant: "destructive",
        });
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [toast, webhookUrl]
  );


  const values = { sendReportDiscord };

  return (
    <ReportContext.Provider value={values}>
      {loading && <Loading />}
      {children}
    </ReportContext.Provider>
  );
};

const useReport = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReport must be used within a ReportProvider");
  }
  return context;
};

export { useReport, ReportProvider };
