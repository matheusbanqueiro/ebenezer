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
  useEffect,
  useState,
} from "react";
import Cookies from 'js-cookie';
import AcceptCookies from "@/components/accept-cookies";

interface ReportContextProps {
  sendReportDiscord: (payload: ReportFormSchemaProps) => Promise<ReportInterface | undefined>;
}

type ReportProps = {
  children: ReactNode;
};

const ReportContext = createContext<ReportContextProps | undefined>(undefined);

const ReportProvider = ({ children }: ReportProps) => {
  const [loading, setLoading] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);
  const { toast } = useToast();
  const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK;

  useEffect(() => {
    // Verifica o consentimento ao carregar o componente
    const consent = Cookies.get("cookieConsent");
    if (consent === "true") {
      setCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 }); 
    setCookieConsent(true);
  };

  const sendReportDiscord = useCallback(
    async (payload: ReportFormSchemaProps): Promise<ReportInterface | undefined> => {
      // Verifica o consentimento antes de enviar o reporte
      if (!cookieConsent) {
        toast({
          title: "Consentimento necessário",
          description: "Você precisa aceitar os cookies para enviar um reporte.",
          variant: "destructive",
        });
        return;
      }
      
      if (!webhookUrl) {
        toast({
          title: "Falha no webhook",
          description: "O URL do webhook do Discord não está definido.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const lastReportTime = Cookies.get('lastReportTime');
      if (lastReportTime && Date.now() - parseInt(lastReportTime) < 3600000) {
        toast({
          title: "Aguarde antes de enviar outro reporte",
          description: "Você deve esperar pelo menos 1 hora entre os reportes.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const messageContent = `🚨 Chegou um reporte! 🚨\n\n👤 Nome: ${payload.name}\n\n💬 Mensagem: ${payload.message}`;

        const response = await axios.post(webhookUrl, {
          content: messageContent,
        });

        Cookies.set('lastReportTime', Date.now().toString(), { expires: 1 / 24 }); // Expira em 1 hora

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
    [toast, webhookUrl, cookieConsent] // Adiciona `cookieConsent` como dependência
  );

  const values = { sendReportDiscord };

  return (
    <ReportContext.Provider value={values}>
      {loading && <Loading />}
      {!cookieConsent && <AcceptCookies onAccept={handleAcceptCookies} />}
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
