import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "./ui/button";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.API_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // Remove token from cookies
      Cookies.remove("token");

      // Optionally remove from localStorage/sessionStorage if used
      localStorage.removeItem("token");

      // Redirect to Home
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
