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

interface AcceptCookiesProps {
  onAccept: () => void;
}

const AcceptCookies: React.FC<AcceptCookiesProps> = ({ onAccept }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCookieEnabled, setIsCookieEnabled] = useState<boolean | null>(null);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      setIsVisible(true); // Mostra o banner se não houver consentimento
    } else {
      setIsCookieEnabled(consent === "true"); // Define o estado com base no consentimento
    }
  }, []);

  const handleAccept = () => {
    Cookies.set("cookieConsent", "true", { expires: 2 });
    setIsVisible(false);
    setIsCookieEnabled(true);
    onAccept();
  };

  const handleDecline = () => {
    Cookies.set("cookieConsent", "false", { expires: 2 });
    setIsVisible(false);
    setIsCookieEnabled(false);
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
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 shadow-2xl bg-red-800 p-4 flex md:flex-row flex-col justify-between items-center md:gap-0 gap-4">
          <span className="text-sm text-white text-center">
            Este site usa cookies para melhorar sua experiência. Aceita?
          </span>
          <div className="items-center flex">
            <Button
              variant={"default"}
              onClick={handleAccept}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Aceitar
            </Button>
            <Button variant={"link"} onClick={handleDecline} className="text-white">
              Recusar
            </Button>
          </div>
        </div>
      )}
      {!isVisible && (
        <Sheet>
          <SheetTrigger className="fixed bottom-3 left-4 shadow-lg shadow-black/30 dark:bg-slate-300 dark:text-slate-900 bg-slate-800 text-white p-4 rounded-full justify-between items-center">
            <Cookie />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Gerencie o cookie</SheetTitle>
              <SheetDescription>
                Aqui você gerencia o cookie. Pode ativar e desativar a qualquer momento.
                Lembrando que com o cookie desativado, não é possível enviar um reporte.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-4">
              <Button
                onClick={toggleCookieConsent}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                {isCookieEnabled ? "Desativar Cookies" : "Ativar Cookies"}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default AcceptCookies;
