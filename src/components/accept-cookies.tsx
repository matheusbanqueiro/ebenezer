"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";
import { Cookie } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "./ui/switch";

const AcceptCookies: React.FC = () => {
  const [isCookieEnabled, setIsCookieEnabled] = useState<boolean | null>(null);
  const [showConsentBanner, setShowConsentBanner] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (consent === "true") {
      setIsCookieEnabled(true);
    } else if (consent === "false") {
      setIsCookieEnabled(false);
    } else {
      setIsCookieEnabled(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setShowConsentBanner(isCookieEnabled === null);
    }
  }, [isCookieEnabled, isLoading]);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 2 }); // Altere o valor de expiração para 2 dias
    setIsCookieEnabled(true);
    setShowConsentBanner(false); // Oculta o banner após aceitação
  };

  const handleDecline = () => {
    Cookies.set("cookieConsent", "false", { expires: 2 }); // Altere o valor de expiração para 2 dias
    setIsCookieEnabled(false);
    setShowConsentBanner(false); // Oculta o banner após recusa
  };

  const toggleCookieConsent = () => {
    if (isCookieEnabled) {
      handleDecline();
    } else {
      handleAccept();
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger className="fixed bottom-3 left-4 shadow-lg shadow-black/30 dark:bg-slate-300 dark:text-slate-900 bg-slate-800 text-white p-4 rounded-full">
          <Cookie />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader>
            <SheetTitle>Gerencie o cookie</SheetTitle>
            <SheetDescription>
              Aqui você pode gerenciar o cookie. Pode ativar e desativar a qualquer momento.
              Lembrando que com o cookie desativado, não é possível enviar um reporte.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex justify-center items-center">
            <Switch
              checked={isCookieEnabled ?? false}
              onCheckedChange={toggleCookieConsent}
            />
            <span className="ml-2">
              {isCookieEnabled ? "Cookies Ativados" : "Cookies Desativados"}
            </span>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AcceptCookies;
