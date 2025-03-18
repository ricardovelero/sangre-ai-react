import { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function CookieConsent() {
  useEffect(() => {
    const consent = Cookies.get("cookie_consent");

    // Mostrar el toast solo si no hay consentimiento
    if (!consent) {
      toast("Este sitio usa cookies", {
        description:
          "Utilizamos cookies para mejorar tu experiencia. ¿Aceptas el uso de cookies?",
        duration: Infinity, // El toast no se cierra hasta que el usuario interactúe
        action: {
          label: "Aceptar",
          onClick: () => handleConsent("accepted"),
        },
        cancel: {
          label: "Rechazar",
          onClick: () => handleConsent("rejected"),
        },
      });
    }

    // Bloquear scripts no esenciales hasta el consentimiento
    if (consent !== "accepted") {
      document.cookie = "analytics_disabled=true"; // Bloquea scripts de tracking
    } else {
      document.cookie =
        "analytics_disabled=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Habilita tracking si ya aceptó
    }
  }, []);

  const handleConsent = (decision: "accepted" | "rejected") => {
    Cookies.set("cookie_consent", decision, { expires: 365, path: "/" });
    toast.dismiss(); // Cierra el toast después de la elección
  };

  return null; // No renderiza nada, solo maneja el toast y cookies
}
