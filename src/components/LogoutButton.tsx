import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { logout, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    setLoading(true);
    try {
      logout();

      // Redirect to Home
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    isAuthenticated && (
      <Button variant={"ghost"} onClick={handleLogout} disabled={loading}>
        <LogOut size={16} /> {loading ? "Saliendo..." : "Salir"}
      </Button>
    )
  );
};

export default LogoutButton;
