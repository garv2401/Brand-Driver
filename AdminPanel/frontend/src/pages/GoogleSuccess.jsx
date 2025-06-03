import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const GoogleSuccess = () => {
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("userToken", token);
      fetchUser?.(); // If you have a method to refetch user
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [navigate, fetchUser]);

  return <p>Logging you in with Google...</p>;
};

export default GoogleSuccess;
